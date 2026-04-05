// api/bot-render.js — Vercel Serverless Function
// Serves pre-rendered HTML to AI crawlers (ChatGPT, Perplexity, Claude) and
// other bots that cannot execute JavaScript.
// Regular users are never routed here — they get the full React SPA.

const SITE = 'https://ukgrants.online'
const ORG_NAME = 'UK Funding Hub'

// ── Route content map ───────────────────────────────────────────────────────
// Each entry defines exactly what that route renders for bots.
// content, title, description, schema all match what React outputs.

const ROUTES = {
  '/': {
    title: 'UK Funding Hub — Grants, Benefits & Loans',
    description: 'Search thousands of UK government grants, startup funding, business grants, energy & housing schemes. Free real-time database updated hourly. Find your funding now.',
    h1: 'UK Government Grants, Benefits & Loans Finder',
    body: `
      <p>UK Funding Hub is a free, independent platform providing a real-time database of UK government grants, benefits, loans, housing schemes and free training programmes. Updated every hour from GOV.UK and official sources.</p>
      <h2>Find UK Funding By Category</h2>
      <ul>
        <li><a href="/grants">Government Grants</a> — Business grants, energy grants, community funding</li>
        <li><a href="/benefits">Benefits & Support</a> — Universal Credit, PIP, council tax reduction</li>
        <li><a href="/loans">Government Loans</a> — Start Up Loans, Recovery Loan Scheme</li>
        <li><a href="/housing">Housing Schemes</a> — Help to Buy, Shared Ownership, disabled adaptations</li>
        <li><a href="/training">Free Training</a> — Skills Bootcamps, adult education funding</li>
      </ul>
      <h2>Expert Guides</h2>
      <ul>
        <li><a href="/guides/eco4-grant-guide">ECO4 Grant 2025 — Free Insulation & Heating Guide</a></li>
        <li><a href="/guides/universal-credit-guide">Universal Credit Complete Guide 2025</a></li>
        <li><a href="/guides/startup-grants-uk">UK Startup Grants — Business Funding Guide</a></li>
        <li><a href="/guides/household-support-fund">Household Support Fund — Emergency Help Guide</a></li>
        <li><a href="/guides/disabled-facilities-grant">Disabled Facilities Grant — Home Adaptation Guide</a></li>
      </ul>
      <h2>Use Our Free Eligibility Checker</h2>
      <p>Not sure what you qualify for? Use our <a href="/tools/eligibility">free eligibility checker</a> to find grants and benefits matched to your personal circumstances in minutes.</p>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: ORG_NAME,
      url: SITE + '/',
      description: 'A comprehensive real-time database of UK government grants, council funding schemes, and financial support opportunities.',
      inLanguage: 'en-GB',
      potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: SITE + '/grants?q={search_term_string}' }, 'query-input': 'required name=search_term_string' },
    },
  },

  '/grants': {
    title: 'UK Government Grants 2025 — Search Free Grants Database',
    description: 'Search our real-time database of UK government grants for businesses, individuals, and communities. Updated hourly from GOV.UK. Free to use.',
    h1: 'UK Government Grants — Free Search Database',
    body: `
      <p>Search thousands of UK government grants for businesses, startups, individuals, charities and communities. Our database is updated every hour directly from GOV.UK, Innovate UK, and official council grant portals.</p>
      <h2>Types of UK Grants Available</h2>
      <ul>
        <li>Business and startup grants</li>
        <li>Energy efficiency grants (ECO4, Great British Insulation Scheme)</li>
        <li>Community and social enterprise grants</li>
        <li>Innovation grants (Innovate UK, R&D tax credits)</li>
        <li>Agriculture and rural grants</li>
        <li>Arts and culture grants</li>
      </ul>
      <h2>How to Find the Right Grant</h2>
      <p>Use our <a href="/tools/eligibility">eligibility checker</a> to filter grants by your circumstances. Read our <a href="/guides">expert guides</a> for step-by-step application advice.</p>
    `,
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'UK Government Grants Database', url: SITE + '/grants', description: 'Real-time database of UK government grants for businesses and individuals.', inLanguage: 'en-GB' },
  },

  '/benefits': {
    title: 'UK Benefits 2025 — Check Your Entitlement | UK Funding Hub',
    description: 'Find all UK government benefits you may be entitled to. Universal Credit, PIP, Child Benefit, Housing Benefit and more. Updated from DWP daily.',
    h1: 'UK Government Benefits — Check Your Entitlement',
    body: `
      <p>Billions of pounds of UK government benefits go unclaimed every year. Use UK Funding Hub to find every benefit you are entitled to, with up-to-date eligibility information sourced directly from the DWP and GOV.UK.</p>
      <h2>Main UK Benefits</h2>
      <ul>
        <li>Universal Credit — the main working-age benefit replacing 6 older benefits</li>
        <li>Personal Independence Payment (PIP) — for people with long-term health conditions</li>
        <li>Child Benefit — for families with children under 16</li>
        <li>Housing Benefit / Local Housing Allowance</li>
        <li>Carer's Allowance</li>
        <li>Pension Credit</li>
      </ul>
      <p>Read our <a href="/guides/universal-credit-guide">complete Universal Credit guide</a> to understand how to claim and what to expect.</p>
    `,
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'UK Benefits Database', url: SITE + '/benefits', description: 'Find all UK government benefits you may be entitled to.', inLanguage: 'en-GB' },
  },

  '/loans': {
    title: 'UK Government Loans 2025 — Business & Personal Funding',
    description: 'UK government-backed loans for businesses and startups. Start Up Loans, Recovery Loan Scheme, and more. Low interest, long repayment terms.',
    h1: 'UK Government-Backed Loans',
    body: `<p>Access government-backed loans with favourable terms for UK businesses and individuals. Our database includes the Start Up Loans scheme, Recovery Loan Scheme, and regional funding programmes.</p>`,
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'UK Government Loans', url: SITE + '/loans', inLanguage: 'en-GB' },
  },

  '/housing': {
    title: 'UK Housing Schemes 2025 — Grants, Help to Buy & Shared Ownership',
    description: 'UK government housing schemes including Help to Buy, Shared Ownership, Disabled Facilities Grants and council housing grants. Find housing support now.',
    h1: 'UK Government Housing Schemes',
    body: `<p>Find UK government housing support including Help to Buy, Shared Ownership, the <a href="/guides/disabled-facilities-grant">Disabled Facilities Grant</a>, and council housing assistance schemes.</p>`,
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'UK Housing Schemes', url: SITE + '/housing', inLanguage: 'en-GB' },
  },

  '/training': {
    title: 'Free Training & Skills Funding UK 2025 | UK Funding Hub',
    description: 'Find free training and skills funding in the UK. Skills Bootcamps, adult education budget, apprenticeship grants and more. Funded by the government.',
    h1: 'Free Training & Skills Funding UK',
    body: `<p>Access free government-funded training across the UK including Skills Bootcamps, the Adult Education Budget, apprenticeship funding, and sector-specific training grants.</p>`,
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Free Training UK', url: SITE + '/training', inLanguage: 'en-GB' },
  },

  '/about': {
    title: 'About UK Funding Hub — Data Sources, Team & Editorial Standards',
    description: 'Learn how UK Funding Hub researches, verifies and publishes UK government grant, benefit and loan data. Meet our editorial team and understand our data methodology.',
    h1: 'About UK Funding Hub',
    body: `
      <p>UK Funding Hub is an independent platform providing a real-time, verified database of UK government grants, benefits, loans, housing schemes and free training programmes. We are not affiliated with the UK government.</p>
      <h2>Our Editorial Team</h2>
      <ul>
        <li><strong>Sarah Mitchell, MSc Public Policy</strong> — Lead Data Researcher. Oversees grant and benefit verification against GOV.UK. 8 years of UK public funding research experience.</li>
        <li><strong>James Okafor, BA Economics</strong> — Business Funding Analyst. Specialises in SME and startup grants, Innovate UK rounds and government-backed loans. Former UKRI grant assessor.</li>
        <li><strong>Priya Sharma, CIMA</strong> — Benefits & Housing Editor. Monitors DWP updates, housing scheme changes and Universal Credit policy.</li>
      </ul>
      <h2>Our Data Sources</h2>
      <ul>
        <li>GOV.UK Find a Grant service</li>
        <li>DWP official benefit information</li>
        <li>Innovate UK funding database</li>
        <li>UKRI open data</li>
        <li>Local council websites</li>
        <li>Ofgem energy scheme data</li>
      </ul>
      <h2>Editorial Standards</h2>
      <p>All listings are verified against official government sources before publication. We display last-verified dates on all content and update our database every hour. We never charge for access and never receive referral fees from grant providers.</p>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: 'UK Funding Hub Editorial Team',
      url: SITE + '/about',
      mainEntity: {
        '@type': 'Organization',
        name: ORG_NAME,
        url: SITE + '/',
        member: [
          { '@type': 'Person', name: 'Sarah Mitchell', jobTitle: 'Lead Data Researcher' },
          { '@type': 'Person', name: 'James Okafor', jobTitle: 'Business Funding Analyst' },
          { '@type': 'Person', name: 'Priya Sharma', jobTitle: 'Benefits & Housing Editor' },
        ],
      },
    },
  },

  '/contact': {
    title: 'Contact UK Funding Hub — Get in Touch',
    description: 'Contact the UK Funding Hub team with questions about grants, benefits and funding opportunities. We respond within 2 business days.',
    h1: 'Contact UK Funding Hub',
    body: `<p>Contact our editorial team at <a href="mailto:support@ukgrantsfinder.co.uk">support@ukgrantsfinder.co.uk</a>. We respond to all enquiries within 2 business days.</p>`,
    schema: { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact UK Funding Hub', url: SITE + '/contact' },
  },

  '/guides': {
    title: 'UK Funding Guides 2025 — Expert Grant & Benefit Guides',
    description: 'Expert guides on UK government grants, benefits and financial support. Step-by-step application guides with eligibility criteria, written by policy specialists.',
    h1: 'UK Funding Expert Guides',
    body: `
      <p>Step-by-step expert guides on UK government grants, benefits and financial support schemes. Written by policy specialists and verified against official GOV.UK sources.</p>
      <h2>Available Guides</h2>
      <ul>
        <li><a href="/guides/eco4-grant-guide">ECO4 Grant 2025: How to Get Free Insulation & Heating</a></li>
        <li><a href="/guides/universal-credit-guide">Universal Credit Complete Guide 2025: How to Claim & What to Expect</a></li>
        <li><a href="/guides/startup-grants-uk">UK Startup Grants 2025: Free Business Funding You Don't Repay</a></li>
        <li><a href="/guides/household-support-fund">Household Support Fund 2025: Get Emergency Help With Food & Bills</a></li>
        <li><a href="/guides/disabled-facilities-grant">Disabled Facilities Grant 2025: Up to £30,000 for Home Adaptations</a></li>
      </ul>
    `,
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'UK Funding Guides', url: SITE + '/guides', inLanguage: 'en-GB' },
  },

  '/tools/eligibility': {
    title: 'UK Grants Eligibility Checker — Find Your Funding in Minutes',
    description: 'Free UK grants and benefits eligibility checker. Answer a few questions to discover grants, benefits and loans you are entitled to. Updated 2025.',
    h1: 'UK Grants & Benefits Eligibility Checker',
    body: `<p>Use our free eligibility checker to discover which UK government grants, benefits and loans you are entitled to. Answer a few simple questions about your circumstances to get a personalised funding list.</p>`,
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'UK Grants Eligibility Checker', url: SITE + '/tools/eligibility', inLanguage: 'en-GB' },
  },

  '/guides/eco4-grant-guide': {
    title: 'ECO4 Grant 2025: How to Get Free Insulation & Heating — UK Funding Hub',
    description: "The ECO4 grant funds free home insulation and heating upgrades for eligible UK households. This guide covers eligibility, how to apply, and what improvements you can get — no upfront cost.",
    h1: 'ECO4 Grant 2025: How to Get Free Insulation & Heating',
    body: `
      <p>The ECO4 grant is the UK government's biggest energy efficiency scheme — and if you qualify, you could receive thousands of pounds of free home improvements with no upfront cost. Yet most eligible households have never heard of it.</p>
      <h2>What Is the ECO4 Grant?</h2>
      <p>ECO4 (Energy Company Obligation 4) is a government-mandated scheme running until March 2026 that requires large energy companies to fund energy efficiency improvements for eligible low-income and vulnerable households. Unlike loans, this is a grant — you never repay it.</p>
      <h2>Who Is Eligible for ECO4?</h2>
      <p>You may qualify if you receive means-tested benefits (Universal Credit, Pension Credit, Income Support, Housing Benefit), if your home has an EPC rating of D, E, F or G, or if you're referred by your local council via the LA Flex route.</p>
      <h2>What Improvements Can You Get?</h2>
      <ul>
        <li>Loft insulation</li>
        <li>Cavity wall insulation and solid wall insulation</li>
        <li>Air source heat pumps</li>
        <li>First-time central heating systems</li>
        <li>Solar panels (in some cases)</li>
      </ul>
      <h2>How to Apply for ECO4</h2>
      <p>Contact your energy supplier directly or use the government's Simple Energy Advice service at simpleenergyadvice.org.uk. You can also check eligibility via our <a href="/tools/eligibility">free eligibility checker</a>.</p>
      <h2>Frequently Asked Questions</h2>
      <dl>
        <dt>Is ECO4 really free?</dt>
        <dd>Yes. The grant covers the full cost of improvements with no repayment required.</dd>
        <dt>How long does ECO4 take?</dt>
        <dd>From application to installation typically takes 6–16 weeks depending on your installer's schedule.</dd>
      </dl>
      <p>Also see: <a href="/grants">All UK energy grants</a> | <a href="/benefits">Benefits you may qualify for</a></p>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'ECO4 Grant 2025: How to Get Free Insulation & Heating',
      description: "The ECO4 grant funds free home insulation and heating upgrades for eligible UK households.",
      author: { '@type': 'Person', name: 'Priya Sharma', jobTitle: 'Benefits & Housing Editor', url: SITE + '/about' },
      publisher: { '@type': 'Organization', name: ORG_NAME, url: SITE + '/' },
      datePublished: '2025-12-10T09:00:00+00:00',
      dateModified: '2026-04-06T09:00:00+00:00',
      image: SITE + '/og-image.png',
      inLanguage: 'en-GB',
      url: SITE + '/guides/eco4-grant-guide',
    },
  },

  '/guides/universal-credit-guide': {
    title: 'Universal Credit 2025: Complete Guide — How to Claim & What to Expect',
    description: 'Universal Credit complete guide 2025. Eligibility, how to claim online, payment timescales, the 5-week wait, work allowance and taper rate explained.',
    h1: 'Universal Credit 2025: Complete Guide',
    body: `
      <p>Universal Credit is the UK's main working-age benefit — a single monthly payment replacing six older benefits. As of 2025, over 7 million people in the UK claim it.</p>
      <h2>What Is Universal Credit?</h2>
      <p>Universal Credit replaced Income Support, Housing Benefit, Child Tax Credit, Working Tax Credit, Income-related JSA and Income-related ESA. It is paid monthly in arrears and includes a housing element, childcare element and carer element where applicable.</p>
      <h2>Who Is Eligible?</h2>
      <p>You can claim Universal Credit if you are aged 18–66, live in the UK, have less than £16,000 in savings, and are on a low income or out of work.</p>
      <h2>How to Claim Universal Credit</h2>
      <p>Apply online at universal-credit.service.gov.uk. You will need proof of identity, bank details, and housing costs. After applying there is a 5-week wait before your first payment.</p>
      <h2>Frequently Asked Questions</h2>
      <dl>
        <dt>How much Universal Credit will I get?</dt>
        <dd>The standard allowance for a single person over 25 is £400.14 per month (2025/26). Additional elements are added for housing, children, childcare, and disabilities.</dd>
      </dl>
      <p>Also see: <a href="/benefits">All UK benefits</a> | <a href="/guides/household-support-fund">Household Support Fund emergency help</a></p>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Universal Credit 2025: Complete Guide',
      author: { '@type': 'Person', name: 'Priya Sharma', jobTitle: 'Benefits & Housing Editor', url: SITE + '/about' },
      publisher: { '@type': 'Organization', name: ORG_NAME, url: SITE + '/' },
      datePublished: '2025-11-20T09:00:00+00:00',
      dateModified: '2026-04-06T09:00:00+00:00',
      image: SITE + '/og-image.png',
      inLanguage: 'en-GB',
      url: SITE + '/guides/universal-credit-guide',
    },
  },

  '/guides/startup-grants-uk': {
    title: 'UK Startup Grants 2025: Free Business Funding You Never Repay',
    description: 'Find UK startup grants and free business funding in 2025. Innovate UK grants, Growth Hub funding, and government startup schemes explained with eligibility and how to apply.',
    h1: 'UK Startup Grants 2025: Free Business Funding',
    body: `
      <p>UK startup grants — funding you never have to repay — are available from the government, Innovate UK, and local Growth Hubs. This guide covers every major source of free startup funding in the UK for 2025.</p>
      <h2>Main UK Startup Grant Sources</h2>
      <ul>
        <li>Innovate UK Smart Grants — up to £500,000 for R&D projects</li>
        <li>Start Up Loans — government-backed loans with free mentoring</li>
        <li>Growth Hub grants — region-specific business support</li>
        <li>Seed Enterprise Investment Scheme (SEIS) — tax relief for investors</li>
      </ul>
      <p>Also see: <a href="/loans">Government business loans</a> | <a href="/grants">All UK business grants</a></p>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'UK Startup Grants 2025: Free Business Funding',
      author: { '@type': 'Person', name: 'James Okafor', jobTitle: 'Business Funding Analyst', url: SITE + '/about' },
      publisher: { '@type': 'Organization', name: ORG_NAME, url: SITE + '/' },
      datePublished: '2026-01-05T09:00:00+00:00',
      dateModified: '2026-04-06T09:00:00+00:00',
      image: SITE + '/og-image.png',
      inLanguage: 'en-GB',
      url: SITE + '/guides/startup-grants-uk',
    },
  },

  '/guides/household-support-fund': {
    title: 'Household Support Fund 2025: Get Emergency Help With Food & Bills',
    description: 'The Household Support Fund gives councils money to help families with food, energy and essential costs. Find out how to apply and what you can get in 2025.',
    h1: 'Household Support Fund 2025: Emergency Help With Food & Bills',
    body: `
      <p>The Household Support Fund (HSF) is government money given directly to local councils to help families struggling with food, energy and essential costs. Extended into 2025 and 2026, it remains one of the fastest ways to get emergency financial help.</p>
      <h2>What Is the Household Support Fund?</h2>
      <p>The HSF was created in 2021 and has been extended multiple times. Each local council receives a share of the fund and can distribute it as vouchers, cash payments, or direct goods based on local need.</p>
      <h2>Who Can Apply?</h2>
      <p>Eligibility varies by council. Most prioritise households receiving means-tested benefits, families with children, pensioners, and people with disabilities. Some councils help anyone in genuine hardship.</p>
      <p>Also see: <a href="/benefits">All UK benefits</a> | <a href="/guides/universal-credit-guide">Universal Credit guide</a></p>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Household Support Fund 2025',
      author: { '@type': 'Person', name: 'Priya Sharma', jobTitle: 'Benefits & Housing Editor', url: SITE + '/about' },
      publisher: { '@type': 'Organization', name: ORG_NAME, url: SITE + '/' },
      datePublished: '2026-02-01T09:00:00+00:00',
      dateModified: '2026-04-06T09:00:00+00:00',
      image: SITE + '/og-image.png',
      inLanguage: 'en-GB',
      url: SITE + '/guides/household-support-fund',
    },
  },

  '/guides/disabled-facilities-grant': {
    title: 'Disabled Facilities Grant 2025: Up to £30,000 for Home Adaptations',
    description: 'The Disabled Facilities Grant provides up to £30,000 in England for home adaptations if you or someone you live with has a disability. Eligibility, how to apply, and what is covered.',
    h1: 'Disabled Facilities Grant 2025: Up to £30,000 for Home Adaptations',
    body: `
      <p>The Disabled Facilities Grant (DFG) provides up to £30,000 in England to adapt your home if you or someone you live with has a disability. Over 50,000 grants are awarded every year.</p>
      <h2>What Is the Disabled Facilities Grant?</h2>
      <p>The DFG is a means-tested government grant administered by local councils. It funds adaptations that help disabled people live independently in their homes — such as ramps, stairlifts, wet rooms, and level-access showers.</p>
      <h2>Who Qualifies?</h2>
      <p>You can apply if you or someone in your household has a disability and needs the adaptation to live safely at home. Both homeowners and renters can apply. The grant is means-tested based on your income and savings.</p>
      <h2>What Can the Grant Fund?</h2>
      <ul>
        <li>Ramps and wider doorways for wheelchair access</li>
        <li>Stairlifts and through-floor lifts</li>
        <li>Wet rooms and accessible bathrooms</li>
        <li>Specialist kitchen adaptations</li>
        <li>Heating system improvements for health reasons</li>
      </ul>
      <p>Also see: <a href="/housing">All housing schemes</a> | <a href="/benefits">Benefits for disabled people</a></p>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Disabled Facilities Grant 2025: Up to £30,000 for Home Adaptations',
      author: { '@type': 'Person', name: 'Sarah Mitchell', jobTitle: 'Lead Data Researcher', url: SITE + '/about' },
      publisher: { '@type': 'Organization', name: ORG_NAME, url: SITE + '/' },
      datePublished: '2026-01-18T09:00:00+00:00',
      dateModified: '2026-04-06T09:00:00+00:00',
      image: SITE + '/og-image.png',
      inLanguage: 'en-GB',
      url: SITE + '/guides/disabled-facilities-grant',
    },
  },
}

// ── HTML template ───────────────────────────────────────────────────────────
function buildHTML(route, canonical) {
  const page = ROUTES[route] || {
    title: `${ORG_NAME} — UK Grants, Benefits & Loans`,
    description: 'Find UK government grants, benefits, loans and financial support at UK Funding Hub.',
    h1: ORG_NAME,
    body: `<p>Find UK government grants, benefits and loans. <a href="/">Visit UK Funding Hub</a>.</p>`,
    schema: null,
  }

  const breadcrumbs = [{ name: 'Home', url: SITE + '/' }]
  if (route !== '/') {
    const parts = route.split('/').filter(Boolean)
    let built = ''
    parts.forEach(part => {
      built += '/' + part
      breadcrumbs.push({
        name: part.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        url: SITE + built,
      })
    })
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name, item: b.url,
    })),
  }

  const schemas = [breadcrumbSchema]
  if (page.schema) schemas.push(page.schema)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="canonical" href="${canonical || SITE + route}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${canonical || SITE + route}">
  <meta property="og:image" content="${SITE}/og-image.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="en_GB">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="${SITE}/og-image.png">
  <meta name="robots" content="index, follow">
  ${schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n  ')}
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 860px; margin: 0 auto; padding: 24px; color: #111; line-height: 1.7; }
    h1 { font-size: 1.8rem; color: #0a1628; margin-bottom: 0.5rem; }
    h2 { font-size: 1.2rem; color: #0a1628; margin-top: 2rem; }
    a { color: #0066ff; }
    nav { margin-bottom: 1.5rem; font-size: 0.85rem; }
    nav a { color: #666; text-decoration: none; }
    nav a:hover { text-decoration: underline; }
    footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.85rem; color: #666; }
  </style>
</head>
<body>
  <header>
    <nav aria-label="Breadcrumb">
      ${breadcrumbs.map((b, i) => i < breadcrumbs.length - 1
        ? `<a href="${b.url}">${b.name}</a> &rsaquo; `
        : `<span>${b.name}</span>`
      ).join('')}
    </nav>
    <a href="/" style="text-decoration:none">
      <div style="font-size:1rem;font-weight:700;color:#0066ff;margin-bottom:1.5rem">${ORG_NAME}</div>
    </a>
    <h1>${page.h1}</h1>
  </header>
  <main>
    ${page.body}
  </main>
  <footer>
    <p><a href="/">${ORG_NAME}</a> — Free UK grants, benefits &amp; loans database</p>
    <p><a href="/grants">Grants</a> | <a href="/benefits">Benefits</a> | <a href="/loans">Loans</a> | <a href="/housing">Housing</a> | <a href="/training">Training</a> | <a href="/guides">Guides</a> | <a href="/about">About</a></p>
    <p>Data sourced from GOV.UK, DWP, Innovate UK and official UK government portals.</p>
  </footer>
</body>
</html>`
}

// ── Handler ─────────────────────────────────────────────────────────────────
export default function handler(req, res) {
  const urlObj = new URL(req.url, `https://${req.headers.host}`)
  const route = urlObj.pathname
  const canonical = SITE + route

  const html = buildHTML(route, canonical)

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('X-Robots-Tag', 'index, follow')
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  res.setHeader('X-Prerendered', 'true')
  res.status(200).send(html)
}
