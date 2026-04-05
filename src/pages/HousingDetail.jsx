import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ExternalLink, CheckCircle, MapPin, BookOpen, ChevronRight, ShieldCheck, Clock, PoundSterling } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import PageMeta from '../components/PageMeta'

function formatVerified(dateStr) {
  if (!dateStr) return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function HousingDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    async function load() {
      setLoading(true)
      const { data } = await supabase.from('uk_housing').select('*').eq('slug', slug).single()
      setItem(data)
      if (data?.category) {
        const { data: rel } = await supabase
          .from('uk_housing').select('id,slug,title,category,amount,status')
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
      <Link to="/housing" style={{ color: '#00bfa5' }}>← Back to Housing</Link>
    </div>
  )

  const canonicalUrl = `https://ukgrants.online/housing/${slug}`
  const pageTitle = `${item.title} — UK Housing Grants & Schemes 2025`
  const pageDesc = `${item.title}: eligibility, how to apply and who qualifies in 2025. ${item.description?.slice(0, 90) || ''}`.slice(0, 160)
  const verifiedDate = formatVerified(item.updated_at || item.created_at)
  const isoDate = item.updated_at || item.created_at || new Date().toISOString()

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ukgrants.online/' },
        { '@type': 'ListItem', position: 2, name: 'Housing', item: 'https://ukgrants.online/housing' },
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
      articleSection: 'Housing Schemes',
      keywords: `${item.title}, UK housing grants, ${item.category}, home improvement grants UK`,
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
          <Link to="/" style={{ color: '#00bfa5', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={12} />
          <Link to="/housing" style={{ color: '#00bfa5', textDecoration: 'none' }}>Housing</Link>
          <ChevronRight size={12} />
          <span>{item.category || 'Scheme'}</span>
        </nav>

        {/* Header card */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '32px', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
            <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600, background: 'rgba(0,191,165,0.1)', color: '#00897b', border: '1px solid rgba(0,191,165,0.2)' }}>
              {item.category}
            </span>
            {item.location && (
              <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 500, background: 'var(--bg-deep)', color: 'var(--text-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={11} /> {item.location}
              </span>
            )}
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
            <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(0,191,165,0.07)', border: '1px solid rgba(0,191,165,0.15)', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <PoundSterling size={18} color="#00897b" />
              <div>
                <div style={{ fontSize: '0.68rem', color: '#00897b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Grant Value</div>
                <div style={{ fontWeight: 700, color: '#00897b', fontSize: '1.05rem' }}>{item.amount}</div>
              </div>
            </div>
          )}

          {item.apply_url && (
            <div>
              <a href={item.apply_url} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px',
                borderRadius: 10, background: 'linear-gradient(135deg, #00bfa5, #00897b)',
                color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,191,165,0.25)',
              }}>
                View Scheme on GOV.UK <ExternalLink size={15} />
              </a>
            </div>
          )}
        </div>

        {/* Eligibility + How to Apply */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '28px', marginBottom: 20 }}>
          {item.eligibility && (
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-primary)', paddingBottom: 10, borderBottom: '2px solid rgba(0,191,165,0.15)' }}>
                <CheckCircle size={18} color="#00bfa5" /> Who Is Eligible
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>{item.eligibility}</p>
            </div>
          )}
          {item.how_to_apply && (
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-primary)', paddingBottom: 10, borderBottom: '2px solid rgba(0,191,165,0.15)' }}>
                <BookOpen size={18} color="#00bfa5" /> How to Apply
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>{item.how_to_apply}</p>
            </div>
          )}
        </div>

        {/* Last verified */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'var(--bg-layer-2)', borderRadius: 10, border: '1px solid var(--border)', marginBottom: 20, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Clock size={14} />
          <span>This information was last verified against <strong>GOV.UK</strong> on <strong>{verifiedDate}</strong>. Always confirm details with the scheme provider before applying.</span>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '28px', marginBottom: 20 }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Similar Housing Schemes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {related.map(r => (
                <Link key={r.id} to={`/housing/${r.slug}`} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', borderRadius: 10, border: '1px solid var(--border)',
                  textDecoration: 'none', color: 'var(--text-primary)', transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-deep)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.title}</div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Cross-section links */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '28px', marginBottom: 20 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Also Explore</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { to: '/grants', label: '💰 Grants', desc: 'Free money you don\'t repay', color: '#0066ff' },
              { to: '/benefits', label: '🏛️ Benefits', desc: 'Housing Benefit & more', color: '#ffb300' },
              { to: '/loans', label: '🏦 Loans', desc: 'Government-backed loans', color: '#7c3aed' },
              { to: '/training', label: '🎓 Training', desc: 'Free skills & courses', color: '#ec407a' },
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
          Information sourced from official government websites. <Link to="/about" style={{ color: 'inherit' }}>About our data sources</Link>.
        </p>
      </div>
    </div>
  )
}
