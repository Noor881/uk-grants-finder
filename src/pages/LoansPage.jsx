import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const CATS = [
  { key: 'all',       label: 'All Loans',     color: '#7c3aed' },
  { key: 'Startup',   label: 'Startup',       color: '#0066ff' },
  { key: 'SME',       label: 'SME & Growth',  color: '#00bfa5' },
  { key: 'Recovery',  label: 'Recovery',      color: '#ffb300' },
  { key: 'Innovation',label: 'Innovation',    color: '#ec407a' },
]

function LoanCard({ item }) {
  const navigate = useNavigate()
  return (
    <div
      className="grant-card"
      onClick={() => navigate(`/loan/${item.slug}`)}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/loan/${item.slug}`)}
    >
      <div className="card-header">
        <span className="card-grant-type">{item.category}</span>
        <span className="status-badge status-active">
          <span className="live-dot" style={{ width: 6, height: 6 }} />
          {item.status}
        </span>
      </div>
      <h3 className="card-title">{item.title}</h3>
      {item.provider && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>
          Provider: {item.provider}
        </p>
      )}
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
        {item.description?.slice(0, 160)}...
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {item.max_amount && (
          <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, background: 'rgba(124,58,237,0.1)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.2)' }}>
            💷 Up to {item.max_amount}
          </span>
        )}
        {item.interest_rate && (
          <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, background: 'rgba(0,102,255,0.08)', color: '#0066ff', border: '1px solid rgba(0,102,255,0.15)' }}>
            % {item.interest_rate}
          </span>
        )}
      </div>
    </div>
  )
}

export default function LoansPage() {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')

  useEffect(() => {
    async function load() {
      setLoading(true)
      let q = supabase.from('uk_loans').select('*').order('last_updated', { ascending: false })
      if (cat !== 'all') q = q.eq('category', cat)
      if (search) q = q.ilike('title', `%${search}%`)
      const { data } = await q.limit(60)
      setLoans(data || [])
      setLoading(false)
    }
    load()
  }, [search, cat])

  return (
    <div style={{ minHeight: '100vh' }}>
      <section style={{ padding: '48px 24px 40px', background: 'linear-gradient(180deg, rgba(124,58,237,0.06) 0%, transparent 100%)', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 12 }}>
          🏦 Business Loans Finder
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 560, margin: '0 auto 28px' }}>
          Government-backed loans, startup finance and SME funding schemes
        </p>
        <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search loans..."
            style={{ width: '100%', padding: '14px 14px 14px 46px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)', fontSize: '0.95rem', outline: 'none', boxShadow: 'var(--shadow)' }} />
        </div>
      </section>

      <div style={{ padding: '16px 24px', display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 1100, margin: '0 auto' }}>
        {CATS.map(c => (
          <button key={c.key} onClick={() => setCat(c.key)} style={{ padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', transition: 'all 0.2s', background: cat === c.key ? c.color : 'var(--bg-card)', color: cat === c.key ? '#fff' : 'var(--text-secondary)', boxShadow: cat === c.key ? `0 4px 12px ${c.color}40` : 'var(--shadow)' }}>
            {c.label}
          </button>
        ))}
      </div>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 24px 60px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>Loading loans...</div>
        ) : loans.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🏦</div>
            <h3 style={{ marginBottom: 8 }}>No results found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Try a different search or browse all categories.</p>
            <a href="https://www.startuploans.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', fontWeight: 600 }}>Browse Start Up Loans on GOV.UK →</a>
          </div>
        ) : (
          <div className="cards-grid">{loans.map(l => <LoanCard key={l.id} item={l} />)}</div>
        )}
      </main>
    </div>
  )
}
