import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, CheckCircle, MapPin, BookOpen, ChevronRight, PoundSterling } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import PageMeta from '../components/PageMeta'

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
  const pageTitle = item ? `${item.title} — UK Housing Schemes` : 'UK Housing Scheme Details'
  const pageDesc = item
    ? `${item.title}: eligibility, how to apply and who qualifies. ${item.description?.slice(0, 100) || ''}`.slice(0, 160)
    : 'UK government housing scheme details and eligibility.'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ukgrants.online/' },
      { '@type': 'ListItem', position: 2, name: 'Housing', item: 'https://ukgrants.online/housing' },
      { '@type': 'ListItem', position: 3, name: item?.title || 'Scheme', item: canonicalUrl },
    ]
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      <PageMeta title={pageTitle} description={pageDesc} canonical={canonicalUrl} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 24px 80px' }}>
        <button onClick={() => navigate('/housing')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 500, marginBottom: 24, padding: 0 }}>
          <ArrowLeft size={16} /> Back to Housing Schemes
        </button>

        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '32px', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600, background: 'rgba(0,191,165,0.1)', color: '#00897b', border: '1px solid rgba(0,191,165,0.2)' }}>{item.category}</span>
            {item.location && (
              <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 500, background: 'var(--bg-deep)', color: 'var(--text-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={11} /> {item.location}
              </span>
            )}
          </div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: 12 }}>{item.title}</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.97rem', marginBottom: 20 }}>{item.description}</p>

          {item.amount && (
            <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(0,191,165,0.07)', border: '1px solid rgba(0,191,165,0.15)', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <PoundSterling size={16} color="#00897b" />
              <span style={{ fontWeight: 700, color: '#00897b', fontSize: '0.9rem' }}>{item.amount}</span>
            </div>
          )}
          <div>
            {item.apply_url && (
              <a href={item.apply_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 10, background: 'linear-gradient(135deg, #00bfa5, #00897b)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,191,165,0.25)' }}>
                View Scheme on GOV.UK <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '28px', marginBottom: 20 }}>
          {item.eligibility && (
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={16} color="var(--accent-primary)" /> Who Is Eligible
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem' }}>{item.eligibility}</p>
            </div>
          )}
          {item.how_to_apply && (
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <BookOpen size={16} color="var(--accent-primary)" /> How to Apply
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem' }}>{item.how_to_apply}</p>
            </div>
          )}
        </div>

        {related.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '28px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Similar Schemes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {related.map(r => (
                <Link key={r.id} to={`/housing/${r.slug}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, border: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text-primary)', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-deep)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.title}</div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </Link>
              ))}
            </div>
          </div>
        )}
        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 32 }}>Information sourced from official government websites. Always confirm details before applying.</p>
      </div>
    </div>
  )
}
