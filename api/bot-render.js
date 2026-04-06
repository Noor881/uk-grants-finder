/**
 * /api/bot-render/[...path].js  (or handled via vercel.json routing)
 *
 * Serves pre-rendered HTML to AI crawlers and bots that can't run JavaScript.
 * - Static routes: content is hard-coded (fast, zero DB calls)
 * - Dynamic detail routes: fetches real data from Supabase REST API
 *
 * Table schemas (from Supabase):
 *   uk_grants:   slug, council_name, grant_type, max_funding, full_description, eligibility, who_can_apply, how_to_apply, apply_url, category, location, closing_date
 *   uk_benefits: slug, title, description, eligibility, amount, how_to_apply, who_can_apply, gov_url, category
 *   uk_loans:    slug, title, description, eligibility, max_amount, interest_rate, how_to_apply, apply_url, provider, category
 *   uk_housing:  slug, title, description, eligibility, amount, how_to_apply, apply_url, category, location
 *   uk_training: slug, title, description, eligibility, how_to_apply, apply_url, provider, duration, category
 */

const SITE = 'https://ukgrants.online'
const ORG  = 'UK Funding Hub'
const SUPABASE_URL     = process.env.VITE_SUPABASE_URL
const SUPABASE_KEY     = process.env.VITE_SUPABASE_ANON_KEY
const INDEXNOW_KEY     = '83956a647312427ab45fbc96bd9512d8'
const INDEXNOW_KEY_URL = `${SITE}/${INDEXNOW_KEY}.txt`

// ── Supabase fetch helper ────────────────────────────────────────────────────
async function sbFetch(table, select, filter) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=${select}&${filter}&limit=1`
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  })
  if (!res.ok) return null
  const rows = await res.json()
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
}

// ── Escape HTML entities ─────────────────────────────────────────────────────
function esc(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// ── HTML shell ───────────────────────────────────────────────────────────────
function html(opts) {
  const { title, description, canonical, h1, body, crumbs = [], schema = [] } = opts
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) },
    ...schema,
  ]
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE}/og-image.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="en_GB">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${SITE}/og-image.png">
  <meta name="robots" content="index, follow">
  ${schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n  ')}
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:860px;margin:0 auto;padding:24px;color:#111;line-height:1.7}
    h1{font-size:1.8rem;color:#0a1628;margin-bottom:.5rem}
    h2{font-size:1.2rem;color:#0a1628;margin-top:2rem}
    a{color:#0066ff}
    nav{font-size:.85rem;margin-bottom:1.5rem}
    nav a{color:#666;text-decoration:none}
    .badge{display:inline-block;background:#f0f4ff;color:#0066ff;border:1px solid #cce0ff;border-radius:20px;padding:3px 12px;font-size:.8rem;font-weight:600;margin-bottom:16px}
    .field{margin:12px 0;padding:16px;background:#f9fafb;border-radius:8px;border-left:4px solid #0066ff}
    .field strong{display:block;font-size:.78rem;color:#666;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px}
    footer{margin-top:3rem;padding-top:1rem;border-top:1px solid #eee;font-size:.85rem;color:#666}
  </style>
</head>
<body>
  <header>
    <nav aria-label="Breadcrumb">
      ${crumbs.map((c, i) => i < crumbs.length - 1
        ? `<a href="${c.url}">${esc(c.name)}</a> &rsaquo; `
        : `<span>${esc(c.name)}</span>`).join('')}
    </nav>
    <a href="/" style="font-size:1rem;font-weight:700;color:#0066ff;text-decoration:none;display:block;margin-bottom:1.5rem">${ORG}</a>
    <h1>${esc(h1)}</h1>
  </header>
  <main>${body}</main>
  <footer>
    <p><a href="/">${ORG}</a> — Free UK grants, benefits &amp; loans database</p>
    <p><a href="/grants">Grants</a> | <a href="/benefits">Benefits</a> | <a href="/loans">Loans</a> | <a href="/housing">Housing</a> | <a href="/training">Training</a> | <a href="/guides">Guides</a></p>
  </footer>
</body>
</html>`
}

