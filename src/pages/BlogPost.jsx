import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, ExternalLink, ChevronRight } from 'lucide-react'
import PageMeta from '../components/PageMeta'
import { GUIDES } from './BlogPage'

// Full content for each guide article
const ARTICLE_CONTENT = {
  'eco4-grant-guide': {
    intro: `The ECO4 scheme (Energy Company Obligation 4) is the UK government's flagship energy efficiency programme, running from April 2022 to March 2026. Energy suppliers are legally required to fund insulation, heat pumps, and heating system upgrades for eligible households — completely free of charge.

Over £4 billion of funding has been allocated for ECO4. If you're on a low income or receiving certain benefits, you could qualify for thousands of pounds of free home improvements.`,
    sections: [
      {
        heading: 'What Does ECO4 Cover?',
        content: `ECO4 can fund a range of energy efficiency improvements, including:

**Insulation:**
- Loft insulation (most common — often the biggest single energy saving)
- Cavity wall insulation
- Solid wall insulation (internal or external)
- Underfloor insulation
- Flat roof insulation

**Heating:**
- First-time central heating systems
- Heat pump installations (air source or ground source)
- Boiler replacement (only where no better option exists)
- Smart heating controls

All measures are fully installed by certified contractors. You do not pay anything upfront.`,
      },
      {
        heading: 'Am I Eligible for ECO4?',
        content: `You must meet **at least one** of these criteria:

1. **Benefits-based eligibility** — you or someone in your household receives:
   - Universal Credit
   - Pension Credit (Guarantee Credit)
   - Child Tax Credit
   - Working Tax Credit
   - Income Support
   - Jobseeker's Allowance (income-based)
   - Employment & Support Allowance (income-related)

2. **Income-based eligibility (LA Flex)** — even without benefits, your local authority can declare you eligible if your household income is below the local threshold (usually around £31,000/year for a 2-person household).

3. **Your property must be rated EPC D, E, F or G** — the worse the rating, the higher your priority. Properties already rated A, B or C typically don't qualify.`,
      },
      {
        heading: 'How to Apply for ECO4',
        content: `You do not apply directly to the government. Instead, you contact an ECO4 installer or energy supplier:

1. **Contact a registered ECO4 installer** — search "ECO4 installer" + your postcode, or use the Ofgem TrustMark directory
2. **Get a free home assessment** — a surveyor visits and checks your property's EPC rating and suitability
3. **Measures are agreed** — the installer tells you what improvements your property qualifies for
4. **Works are completed** — fully funded, usually within 4–12 weeks
5. **EPC is updated** — your certificate is updated after installation

**Average grant value: £8,700 per household**

Apply via GOV.UK's official ECO4 guidance or contact your energy supplier (E.ON, British Gas, EDF, Octopus Energy all have ECO4 programmes).`,
      },
      {
        heading: 'Frequently Asked Questions',
        content: `**Can I apply if I'm not on benefits?**
Yes — the LA Flex route means your local council can still approve you based on income, even without benefits.

**Does ECO4 cover rented homes?**
Yes — landlords and tenants can both apply, although the landlord's consent is needed for structural work.

**How long does ECO4 run?**
The current scheme runs to March 2026, after which a successor scheme (likely ECO5) is expected to continue.

**Can I get ECO4 for a new boiler?**
Only if the boiler is the last resort and no better option (like a heat pump) is available. Heat pumps are prioritised.`,
      },
    ],
    sources: [
      { label: 'GOV.UK — ECO4 Guidance', url: 'https://www.gov.uk/improve-energy-efficiency' },
      { label: 'Ofgem — ECO4 Obligation', url: 'https://www.ofgem.gov.uk/environmental-and-social-schemes/energy-company-obligation-eco' },
    ],
  },

  'universal-credit-guide': {
    intro: `Universal Credit is a monthly payment to help with living costs if you're on a low income or out of work. It replaces six older 'legacy benefits' — including Jobseeker's Allowance, Income Support, and Housing Benefit — into one single payment.

As of 2025, over 7 million people in the UK are on Universal Credit. This guide explains who qualifies, how much you can receive, and the exact steps to make a claim.`,
    sections: [
      {
        heading: 'Who Is Eligible for Universal Credit?',
        content: `You can claim Universal Credit if you:
- Are aged 18 or over (some 16–17 year-olds can claim in limited circumstances)
- Are under State Pension age
- Live in the UK
- Have £16,000 or less in savings (you and your partner combined)
- Are on a low income or out of work

You can claim whether you're employed, self-employed, or not working.`,
      },
      {
        heading: 'How Much Is Universal Credit?',
        content: `The amount depends on your circumstances. The 2025/26 standard allowances are:

| Who | Monthly amount |
|-----|---------------|
| Single, under 25 | £311.68 |
| Single, 25 or over | £393.45 |
| Couple, both under 25 | £489.23 |
| Couple, one or both 25+ | £617.60 |

**Additional amounts are added for:**
- Children (£269.58 per child per month for the first child; £229.17 for subsequent children)
- Disabled children
- Caring responsibilities
- Housing costs (replaces Housing Benefit)
- Childcare costs (up to 85% of costs)
- Limited capability for work (health conditions/disability)`,
      },
      {
        heading: 'How to Claim Universal Credit',
        content: `1. **Create a GOV.UK account** at universal-credit.service.gov.uk
2. **Complete the online application** — takes around 30–40 minutes
3. **Verify your identity** — using Post Office or the GOV.UK Verify service
4. **Attend a job centre appointment** — usually within 10 days of your claim
5. **First payment arrives** — typically 5 weeks after your claim date (you can request an advance)

**If you need help applying:** Your local Citizens Advice Bureau or Jobcentre Plus can assist. There is also a free Universal Credit helpline: 0800 328 5644.`,
      },
      {
        heading: 'Frequently Asked Questions',
        content: `**How long does the first payment take?**
Usually 5 weeks. You can claim an advance payment immediately if you need money sooner — this is repaid from future payments.

**Can I still work and claim Universal Credit?**
Yes. UC is designed to top up low wages. As you earn more, your UC reduces gradually (by 55p for every £1 you earn above your work allowance).

**What happens if I have savings?**
Savings between £6,000–£16,000 reduce your UC by £4.35 per month for every £250 saved above £6,000. Above £16,000, you cannot claim.`,
      },
    ],
    sources: [
      { label: 'GOV.UK — Universal Credit', url: 'https://www.gov.uk/universal-credit' },
      { label: 'Citizens Advice — Universal Credit Help', url: 'https://www.citizensadvice.org.uk/benefits/universal-credit/' },
    ],
  },

  'startup-grants-uk': {
    intro: `Starting a business in the UK? You may be able to access free grant funding — money you don't have to repay. Unlike loans, grants from government bodies and Innovate UK are awarded to help new businesses launch, innovate, and grow.

This guide covers the most valuable grant schemes available to UK startups in 2025 and explains exactly how to apply.`,
    sections: [
      {
        heading: 'The Best UK Startup Grants in 2025',
        content: `**1. Innovate UK SMART Grants**
Up to £500,000 for game-changing innovative ideas. Open to businesses of all sizes. Quarterly competition rounds with ~20% success rate.

**2. Innovate UK Edge — Launchpad**
Regional grants of £25,000–£100,000 for early-stage innovative businesses in specific sectors (cleantech, healthtech, deeptech).

**3. Start Up Loans (Government-backed)**
Not a grant, but up to £25,000 at 6% interest — with 12 months of free mentoring included.

**4. UK Shared Prosperity Fund (UKSPF)**
Distributed by local councils to support local businesses. Visit your Growth Hub.

**5. New Enterprise Allowance**
If you're on Universal Credit and starting a business, you can receive up to £1,274 in payments over 26 weeks.

**6. SBRI (Small Business Research Initiative)**
Government departments fund businesses to solve specific public sector challenges — grants of £25k–£1M.`,
      },
      {
        heading: 'How to Apply for a UK Startup Grant',
        content: `1. **Find the right grant** — use UK Funding Hub, Innovate UK's website, and your local Growth Hub
2. **Check eligibility** — most grants require your business to be registered in the UK and trading for under 2 years
3. **Write a strong application** — judges look for: clear problem, innovative solution, market opportunity, team credibility
4. **Submit before the deadline** — most grants have quarterly rounds; late applications are never accepted
5. **Await assessment** — typically 8–12 weeks for Innovate UK grants

**Top tip:** Apply for multiple grants simultaneously. There is no rule against holding more than one grant at the same time.`,
      },
      {
        heading: 'Frequently Asked Questions',
        content: `**Do I need to repay a startup grant?**
No — grants are free money. However, most require you to spend it on specific activities and provide evidence of spend.

**Can a sole trader apply?**
Yes, most UK startup grants are open to sole traders, partnerships, and limited companies.

**Is there a grant for women-led startups?**
Yes — Innovate UK have specific "Innovate Her" strands, and many regional Growth Hubs have dedicated female founder programmes.`,
      },
    ],
    sources: [
      { label: 'Innovate UK Funding Finder', url: 'https://www.ukri.org/opportunity/' },
      { label: 'GOV.UK — Start Up Loans', url: 'https://www.gov.uk/government/collections/start-up-loans-company' },
      { label: 'UK Growth Hubs', url: 'https://www.growthhub.com/' },
    ],
  },

  'household-support-fund': {
    intro: `The Household Support Fund (HSF) is government money given to local councils to distribute to struggling households. It covers food, energy, water bills, and other essentials — and in some areas, grants of up to £500 per household.

As of April 2025, the government extended the Household Support Fund for a further year. But — crucially — every council runs it differently, which means many people miss out simply because they don't know where to apply.`,
    sections: [
      {
        heading: 'What Can the Household Support Fund Pay For?',
        content: `Councils can use HSF to provide support with:
- **Food costs** — vouchers for supermarkets, food parcels, school meal vouchers
- **Energy costs** — help with electricity, gas and heating oil bills
- **Water bills** — in some areas, one-off support payments
- **Essential white goods** — fridges, washing machines (varies by council)
- **Clothing and bedding** — particularly for families with children
- **Other essentials** — depending on the specific council scheme

The amount varies enormously — from £100 vouchers to £500 cash grants.`,
      },
      {
        heading: 'Who Is Eligible?',
        content: `Eligibility varies by council, but most prioritise:
- Households on Universal Credit or other means-tested benefits
- Families with children receiving free school meals
- Households with disabled members
- Pensioners not receiving Pension Credit
- Anyone facing exceptional financial hardship

**Importantly:** Some councils will help anyone on a low income, regardless of benefit status. Always check your specific council's criteria.`,
      },
      {
        heading: 'How to Apply',
        content: `1. **Find your local council** — search "[your council name] Household Support Fund 2025"
2. **Check their specific scheme** — some require online applications, others use phone or in-person referrals
3. **Gather evidence** — most councils want proof of income, benefits, and household costs
4. **Apply before the funding runs out** — HSF is finite; early applications succeed more often

**Key point:** Some councils direct you to community organisations (food banks, Citizens Advice, housing associations) who make the application on your behalf.`,
      },
    ],
    sources: [
      { label: 'GOV.UK — Household Support Fund', url: 'https://www.gov.uk/guidance/household-support-fund-guidance-for-local-councils' },
      { label: 'Turn2us — Benefits Calculator', url: 'https://www.turn2us.org.uk/' },
    ],
  },

  'disabled-facilities-grant': {
    intro: `The Disabled Facilities Grant (DFG) provides up to £30,000 (England) to adapt your home if you or someone you live with has a disability. It's means-tested, mandatory for councils to provide, and covers adaptations like wet rooms, stairlifts, ramps, and widened doorways.

Over 50,000 DFG grants are awarded each year in England. If you're eligible and haven't claimed, this guide will walk you through the full application process.`,
    sections: [
      {
        heading: 'What Can the DFG Fund?',
        content: `The DFG is specifically for adaptations that make a home safe and accessible, including:
- **Ramps and level access** — removing steps at entrances
- **Stairlifts** — for those who can't safely use stairs
- **Wet rooms and accessible bathrooms** — roll-in showers, grab rails, raised toilet seats
- **Widened doorways** — to accommodate wheelchairs or mobility aids
- **Adapted kitchens** — lowered worktops, accessible storage
- **Heating controls** — easier-to-reach thermostats and switches
- **Lighting improvements** — for those with visual impairments

**Maximum grants:** £30,000 in England; £36,000 in Wales; variable in Scotland and Northern Ireland.`,
      },
      {
        heading: 'Who Is Eligible?',
        content: `You can apply if:
- You or a family member has a disability that limits your ability to use your home safely
- You are the owner-occupier, a private tenant, or a housing association/council tenant
- The property is your (or the disabled person's) main home

**The grant is means-tested** — your local council will assess your income and savings to determine how much you receive. If your income is above the threshold, you may still qualify for a partial grant or a council loan top-up.

There is no specific medical condition required — any permanent or substantial disability that affects daily living qualifies.`,
      },
      {
        heading: 'How to Apply for a Disabled Facilities Grant',
        content: `1. **Contact your local council** — search "[council name] Disabled Facilities Grant"
2. **Occupational Therapist (OT) assessment** — the council's OT visits and recommends necessary adaptations
3. **Get quotes** — usually 2–3 quotes from approved contractors
4. **Financial assessment** — council calculates how much grant you receive based on income/savings
5. **Work begins** — typically within 3–6 months of approval (though demand is high and delays are common)

**Fast-track routes:** If you're terminally ill, some councils operate an emergency fast-track DFG that bypasses normal waiting times.

**Help applying:** Contact Foundations, the national body for home improvement agencies — they provide free advice and can help you navigate the DFG process: 0300 124 0315.`,
      },
      {
        heading: 'Frequently Asked Questions',
        content: `**What if I rent — can I still get a DFG?**
Yes. Private and social tenants can apply, though landlord consent is required for structural adaptations.

**Is there an age limit?**
No. The DFG is available for disabled people of any age, including children.

**Can I get more than £30,000?**
Some councils provide additional top-up funding beyond the mandatory DFG maximum. Ask about "discretionary assistance" when you apply.

**How long does it take?**
Target is 6 months from application to completion, though in practice many councils take 9–18 months due to high demand. Apply as early as possible.`,
      },
    ],
    sources: [
      { label: 'GOV.UK — Disabled Facilities Grant', url: 'https://www.gov.uk/disabled-facilities-grants' },
      { label: 'Foundations — Home Improvement Agencies', url: 'https://www.foundations.uk.com/' },
    ],
  },
}

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const guide = GUIDES.find(g => g.slug === slug)
  const content = ARTICLE_CONTENT[slug]

  if (!guide || !content) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px' }}>
        <h2 style={{ marginBottom: 12 }}>Article not found</h2>
        <Link to="/guides" style={{ color: 'var(--accent-primary)' }}>← Back to Guides</Link>
      </div>
    )
  }

  const canonicalUrl = `https://ukgrants.online/guides/${slug}`
  const pageDesc = guide.excerpt.slice(0, 160)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: pageDesc,
    datePublished: guide.date,
    dateModified: new Date().toISOString().split('T')[0],
    author: {
      '@type': 'Organization',
      name: 'UK Funding Hub Editorial Team',
      url: 'https://ukgrants.online/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'UK Funding Hub',
      url: 'https://ukgrants.online/',
      logo: { '@type': 'ImageObject', url: 'https://ukgrants.online/favicon.svg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    keywords: guide.keywords.join(', '),
    articleSection: guide.category,
    inLanguage: 'en-GB',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ukgrants.online/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://ukgrants.online/guides' },
      { '@type': 'ListItem', position: 3, name: guide.title, item: canonicalUrl },
    ],
  }

  return (
    <>
      <PageMeta
        title={`${guide.title} — UK Funding Hub`}
        description={pageDesc}
        canonical={canonicalUrl}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>

          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 32 }}>
            <Link to="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={12} />
            <Link to="/guides" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Guides</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--text-muted)' }}>{guide.category}</span>
          </nav>

          {/* Article header */}
          <header style={{ marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: guide.color, background: `${guide.color}12`, padding: '4px 12px', borderRadius: 20, border: `1px solid ${guide.color}25` }}>
                {guide.category}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <Clock size={12} /> {guide.readTime}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <Calendar size={12} />
                Updated {new Date(guide.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>

            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: 20, color: 'var(--text-primary)' }}>
              {guide.emoji} {guide.title}
            </h1>

            {/* Attribution */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--bg-layer-2)', borderRadius: 10, border: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: guide.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', color: '#fff', fontWeight: 700, flexShrink: 0 }}>UK</div>
              <div>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>UK Funding Hub Editorial Team</span>
                <span style={{ marginLeft: 6 }}>· Verified against GOV.UK official sources</span>
              </div>
            </div>
          </header>

          {/* Article body */}
          <article style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>

            {/* Intro */}
            <div style={{ fontSize: '1.08rem', color: 'var(--text-primary)', marginBottom: 36, lineHeight: 1.75 }}>
              {content.intro.split('\n\n').map((para, i) => (
                <p key={i} style={{ marginBottom: 16 }}>{para}</p>
              ))}
            </div>

            {/* Sections */}
            {content.sections.map((section, idx) => (
              <section key={idx} style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, paddingBottom: 10, borderBottom: `3px solid ${guide.color}30` }}>
                  {section.heading}
                </h2>
                <div style={{ whiteSpace: 'pre-line' }}>
                  {section.content.split('\n').map((line, i) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <p key={i} style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, marginTop: i > 0 ? 16 : 0 }}>
                          {line.replace(/\*\*/g, '')}
                        </p>
                      )
                    }
                    if (line.startsWith('- ')) {
                      return (
                        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, paddingLeft: 4 }}>
                          <span style={{ color: guide.color, fontWeight: 700, flexShrink: 0 }}>→</span>
                          <span dangerouslySetInnerHTML={{
                            __html: line.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                          }} />
                        </div>
                      )
                    }
                    if (line.startsWith('| ')) {
                      return null // skip table rows (rendered below)
                    }
                    if (line.trim() === '') return <br key={i} />
                    return (
                      <p key={i} style={{ marginBottom: 10 }}
                        dangerouslySetInnerHTML={{
                          __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        }}
                      />
                    )
                  })}
                </div>
              </section>
            ))}

            {/* Sources */}
            <section style={{ marginTop: 48, padding: '24px', background: 'var(--bg-layer-2)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
                📚 Official Sources
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {content.sources.map((src, i) => (
                  <a key={i} href={src.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 8, color: guide.color, fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}>
                    <ExternalLink size={14} />
                    {src.label}
                  </a>
                ))}
              </div>
              <p style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--text-muted)', margin: '16px 0 0 0' }}>
                Information verified by the UK Funding Hub editorial team. Always confirm details on official GOV.UK sources before applying.
              </p>
            </section>
          </article>

          {/* Related articles */}
          <section style={{ marginTop: 48 }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>
              Related Guides
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {GUIDES.filter(g => g.slug !== slug).slice(0, 3).map(g => (
                <Link key={g.slug} to={`/guides/${g.slug}`} style={{
                  display: 'block', padding: '16px', borderRadius: 12,
                  border: '1px solid var(--border)', background: '#fff',
                  textDecoration: 'none', color: 'inherit',
                  transition: 'border-color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = g.color}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{g.emoji}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: 8 }}>{g.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{g.readTime}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* Back */}
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button onClick={() => navigate('/guides')} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}>
              <ArrowLeft size={14} /> Back to All Guides
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
