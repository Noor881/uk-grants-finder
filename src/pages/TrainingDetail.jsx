import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, CheckCircle, Clock, BookOpen, ChevronRight } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

export default function TrainingDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    async function load() {
      setLoading(true)
      const { data } = await supabase.from('uk_training').select('*').eq('slug', slug).single()
      setItem(data)
      if (data?.category) {
        const { data: rel } = await supabase
          .from('uk_training').select('id,slug,title,category,cost,duration,status')
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
      <Link to="/training" style={{ color: '#ec407a' }}>← Back to Training</Link>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 24px 80px' }}>
        <button onClick={() => navigate('/training')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 500, marginBottom: 24, padding: 0 }}>
          <ArrowLeft size={16} /> Back to Training
        </button>

        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '32px', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600, background: 'rgba(236,64,122,0.1)', color: '#c2185b', border: '1px solid rgba(236,64,122,0.15)' }}>{item.category}</span>
            {item.cost && (
              <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600, background: item.cost === 'Free' ? 'rgba(22,163,74,0.1)' : 'rgba(0,102,255,0.08)', color: item.cost === 'Free' ? '#16a34a' : '#0066ff', border: `1px solid ${item.cost === 'Free' ? 'rgba(22,163,74,0.2)' : 'rgba(0,102,255,0.15)'}` }}>
                {item.cost}
              </span>
            )}
          </div>

          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: 8 }}>{item.title}</h1>
          {item.provider && <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 12 }}>Provider: {item.provider}</p>}
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.97rem', marginBottom: 20 }}>{item.description}</p>

          {item.duration && (
            <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(236,64,122,0.06)', border: '1px solid rgba(236,64,122,0.12)', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <Clock size={15} color="#c2185b" />
              <span style={{ fontWeight: 600, color: '#c2185b', fontSize: '0.88rem' }}>{item.duration}</span>
            </div>
          )}

          <div>
            {item.apply_url && (
              <a href={item.apply_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 10, background: 'linear-gradient(135deg, #ec407a, #c2185b)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(236,64,122,0.25)' }}>
                Find This Course <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '28px', marginBottom: 20 }}>
          {item.eligibility && (
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={16} color="var(--accent-primary)" /> Who Can Apply
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
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Similar Programmes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {related.map(r => (
                <Link key={r.id} to={`/training/${r.slug}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, border: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text-primary)', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-deep)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.title}</div>
                    {r.duration && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>{r.duration}</div>}
                  </div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </Link>
              ))}
            </div>
          </div>
        )}
        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 32 }}>Course availability may change. Always confirm with the provider before enrolling.</p>
      </div>
    </div>
  )
}