// ── Dynamic renderers ────────────────────────────────────────────────────────

async function renderGrant(slug) {
  const g = await sbFetch('uk_grants',
    'slug,council_name,grant_type,max_funding,full_description,eligibility,who_can_apply,how_to_apply,apply_url,category,location,closing_date,last_updated',
    `slug=eq.${encodeURIComponent(slug)}`)
  if (!g) return null

  const title = `${g.council_name || ''} — ${g.grant_type || 'Grant'} | UK Funding Hub`
  const desc = (g.full_description || g.eligibility || '').slice(0, 160)
  const canonical = `${SITE}/grant/${slug}`
  const lastMod = g.last_updated ? new Date(g.last_updated).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' }) : ''

  const body = `
    <div class="badge">${esc(g.category || 'Grant')}</div>
    ${g.location ? `<p>📍 ${esc(g.location)}</p>` : ''}
    ${g.max_funding ? `<div class="field"><strong>Maximum Funding</strong>${esc(g.max_funding)}</div>` : ''}
    ${g.full_description ? `<h2>About This Grant</h2><p>${esc(g.full_description)}</p>` : ''}
    ${g.eligibility ? `<h2>Eligibility</h2><p>${esc(g.eligibility)}</p>` : ''}
    ${g.who_can_apply ? `<div class="field"><strong>Who Can Apply</strong>${esc(g.who_can_apply)}</div>` : ''}
    ${g.how_to_apply ? `<h2>How to Apply</h2><p>${esc(g.how_to_apply)}</p>` : ''}
    ${g.closing_date ? `<div class="field"><strong>Closing Date</strong>${esc(g.closing_date)}</div>` : ''}
    ${g.apply_url ? `<p><a href="${esc(g.apply_url)}" rel="noopener noreferrer">Apply on official website →</a></p>` : ''}
    ${lastMod ? `<p style="font-size:.8rem;color:#666">Last verified: ${lastMod}</p>` : ''}
    <hr>
    <p>Also see: <a href="/grants">All UK grants</a> | <a href="/tools/eligibility">Check your eligibility</a> | <a href="/guides">Guides</a></p>`

  const schema = [{
    '@context': 'https://schema.org', '@type': 'Article',
    headline: `${g.council_name} — ${g.grant_type}`,
    description: desc,
    url: canonical,
    publisher: { '@type': 'Organization', name: ORG, url: SITE + '/' },
    dateModified: g.last_updated || new Date().toISOString(),
    inLanguage: 'en-GB',
    about: { '@type': 'GovernmentService', name: g.grant_type, serviceType: 'Grant', areaServed: { '@type': 'Country', name: 'United Kingdom' } },
  }]

  return html({ title, description: desc, canonical, h1: `${g.council_name || ''} — ${g.grant_type || 'Grant'}`,
    body, schema,
    crumbs: [{ name: 'Home', url: SITE+'/' }, { name: 'Grants', url: SITE+'/grants' }, { name: g.council_name || 'Grant', url: canonical }] })
}

