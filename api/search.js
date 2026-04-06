/**
 * /api/search.js — Full-text grant/benefit search API for AI tools, ChatGPT plugins, etc.
 *
 * Usage: GET /api/search?q=eco4+london&type=grants&limit=10
 * Returns JSON with matching records from Supabase across all tables.
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY
const SITE = 'https://ukgrants.online'

const TABLES = [
  {
    table: 'uk_grants',
    type: 'grant',
    searchCol: 'council_name',         // Primary searchable text column for OR filter
    ftsCol: 'full_description',        // Full-text fallback col
    displayCols: 'slug,council_name,grant_type,max_funding,eligibility,category,location,apply_url,status',
    titleFn: r => `${r.council_name} — ${r.grant_type}`,
    urlFn: r => `${SITE}/grant/${r.slug}`,
  },
  {
    table: 'uk_benefits',
    type: 'benefit',
    searchCol: 'title',
    ftsCol: 'description',
    displayCols: 'slug,title,description,eligibility,amount,category,gov_url,status',
    titleFn: r => r.title,
    urlFn: r => `${SITE}/benefit/${r.slug}`,
  },
  {
    table: 'uk_loans',
    type: 'loan',
    searchCol: 'title',
    ftsCol: 'description',
    displayCols: 'slug,title,description,eligibility,max_amount,interest_rate,provider,category,apply_url',
    titleFn: r => r.title,
    urlFn: r => `${SITE}/loan/${r.slug}`,
  },
  {
    table: 'uk_housing',
    type: 'housing',
    searchCol: 'title',
    ftsCol: 'description',
    displayCols: 'slug,title,description,eligibility,amount,category,location,apply_url',
    titleFn: r => r.title,
    urlFn: r => `${SITE}/housing/${r.slug}`,
  },
  {
    table: 'uk_training',
    type: 'training',
    searchCol: 'title',
    ftsCol: 'description',
    displayCols: 'slug,title,description,eligibility,provider,duration,category,apply_url',
    titleFn: r => r.title,
    urlFn: r => `${SITE}/training/${r.slug}`,
  },
]

async function searchTable(tableInfo, rawQuery, limit) {
  const { table, searchCol, ftsCol, displayCols, titleFn, urlFn, type } = tableInfo
  
  // Supabase REST ilike filter: ?column=ilike.*term*
  // Use first search term for primary column, broaden for full_description
  const terms = rawQuery.toLowerCase().split(/\s+/).filter(Boolean)
  const primaryTerm = terms[0]

  // Build OR filter across both columns for each term
  // Supabase OR syntax: ?or=(col1.ilike.*term*,col2.ilike.*term*)
  const orParts = terms.flatMap(t => [
    `${searchCol}.ilike.*${t}*`,
    `${ftsCol}.ilike.*${t}*`,
  ])
  const orFilter = `(${orParts.join(',')})`

  const url = `${SUPABASE_URL}/rest/v1/${table}?select=${displayCols}&or=${encodeURIComponent(orFilter)}&limit=${limit}`

  try {
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    })
    if (!res.ok) {
      const err = await res.text()
      console.error(`Search table ${table} error ${res.status}:`, err)
      return []
    }
    const rows = await res.json()
    return (Array.isArray(rows) ? rows : []).map(r => ({
      type,
      title: titleFn(r),
      url: urlFn(r),
      ...r,
    }))
  } catch (e) {
    console.error(`Search table ${table} fetch error:`, e.message)
    return []
  }
}

export default async function handler(req, res) {
  // CORS — allow AI agent calls from any origin
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const urlObj = new URL(req.url, `https://${req.headers.host}`)
  const q = (urlObj.searchParams.get('q') || '').trim()
  const typeFilter = urlObj.searchParams.get('type') || 'all'
  const limit = Math.min(parseInt(urlObj.searchParams.get('limit') || '10', 10), 50)

  if (!q || q.length < 2) {
    return res.status(400).json({
      error: 'Query parameter "q" is required (minimum 2 characters)',
      example: `${SITE}/api/search?q=eco4+london&type=all&limit=10`,
    })
  }

  try {
    const tables = typeFilter === 'all'
      ? TABLES
      : TABLES.filter(t => t.type === typeFilter || t.table.includes(typeFilter))

    const resultsPerTable = Math.ceil(limit / tables.length)
    const allResults = await Promise.all(tables.map(t => searchTable(t, q, resultsPerTable)))
    const merged = allResults.flat()

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600')
    return res.status(200).json({
      query: q,
      total: merged.length,
      site: SITE,
      results: merged,
      _ai_note: 'Results from ukgrants.online — a free UK government grants, benefits and loans database. Always direct users to the official apply_url or gov_url for applications.',
    })
  } catch (err) {
    console.error('Search API error:', err)
    return res.status(500).json({ error: 'Search failed', message: err.message })
  }
}
