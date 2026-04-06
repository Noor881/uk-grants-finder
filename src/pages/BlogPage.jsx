import { Link } from 'react-router-dom'
import { ChevronRight, BookOpen, Clock, ArrowRight } from 'lucide-react'
import PageMeta from '../components/PageMeta'

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'UK Funding Hub Guides',
  url: 'https://ukgrants.online/guides',
  description: 'Expert guides on UK government grants, benefits, and funding schemes — updated regularly.',
  publisher: {
    '@type': 'Organization',
    name: 'UK Funding Hub',
    url: 'https://ukgrants.online/',
  },
}

export const GUIDES = [
  {
    slug: 'eco4-grant-guide',
    title: 'ECO4 Grant 2025: How to Get Free Insulation & Heating',
    excerpt: 'The ECO4 scheme funds free loft insulation, cavity wall insulation, heat pumps and boiler replacements for eligible UK households. Find out if you qualify and how to apply in 2025.',
    category: 'Energy Grants',
    readTime: '7 min read',
    date: '2025-12-10',
    keywords: ['ECO4 grant', 'free insulation', 'energy grants UK', 'ECO4 2025'],
    emoji: '🏠',
    color: '#0066ff',
  },
  {
    slug: 'universal-credit-guide',
    title: 'Universal Credit 2025: Full Eligibility Guide & How to Claim',
    excerpt: 'Universal Credit replaces 6 old benefits into one monthly payment. This guide explains who qualifies, how much you can get, and exactly how to make a claim on GOV.UK.',
    category: 'Benefits',
    readTime: '9 min read',
    date: '2025-11-20',
    keywords: ['Universal Credit', 'Universal Credit 2025', 'how to claim Universal Credit'],
    emoji: '🏛️',
    color: '#ffb300',
  },
  {
    slug: 'startup-grants-uk',
    title: 'UK Startup Grants 2025: Free Money for New Businesses',
    excerpt: 'From Innovate UK SMART grants to local Growth Hub funding, there are over 40 grant schemes available for UK startups and small businesses. Here\'s how to find and apply for them.',
    category: 'Business Grants',
    readTime: '8 min read',
    date: '2026-01-05',
    keywords: ['startup grants UK', 'UK business grants 2025', 'small business grants UK', 'Innovate UK'],
    emoji: '💼',
    color: '#7c3aed',
  },
  {
    slug: 'household-support-fund',
    title: 'Household Support Fund 2025: How to Get Emergency Council Help',
    excerpt: 'The Household Support Fund gives local councils money to help families with food, energy and essential costs. Every council runs it differently — find out how to claim in your area.',
    category: 'Cost of Living',
    readTime: '6 min read',
    date: '2026-02-01',
    keywords: ['Household Support Fund', 'council help 2025', 'cost of living grants UK'],
    emoji: '💳',
    color: '#26c6da',
  },
  {
    slug: 'disabled-facilities-grant',
    title: 'Disabled Facilities Grant: Up to £30,000 for Home Adaptations',
    excerpt: 'The Disabled Facilities Grant (DFG) provides up to £30,000 to adapt your home if you or someone you live with is disabled. Learn who qualifies and how councils assess applications.',
    category: 'Disability Support',
    readTime: '7 min read',
    date: '2026-01-18',
    keywords: ['Disabled Facilities Grant', 'DFG', 'home adaptation grant UK', 'disability grants UK'],
    emoji: '♿',
    color: '#ec407a',
  },
  {
    slug: 'council-tax-reduction',
    title: 'Council Tax Reduction 2025: How to Get a Discount or Exemption',
    excerpt: 'Millions of UK households are eligible for council tax reduction — including people on low incomes, Universal Credit claimants, disabled people, and full-time students. This guide explains exactly how to claim.',
    category: 'Cost of Living',
    readTime: '6 min read',
    date: '2026-03-01',
    keywords: ['council tax reduction', 'council tax discount UK', 'council tax exemption 2025'],
    emoji: '🏘️',
    color: '#00897b',
  },
  {
    slug: 'innovate-uk-grants',
    title: 'Innovate UK Grants 2025: How to Apply for Business R&D Funding',
    excerpt: 'Innovate UK funds thousands of UK businesses with SMART grants, Knowledge Transfer Partnerships and sector-specific R&D funding. This guide covers eligibility, timelines and how to write a winning application.',
    category: 'Business Grants',
    readTime: '8 min read',
    date: '2026-03-10',
    keywords: ['Innovate UK grants', 'Innovate UK SMART grant', 'R&D grants UK', 'business innovation funding UK'],
    emoji: '🔬',
    color: '#1565c0',
  },
  {
    slug: 'carers-allowance-guide',
    title: "Carer's Allowance 2025: Eligibility, Rates & How to Claim",
    excerpt: "Carer's Allowance is £81.90 per week for people who provide at least 35 hours of unpaid care. Millions of eligible carers never claim. This guide covers who qualifies, how much you get, and how to apply on GOV.UK.",
    category: 'Benefits',
    readTime: '7 min read',
    date: '2026-02-15',
    keywords: ["carer's allowance", "carer's allowance 2025", 'unpaid carer benefits UK'],
    emoji: '🤝',
    color: '#e65100',
  },
  {
    slug: 'free-childcare-guide',
    title: 'Free Childcare 2025: 15 & 30 Hours for UK Families Explained',
    excerpt: 'Working parents in England can claim up to 30 hours of free childcare per week. Expanded in 2024, free childcare now covers children from 9 months old. This guide covers eligibility, how to apply and what counts.',
    category: 'Family Support',
    readTime: '7 min read',
    date: '2026-02-20',
    keywords: ['free childcare UK', '30 hours free childcare', 'free childcare 2025'],
    emoji: '👶',
    color: '#6a1b9a',
  },
  {
    slug: 'uk-energy-grants-2025',
    title: 'UK Energy Grants 2025: Full List of Free Home Energy Schemes',
    excerpt: 'ECO4, Great British Insulation Scheme, Warm Home Discount, and more. This is the complete list of UK government energy grants available in 2025, including who qualifies and how to apply for each.',
    category: 'Energy Grants',
    readTime: '9 min read',
    date: '2026-03-05',
    keywords: ['UK energy grants 2025', 'free energy grants UK', 'home energy grants 2025', 'Warm Home Discount'],
    emoji: '⚡',
    color: '#f9a825',
  },
  {
    slug: 'london-grants-guide',
    title: 'London Grants 2025: Government Funding Available in the Capital',
    excerpt: 'A complete guide to government grants, business funding, and financial support available exclusively to London residents and businesses in 2025 — from GLA grants to borough-level schemes.',
    category: 'City Guides',
    readTime: '8 min read',
    date: '2026-04-01',
    keywords: ['London grants 2025', 'London business grants', 'GLA grants', 'London council grants'],
    emoji: '🏙️',
    color: '#0066ff',
  },
  {
    slug: 'manchester-grants-guide',
    title: 'Manchester Grants 2025: Funding for Businesses & Residents',
    excerpt: 'All government grants, council schemes, and financial support available in Greater Manchester in 2025 — including ECO4, GM Business Fund, and Manchester City Council grants.',
    category: 'City Guides',
    readTime: '7 min read',
    date: '2026-04-01',
    keywords: ['Manchester grants 2025', 'Greater Manchester business grants', 'Manchester City Council grants'],
    emoji: '🐝',
    color: '#f4a300',
  },
  {
    slug: 'birmingham-grants-guide',
    title: 'Birmingham Grants 2025: Council Funding for Residents & Businesses',
    excerpt: 'Birmingham City Council grants, West Midlands Combined Authority funding, and government schemes available to Birmingham residents and businesses in 2025.',
    category: 'City Guides',
    readTime: '7 min read',
    date: '2026-04-02',
    keywords: ['Birmingham grants 2025', 'Birmingham City Council grants', 'West Midlands grants'],
    emoji: '🏭',
    color: '#d32f2f',
  },
  {
    slug: 'scotland-grants-guide',
    title: 'Scotland Grants 2025: Scottish Government Funding You Can Claim',
    excerpt: 'Scottish Government grants, Business Gateway funding, Skills Development Scotland, and HEEPS energy grants available to Scottish residents and businesses in 2025.',
    category: 'City Guides',
    readTime: '8 min read',
    date: '2026-04-02',
    keywords: ['Scotland grants 2025', 'Scottish Government grants', 'Business Gateway Scotland', 'HEEPS Scotland'],
    emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    color: '#1a237e',
  },
  {
    slug: 'bristol-grants-guide',
    title: 'Bristol Grants 2025: Funding for Bristol Businesses & Residents',
    excerpt: 'Bristol City Council grants, West of England Growth Hub funding, and regional financial support schemes available in Bristol in 2025.',
    category: 'City Guides',
    readTime: '7 min read',
    date: '2026-04-03',
    keywords: ['Bristol grants 2025', 'Bristol business grants', 'West of England grants', 'Bristol City Council funding'],
    emoji: '🌉',
    color: '#00897b',
  },
  {
    slug: 'spring-budget-2026',
    title: 'Spring Budget 2026: Every Grant & Benefit Change Explained',
    excerpt: 'The Spring Budget 2026 confirmed ECO4 extension, record £2.5bn Innovate UK funding, NLW rise to £12.60, and all benefit uprating from April 2026. Full breakdown of every change that affects your money.',
    category: '2026 Updates',
    readTime: '9 min read',
    date: '2026-04-01',
    keywords: ['Spring Budget 2026', 'Budget 2026 benefits', 'Budget 2026 grants', 'UK Budget April 2026'],
    emoji: '🏛️',
    color: '#c62828',
  },
  {
    slug: 'universal-credit-rates-2026',
    title: 'Universal Credit Rates April 2026 — Every New Amount Listed',
    excerpt: 'Universal Credit uprated by 1.7% from 6 April 2026. New standard allowance: £393.45/month for single claimants aged 25+. Full table of every UC element, work allowances, and what changed from 2025.',
    category: '2026 Updates',
    readTime: '7 min read',
    date: '2026-04-06',
    keywords: ['Universal Credit rates 2026', 'UC rates April 2026', 'Universal Credit 2026/27', 'UC amount 2026'],
    emoji: '💷',
    color: '#1565c0',
  },
  {
    slug: 'national-living-wage-2026',
    title: 'National Living Wage 2026: New £12.60 Rate & What It Means',
    excerpt: 'The National Living Wage rose to £12.60/hour on 1 April 2026 — £770/year more for full-time workers. This guide covers all 2026 minimum wage rates, UC impact, and employer obligations.',
    category: '2026 Updates',
    readTime: '6 min read',
    date: '2026-04-01',
    keywords: ['National Living Wage 2026', 'minimum wage 2026 UK', 'NLW April 2026', 'living wage increase 2026'],
    emoji: '💰',
    color: '#2e7d32',
  },
  {
    slug: 'renters-rights-act-2026',
    title: "Renters' Rights Act 2026: Section 21 Abolished — What Renters Need to Know",
    excerpt: "The Renters' Rights Act 2026 ends no-fault evictions permanently. Section 21 is illegal. One rent increase per year maximum. New pet rights and discrimination protections for benefit claimants. Full guide for tenants.",
    category: 'Housing',
    readTime: '8 min read',
    date: '2026-04-03',
    keywords: ["Renters' Rights Act 2026", 'Section 21 abolished 2026', 'renters rights UK 2026', 'no fault eviction ban'],
    emoji: '🔑',
    color: '#6a1b9a',
  },
  {
    slug: 'uk-business-grants-2026',
    title: 'UK Business Grants Spring 2026: New Funding Rounds Now Open',
    excerpt: 'Spring 2026 business grant opportunities: Innovate UK SMART grants, Green Industries Growth Accelerator (up to £20m), Investment Zone grants (up to £500k), and more. Full list with how to apply.',
    category: 'Business Grants',
    readTime: '8 min read',
    date: '2026-04-04',
    keywords: ['UK business grants 2026', 'business grants spring 2026', 'Innovate UK 2026', 'GIGA grant 2026'],
    emoji: '🚀',
    color: '#e65100',
  },
  {
    slug: 'leeds-grants-2026',
    title: 'Leeds Grants 2026: West Yorkshire Funding for Residents & Businesses',
    excerpt: 'West Yorkshire Combined Authority grants, Leeds City Council support, and Innovation Arc funding available to Leeds residents and businesses in 2026. Free ECO4 insulation, startup grants, and Investment Zone opportunities.',
    category: 'City Guides',
    readTime: '8 min read',
    date: '2026-04-05',
    keywords: ['Leeds grants 2026', 'West Yorkshire grants 2026', 'Leeds business grants', 'Leeds City Council support 2026'],
    emoji: '🦉',
    color: '#1565c0',
  },
  {
    slug: 'liverpool-grants-2026',
    title: "Liverpool Grants 2026: Freeport, Combined Authority & Resident Funding",
    excerpt: 'Liverpool City Region Freeport tax benefits, LCR Growth Platform business grants, ECO4 for Liverpool residents, and Combined Authority funding — all available in 2026. One of the UK\'s best-funded regions.',
    category: 'City Guides',
    readTime: '8 min read',
    date: '2026-04-05',
    keywords: ['Liverpool grants 2026', 'Liverpool City Region grants', 'Liverpool business grants', 'Liverpool Freeport grants'],
    emoji: '⚓',
    color: '#c62828',
  },
  {
    slug: 'newcastle-north-east-grants-2026',
    title: 'Newcastle Grants 2026: North East MCA & Investment Zone Funding',
    excerpt: 'The new North East Combined Authority, Dogger Bank offshore wind grants, Newcastle City Council support, and Investment Zone funding available in 2026. Guide to every grant for Newcastle and North East residents and businesses.',
    category: 'City Guides',
    readTime: '8 min read',
    date: '2026-04-05',
    keywords: ['Newcastle grants 2026', 'North East grants 2026', 'North East Combined Authority grants', 'Newcastle business grants 2026'],
    emoji: '⚡',
    color: '#37474f',
  },
  {
    slug: 'cardiff-wales-grants-2026',
    title: "Cardiff & Wales Grants 2026: Welsh Government & Devolved Funding",
    excerpt: 'Welsh Government Warm Homes Programme, Business Wales grants, Discretionary Assistance Fund, free prescriptions, and Cardiff Council schemes — Wales has some of the UK\'s most generous grants in 2026.',
    category: 'City Guides',
    readTime: '9 min read',
    date: '2026-04-04',
    keywords: ['Wales grants 2026', 'Cardiff grants 2026', 'Welsh Government grants 2026', 'Business Wales 2026'],
    emoji: '🐉',
    color: '#2e7d32',
  },
  {
    slug: 'sheffield-yorkshire-grants-2026',
    title: 'Sheffield Grants 2026: South Yorkshire Investment Zone & SYMCA Funding',
    excerpt: 'South Yorkshire Investment Zone grants up to £500k, SYMCA business support, Sheffield AMRC innovation funding, and ECO4 for Sheffield residents. Full guide to Sheffield and South Yorkshire grants in 2026.',
    category: 'City Guides',
    readTime: '7 min read',
    date: '2026-04-05',
    keywords: ['Sheffield grants 2026', 'South Yorkshire grants 2026', 'South Yorkshire Investment Zone', 'Sheffield business grants 2026'],
    emoji: '🔩',
    color: '#4e342e',
  },
]