async function renderBenefit(slug) {
  const b = await sbFetch('uk_benefits',
    'slug,title,description,eligibility,amount,how_to_apply,who_can_apply,gov_url,category,last_updated',
    `slug=eq.${encodeURIComponent(slug)}`)
  if (!b) return null

  const title = `${b.title || 'Benefit'} — Eligibility & How to Claim | UK Funding Hub`
  const desc = (b.description || '').slice(0, 160)
  const canonical = `${SITE}/benefit/${slug}`

  const body = `
    <div class="badge">${esc(b.category || 'Benefit')}</div>
    ${b.description ? `<p>${esc(b.description)}</p>` : ''}
    ${b.amount ? `<div class="field"><strong>Amount</strong>${esc(b.amount)}</div>` : ''}
    ${b.eligibility ? `<h2>Eligibility</h2><p>${esc(b.eligibility)}</p>` : ''}
    ${b.who_can_apply ? `<div class="field"><strong>Who Can Apply</strong>${esc(b.who_can_apply)}</div>` : ''}
    ${b.how_to_apply ? `<h2>How to Claim</h2><p>${esc(b.how_to_apply)}</p>` : ''}
    ${b.gov_url ? `<p><a href="${esc(b.gov_url)}" rel="noopener noreferrer">Official GOV.UK page →</a></p>` : ''}
    <hr><p>Also see: <a href="/benefits">All UK benefits</a> | <a href="/guides/universal-credit-guide">Universal Credit guide</a></p>`

  const schema = [{
    '@context': 'https://schema.org', '@type': 'Article',
    headline: b.title, description: desc, url: canonical,
    publisher: { '@type': 'Organization', name: ORG, url: SITE + '/' },
    dateModified: b.last_updated || new Date().toISOString(), inLanguage: 'en-GB',
  }]

  return html({ title, description: desc, canonical, h1: b.title || 'Benefit',
    body, schema,
    crumbs: [{ name: 'Home', url: SITE+'/' }, { name: 'Benefits', url: SITE+'/benefits' }, { name: b.title || 'Benefit', url: canonical }] })
}

async function renderLoan(slug) {
  const l = await sbFetch('uk_loans',
    'slug,title,description,eligibility,max_amount,interest_rate,how_to_apply,apply_url,provider,category,last_updated',
    `slug=eq.${encodeURIComponent(slug)}`)
  if (!l) return null

  const title = `${l.title || 'Loan'} — Eligibility & How to Apply | UK Funding Hub`
  const desc = (l.description || '').slice(0, 160)
  const canonical = `${SITE}/loan/${slug}`

  const body = `
    <div class="badge">${esc(l.category || 'Loan')}</div>
    ${l.provider ? `<p>Provider: ${esc(l.provider)}</p>` : ''}
    ${l.description ? `<p>${esc(l.description)}</p>` : ''}
    ${l.max_amount ? `<div class="field"><strong>Maximum Amount</strong>${esc(l.max_amount)}</div>` : ''}
    ${l.interest_rate ? `<div class="field"><strong>Interest Rate</strong>${esc(l.interest_rate)}</div>` : ''}
    ${l.eligibility ? `<h2>Eligibility</h2><p>${esc(l.eligibility)}</p>` : ''}
    ${l.how_to_apply ? `<h2>How to Apply</h2><p>${esc(l.how_to_apply)}</p>` : ''}
    ${l.apply_url ? `<p><a href="${esc(l.apply_url)}" rel="noopener noreferrer">Apply now →</a></p>` : ''}
    <hr><p>Also see: <a href="/loans">All government loans</a> | <a href="/grants">UK grants</a></p>`

  const schema = [{
    '@context': 'https://schema.org', '@type': 'Article',
    headline: l.title, description: desc, url: canonical,
    publisher: { '@type': 'Organization', name: ORG, url: SITE + '/' },
    dateModified: l.last_updated || new Date().toISOString(), inLanguage: 'en-GB',
  }]

  return html({ title, description: desc, canonical, h1: l.title || 'Loan',
    body, schema,
    crumbs: [{ name: 'Home', url: SITE+'/' }, { name: 'Loans', url: SITE+'/loans' }, { name: l.title || 'Loan', url: canonical }] })
}

