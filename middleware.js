// middleware.js — Vercel Edge Middleware
// Runs at the CDN edge BEFORE any request hits the React SPA.
// Detects AI crawlers / search bots by User-Agent and rewrites them to
// /api/bot-render which returns pre-rendered HTML with full SEO content.
// Human users are completely unaffected — they always get the React SPA.
//
// Compatible with Vite + React on Vercel (uses Web API, not next/server).

// ── Bot User-Agent signatures ─────────────────────────────────────────────
// Sources: seo-technical.md §AI Crawler Management + known search bots
const BOT_PATTERNS = [
  // Search engines
  'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'baiduspider',
  'ahrefsbot', 'semrushbot', 'rogerbot', 'dotbot', 'mj12bot',
  // AI crawlers (seo-technical.md §1 AI Crawler Management)
  'gptbot', 'chatgpt-user', 'oai-searchbot',
  'claudebot', 'anthropic-ai',
  'perplexitybot',
  'bytespider',
  'google-extended',
  'applebot',
  'cohere-ai', 'ccbot', 'amazonbot', 'facebookbot',
  // Social / link preview scrapers (WhatsApp, Telegram, Slack, Discord, LinkedIn)
  'twitterbot', 'linkedinbot', 'slackbot', 'discordbot',
  'whatsapp', 'telegrambot', 'facebot',
  // Generic HTTP clients
  'ia_archiver', 'archive.org_bot', 'wget',
  'python-requests', 'go-http-client', 'libwww-perl',
]

export const config = {
  matcher: [
    // Match all app routes — exclude static assets, API routes, and public files
    '/((?!api|_next|assets|favicon|robots\\.txt|sitemap|llms\\.txt|og-image|indexnow|83956a|ukgrants-indexnow|.*\\.(js|css|png|jpg|svg|ico|woff|woff2|ttf|webp|webmanifest|txt|xml|json)).*)',
  ],
}

export default function middleware(request) {
  const ua = (request.headers.get('user-agent') || '').toLowerCase()

  // Check if this is a known bot/crawler
  const isBot = BOT_PATTERNS.some(pattern => ua.includes(pattern))

  if (isBot) {
    // Redirect bot to bot-render API — keeps the original pathname so the API
    // knows which page to render (e.g. /about → /api/bot-render/about)
    const url = new URL(request.url)
    const renderUrl = new URL('/api/bot-render' + url.pathname, url.origin)

    return Response.redirect(renderUrl.toString(), 302)
  }

  // Human visitor — pass through to React SPA unchanged
  return new Response(null, { status: 200 })
}
