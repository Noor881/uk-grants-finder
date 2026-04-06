/**
 * /api/indexnow-submit.js — Auto-submit new URLs to IndexNow
 *
 * Called as a Vercel Cron Job every day at midnight UTC.
 * Fetches all current slugs from Supabase and submits them to IndexNow API.
 * This ensures Bing, Yandex, Seznam, and Naver always have the latest pages.
 *
 * Cron schedule: configured in vercel.json
 */

const SITE          = 'https://ukgrants.online'
const INDEXNOW_KEY  = '83956a647312427ab45fbc96bd9512d8'
const KEY_LOCATION  = `${SITE}/${INDEXNOW_KEY}.txt`
const SUPABASE_URL  = process.env.VITE_SUPABASE_URL
const SUPABASE_KEY  = process.env.VITE_SUPABASE_ANON_KEY

const TABLES = [
  { table: 'uk_grants',   path: 'grant',    slugCol: 'slug' },
  { table: 'uk_benefits', path: 'benefit',  slugCol: 'slug' },
  { table: 'uk_loans',    path: 'loan',     slugCol: 'slug' },
  { table: 'uk_housing',  path: 'housing',  slugCol: 'slug' },
  { table: 'uk_training', path: 'training', slugCol: 'slug' },
]

// Static URLs always included in every submission
const STATIC_URLS = [
  // Core pages
  `${SITE}/`,
  `${SITE}/grants`,
  `${SITE}/benefits`,
  `${SITE}/loans`,
  `${SITE}/housing`,
  `${SITE}/training`,
  `${SITE}/about`,
  `${SITE}/contact`,
  `${SITE}/tools/eligibility`,

  // Guides index
  `${SITE}/guides`,

  // Original guides
  `${SITE}/guides/eco4-grant-guide`,
  `${SITE}/guides/universal-credit-guide`,
  `${SITE}/guides/startup-grants-uk`,
  `${SITE}/guides/household-support-fund`,
  `${SITE}/guides/disabled-facilities-grant`,

  // Batch 1 guides (April 2026)
  `${SITE}/guides/council-tax-reduction`,
  `${SITE}/guides/innovate-uk-grants`,
  `${SITE}/guides/carers-allowance-guide`,
  `${SITE}/guides/free-childcare-guide`,
  `${SITE}/guides/uk-energy-grants-2025`,

  // City guides batch 1
  `${SITE}/guides/london-grants-guide`,
  `${SITE}/guides/manchester-grants-guide`,
  `${SITE}/guides/birmingham-grants-guide`,
  `${SITE}/guides/scotland-grants-guide`,
  `${SITE}/guides/bristol-grants-guide`,

  // 2026 topical guides
  `${SITE}/guides/spring-budget-2026`,
  `${SITE}/guides/universal-credit-rates-2026`,
  `${SITE}/guides/national-living-wage-2026`,
  `${SITE}/guides/renters-rights-act-2026`,
  `${SITE}/guides/uk-business-grants-2026`,

  // Local area city guides (April 2026)
  `${SITE}/guides/leeds-grants-2026`,
  `${SITE}/guides/liverpool-grants-2026`,
  `${SITE}/guides/newcastle-north-east-grants-2026`,
  `${SITE}/guides/cardiff-wales-grants-2026`,
  `${SITE}/guides/sheffield-yorkshire-grants-2026`,
]

async function fetchSlugs(table, path, slugCol) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=${slugCol}&status=eq.active&limit=2000`
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  })
  if (!res.ok) return []
  const rows = await res.json()
  return (Array.isArray(rows) ? rows : [])
    .map(r => r[slugCol])
    .filter(Boolean)
    .map(slug => `${SITE}/${path}/${slug}`)
}

async function submitToIndexNow(urlList) {
  // IndexNow API accepts max 10,000 URLs per request
  const chunks = []
  for (let i = 0; i < urlList.length; i += 9000) {
    chunks.push(urlList.slice(i, i + 9000))
  }

  const results = []
  for (const chunk of chunks) {
    const body = JSON.stringify({
      host: 'ukgrants.online',
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: chunk,
    })
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body,
    })
    results.push({ status: res.status, count: chunk.length })
  }
  return results
}

export default async function handler(req, res) {
  // Security: only allow cron calls (Vercel sets this header) or explicit secret
  const cronSecret = req.headers['x-vercel-cron-signature'] || req.headers['authorization']
  const allowedSecret = process.env.CRON_SECRET

  if (allowedSecret && cronSecret !== `Bearer ${allowedSecret}` && !req.headers['x-vercel-cron-signature']) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    // Collect all URLs from Supabase
    const dynamicUrls = []
    for (const { table, path, slugCol } of TABLES) {
      const urls = await fetchSlugs(table, path, slugCol)
      dynamicUrls.push(...urls)
    }

    const allUrls = [...STATIC_URLS, ...dynamicUrls]

    // Submit to IndexNow
    const results = await submitToIndexNow(allUrls)

    const totalSubmitted = allUrls.length
    const response = {
      success: true,
      submitted: totalSubmitted,
      static: STATIC_URLS.length,
      dynamic: dynamicUrls.length,
      results,
      timestamp: new Date().toISOString(),
    }

    console.log('IndexNow submission:', JSON.stringify(response))
    res.status(200).json(response)
  } catch (err) {
    console.error('IndexNow cron error:', err)
    res.status(500).json({ error: err.message })
  }
}