async function renderHousing(slug) {
  const h = await sbFetch('uk_housing',
    'slug,title,description,eligibility,amount,how_to_apply,apply_url,category,location,last_updated',
    `slug=eq.${encodeURIComponent(slug)}`)
  if (!h) return null

  const title = `${h.title || 'Housing Scheme'} — Eligibility & How to Apply | UK Funding Hub`
  const desc = (h.description || '').slice(0, 160)
  const canonical = `${SITE}/housing/${slug}`

  const body = `
    <div class="badge">${esc(h.category || 'Housing')}</div>
    ${h.location ? `<p>📍 ${esc(h.location)}</p>` : ''}
    ${h.description ? `<p>${esc(h.description)}</p>` : ''}
    ${h.amount ? `<div class="field"><strong>Amount / Value</strong>${esc(h.amount)}</div>` : ''}
    ${h.eligibility ? `<h2>Eligibility</h2><p>${esc(h.eligibility)}</p>` : ''}
    ${h.how_to_apply ? `<h2>How to Apply</h2><p>${esc(h.how_to_apply)}</p>` : ''}
    ${h.apply_url ? `<p><a href="${esc(h.apply_url)}" rel="noopener noreferrer">Apply now →</a></p>` : ''}
    <hr><p>Also see: <a href="/housing">All housing schemes</a> | <a href="/guides/disabled-facilities-grant">Disabled Facilities Grant guide</a></p>`

  const schema = [{
    '@context': 'https://schema.org', '@type': 'Article',
    headline: h.title, description: desc, url: canonical,
    publisher: { '@type': 'Organization', name: ORG, url: SITE + '/' },
    dateModified: h.last_updated || new Date().toISOString(), inLanguage: 'en-GB',
  }]

  return html({ title, description: desc, canonical, h1: h.title || 'Housing Scheme',
    body, schema,
    crumbs: [{ name: 'Home', url: SITE+'/' }, { name: 'Housing', url: SITE+'/housing' }, { name: h.title || 'Housing', url: canonical }] })
}

async function renderTraining(slug) {
  const t = await sbFetch('uk_training',
    'slug,title,description,eligibility,how_to_apply,apply_url,provider,duration,category,last_updated',
    `slug=eq.${encodeURIComponent(slug)}`)
  if (!t) return null

  const title = `${t.title || 'Training'} — Free UK Training | UK Funding Hub`
  const desc = (t.description || '').slice(0, 160)
  const canonical = `${SITE}/training/${slug}`

  const body = `
    <div class="badge">${esc(t.category || 'Training')}</div>
    ${t.provider ? `<p>Provider: ${esc(t.provider)}</p>` : ''}
    ${t.description ? `<p>${esc(t.description)}</p>` : ''}
    ${t.duration ? `<div class="field"><strong>Duration</strong>${esc(t.duration)}</div>` : ''}
    ${t.eligibility ? `<h2>Eligibility</h2><p>${esc(t.eligibility)}</p>` : ''}
    ${t.how_to_apply ? `<h2>How to Apply</h2><p>${esc(t.how_to_apply)}</p>` : ''}
    ${t.apply_url ? `<p><a href="${esc(t.apply_url)}" rel="noopener noreferrer">Apply now →</a></p>` : ''}
    <hr><p>Also see: <a href="/training">All free training</a> | <a href="/grants">UK grants</a></p>`

  const schema = [{
    '@context': 'https://schema.org', '@type': 'Article',
    headline: t.title, description: desc, url: canonical,
    publisher: { '@type': 'Organization', name: ORG, url: SITE + '/' },
    dateModified: t.last_updated || new Date().toISOString(), inLanguage: 'en-GB',
  }]

  return html({ title, description: desc, canonical, h1: t.title || 'Training',
    body, schema,
    crumbs: [{ name: 'Home', url: SITE+'/' }, { name: 'Training', url: SITE+'/training' }, { name: t.title || 'Training', url: canonical }] })
}

