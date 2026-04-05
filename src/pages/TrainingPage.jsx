import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import PageMeta from '../components/PageMeta'

const CATS = [
  { key: 'all',             label: 'All Training',    color: '#ec407a' },
  { key: 'Skills Bootcamp', label: 'Skills Bootcamp', color: '#0066ff' },
  { key: 'Apprenticeship',  label: 'Apprenticeships', color: '#7c3aed' },
  { key: 'Free Course',     label: 'Free Courses',    color: '#00bfa5' },
  { key: 'Adult Learning',  label: 'Adult Learning',  color: '#ffb300' },
]

function TrainingCard({ item }) {
  const navigate = useNavigate()
  return (
    <div
      className="grant-card"
      onClick={() => navigate(`/training/${item.slug}`)}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/training/${item.slug}`)}
    >
      <div className="card-header">
        <span className="card-grant-type">{item.category}</span>
        <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: item.cost === 'Free' ? 'rgba(22,163,74,0.1)' : 'rgba(0,102,255,0.1)', color: item.cost === 'Free' ? '#16a34a' : '#0066ff', border: `1px solid ${item.cost === 'Free' ? 'rgba(22,163,74,0.2)' : 'rgba(0,102,255,0.15)'}` }}>
          {item.cost || 'Funded'}
        </span>
      </div>
      <h3 className="card-title">{item.title}</h3>
      {item.provider && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>🏫 {item.provider}</p>
      )}
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
        {item.description?.slice(0, 160)}...
      </p>
      {item.duration && (
        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, background: 'rgba(236,64,122,0.08)', color: '#c2185b', border: '1px solid rgba(236,64,122,0.15)' }}>
          ⏱ {item.duration}
        </span>
      )}
    </div>
  )
}

export default function TrainingPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')

  useEffect(() => {
    async function load() {
      setLoading(true)
      let q = supabase.from('uk_training').select('*').order('last_updated', { ascending: false })
      if (cat !== 'all') q = q.eq('category', cat)
      if (search) q = q.ilike('title', `%${search}%`)
      const { data } = await q.limit(60)
      setItems(data || [])
      setLoading(false)
    }
    load()
  }, [search, cat])

  return (
    <div style={{ minHeight: '100vh' }}>
      <PageMeta
        title="Free UK Training & Skills Funding — Bootcamps 2025"
        description="Find free UK training and skills funding: Skills Bootcamps, apprenticeships, free courses, adult education and government-funded programmes for 2025."
        canonical="https://ukgrants.online/training"
      />
      <section style={{ padding: '48px 24px 40px', background: 'linear-gradient(180deg, rgba(236,64,122,0.06) 0%, transparent 100%)', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 12 }}>
          🎓 Training & Skills
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 560, margin: '0 auto 28px' }}>
          Free courses, Skills Bootcamps, apprenticeships and funded adult education
        </p>
        <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search training programmes..."
            style={{ width: '100%', padding: '14px 14px 14px 46px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)', fontSize: '0.95rem', outline: 'none', boxShadow: 'var(--shadow)' }} />
        </div>
      </section>

      <div style={{ padding: '16px 24px', display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 1100, margin: '0 auto' }}>
        {CATS.map(c => (
          <button key={c.key} onClick={() => setCat(c.key)} style={{ padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', background: cat === c.key ? c.color : 'var(--bg-card)', color: cat === c.key ? '#fff' : 'var(--text-secondary)', boxShadow: cat === c.key ? `0 4px 12px ${c.color}40` : 'var(--shadow)', transition: 'all 0.2s' }}>
            {c.label}
          </button>
        ))}
      </div>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 24px 60px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>Loading programmes...</div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎓</div>
            <h3 style={{ marginBottom: 8 }}>No results found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Try a different search or browse all categories.</p>
            <a href="https://www.gov.uk/skills-bootcamps" target="_blank" rel="noopener noreferrer" style={{ color: '#ec407a', fontWeight: 600 }}>Browse Skills Bootcamps on GOV.UK →</a>
          </div>
        ) : (
          <div className="cards-grid">{items.map(i => <TrainingCard key={i.id} item={i} />)}</div>
        )}
      </main>
    </div>
  )
}
