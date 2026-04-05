// middleware.js — Vercel Edge Middleware
// Runs at the CDN edge BEFORE any request hits the React SPA.
// Detects AI crawlers / search bots by User-Agent and redirects them to
// /api/bot-render which returns pre-rendered HTML with full SEO content.
// Human users are completely unaffected — they always get the React SPA.

// ── Paths to skip (static assets, API, public files) ─────────────────────
const SKIP_PREFIXES = [
  '/api/',
  '/assets/',
  '/_next/',
  '/favicon',
  '/robots.txt',
  '/sitemap',
  '/llms.txt',
  '/og-image',
  '/83956a',
  '/ukgrants-indexnow',
]

// File extensions that should never be bot-rendered (Vercel serves these directly)
const SKIP_EXTENSIONS = [
  '.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.ico',
  '.woff', '.woff2', '.ttf', '.webp', '.webmanifest', '.txt', '.xml', '.json',
]

// ── Bot User-Agent signatures ─────────────────────────────────────────────
// Sources: seo-technical.md §AI Crawler Management + known search bots
const BOT_PATTERNS = [
  // Search engines
  'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'baiduspider',
  'ahrefsbot', 'semrushbot', 'rogerbot', 'dotbot', 'mj12bot',
  // AI crawlers (seo-technical.md §1)
  'gptbot', 'chatgpt-user', 'oai-searchbot',
  'claudebot', 'anthropic-ai',
  'perplexitybot',
  'bytespider',
  'google-extended',
  'applebot',
  'cohere-ai', 'ccbot', 'amazonbot', 'facebookbot',
  // Social / link preview scrapers
  'twitterbot', 'linkedinbot', 'slackbot', 'discordbot',
  'whatsapp', 'telegrambot', 'facebot',
  // Generic HTTP clients
  'ia_archiver', 'archive.org_bot', 'wget',
  'python-requests', 'go-http-client', 'libwww-perl',
]

// Simple catch-all matcher — exclusions handled in code below
export const config = {
  matcher: '/(.*)',
}

export default function middleware(request) {
  const url = new URL(request.url)
  const path = url.pathname

  // Skip static assets and API routes — let Vercel serve them directly
  if (
    SKIP_PREFIXES.some(prefix => path.startsWith(prefix)) ||
    SKIP_EXTENSIONS.some(ext => path.endsWith(ext))
  ) {
    return new Response(null, { status: 200 })
  }

  const ua = (request.headers.get('user-agent') || '').toLowerCase()

  // Check if this is a known bot/crawler
  const isBot = BOT_PATTERNS.some(pattern => ua.includes(pattern))

  if (isBot) {
    // Redirect bot to the prerender API with the original path preserved
    const renderUrl = new URL('/api/bot-render' + path, url.origin)
    return Response.redirect(renderUrl.toString(), 302)
  }

  // Human visitor — pass through to React SPA unchanged
  return new Response(null, { status: 200 })
}