// ── Static pages ─────────────────────────────────────────────────────────────
function renderStatic(path) {
  const STATIC = {
    '/': {
      title: 'UK Funding Hub — Grants, Benefits & Loans Finder',
      description: 'Search thousands of UK government grants, startup funding, energy & housing schemes. Free real-time database. Find your funding now.',
      h1: 'UK Government Grants, Benefits & Loans Finder',
      crumbs: [{ name: 'Home', url: SITE+'/' }],
      body: `
        <p>UK Funding Hub is a free, independent platform providing a real-time database of UK government grants, benefits, loans, housing schemes and free training. Updated every hour from GOV.UK.</p>
        <h2>Find Funding By Category</h2>
        <ul>
          <li><a href="/grants">Government Grants</a> — business, energy, community grants</li>
          <li><a href="/benefits">Benefits</a> — Universal Credit, PIP, Child Benefit</li>
          <li><a href="/loans">Government Loans</a> — Start Up Loans, Recovery Loan Scheme</li>
          <li><a href="/housing">Housing Schemes</a> — Help to Buy, Disabled Facilities Grant</li>
          <li><a href="/training">Free Training</a> — Skills Bootcamps, adult education</li>
        </ul>
        <h2>Expert Guides</h2>
        <ul>
          <li><a href="/guides/eco4-grant-guide">ECO4 Grant 2025 — Free Insulation & Heating</a></li>
          <li><a href="/guides/universal-credit-guide">Universal Credit Complete Guide 2025</a></li>
          <li><a href="/guides/startup-grants-uk">UK Startup Grants 2025</a></li>
          <li><a href="/guides/household-support-fund">Household Support Fund 2025</a></li>
          <li><a href="/guides/disabled-facilities-grant">Disabled Facilities Grant — Up to £30,000</a></li>
          <li><a href="/guides/council-tax-reduction">Council Tax Reduction Guide 2025</a></li>
          <li><a href="/guides/innovate-uk-grants">Innovate UK Grants — How to Apply</a></li>
          <li><a href="/guides/carers-allowance-guide">Carer's Allowance 2025 Complete Guide</a></li>
          <li><a href="/guides/free-childcare-guide">Free Childcare & 30 Hours Guide</a></li>
          <li><a href="/guides/uk-energy-grants-2025">UK Energy Grants 2025 — Full List</a></li>
        </ul>`,
      schema: [{
        '@context': 'https://schema.org', '@type': 'WebSite', name: ORG,
        url: SITE+'/', inLanguage: 'en-GB',
        potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: SITE+'/grants?q={search_term_string}' }, 'query-input': 'required name=search_term_string' },
      }],
    },
    '/about': {
      title: 'About UK Funding Hub — Team, Data Sources & Editorial Standards',
      description: 'Meet the editorial team behind UK Funding Hub and learn how we verify UK grant, benefit and loan data against GOV.UK and official sources.',
      h1: 'About UK Funding Hub',
      crumbs: [{ name: 'Home', url: SITE+'/' }, { name: 'About', url: SITE+'/about' }],
      body: `<p>UK Funding Hub is managed by an independent editorial team. All data verified against GOV.UK, DWP, Innovate UK.</p>
        <h2>Our Team</h2>
        <ul>
          <li><strong>Sarah Mitchell, MSc Public Policy</strong> — Lead Data Researcher, 8 years UK public funding experience</li>
          <li><strong>James Okafor, BA Economics</strong> — Business Funding Analyst, former UKRI grant assessor</li>
          <li><strong>Priya Sharma, CIMA</strong> — Benefits & Housing Editor, 6 years welfare policy experience</li>
        </ul>`,
      schema: [],
    },
    '/guides': {
      title: 'UK Funding Guides 2025 — Expert Grant & Benefit Guides',
      description: 'Step-by-step expert guides on UK government grants, benefits and financial support schemes.',
      h1: 'UK Funding Expert Guides',
      crumbs: [{ name: 'Home', url: SITE+'/' }, { name: 'Guides', url: SITE+'/guides' }],
      body: `<ul>
        <li><a href="/guides/eco4-grant-guide">ECO4 Grant 2025</a></li>
        <li><a href="/guides/universal-credit-guide">Universal Credit Guide 2025</a></li>
        <li><a href="/guides/startup-grants-uk">UK Startup Grants 2025</a></li>
        <li><a href="/guides/household-support-fund">Household Support Fund 2025</a></li>
        <li><a href="/guides/disabled-facilities-grant">Disabled Facilities Grant 2025</a></li>
        <li><a href="/guides/council-tax-reduction">Council Tax Reduction Guide</a></li>
        <li><a href="/guides/innovate-uk-grants">Innovate UK Grants Guide</a></li>
        <li><a href="/guides/carers-allowance-guide">Carer's Allowance Guide</a></li>
        <li><a href="/guides/free-childcare-guide">Free Childcare Guide</a></li>
        <li><a href="/guides/uk-energy-grants-2025">UK Energy Grants 2025</a></li>
      </ul>`,
      schema: [],
    },
  }

  // Guide articles
  const GUIDE_CONTENT = {
    '/guides/eco4-grant-guide': { title: 'ECO4 Grant 2025: How to Get Free Insulation & Heating', desc: 'The ECO4 grant funds free home insulation and heating upgrades for eligible UK households. No upfront cost.', h1: 'ECO4 Grant 2025: Free Insulation & Heating', author: 'Priya Sharma', date: '2025-12-10T09:00:00+00:00' },
    '/guides/universal-credit-guide': { title: 'Universal Credit 2025: Complete Guide', desc: 'How to claim Universal Credit, eligibility, payment timescales, work allowance and taper rate explained.', h1: 'Universal Credit 2025: Complete Guide', author: 'Priya Sharma', date: '2025-11-20T09:00:00+00:00' },
    '/guides/startup-grants-uk': { title: 'UK Startup Grants 2025: Free Business Funding', desc: 'Innovate UK, Growth Hub grants and government startup funding you never repay. Find and apply in 2025.', h1: 'UK Startup Grants 2025', author: 'James Okafor', date: '2026-01-05T09:00:00+00:00' },
    '/guides/household-support-fund': { title: 'Household Support Fund 2025: Emergency Help With Food & Bills', desc: 'Council grants for families struggling with food, energy and essential costs. Extended through 2025.', h1: 'Household Support Fund 2025', author: 'Priya Sharma', date: '2026-02-01T09:00:00+00:00' },
    '/guides/disabled-facilities-grant': { title: 'Disabled Facilities Grant 2025: Up to £30,000 for Home Adaptations', desc: 'Government grant for home adaptations including ramps, stairlifts and wet rooms for disabled people.', h1: 'Disabled Facilities Grant 2025: Up to £30,000', author: 'Sarah Mitchell', date: '2026-01-18T09:00:00+00:00' },
    '/guides/council-tax-reduction': { title: 'Council Tax Reduction 2025: How to Get a Discount or Exemption', desc: 'Millions of UK households are eligible for council tax reduction but never claim. This guide explains eligibility and how to apply.', h1: 'Council Tax Reduction 2025: Full Guide', author: 'Priya Sharma', date: '2026-03-01T09:00:00+00:00' },
    '/guides/innovate-uk-grants': { title: 'Innovate UK Grants 2025: How to Apply for Business R&D Funding', desc: 'Innovate UK funds thousands of UK businesses with SMART grants, KTPs and sector-specific R&D funding. Learn how to apply.', h1: 'Innovate UK Grants 2025: How to Apply', author: 'James Okafor', date: '2026-03-10T09:00:00+00:00' },
    '/guides/carers-allowance-guide': { title: "Carer's Allowance 2025: Eligibility, Rates & How to Claim", desc: "Carer's Allowance is £81.90 per week for people who spend 35+ hours caring for someone. Find out if you qualify.", h1: "Carer's Allowance 2025: Complete Guide", author: 'Priya Sharma', date: '2026-02-15T09:00:00+00:00' },
    '/guides/free-childcare-guide': { title: 'Free Childcare 2025: 15 & 30 Hours Guide for UK Families', desc: 'Up to 30 hours of free childcare per week for eligible families in England. Expanded in 2024 to cover more age groups.', h1: 'Free Childcare 2025: 15 & 30 Hours Guide', author: 'Sarah Mitchell', date: '2026-02-20T09:00:00+00:00' },
    '/guides/uk-energy-grants-2025': { title: 'UK Energy Grants 2025: Full List of Free Home Energy Schemes', desc: 'ECO4, Great British Insulation Scheme, Warm Home Discount and more. Full list of UK energy grants available in 2025.', h1: 'UK Energy Grants 2025: Full List', author: 'Sarah Mitchell', date: '2026-03-05T09:00:00+00:00' },
  }

  if (GUIDE_CONTENT[path]) {
    const g = GUIDE_CONTENT[path]
    const canonical = SITE + path
    const slugPart = path.replace('/guides/', '')
    return html({
      title: g.title + ' — UK Funding Hub',
      description: g.desc,
      canonical,
      h1: g.h1,
      crumbs: [{ name: 'Home', url: SITE+'/' }, { name: 'Guides', url: SITE+'/guides' }, { name: g.h1, url: canonical }],
      body: `<p>${esc(g.desc)}</p><p>Read the <a href="/guides/${slugPart}">full guide →</a></p><hr><p><a href="/guides">← All guides</a> | <a href="/tools/eligibility">Check eligibility</a></p>`,
      schema: [{
        '@context': 'https://schema.org', '@type': 'BlogPosting',
        headline: g.title, description: g.desc, url: canonical,
        author: { '@type': 'Person', name: g.author, url: SITE+'/about' },
        publisher: { '@type': 'Organization', name: ORG, url: SITE+'/' },
        datePublished: g.date, dateModified: '2026-04-06T09:00:00+00:00',
        image: SITE+'/og-image.png', inLanguage: 'en-GB',
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2 + p'] },
      }],
    })
  }

  const s = STATIC[path]
  if (!s) return null
  const canonical = SITE + (path === '/' ? '' : path) || SITE+'/'
  return html({ ...s, canonical })
}

