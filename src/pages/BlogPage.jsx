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
]

export default function BlogPage() {
  return (
    <>
      <PageMeta
        title="UK Funding Guides — Expert Grant & Benefit Advice"
        description="Step-by-step guides on UK government grants, benefits and funding schemes. Learn how to apply for ECO4, Universal Credit, startup grants, and more."
        canonical="https://ukgrants.online/guides"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
        {/* Header */}
        <section style={{ padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.2)', borderRadius: 20, padding: '6px 16px', marginBottom: 20 }}>
            <BookOpen size={14} style={{ color: 'var(--accent-primary)' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-primary)' }}>FREE GUIDES</span>
          </div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
            UK Funding Guides
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 560, margin: '0 auto' }}>
            Expert, up-to-date guides on UK government grants, benefits and funding schemes — written in plain English.
          </p>
        </section>

        {/* Articles grid */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {GUIDES.map(g => (
              <article key={g.slug} style={{
                background: '#fff',
                borderRadius: 20,
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
              >
                {/* Card top bar */}
                <div style={{ height: 6, background: `linear-gradient(90deg, ${g.color}, ${g.color}88)` }} />

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Category + emoji */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: g.color, background: `${g.color}12`, padding: '4px 12px', borderRadius: 20, border: `1px solid ${g.color}25` }}>
                      {g.category}
                    </span>
                    <span style={{ fontSize: '1.8rem' }}>{g.emoji}</span>
                  </div>

                  <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: 12, lineHeight: 1.4, color: 'var(--text-primary)' }}>
                    {g.title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                    {g.excerpt}
                  </p>

                  {/* Meta */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      <Clock size={13} />
                      {g.readTime}
                      <span style={{ margin: '0 4px' }}>·</span>
                      {new Date(g.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <Link to={`/guides/${g.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 4, color: g.color, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                      Read <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

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