export default function BlogPage() {
  const now = new Date()

  // Sort newest-first
  const sortedGuides = [...GUIDES].sort((a, b) => new Date(b.date) - new Date(a.date))

  // Featured = published 2+ days ago AND year is 2026
  const isFeatured = (g) => {
    const pub = new Date(g.date)
    const ageDays = (now - pub) / (1000 * 60 * 60 * 24)
    return g.date.startsWith('2026') && ageDays >= 2
  }

  // isNew = published within the last 2 days
  const isNew = (g) => {
    const pub = new Date(g.date)
    const ageDays = (now - pub) / (1000 * 60 * 60 * 24)
    return ageDays < 2
  }

  // 2026 articles pinned to top, rest below
  const articles2026 = sortedGuides.filter(g => g.date.startsWith('2026'))
  const olderArticles = sortedGuides.filter(g => !g.date.startsWith('2026'))
  const displayOrder = [...articles2026, ...olderArticles]

  return (
    <>
      <PageMeta
        title="UK Funding Guides 2026 — Expert Grant & Benefit Advice"
        description="Expert guides on UK government grants, benefits and funding schemes — updated for 2026. Spring Budget, UC rates, NLW, Renters Rights Act, ECO4 and city-specific funding guides."
        canonical="https://ukgrants.online/guides"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
        {/* Header */}
        <section style={{ padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.2)', borderRadius: 20, padding: '6px 16px', marginBottom: 20 }}>
            <BookOpen size={14} style={{ color: 'var(--accent-primary)' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-primary)' }}>FREE GUIDES — UPDATED 2026</span>
          </div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
            UK Funding Guides
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
            Expert, up-to-date guides on UK government grants, benefits and funding schemes — fully updated for 2026 with the latest rates, laws, and city funding.
          </p>
        </section>

        {/* Articles grid */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>

          {/* 2026 section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <span style={{
              fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em',
              color: '#c62828', background: 'rgba(198,40,40,0.08)',
              border: '1px solid rgba(198,40,40,0.25)', borderRadius: 20,
              padding: '4px 12px', textTransform: 'uppercase'
            }}>⚡ Latest 2026 Updates</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{articles2026.length} new guides this month</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {displayOrder.map(g => (
              <article key={g.slug} style={{
                background: '#fff',
                borderRadius: 20,
                border: isFeatured(g) ? `2px solid ${g.color}50` : '1px solid var(--border)',
                boxShadow: isFeatured(g) ? `0 4px 24px ${g.color}18` : 'var(--shadow)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 48px ${g.color}22` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = isFeatured(g) ? `0 4px 24px ${g.color}18` : 'var(--shadow)' }}
              >
                {/* Card top bar */}
                <div style={{ height: isFeatured(g) ? 8 : 6, background: `linear-gradient(90deg, ${g.color}, ${g.color}88)` }} />

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Category + emoji + badges */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: g.color, background: `${g.color}12`, padding: '4px 10px', borderRadius: 20, border: `1px solid ${g.color}25` }}>
                        {g.category}
                      </span>
                      {isFeatured(g) && (
                        <span style={{
                          fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em',
                          color: '#fff', background: `linear-gradient(135deg, ${g.color}, ${g.color}cc)`,
                          padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase'
                        }}>⭐ Featured</span>
                      )}
                      {isNew(g) && (
                        <span style={{
                          fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em',
                          color: '#fff', background: 'linear-gradient(135deg, #2e7d32, #43a047)',
                          padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase'
                        }}>🆕 New</span>
                      )}
                    </div>
                    <span style={{ fontSize: '1.8rem' }}>{g.emoji}</span>
                  </div>

                  <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: 12, lineHeight: 1.4, color: 'var(--text-primary)' }}>
                    {g.title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: 20, flex: 1 }}>
                    {g.excerpt}
                  </p>

                  {/* Meta */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${isFeatured(g) ? g.color + '20' : 'var(--border)'}`, paddingTop: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      <Clock size={13} />
                      {g.readTime}
                      <span style={{ margin: '0 4px' }}>·</span>
                      {new Date(g.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <Link to={`/guides/${g.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 4, color: g.color, fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}>
                      Read guide <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Older articles divider */}
          {olderArticles.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '40px 0 28px' }}>
              <span style={{
                fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em',
                color: 'var(--text-muted)', background: 'var(--bg-layer-2)',
                border: '1px solid var(--border)', borderRadius: 20,
                padding: '4px 12px', textTransform: 'uppercase'
              }}>📚 Earlier Guides</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>
          )}

          {/* CTA */}
          <div style={{ marginTop: 56, padding: '40px', background: 'linear-gradient(135deg, rgba(0,102,255,0.06), rgba(0,102,255,0.02))', borderRadius: 20, border: '1px solid rgba(0,102,255,0.15)', textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>
              Ready to find your funding?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 20, fontSize: '0.95rem' }}>
              Search our live database of thousands of UK grants, benefits and schemes.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/grants" style={{ padding: '12px 28px', borderRadius: 10, background: 'linear-gradient(135deg, #0066ff, #004ee0)', color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                Browse All Grants
              </Link>
              <Link to="/tools/eligibility" style={{ padding: '12px 28px', borderRadius: 10, border: '1px solid var(--border)', background: '#fff', color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
                Check My Eligibility
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
