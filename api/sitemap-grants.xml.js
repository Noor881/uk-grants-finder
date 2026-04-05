/**
 * /api/sitemap-grants.xml
 * 
 * Dynamic sitemap for all individual grant/benefit/loan/housing/training detail pages.
 * Fetches slugs from Supabase and returns a valid XML sitemap.
 * 
 * Referenced in robots.txt and sitemap-index.xml.
 * Deployed as a Vercel Serverless Function.
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY

const TABLES = [
  { table: 'uk_grants',   path: 'grant',   slugCol: 'slug', dateCol: 'last_updated' },
  { table: 'uk_benefits', path: 'benefit',  slugCol: 'slug', dateCol: 'updated_at' },
  { table: 'uk_loans',    path: 'loan',     slugCol: 'slug', dateCol: 'updated_at' },
  { table: 'uk_housing',  path: 'housing',  slugCol: 'slug', dateCol: 'updated_at' },
  { table: 'uk_training', path: 'training', slugCol: 'slug', dateCol: 'updated_at' },
]

async function fetchSlugs(table, slugCol, dateCol) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=${slugCol},${dateCol}&limit=2000`
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
  })
  if (!res.ok) return []
  const rows = await res.json()
  return Array.isArray(rows) ? rows : []
}

function toISODate(val) {
  if (!val) return new Date().toISOString().split('T')[0]
  try {
    return new Date(val).toISOString().split('T')[0]
  } catch {
    return new Date().toISOString().split('T')[0]
  }
}

function buildXml(entries) {
  const urls = entries
    .map(({ loc, lastmod }) => `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

export default async function handler(req, res) {
  try {
    const entries = []

    for (const { table, path, slugCol, dateCol } of TABLES) {
      const rows = await fetchSlugs(table, slugCol, dateCol)
      for (const row of rows) {
        const slug = row[slugCol]
        if (!slug) continue
        entries.push({
          loc: `https://ukgrants.online/${path}/${slug}`,
          lastmod: toISODate(row[dateCol]),
        })
      }
    }

    const xml = buildXml(entries)

    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=43200, stale-while-revalidate=86400') // 12h cache
    res.status(200).send(xml)
  } catch (err) {
    console.error('sitemap-grants error:', err)
    res.status(500).send('Internal error generating sitemap')
  }
}
