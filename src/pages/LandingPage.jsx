import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import PageMeta from '../components/PageMeta'

export default function LandingPage() {
  const sections = [
    {
      to: '/grants',
      emoji: '💰',
      title: 'Grants',
      desc: 'Free government grants for individuals, councils, charities and small businesses.',
      color: '#0066ff',
      bg: 'rgba(0,102,255,0.08)',
      border: 'rgba(0,102,255,0.2)',
      tags: ['Energy', 'Business', 'Housing', 'Community'],
    },
    {
      to: '/benefits',
      emoji: '🏛️',
      title: 'Benefits',
      desc: 'Entitlements you can claim — Universal Credit, PIP, council tax support and more.',
      color: '#ffb300',
      bg: 'rgba(255,179,0,0.08)',
      border: 'rgba(255,179,0,0.2)',
      tags: ['Universal Credit', 'PIP', 'Housing Benefit', 'Child Benefit'],
    },
    {
      to: '/loans',
      emoji: '🏦',
      title: 'Business Loans',
      desc: 'Government-backed startup loans, recovery loans and SME finance schemes.',
      color: '#7c3aed',
      bg: 'rgba(124,58,237,0.08)',
      border: 'rgba(124,58,237,0.2)',
      tags: ['Start Up Loan', 'Recovery Loan', 'SME Finance'],
    },
    {
      to: '/housing',
      emoji: '🏠',
      title: 'Housing Schemes',
      desc: 'Help to Buy, ECO4, home improvement grants and council housing support.',
      color: '#00bfa5',
      bg: 'rgba(0,191,165,0.08)',
      border: 'rgba(0,191,165,0.2)',
      tags: ['ECO4', 'Help to Buy', 'Council Schemes'],
    },
    {
      to: '/training',
      emoji: '🎓',
      title: 'Training & Skills',
      desc: 'Free courses, Skills Bootcamps, apprenticeships and adult education funding.',
      color: '#ec407a',
      bg: 'rgba(236,64,122,0.08)',
      border: 'rgba(236,64,122,0.2)',
      tags: ['Skills Bootcamp', 'Apprenticeships', 'Free Courses'],
    },
    {
      to: '/tools/eligibility',
      emoji: '✅',
      title: 'Eligibility Checker',
      desc: 'Answer 5 quick questions and find out which schemes you qualify for right now.',
      color: '#26c6da',
      bg: 'rgba(38,198,218,0.08)',
      border: 'rgba(38,198,218,0.2)',
      tags: ['Quick Quiz', 'Personalised', 'Free'],
    },
  ]

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'UK Funding Hub — Find Grants, Benefits & Loans',
    url: 'https://ukgrants.online/',
    description: 'Search thousands of UK government grants, benefits, loans and housing schemes. Free, real-time database sourced from GOV.UK.',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.faq-answer', '.hero-summary', 'h2 + p'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'UK Funding Hub',
      url: 'https://ukgrants.online/',
    },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      <PageMeta
        title="UK Funding Hub — Find Grants, Benefits &amp; Loans"
        description="Search thousands of UK government grants, benefits, loans and housing schemes. Free, real-time database from GOV.UK. Find funding you qualify for now."
        canonical="https://ukgrants.online/"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      {/* ── HERO ── */}
      <section style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(0,102,255,0.04) 0%, transparent 100%)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <span style={{
            display: 'inline-block',
            padding: '5px 16px',
            borderRadius: 20,
            background: 'rgba(0,102,255,0.1)',
            color: 'var(--accent-primary)',
            fontSize: '0.82rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            marginBottom: 24,
          }}>
            🇬🇧 The UK's Free Funding Search Engine
          </span>

          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            marginBottom: 20,
          }}>
            Find UK Grants, Benefits
            <br />
            <span style={{ color: 'var(--accent-primary)' }}>& Funding Support</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: 36,
            maxWidth: 560,
            margin: '0 auto 36px',
          }}>
            Search thousands of government grants, benefits, loans, housing schemes
            and free training programmes — all in one place. Completely free.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/grants" style={{
              padding: '14px 32px',
              borderRadius: 12,
              background: 'linear-gradient(135deg, #0066ff, #004ee0)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(0,102,255,0.3)',
              transition: 'transform 0.2s',
            }}>
              🔍 Search Grants
            </Link>
            <Link to="/benefits" style={{
              padding: '14px 32px',
              borderRadius: 12,
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow)',
            }}>
              Check Benefits →
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 0,
        padding: '0',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-card)',
        flexWrap: 'wrap',
      }}>
        {[
          { num: '157+', label: 'Live Grants' },
          { num: '5',    label: 'Funding Types' },
          { num: 'Free', label: 'Always Free' },
          { num: '6hr',  label: 'Update Cycle' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '20px 40px',
            textAlign: 'center',
            borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            flex: '1 1 120px',
          }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: "'Outfit', sans-serif" }}>{s.num}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── SECTION CARDS ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 800,
          marginBottom: 8,
          color: 'var(--text-primary)',
        }}>
          What are you looking for?
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 48 }}>
          Choose a category to start your search
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {sections.map(s => (
            <Link
              key={s.to}
              to={s.to}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${s.border}`,
                borderRadius: 20,
                padding: '28px 28px 24px',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: 'var(--shadow)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = `0 8px 32px ${s.border}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: s.bg, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.6rem',
                }}>
                  {s.emoji}
                </div>
                <ChevronRight size={18} color={s.color} />
              </div>

              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: 6 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {s.tags.map(t => (
                  <span key={t} style={{
                    padding: '3px 10px',
                    borderRadius: 20,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    background: s.bg,
                    color: s.color,
                    border: `1px solid ${s.border}`,
                  }}>{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WHY USE US ── */}
      <section style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '60px 24px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 800,
            marginBottom: 40,
          }}>
            Why UK Funding Hub?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            {[
              { icon: '🔄', title: 'Auto-Updated', desc: 'Scraped every 6 hours from official UK government sources' },
              { icon: '🆓', title: 'Completely Free', desc: 'No sign-up, no paywall, no hidden fees — ever' },
              { icon: '🎯', title: 'All in One Place', desc: 'Grants, benefits, loans, housing and training together' },
              { icon: '🔍', title: 'Smart Search', desc: 'Filter by category, amount, location and eligibility' },
            ].map(f => (
              <div key={f.title} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── WHAT WE COVER (E-E-A-T + Keyword Depth) ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 20px' }}>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
          fontWeight: 800,
          textAlign: 'center',
          color: 'var(--text-primary)',
          marginBottom: 16,
        }}>
          The UK's Most Complete Free Funding Search
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 700, margin: '0 auto 48px', fontSize: '0.97rem' }}>
          UK Funding Hub aggregates grants, benefits, loans and housing schemes directly from GOV.UK, local councils, 
          and UK funding bodies — covering England, Scotland, Wales and Northern Ireland. 
          Our database is updated every 6 hours so you never miss a deadline. It's 100% free, with no sign-up required.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { title: '💰 Grants', items: ['Innovate UK Smart Grants', 'Community Grants', 'Energy Grants (ECO4)', 'Business Start-up Grants', 'Charity Funding'] },
            { title: '🏛️ Benefits', items: ['Universal Credit', 'Personal Independence Payment', 'Housing Benefit', 'Child Benefit', 'Council Tax Support'] },
            { title: '🏦 Loans & Finance', items: ['Start Up Loans (£500–£25,000)', 'Recovery Loan Scheme', 'British Business Bank', 'SME Finance', 'Invoice Finance'] },
            { title: '🏠 Housing', items: ['Help to Buy', 'Shared Ownership', 'ECO4 Heating Grants', 'Disabled Facilities Grant', 'Warm Home Discount'] },
          ].map(col => (
            <div key={col.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px 24px' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 12, color: 'var(--text-primary)' }}>{col.title}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {col.items.map(item => (
                  <li key={item} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: 'var(--accent-primary)', fontSize: '0.7rem' }}>▶</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ SECTION (keyword-rich, no FAQPage schema) ── */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
          fontWeight: 800,
          textAlign: 'center',
          color: 'var(--text-primary)',
          marginBottom: 8,
        }}>
          Frequently Asked Questions
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 32, fontSize: '0.9rem' }}>
          Everything you need to know about UK grants, benefits and funding in 2025
        </p>
        {[
          {
            q: 'What UK grants are available for individuals in 2025?',
            a: 'Individuals in the UK can access the Household Support Fund, cost-of-living payments, Sure Start Maternity Grant, Disabled Facilities Grant (up to £30,000), Council Tax Reduction, and various local authority emergency grants. Energy grants like ECO4 are also available for homeowners and renters on qualifying benefits. Use our free eligibility checker to find which schemes apply to your situation.',
          },
          {
            q: 'What are the best UK government grants for small businesses?',
            a: 'Small businesses can apply for Innovate UK Smart Grants (up to £500,000 for R&D), UK Shared Prosperity Fund grants, Growth Hub support grants, Seed Enterprise Investment Scheme (SEIS), and sector-specific grants from bodies like Creative England and Innovate UK Edge. Many grants are regional — use our Business category filter to find schemes available in your area.',
          },
          {
            q: 'How do I apply for ECO4 energy grants?',
            a: 'ECO4 (Energy Company Obligation) is one of the UK\'s largest energy grants, providing free insulation, heat pumps, and heating upgrades to low-income households. To qualify, you typically need to be receiving Universal Credit, Pension Credit, or another qualifying benefit. Applications go through your energy supplier or a government-approved installer — not directly through GOV.UK.',
          },
          {
            q: 'Are there UK grants for first-time home buyers?',
            a: 'Yes. First-time buyers can access Help to Buy: Shared Ownership, First Homes scheme (30-50% discount on new builds), Lifetime ISA government bonus (25% on savings up to £4,000/year), and Right to Buy (for eligible council tenants). Search our Housing Schemes section to see all currently active programmes.',
          },
          {
            q: 'What training and skills funding is available to adults in the UK?',
            a: 'Adults in England can access Skills Bootcamps (free, flexible training in tech, engineering, and green jobs), Multiply (free numeracy courses), and Level 3 qualifications funded by the government. Apprenticeships are available at all ages. Scotland, Wales, and Northern Ireland have their own devolved programmes. Browse our Training & Skills section for full details.',
          },
          {
            q: 'Is this website free? Do I need to create an account?',
            a: 'Yes — UK Funding Hub is completely free with no account or sign-up required. We are not a grant agency or intermediary. We simply present publicly available information about grants and funding, with direct links to official application portals. We never charge fees or ask for personal financial information.',
          },
        ].map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', padding: '18px 0' }}>
            <summary style={{
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-primary)',
              listStyle: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
            }}>
              {faq.q}
              <span style={{ fontSize: '1.3rem', color: 'var(--accent-primary)', flexShrink: 0 }}>+</span>
            </summary>
            <p style={{ marginTop: 12, fontSize: '0.93rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{faq.a}</p>
          </details>
        ))}
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div>© 2025 UK Funding Hub · Free funding search for everyone in the United Kingdom</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/about"   style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
          <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
          <Link to="/terms"   style={{ color: 'inherit', textDecoration: 'none' }}>Terms</Link>
          <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</Link>
        </div>
      </footer>
    </div>
  )
}
