import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight, ShieldCheck, Database, Users, Target, Mail, Clock } from 'lucide-react'
import PageMeta from '../components/PageMeta'

// Organization + Person schema for E-E-A-T
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UK Funding Hub',
  alternateName: 'UK Grants Finder',
  url: 'https://ukgrants.online/',
  logo: {
    '@type': 'ImageObject',
    url: 'https://ukgrants.online/favicon.svg',
  },
  description:
    'UK Funding Hub is a free, real-time search engine aggregating thousands of UK government grants, benefits, loans, and housing schemes from GOV.UK and local authority sources.',
  foundingDate: '2024',
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@ukgrantsfinder.co.uk',
    availableLanguage: 'English',
    areaServed: 'GB',
  },
  sameAs: ['https://ukgrants.online/'],
}

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <>
      <PageMeta
        title="About UK Funding Hub — How We Source UK Grants Data"
        description="Learn how UK Funding Hub aggregates thousands of grants, benefits and loans directly from GOV.UK and UK local councils. Free, transparent, and updated every 6 hours."
        canonical="https://ukgrants.online/about"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <nav className="navbar">
        <button className="btn-back-nav" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>
        <span className="navbar-breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={12} />
          <span>About Us</span>
        </span>
      </nav>

      <div className="detail-page" style={{ maxWidth: '860px', margin: '0 auto', paddingTop: '40px', paddingBottom: '40px' }}>

        {/* Hero */}
        <div className="detail-hero" style={{ padding: '40px 0', borderBottom: '1px solid var(--border)', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <ShieldCheck size={32} style={{ color: 'var(--accent-primary)' }} />
            <h1 className="detail-title" style={{ margin: 0 }}>About UK Funding Hub</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '680px', lineHeight: 1.7 }}>
            UK Funding Hub is a free, independent platform that aggregates grants, benefits, loans, housing schemes,
            and training programmes directly from GOV.UK and official UK funding bodies. We exist to ensure no individual,
            family, or business misses out on public money they're entitled to.
          </p>
        </div>

        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>

          {/* Mission */}
          <section className="detail-section" style={{ marginBottom: '36px' }}>
            <h2 className="detail-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={20} style={{ color: 'var(--accent-red)' }} />
              Our Mission
            </h2>
            <div className="detail-section-body">
              <p style={{ fontSize: '1.05rem', marginBottom: '14px' }}>
                UK government funding is publicly available — but finding it is deliberately difficult. Grants are scattered
                across hundreds of GOV.UK pages, local council websites, and funding body portals. Most people simply don't know
                what they're entitled to.
              </p>
              <p>
                UK Funding Hub exists to fix that. We automatically collect, standardise, and present every publicly announced
                grant, benefit, and loan in one searchable, filterable interface — completely free, with no middlemen and no sign-up required.
              </p>
            </div>
          </section>

          {/* Editorial Standards — E-E-A-T */}
          <section className="detail-section" style={{ marginBottom: '36px' }}>
            <h2 className="detail-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} style={{ color: 'var(--accent-green)' }} />
              Our Editorial Standards
            </h2>
            <div className="detail-section-body">
              <p style={{ marginBottom: '14px' }}>
                <strong>We only list publicly announced, officially sourced funding schemes.</strong> Every listing on UK Funding Hub is:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Sourced from official channels</strong> — GOV.UK APIs, local authority announcements, and recognised UK funding bodies (Innovate UK, UKRI, National Lottery Community Fund etc.)
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Verified before publishing</strong> — our automated systems cross-reference each scheme against its original source URL
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Updated every 6 hours</strong> — closed schemes are removed; new schemes are added as announced
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Not affiliated with any grant provider</strong> — we are a neutral directory, not a grant agency. We never charge fees or act as intermediaries
                </li>
              </ul>
              <div style={{ background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.2)', borderRadius: '8px', padding: '16px', marginTop: '8px' }}>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  <strong>⚠️ Important:</strong> Never pay a third party to apply for a government grant on your behalf.
                  All legitimate UK government grants are free to apply for directly through official portals.
                  We provide direct links to the official application page for every scheme.
                </p>
              </div>
            </div>
          </section>

          {/* Data Sources */}
          <section className="detail-section" style={{ marginBottom: '36px' }}>
            <h2 className="detail-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={20} style={{ color: 'var(--accent-primary)' }} />
              How We Source Data
            </h2>
            <div className="detail-section-body">
              <p style={{ marginBottom: '12px' }}>Our data is aggregated from official UK sources only:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                {[
                  { src: 'GOV.UK', detail: 'Official government APIs and Grants for Growth portal' },
                  { src: 'Local Authorities', detail: '350+ UK council funding announcements' },
                  { src: 'Innovate UK / UKRI', detail: 'R&D and innovation grant programmes' },
                  { src: 'National Lottery', detail: 'Community Fund and heritage grants' },
                  { src: 'Energy suppliers', detail: 'ECO4, Warm Home Discount, Boiler Upgrade' },
                  { src: 'DWP / HMRC', detail: 'Benefits, tax credits, and financial support' },
                ].map(s => (
                  <div key={s.src} style={{ background: 'var(--bg-layer-2)', borderRadius: '8px', padding: '14px 16px', border: '1px solid var(--border)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, fontSize: '0.9rem' }}>📌 {s.src}</div>
                    <div style={{ fontSize: '0.85rem' }}>{s.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Who We Help */}
          <section className="detail-section" style={{ marginBottom: '36px' }}>
            <h2 className="detail-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} style={{ color: 'var(--accent-purple)' }} />
              Who We Help
            </h2>
            <div className="detail-section-body">
              <ul style={{ paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}><strong>Individuals &amp; families</strong> — Universal Credit, cost-of-living support, energy grants, disability benefits, childcare funding</li>
                <li style={{ marginBottom: '10px' }}><strong>Homeowners &amp; tenants</strong> — ECO4 insulation/heating grants, Warm Home Discount, Disabled Facilities Grant, Help to Buy</li>
                <li style={{ marginBottom: '10px' }}><strong>Small businesses</strong> — Innovate UK grants, Start Up Loans, Growth Hub support, UKSPF business grants</li>
                <li style={{ marginBottom: '10px' }}><strong>Charities &amp; community groups</strong> — National Lottery Community Fund, Arts Council grants, local authority community funding</li>
                <li style={{ marginBottom: '10px' }}><strong>Farmers &amp; rural businesses</strong> — DEFRA farming grants, Countryside Stewardship, Sustainable Farming Incentive</li>
              </ul>
            </div>
          </section>

          {/* Freshness */}
          <section className="detail-section" style={{ marginBottom: '36px' }}>
            <h2 className="detail-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} style={{ color: 'var(--accent-secondary)' }} />
              Data Freshness
            </h2>
            <div className="detail-section-body">
              <p>
                Our automated systems check for new and updated schemes every 6 hours — 4 times per day, every day.
                When a scheme closes, it is marked as inactive within hours of the official announcement.
                When the government announces new funding (e.g., a new Household Support Fund allocation), it appears on our platform the same day.
              </p>
              <p style={{ marginTop: '12px' }}>
                Each listing shows a "Last Updated" timestamp so you can always see how recently the information was verified.
              </p>
            </div>
          </section>

          {/* Contact CTA */}
          <div style={{ padding: '28px', background: 'var(--bg-layer-2)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
            <Mail size={28} style={{ color: 'var(--accent-primary)', marginBottom: 12 }} />
            <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>Contact Our Team</h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '0.95rem' }}>
              Found incorrect or outdated grant information? Want to suggest a funding scheme we've missed?
            </p>
            <a href="mailto:support@ukgrantsfinder.co.uk" style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
              support@ukgrantsfinder.co.uk
            </a>
            <div style={{ marginTop: 16 }}>
              <Link to="/contact" style={{ display: 'inline-block', background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                Send us a message
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div>© 2025 UK Funding Hub · Free funding search for everyone in the United Kingdom</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/about"   style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>About</Link>
          <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
          <Link to="/terms"   style={{ color: 'inherit', textDecoration: 'none' }}>Terms</Link>
          <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</Link>
        </div>
      </footer>
    </>
  )
}
