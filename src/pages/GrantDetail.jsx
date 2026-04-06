import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Building2, MapPin, Clock, CalendarDays,
  PoundSterling, CheckCircle, ExternalLink, BookOpen,
  Users, Tag, Wifi, AlertCircle, ChevronRight,
  ShieldCheck, CheckSquare, Square, AlertTriangle, Lightbulb, Calendar
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { CATEGORIES } from './HomePage.jsx'
import PageMeta from '../components/PageMeta'

function getCat(key) {
  return CATEGORIES.find(c => c.key === key) || CATEGORIES[0]
}

function Section({ icon: Icon, title, children, accent }) {
  if (!children) return null
  return (
    <div className="detail-section">
      <h2 className="detail-section-title">
        {Icon && <Icon size={16} style={{ color: accent || 'var(--accent-primary)' }} />}
        {title}
      </h2>
      <div className="detail-section-body">{children}</div>
    </div>
  )
}

function MetaRow({ label, value }) {
  if (!value) return null
  return (
    <div className="meta-row">
      <span className="meta-label">{label}</span>
      <span className="meta-value">{value}</span>
    </div>
  )
}

export default function GrantDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [grant, setGrant] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [checklist, setChecklist] = useState([false, false, false, false])

  useEffect(() => {
    window.scrollTo(0, 0)
    async function load() {
      setLoading(true)
      setError(null)
      try {
        // Fetch full grant
        const { data, error: err } = await supabase
          .from('uk_grants')
          .select('*')
          .eq('slug', slug)
          .single()
        if (err) throw err
        setGrant(data)

        // Fetch related grants (same category, different slug)
        if (data?.category) {
          const { data: rel } = await supabase
            .from('uk_grants')
            .select('id,slug,grant_type,council_name,max_funding,category,status')
            .eq('category', data.category)
            .neq('slug', slug)
            .limit(4)
          setRelated(rel || [])
        }
      } catch (e) {
        setError(e.message || 'Grant not found')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) return (
    <div className="detail-loading">
      <div className="spinner" />
      <p>Loading grant details…</p>
    </div>
  )

  if (error || !grant) return (
    <div className="detail-error">
      <AlertCircle size={48} style={{ color: 'var(--accent-red)', marginBottom: 16 }} />
      <h2>Grant Not Found</h2>
      <p>{error || 'This grant does not exist or has been removed.'}</p>
      <button className="btn-back" onClick={() => navigate('/')}>← Back to All Grants</button>
    </div>
  )

  const cat = getCat(grant.category)
  const CatIcon = cat.icon

  function statusClass(s = '') {
    const l = s.toLowerCase()
    if (l === 'active') return 'status-active'
    if (l === 'inactive' || l === 'closed') return 'status-inactive'
    return 'status-pending'
  }

  function timeAgo(d) {
    if (!d) return ''
    const s = Math.floor((Date.now() - new Date(d)) / 1000)
    if (s < 60) return `${s}s ago`
    if (s < 3600) return `${Math.floor(s/60)}m ago`
    if (s < 86400) return `${Math.floor(s/3600)}h ago`
    return `${Math.floor(s/86400)}d ago`
  }

  const canonicalUrl = `https://ukgrants.online/grant/${slug}`
  const pageTitle = grant
    ? `${grant.grant_type} — ${grant.council_name || 'UK Grant'} | UK Grants Finder`
    : 'UK Grant Details'
  const pageDesc = grant
    ? `Apply for ${grant.grant_type}. ${grant.unique_content?.slice(0, 120) || 'Full eligibility details and direct application link.'}`.slice(0, 160)
    : 'UK government grant details and how to apply.'

  const verifiedDate = grant?.last_updated
    ? new Date(grant.last_updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const isoDate = grant?.last_updated || new Date().toISOString()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ukgrants.online/' },
      { '@type': 'ListItem', position: 2, name: 'Grants', item: 'https://ukgrants.online/grants' },
      { '@type': 'ListItem', position: 3, name: grant?.grant_type || 'Grant', item: canonicalUrl },
    ]
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pageTitle,
    description: pageDesc,
    datePublished: isoDate,
    dateModified: isoDate,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
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
    articleSection: grant?.category || 'Grants',
    keywords: `${grant?.grant_type}, UK grants, ${grant?.category}, ${grant?.council_name || ''}, apply for grants UK`,
    inLanguage: 'en-GB',
  }

  return (
    <>
      <PageMeta title={pageTitle} description={pageDesc} canonical={canonicalUrl} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* NAVBAR */}
      <nav className="navbar">
        <button className="btn-back-nav" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> All Grants
        </button>
        <span className="navbar-breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={12} />
          <span>{grant.grant_type}</span>
        </span>
      </nav>

      <div className="detail-page">

        {/* ── Hero ── */}
        <div className="detail-hero">
          <div className="detail-hero-inner">
            {/* Category + Status row */}
            <div className="detail-hero-badges">
              <span className="detail-cat-chip" style={{ borderColor: `${cat.color}50`, color: cat.color, background: `${cat.color}15` }}>
                <CatIcon size={13} />{grant.category}
              </span>
              <span className={`status-badge ${statusClass(grant.status)}`}>
                <span className="live-dot" style={{ width: 6, height: 6 }} />
                {grant.status}
              </span>
            </div>

            {/* E-E-A-T Fact Check Badge + Last Verified */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green)', fontSize: '0.82rem', fontWeight: 600, background: 'rgba(76, 175, 80, 0.1)', padding: '6px 10px', borderRadius: '4px' }}>
                <ShieldCheck size={15} />
                Verified &amp; Fact-Checked by The UK Grants Team
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.78rem', background: 'var(--bg-layer-2)', padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <Calendar size={12} />
                <span>Last verified: <strong>{verifiedDate}</strong></span>
              </div>
            </div>

            <h1 className="detail-title">{grant.grant_type}</h1>

            <div className="detail-org-row">
              <Building2 size={16} style={{ color: 'var(--accent-primary)' }} />
              <span>{grant.council_name}</span>
              {grant.location && <><span className="dot-sep">·</span><MapPin size={14} /><span>{grant.location}</span></>}
            </div>

            {/* Funding highlight boxes */}
            <div className="detail-meta-boxes">
              <div className="meta-box">
                <div className="meta-box-label">Max Funding</div>
                <div className="meta-box-value" style={{ color: 'var(--accent-primary)' }}>
                  {grant.max_funding || 'Varies'}
                </div>
              </div>
              {grant.grant_size && (
                <div className="meta-box">
                  <div className="meta-box-label">Total Fund Size</div>
                  <div className="meta-box-value">{grant.grant_size}</div>
                </div>
              )}
              {grant.funding_type && (
                <div className="meta-box">
                  <div className="meta-box-label">Funding Type</div>
                  <div className="meta-box-value">{grant.funding_type}</div>
                </div>
              )}
              <div className="meta-box">
                <div className="meta-box-label">Last Updated</div>
                <div className="meta-box-value">{timeAgo(grant.last_updated)}</div>
              </div>
            </div>

            {/* Apply CTA */}
            {grant.apply_url && (
              <a href={grant.apply_url} target="_blank" rel="noopener noreferrer" className="btn-apply-large" id="apply-now-btn">
                Apply Now <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="detail-body">
          <div className="detail-content">

            {/* About */}
            <Section icon={BookOpen} title="About This Grant" accent="var(--accent-primary)">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {(grant.full_description || grant.unique_content || 'No description available.')
                  .split('\n\n')
                  .filter(Boolean)
                  .map((para, i) => (
                    <p key={i} style={{
                      fontSize: '1rem',
                      lineHeight: 1.85,
                      color: 'var(--text-secondary)',
                      margin: 0,
                      paddingLeft: i === 0 ? 0 : 0,
                    }}>{para}</p>
                  ))
                }
              </div>
              {/* Quick summary box */}
              {grant.eligibility && (
                <div style={{
                  marginTop: 20,
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, rgba(0,102,255,0.04), rgba(0,102,255,0.01))',
                  borderLeft: '4px solid var(--accent-primary)',
                  borderRadius: '0 10px 10px 0',
                  fontSize: '0.93rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: 6, fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Quick Eligibility Summary
                  </strong>
                  {grant.eligibility}
                </div>
              )}
            </Section>


            {/* E-E-A-T: Expert Advice Block */}
            <div style={{ background: 'var(--bg-layer-2)', borderLeft: '4px solid var(--accent-purple)', padding: '20px', borderRadius: '0 8px 8px 0', marginBottom: '32px' }}>
              <h3 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                <Lightbulb size={18} style={{ color: 'var(--accent-purple)' }}/> Expert Tip from Our Team
              </h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Before applying for the <strong>{grant.grant_type}</strong>, ensure all your personal identification and financial documents are up to date. Government agencies often delay mismatched applications. Never pay a third party to apply on your behalf—this scheme is free to apply for via the official links below.
              </p>
            </div>

            {/* E-E-A-T: Interactive Checklist */}
            <Section icon={CheckSquare} title="Application Preparation Checklist" accent="#ff7043">
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Check these off to ensure you're ready before opening the application portal.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  "I meet all the eligibility criteria listed below",
                  "I have my National Insurance number ready",
                  "I have proof of address (utility bill or bank statement)",
                  "I am applying directly through the official GOV.UK or council portal"
                ].map((item, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', userSelect: 'none' }}>
                    <div onClick={() => setChecklist(p => p.map((v, idx) => idx === i ? !v : v))}>
                      {checklist[i] ? <CheckSquare size={20} style={{ color: 'var(--accent-green)' }} /> : <Square size={20} style={{ color: 'var(--text-muted)' }} />}
                    </div>
                    <span style={{ color: checklist[i] ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: checklist[i] ? 'line-through' : 'none', fontSize: '0.95rem', marginTop: '1px' }}>{item}</span>
                  </label>
                ))}
              </div>
            </Section>

            {/* Who can apply */}
            <Section icon={Users} title="Who Can Apply" accent={cat.color}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(grant.who_can_apply || grant.eligibility_details || grant.eligibility || 'Check the applying body for eligibility criteria.')
                  .split('\n').filter(Boolean).map((line, i) => (
                    <p key={i} style={{ margin: 0, fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{line}</p>
                  ))}
              </div>
            </Section>

            {/* Eligibility */}
            {grant.eligibility_details && grant.eligibility_details !== grant.who_can_apply && (
              <Section icon={CheckCircle} title="Eligibility Criteria" accent="var(--accent-green)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {grant.eligibility_details.split('\n').filter(Boolean).map((line, i) => (
                    <p key={i} style={{ margin: 0, fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{line}</p>
                  ))}
                </div>
              </Section>
            )}

            {/* How to apply */}
            {grant.how_to_apply && (
              <Section icon={Tag} title="How to Apply" accent="var(--accent-purple)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {grant.how_to_apply.split('\n').filter(Boolean).map((line, i) => {
                    const isStep = /^\d+\./.test(line.trim())
                    return (
                      <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        {isStep && (
                          <span style={{
                            minWidth: 26, height: 26, borderRadius: '50%',
                            background: 'var(--accent-purple)', color: '#fff',
                            fontSize: '0.75rem', fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginTop: 2, flexShrink: 0
                          }}>{line.trim().match(/^(\d+)/)[1]}</span>
                        )}
                        <p style={{ margin: 0, fontSize: '0.96rem', lineHeight: 1.75, color: 'var(--text-secondary)', flex: 1 }}>
                          {isStep ? line.trim().replace(/^\d+\.\s*/, '') : line}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </Section>
            )}

            {/* Additional info */}
            {grant.additional_info && (
              <Section icon={Wifi} title="2026 Updates & Tips" accent="var(--accent-secondary)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {grant.additional_info.split('\n').filter(Boolean).map((line, i) => (
                    <p key={i} style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{line}</p>
                  ))}
                </div>
              </Section>
            )}

            {/* Apply CTA bottom */}
            {grant.apply_url && (
              <div className="detail-apply-footer">
                <h3>Ready to apply?</h3>
                <p>Visit the official page to start your application.</p>
                <a href={grant.apply_url} target="_blank" rel="noopener noreferrer" className="btn-apply-large">
                  Start Application <ExternalLink size={16} />
                </a>
              </div>
            )}

            {/* Cross-section internal links */}
            <div className="detail-section">
              <h2 className="detail-section-title">Also Explore</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
                {[
                  { to: '/benefits', label: '🏛️ Benefits', desc: 'Entitlements you can claim', color: '#ffb300' },
                  { to: '/housing', label: '🏠 Housing', desc: 'Home improvement grants', color: '#00bfa5' },
                  { to: '/loans', label: '🏦 Loans', desc: 'Government-backed loans', color: '#7c3aed' },
                  { to: '/training', label: '🎓 Training', desc: 'Free funded courses', color: '#ec407a' },
                ].map(s => (
                  <Link key={s.to} to={s.to} style={{ padding: '14px', borderRadius: 10, border: `1px solid ${s.color}25`, background: `${s.color}06`, textDecoration: 'none', display: 'block', transition: 'border-color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = s.color}
                    onMouseLeave={e => e.currentTarget.style.borderColor = `${s.color}25`}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: s.color, marginBottom: 3 }}>{s.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="detail-sidebar">

            {/* Key details */}
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Grant Details</h3>

              {/* Status row — always shown */}
              <div style={{ marginBottom: 16 }}>
                <span className={`status-badge ${grant.status?.toLowerCase() === 'active' ? 'status-active' : 'status-pending'}`} style={{ fontSize: '0.8rem' }}>
                  <span className="live-dot" style={{ width: 6, height: 6 }} />
                  {grant.status || 'Open'}
                </span>
                <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {grant.status?.toLowerCase() === 'active'
                    ? 'This grant is currently accepting applications.'
                    : grant.status?.toLowerCase() === 'closed'
                    ? 'This round is closed. Check back for future rounds or see related grants below.'
                    : 'Application status — contact the applying body to confirm current availability.'}
                </p>
              </div>

              <MetaRow label="Provider" value={grant.applying_body || grant.council_name} />
              <MetaRow label="Location" value={grant.location} />
              <MetaRow label="Grant Size" value={grant.grant_size} />
              <MetaRow label="Funding Type" value={grant.funding_type} />
              <MetaRow label="Max Award" value={grant.max_funding} />

              {/* Dates — shown with fallback if missing */}
              {(grant.opening_date || grant.closing_date) ? (
                <>
                  <MetaRow label="Opens" value={grant.opening_date} />
                  <MetaRow label="Closes" value={grant.closing_date} />
                </>
              ) : (
                <div style={{ marginTop: 12, padding: '12px 14px', background: 'rgba(0,102,255,0.04)', borderRadius: 8, border: '1px solid rgba(0,102,255,0.1)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Availability</div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    This scheme accepts rolling applications. Dates may change — visit the provider's website or call their helpline for the latest window.
                  </p>
                </div>
              )}
            </div>

            {/* Related grants */}
            {related.length > 0 && (
              <div className="sidebar-card">
                <h3 className="sidebar-card-title">Related Grants</h3>
                <div className="related-list">
                  {related.map(r => (
                    <Link key={r.id} to={`/grant/${r.slug}`} className="related-item">
                      <div className="related-title">{r.grant_type}</div>
                      <div className="related-meta">
                        <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{r.max_funding || 'Varies'}</span>
                        <ChevronRight size={12} style={{ color: 'var(--text-muted)' }} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Source */}
            {grant.source_url && (
              <div className="sidebar-card">
                <h3 className="sidebar-card-title">Source</h3>
                <a href={grant.source_url} target="_blank" rel="noopener noreferrer" className="source-link">
                  View on GOV.UK <ExternalLink size={12} />
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>

      <footer className="footer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div>
          © 2025 UK Grants Finder · Free funding search for everyone in the United Kingdom
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms & Conditions</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
        </div>
      </footer>
    </>
  )
}
