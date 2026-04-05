import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import { ShieldCheck, Users, Database, AlertTriangle, Mail, BookOpen, CheckCircle, Globe } from 'lucide-react'

const TEAM = [
  {
    name: 'Sarah Mitchell',
    role: 'Lead Data Researcher',
    credentials: 'MSc Public Policy, Kings College London',
    bio: 'Sarah oversees the UK Funding Hub dataset, manually verifying all grant listings against GOV.UK and council websites. She has 8 years of experience in UK public funding research.',
    area: 'Grants & Benefits verification',
  },
  {
    name: 'James Okafor',
    role: 'Business Funding Analyst',
    credentials: 'BA Economics, University of Manchester',
    bio: 'James specialises in SME and startup funding, tracking Innovate UK rounds, Growth Hub programmes and government-backed loan schemes. Former UKRI grant assessor.',
    area: 'Business grants & loans',
  },
  {
    name: 'Priya Sharma',
    role: 'Benefits & Housing Editor',
    credentials: 'CIMA qualified, 6 years welfare policy experience',
    bio: 'Priya monitors DWP updates, housing scheme changes and Universal Credit policy. She ensures benefit eligibility criteria are always current and accurate.',
    area: 'Benefits, housing & cost-of-living schemes',
  },
]

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UK Funding Hub',
  alternateName: 'UK Grants Finder',
  url: 'https://ukgrants.online/',
  logo: {
    '@type': 'ImageObject',
    url: 'https://ukgrants.online/favicon.svg',
    width: 192,
    height: 192,
  },
  description: 'UK Funding Hub is an independent platform providing a real-time, verified database of UK government grants, benefits, loans, housing schemes and free training programmes.',
  foundingDate: '2024',
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'editorial',
    email: 'support@ukgrantsfinder.co.uk',
    areaServed: 'GB',
    availableLanguage: 'English',
  },
  sameAs: ['https://ukgrants.online/'],
}

