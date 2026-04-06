/**
 * /api/govuk-scraper.js — Auto-scrape GOV.UK for new UK grants
 *
 * Runs daily at 06:00 UTC (after IndexNow midnight cron).
 * Uses the GOV.UK Content API and Find-a-Grant API to discover new grant schemes.
 * New grants found are inserted into uk_grants in Supabase and instantly submitted to IndexNow.
 *
 * Vercel Cron: schedule "0 6 * * *"
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY
const SITE = 'https://ukgrants.online'
const INDEXNOW_KEY = '83956a647312427ab45fbc96bd9512d8'
const CRON_SECRET = process.env.CRON_SECRET || ''

// ── GOV.UK search queries targeting new grant announcements ─────────────────
const GOVUK_SEARCHES = [
  { q: 'grant scheme 2025', type: 'business_finance_support_schemes' },
  { q: 'funding grant residents 2025', type: 'guidance' },
  { q: 'local authority grant fund', type: 'guidance' },
  { q: 'innovation grant UK business', type: 'business_finance_support_schemes' },
  { q: 'energy efficiency grant households', type: 'guidance' },
]

// ── Slugify helper ───────────────────────────────────────────────────────────
function toSlug(str) {
  return str.toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80)
}

// ── Fetch GOV.UK search results ──────────────────────────────────────────────
async function fetchGovUKResults(query, contentType) {
  const params = new URLSearchParams({
    q: query,
    count: '10',
    fields: 'title,description,link,content_store_document_type,public_timestamp',
  })
  if (contentType) params.set('filter_content_store_document_type', contentType)

  const url = `https://www.gov.uk/api/search.json?${params}`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'UKGrantsHub/1.0 (+https://ukgrants.online/)' },
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.results || [])
  } catch {
    return []
  }
}

// ── Fetch GOV.UK Find-a-Grant API (newer grants service) ────────────────────
async function fetchFindAGrant() {
  try {
    const res = await fetch('https://www.find-a-grant.service.gov.uk/api/v1/grants?size=20&sort=updatedDate,desc', {
      headers: { 'User-Agent': 'UKGrantsHub/1.0 (+https://ukgrants.online/)' },
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.content || data.grants || data || [])
  } catch {
    return []
  }
}

// ── Get existing slugs from Supabase to avoid duplicates ────────────────────
async function getExistingSlugs() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/uk_grants?select=slug&limit=500`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  })
  if (!res.ok) return new Set()
  const rows = await res.json()
  return new Set(rows.map(r => r.slug))
}

// ── Insert a new grant into Supabase ────────────────────────────────────────
async function insertGrant(grant) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/uk_grants`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(grant),
  })
  return res.status === 201 || res.status === 200
}

// ── Submit new URL to IndexNow ───────────────────────────────────────────────
async function indexNowSubmit(urls) {
  if (!urls.length) return
  await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'ukgrants.online',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  })
}

// ── Parse raw GOV.UK search result into a grant record ──────────────────────
function parseSearchResult(result) {
  const title = result.title?.value || result.title || ''
  const description = result.description?.value || result.description || ''
  const link = result.link || ''
  if (!title || !description || title.length < 10) return null

  // Only include results that look like grant or funding schemes
  const lowerTitle = title.toLowerCase()
  const lowerDesc = description.toLowerCase()
  const grantKeywords = ['grant', 'fund', 'scheme', 'support', 'bursary', 'award', 'incentive', 'subsidy']
  if (!grantKeywords.some(kw => lowerTitle.includes(kw) || lowerDesc.includes(kw))) return null

  const slug = toSlug(title)
  const apply_url = link.startsWith('http') ? link : `https://www.gov.uk${link}`
  const council_name = 'UK Government'
  const grant_type = title.slice(0, 100)

  return {
    slug,
    council_name,
    grant_type,
    full_description: description.slice(0, 1000),
    eligibility: 'Check GOV.UK for full eligibility criteria.',
    how_to_apply: `Apply via GOV.UK: ${apply_url}`,
    apply_url,
    status: 'active',
    location: 'United Kingdom',
    category: 'Government',
    source: 'govuk-auto',
    scraped_at: new Date().toISOString(),
  }
}

// ── Parse Find-a-Grant result ────────────────────────────────────────────────
function parseFindAGrant(grant) {
  const name = grant.grantName || grant.name || ''
  const description = grant.summary || grant.description || grant.shortDescription || ''
  const grantRef = grant.id || grant.grantReference || ''

  if (!name || name.length < 10) return null

  const slug = toSlug(name)
  const apply_url = grant.applicationUrl || grant.applyUrl ||
    `https://www.find-a-grant.service.gov.uk/grants/${grantRef}`
  const maxFunding = grant.maxAwardAmount || grant.maximumValue || null

  return {
    slug,
    council_name: grant.grantSponsoringBody || grant.fundingOrganisation || 'UK Government',
    grant_type: name.slice(0, 100),
    full_description: description.slice(0, 1000),
    eligibility: (grant.eligibilitySummary || grant.whoCanApply || 'Check Find-a-Grant for eligibility.').slice(0, 500),
    how_to_apply: `Apply via Find-a-Grant: ${apply_url}`,
    apply_url,
    max_funding: maxFunding ? `£${Number(maxFunding).toLocaleString()}` : null,
    status: grant.grantStatus === 'open' ? 'active' : 'active',
    location: 'United Kingdom',
    category: grant.grantCategory || 'Government',
    source: 'find-a-grant-auto',
    scraped_at: new Date().toISOString(),
  }
}

// ── Main handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // Auth check
  const authHeader = req.headers.authorization
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const isDryRun = req.method === 'GET' && new URL(req.url, `https://${req.headers.host}`).searchParams.get('dry') === '1'

  console.log(`[govuk-scraper] Starting scrape at ${new Date().toISOString()} (dryRun=${isDryRun})`)

  try {
    // 1. Get existing slugs to skip duplicates
    const existingSlugs = await getExistingSlugs()
    console.log(`[govuk-scraper] ${existingSlugs.size} existing grants in DB`)

    const candidateGrants = []

    // 2. GOV.UK search API
    for (const search of GOVUK_SEARCHES) {
      const results = await fetchGovUKResults(search.q, search.type)
      for (const result of results) {
        const grant = parseSearchResult(result)
        if (grant && !existingSlugs.has(grant.slug)) {
          candidateGrants.push(grant)
        }
      }
    }

    // 3. Find-a-Grant API
    const fagResults = await fetchFindAGrant()
    for (const grant of fagResults) {
      const parsed = parseFindAGrant(grant)
      if (parsed && !existingSlugs.has(parsed.slug)) {
        candidateGrants.push(parsed)
      }
    }

    // 4. Deduplicate by slug
    const seen = new Set()
    const newGrants = candidateGrants.filter(g => {
      if (seen.has(g.slug)) return false
      seen.add(g.slug)
      return true
    })

    console.log(`[govuk-scraper] Found ${newGrants.length} new grants to insert`)

    if (isDryRun) {
      return res.status(200).json({
        mode: 'dry-run',
        existingCount: existingSlugs.size,
        newGrantsFound: newGrants.length,
        sample: newGrants.slice(0, 5),
      })
    }

    // 5. Insert new grants and submit to IndexNow
    const insertedSlugs = []
    for (const grant of newGrants) {
      const ok = await insertGrant(grant)
      if (ok) {
        insertedSlugs.push(grant.slug)
        console.log(`[govuk-scraper] Inserted: ${grant.slug}`)
      }
    }

    // 6. IndexNow submission for all new pages
    if (insertedSlugs.length > 0) {
      const newUrls = insertedSlugs.map(slug => `${SITE}/grant/${slug}`)
      await indexNowSubmit(newUrls)
      console.log(`[govuk-scraper] Submitted ${newUrls.length} URLs to IndexNow`)
    }

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      existingGrants: existingSlugs.size,
      newGrantsFound: newGrants.length,
      inserted: insertedSlugs.length,
      slugs: insertedSlugs,
    })
  } catch (err) {
    console.error('[govuk-scraper] Error:', err)
    res.status(500).json({ error: err.message })
  }
}