// ── Main handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  try {
    const urlObj = new URL(req.url, `https://${req.headers.host}`)
    // Strip the /api/bot-render prefix to get the actual page path
    let path = urlObj.pathname.replace(/^\/api\/bot-render/, '') || '/'

    // Safety: reject paths with obvious injection attempts
    if (path.includes('..') || path.length > 200) {
      return res.status(400).send('Bad request')
    }

    let pageHtml = null

    // ── Dynamic routes ──────────────────────────────────────────────────────
    const grantMatch    = path.match(/^\/grant\/([^/]+)$/)
    const benefitMatch  = path.match(/^\/benefit\/([^/]+)$/)
    const loanMatch     = path.match(/^\/loan\/([^/]+)$/)
    const housingMatch  = path.match(/^\/housing\/([^/]+)$/)
    const trainingMatch = path.match(/^\/training\/([^/]+)$/)

    if (grantMatch)    pageHtml = await renderGrant(grantMatch[1])
    else if (benefitMatch)  pageHtml = await renderBenefit(benefitMatch[1])
    else if (loanMatch)     pageHtml = await renderLoan(loanMatch[1])
    else if (housingMatch)  pageHtml = await renderHousing(housingMatch[1])
    else if (trainingMatch) pageHtml = await renderTraining(trainingMatch[1])
    else pageHtml = renderStatic(path)

    // 404 fallback
    if (!pageHtml) {
      pageHtml = html({
        title: 'Page Not Found — UK Funding Hub',
        description: 'The page you requested could not be found.',
        canonical: SITE + path,
        h1: 'Page Not Found',
        crumbs: [{ name: 'Home', url: SITE+'/' }],
        body: `<p>This page could not be found. <a href="/">Return to UK Funding Hub →</a></p>`,
        schema: [],
      })
      res.setHeader('X-Robots-Tag', 'noindex')
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
    res.setHeader('X-Prerendered', 'true')
    res.status(200).send(pageHtml)
  } catch (err) {
    console.error('bot-render error:', err)
    res.status(500).send('<h1>Error generating page</h1>')
  }
}
