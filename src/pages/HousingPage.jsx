import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import PageMeta from '../components/PageMeta'

const CATS = [
  { key: 'all',          label: 'All Schemes',      color: '#00bfa5' },
  { key: 'Help to Buy',  label: 'Help to Buy',      color: '#0066ff' },
  { key: 'ECO4',         label: 'ECO4 Energy',      color: '#ff7043' },
  { key: 'Council',      label: 'Council Schemes',  color: '#ffb300' },
  { key: 'Improvement',  label: 'Improvement',      color: '#7c3aed' },
  { key: 'Shared Ownership', label: 'Shared Ownership', color: '#ec407a' },
]

function HousingCard({ item }) {
  const navigate = useNavigate()
  return (
    <div
      className="grant-card"
      onClick={() => navigate(`/housing/${item.slug}`)}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/housing/${item.slug}`)}
    >
      <div className="card-header">
        <span className="card-grant-type">{item.category}</span>
        <span className="status-badge status-active">
          <span className="live-dot" style={{ width: 6, height: 6 }} />{item.status}
        </span>
      </div>
      <h3 className="card-title">{item.title}</h3>
      {item.location && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>📍 {item.location}</p>
      )}
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
        {item.description?.slice(0, 160)}...
      </p>
      {item.amount && (
        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, background: 'rgba(0,191,165,0.1)', color: '#00897b', border: '1px solid rgba(0,191,165,0.2)' }}>
          💷 {item.amount}
        </span>
      )}
    </div>
  )
}

export default function HousingPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')

  useEffect(() => {
    async function load() {
      setLoading(true)
      let q = supabase.from('uk_housing').select('*').order('last_updated', { ascending: false })
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
        title="UK Housing Grants — ECO4, Help to Buy & Schemes"
        description="Find UK housing grants and schemes: ECO4 energy grants, Help to Buy, Shared Ownership, Disabled Facilities Grant, Warm Home Discount and council housing support."
        canonical="https://ukgrants.online/housing"
      />
      <section style={{ padding: '48px 24px 40px', background: 'linear-gradient(180deg, rgba(0,191,165,0.06) 0%, transparent 100%)', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 12 }}>
          🏠 Housing Schemes
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 560, margin: '0 auto 28px' }}>
          Help to Buy, ECO4 energy grants, home improvement and council housing support
        </p>
        <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search housing schemes..."
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
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>Loading schemes...</div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🏠</div>
            <h3 style={{ marginBottom: 8 }}>No results found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Try a different search or browse all categories.</p>
            <a href="https://www.gov.uk/affordable-home-ownership-schemes" target="_blank" rel="noopener noreferrer" style={{ color: '#00bfa5', fontWeight: 600 }}>Browse housing schemes on GOV.UK →</a>
          </div>
        ) : (
          <div className="cards-grid">{items.map(i => <HousingCard key={i.id} item={i} />)}</div>
        )}
      </main>
    </div>
  )
}