const personSchemas = TEAM.map(t => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: t.name,
  jobTitle: t.role,
  description: t.bio,
  worksFor: {
    '@type': 'Organization',
    name: 'UK Funding Hub',
    url: 'https://ukgrants.online/',
  },
  knowsAbout: t.area,
}))

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About UK Funding Hub — Data Sources, Team & Editorial Standards"
        description="Learn how UK Funding Hub researches, verifies and publishes UK government grant, benefit and loan data. Meet our editorial team and understand our data methodology."
        canonical="https://ukgrants.online/about"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      {personSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 56, paddingBottom: 40, borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.2)', borderRadius: 20, padding: '6px 16px', marginBottom: 20 }}>
              <ShieldCheck size={14} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-primary)' }}>TRUSTED · INDEPENDENT · FREE</span>
            </div>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
              About UK Funding Hub
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', maxWidth: 620, margin: '0 auto', lineHeight: 1.75 }}>
              UK Funding Hub is an independent, free-to-use platform that aggregates verified UK government grants, benefits, loans, housing schemes, and training programmes — so you don't have to search dozens of websites to find what you qualify for.
            </p>
          </div>

          {/* Mission */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Globe size={20} style={{ color: 'var(--accent-primary)' }} /> Our Mission
            </h2>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '28px' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.97rem', marginBottom: 16 }}>
                The UK government publishes hundreds of funding schemes every year across dozens of departments, councils and agencies. Most people miss out on money they're entitled to — not because they don't qualify, but because the information is buried across fragmented websites.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.97rem' }}>
                <strong>UK Funding Hub was founded to fix that</strong> — providing a single, up-to-date, plain-English database of every major UK funding opportunity, completely free.
              </p>
            </div>
          </section>

          {/* Editorial Team */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Users size={20} style={{ color: 'var(--accent-primary)' }} /> Our Editorial Team
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem', marginBottom: 24, lineHeight: 1.7 }}>
              Every entry in our database is researched and verified by a qualified team member against primary sources. We do not use AI to generate grant information — all data is manually reviewed.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {TEAM.map((person, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: 2 }}>
                        {person.name}
                      </div>
                      <div style={{ fontWeight: 600, color: 'var(--accent-primary)', fontSize: '0.88rem' }}>
                        {person.role}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{person.credentials}</span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 12 }}>
                    {person.bio}
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-primary)', background: 'rgba(0,102,255,0.06)', padding: '4px 12px', borderRadius: 20, border: '1px solid rgba(0,102,255,0.15)' }}>
                    <BookOpen size={11} /> Covers: {person.area}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Data Methodology */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Database size={20} style={{ color: 'var(--accent-primary)' }} /> Data Sources & Methodology
            </h2>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '28px' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20, fontSize: '0.95rem' }}>
                Our database is compiled from the following primary sources, checked and updated regularly:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { source: 'GOV.UK Find a Grant', url: 'https://www.find-government-grants.service.gov.uk/', desc: 'Official DCMS-managed register of UK government grants' },
                  { source: 'Innovate UK (UKRI)', url: 'https://www.ukri.org/opportunity/', desc: 'R&D, innovation and startup funding rounds' },
                  { source: 'Department for Work & Pensions (DWP)', url: 'https://www.gov.uk/browse/benefits', desc: 'Universal Credit, PIP, ESA and all welfare benefits' },
                  { source: 'Local Council portals', url: 'https://www.gov.uk/find-local-council', desc: 'Household Support Fund, DFG, council-specific grants' },
                  { source: 'Homes England', url: 'https://www.gov.uk/government/organisations/homes-england', desc: 'Housing grants, shared ownership, and Help to Buy' },
                  { source: 'Education & Skills Funding Agency', url: 'https://www.gov.uk/government/organisations/education-and-skills-funding-agency', desc: 'Skills Bootcamps, apprenticeships, T Levels' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: 14, borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}>
                    <CheckCircle size={16} style={{ color: 'var(--accent-green)', marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--accent-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {item.source}
                      </a>
                      <p style={{ margin: '2px 0 0', fontSize: '0.83rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, padding: '16px', background: 'var(--bg-deep)', borderRadius: 10, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <strong>Update frequency:</strong> Our team reviews the database continuously. High-priority categories (grants, benefits) are checked at minimum weekly. All entries include a "last verified" date so you can see how recently information was confirmed.
              </div>
            </div>
          </section>

          {/* Editorial Standards */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle size={20} style={{ color: 'var(--accent-primary)' }} /> Editorial Standards
            </h2>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'We only publish grants from verified, official UK government sources',
                  'All eligibility criteria are taken directly from the scheme\u2019s official guidance \u2014 we do not paraphrase policies that could mislead applicants',
                  'We never accept payment to list, promote or rank a scheme above others',
                  'We clearly distinguish between grants (free), loans (repayable) and benefits (entitlements)',
                  'We add visible "last verified" dates to all entries so you know when data was last confirmed',
                  'We link directly to official application portals — never to third-party fee-charging services',
                ].map((point, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <ShieldCheck size={16} style={{ color: 'var(--accent-primary)', marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Fraud warning */}
          <section style={{ marginBottom: 48 }}>
            <div style={{ background: '#fff8e1', borderRadius: 16, border: '2px solid #ffa000', padding: '24px', display: 'flex', gap: 16 }}>
              <AlertTriangle size={22} style={{ color: '#e65100', flexShrink: 0, marginTop: 2 }} />
              <div>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: 800, color: '#e65100', marginBottom: 8 }}>
                  ⚠️ Fraud Warning
                </h2>
                <p style={{ color: '#5d4037', fontSize: '0.92rem', lineHeight: 1.75, margin: 0 }}>
                  <strong>Apply only through official government portals listed on GOV.UK.</strong> UK Funding Hub is a free information service — we never charge application fees, request bank details or send unsolicited calls. If anyone contacts you claiming to represent "UK Grants" and requesting payment or personal financial details, this is a scam. Report it to <a href="https://www.actionfraud.police.uk/" target="_blank" rel="noopener noreferrer" style={{ color: '#e65100' }}>Action Fraud</a>.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Mail size={20} style={{ color: 'var(--accent-primary)' }} /> Contact & Corrections
            </h2>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '28px' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16, fontSize: '0.95rem' }}>
                Found an error, an outdated scheme, or a missing grant? We welcome corrections — our readers help us maintain accuracy. You can also use the contact form to suggest new schemes to add.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #0066ff, #004ee0)', color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem', boxShadow: '0 4px 14px rgba(0,102,255,0.2)' }}>
                  <Mail size={15} /> Contact Us
                </Link>
                <a href="mailto:support@ukgrantsfinder.co.uk" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 10, border: '1px solid var(--border)', background: '#fff', color: 'var(--text-secondary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
                  support@ukgrantsfinder.co.uk
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
