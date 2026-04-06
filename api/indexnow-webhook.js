/**
 * /api/indexnow-webhook.js — Instant IndexNow submission on Supabase row insert
 *
 * Configure this as a Supabase Webhook (Database → Webhooks) on INSERT events
 * for tables: uk_grants, uk_benefits, uk_loans, uk_housing, uk_training
 *
 * Supabase sends a POST request with details of the new row.
 * This function immediately submits the new URL to IndexNow.
 *
 * Also accepts direct POST from your own scripts for batch submission.
 */

const SITE = 'https://ukgrants.online'
const INDEXNOW_KEY = '83956a647312427ab45fbc96bd9512d8'
const KEY_LOCATION = `${SITE}/${INDEXNOW_KEY}.txt`
const WEBHOOK_SECRET = process.env.INDEXNOW_WEBHOOK_SECRET || ''

// Table → URL path mapping
const TABLE_PATHS = {
  uk_grants: 'grant',
  uk_benefits: 'benefit',
  uk_loans: 'loan',
  uk_housing: 'housing',
  uk_training: 'training',
}

async function submitUrls(urls) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'ukgrants.online',
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  })
  return res.status
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify webhook secret if configured
  const secret = req.headers['x-webhook-secret'] || req.headers['authorization']?.replace('Bearer ', '')
  if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const urls = []

    // Supabase webhook format: { type, table, record, ... }
    if (body.table && body.record) {
      const path = TABLE_PATHS[body.table]
      const slug = body.record.slug
      if (path && slug) {
        urls.push(`${SITE}/${path}/${slug}`)
      }
    }

    // Direct batch format: { urls: [...] }
    if (body.urls && Array.isArray(body.urls)) {
      urls.push(...body.urls)
    }

    // Direct single URL format: { url: '...' }
    if (body.url) {
      urls.push(body.url)
    }

    if (urls.length === 0) {
      return res.status(400).json({ error: 'No URLs to submit', body })
    }

    const status = await submitUrls(urls)
    console.log('IndexNow webhook submitted:', urls, 'status:', status)

    res.status(200).json({
      success: true,
      submitted: urls,
      indexnow_status: status,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('IndexNow webhook error:', err)
    res.status(500).json({ error: err.message })
  }
}
