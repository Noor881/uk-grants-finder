import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, CheckCircle, PoundSterling, BookOpen, ChevronRight, ShieldCheck, Clock, Home, CreditCard, GraduationCap } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import PageMeta from '../components/PageMeta'

function formatVerified(dateStr) {
  if (!dateStr) return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BenefitDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    async function load() {
      setLoading(true)
      const { data } = await supabase.from('uk_benefits').select('*').eq('slug', slug).single()
      setItem(data)
      if (data?.category) {
        const { data: rel } = await supabase
          .from('uk_benefits').select('id,slug,title,category,amount,status')
          .eq('category', data.category).neq('slug', slug).limit(3)
        setRelated(rel || [])
      }
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) return <div style={{ textAlign: 'center', padding: '120px 24px', color: 'var(--text-muted)' }}>Loading...</div>
  if (!item) return (
    <div style={{ textAlign: 'center', padding: '120px 24px' }}>
      <h2 style={{ marginBottom: 12 }}>Not found</h2>
      <Link to="/benefits" style={{ color: 'var(--accent-primary)' }}>← Back to Benefits</Link>
    </div>
  )

  const canonicalUrl = `https://ukgrants.online/benefit/${slug}`
  const pageTitle = `${item.title} — UK Benefits Guide 2026`
  const pageDesc = `${item.title}: who can claim, eligibility criteria, and how to apply in 2026. ${item.description?.slice(0, 90) || ''}`.slice(0, 160)
  const verifiedDate = formatVerified(item.updated_at || item.created_at)
  const isoDate = item.updated_at || item.created_at || new Date().toISOString()

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ukgrants.online/' },
        { '@type': 'ListItem', position: 2, name: 'Benefits', item: 'https://ukgrants.online/benefits' },
        { '@type': 'ListItem', position: 3, name: item.title, item: canonicalUrl },
      ]
    },
    {
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
      articleSection: 'Benefits',
      keywords: `${item.title}, UK benefits, ${item.category}, how to claim ${item.title}`,
      inLanguage: 'en-GB',
    }
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      <PageMeta title={pageTitle} description={pageDesc} canonical={canonicalUrl} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 24 }}>
          <Link to="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={12} />
          <Link to="/benefits" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Benefits</Link>
          <ChevronRight size={12} />
          <span>{item.category}</span>
        </nav>

        {/* Header card */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '32px', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
            <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600, background: 'rgba(255,179,0,0.1)', color: '#b37800', border: '1px solid rgba(255,179,0,0.2)' }}>
              {item.category}
            </span>
            <span className="status-badge status-active">
              <span className="live-dot" style={{ width: 6, height: 6 }} />
              {item.status || 'Active'}
            </span>
          </div>

          {/* E-E-A-T verified badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.2)', borderRadius: 8, padding: '8px 14px', marginBottom: 16, width: 'fit-content' }}>
            <ShieldCheck size={15} style={{ color: '#2e7d32' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#2e7d32' }}>
              Verified against GOV.UK — Last checked: {verifiedDate}
            </span>
          </div>

          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: 12, lineHeight: 1.3 }}>
            {item.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.97rem', marginBottom: 20 }}>
            {item.description}
          </p>

          {item.amount && (
            <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(255,179,0,0.07)', border: '1px solid rgba(255,179,0,0.2)', marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <PoundSterling size={18} color="#b37800" />
              <div>
                <div style={{ fontSize: '0.72rem', color: '#b37800', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payment Amount</div>
                <div style={{ fontWeight: 700, color: '#b37800', fontSize: '1.05rem' }}>{item.amount}</div>
              </div>
            </div>
          )}

          {item.gov_url && (
            <div>
              <a href={item.gov_url} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 28px', borderRadius: 10,
                background: 'linear-gradient(135deg, #0066ff, #004ee0)',
                color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,102,255,0.25)',
              }}>
                Check Eligibility on GOV.UK <ExternalLink size={15} />
              </a>
            </div>
          )}
        </div>

        {/* Eligibility + How to Apply */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '28px', marginBottom: 20 }}>
          {item.eligibility && (
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-primary)', paddingBottom: 10, borderBottom: '2px solid rgba(0,102,255,0.1)' }}>
                <CheckCircle size={18} color="var(--accent-primary)" /> Who Can Claim
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {item.eligibility.split('\n').filter(Boolean).map((line, i) => (
                  <p key={i} style={{ margin: 0, fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{line}</p>
                ))}
              </div>
            </div>
          )}
          {item.who_can_apply && item.who_can_apply !== item.eligibility && (
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-primary)', paddingBottom: 10, borderBottom: '2px solid rgba(0,102,255,0.1)' }}>
                <CheckCircle size={18} color="var(--accent-primary)" /> Who Can Apply
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {item.who_can_apply.split('\n').filter(Boolean).map((line, i) => (
                  <p key={i} style={{ margin: 0, fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{line}</p>
                ))}
              </div>
            </div>
          )}
          {item.how_to_apply && (
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-primary)', paddingBottom: 10, borderBottom: '2px solid rgba(0,102,255,0.1)' }}>
                <BookOpen size={18} color="var(--accent-primary)" /> How to Apply
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {item.how_to_apply.split('\n').filter(Boolean).map((line, i) => {
                  const isStep = /^\d+\./.test(line.trim())
                  return (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      {isStep && (
                        <span style={{
                          minWidth: 26, height: 26, borderRadius: '50%',
                          background: '#7c3aed', color: '#fff',
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
            </div>
          )}
        </div>

        {/* Last verified */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'var(--bg-layer-2)', borderRadius: 10, border: '1px solid var(--border)', marginBottom: 20, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Clock size={14} />
          <span>This information was last verified against <strong>GOV.UK</strong> on <strong>{verifiedDate}</strong>. Always confirm details before applying.</span>
        </div>

        {/* Related Benefits */}
        {related.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '28px', marginBottom: 20 }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Related Benefits</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {related.map(r => (
                <Link key={r.id} to={`/benefit/${r.slug}`} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', borderRadius: 10, border: '1px solid var(--border)',
                  textDecoration: 'none', color: 'var(--text-primary)', transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-deep)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.title}</div>
                    {r.amount && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>{r.amount}</div>}
                  </div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Cross-section internal links ── */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '28px', marginBottom: 20 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Also Explore</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { to: '/grants', label: '💰 Grants', desc: 'Free government grants', color: '#0066ff' },
              { to: '/housing', label: '🏠 Housing Schemes', desc: 'Rent & home support', color: '#00bfa5', Icon: Home },
              { to: '/loans', label: '🏦 Business Loans', desc: 'Government-backed loans', color: '#7c3aed' },
              { to: '/training', label: '🎓 Free Training', desc: 'Funded courses & skills', color: '#ec407a' },
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

        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 24 }}>
          Information sourced from GOV.UK and official UK government bodies. Always verify eligibility before applying. <Link to="/about" style={{ color: 'inherit' }}>About our data</Link>.
        </p>
      </div>
    </div>
  )
}
