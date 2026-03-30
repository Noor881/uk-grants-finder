import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, CreditCard, Baby, Home, Heart, Users, Zap } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const CATS = [
  { key: 'all',               label: 'All Benefits',     color: '#0066ff' },
  { key: 'Universal Credit',  label: 'Universal Credit', color: '#ffb300' },
  { key: 'Disability',        label: 'Disability',       color: '#ec407a' },
  { key: 'Housing',           label: 'Housing',          color: '#00bfa5' },
  { key: 'Family',            label: 'Family & Children',color: '#7c3aed' },
  { key: 'Health',            label: 'Health',           color: '#26c6da' },
  { key: 'Employment',        label: 'Employment',       color: '#66bb6a' },
]

function BenefitCard({ item }) {
  return (
    <div className="grant-card" style={{ cursor: 'default' }}>
      <div className="card-header">
        <span className="card-grant-type">{item.category}</span>
        <span className="status-badge status-active">
          <span className="live-dot" style={{ width: 6, height: 6 }} />
          {item.status}
        </span>
      </div>
      <h3 className="card-title">{item.title}</h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '8px 0 12px' }}>
        {item.description?.slice(0, 160)}...
      </p>
      {item.amount && (
        <div style={{ marginBottom: 12 }}>
          <span style={{
            padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem',
            fontWeight: 600, background: 'rgba(255,179,0,0.1)', color: '#b37800',
            border: '1px solid rgba(255,179,0,0.2)',
          }}>
            💰 {item.amount}
          </span>
        </div>
      )}
      {item.gov_url && (
        <a href={item.gov_url} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-block', padding: '8px 18px', borderRadius: 8,
            background: 'var(--accent-primary)', color: '#fff', fontWeight: 600,
            fontSize: '0.85rem', textDecoration: 'none',
          }}>
          Check Eligibility →
        </a>
      )}
    </div>
  )
}

export default function BenefitsPage() {
  const [benefits, setBenefits] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')

  useEffect(() => {
    async function load() {
      setLoading(true)
      let q = supabase.from('uk_benefits').select('*').order('last_updated', { ascending: false })
      if (cat !== 'all') q = q.eq('category', cat)
      if (search) q = q.ilike('title', `%${search}%`)
      const { data } = await q.limit(60)
      setBenefits(data || [])
      setLoading(false)
    }
    load()
  }, [search, cat])

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        padding: '48px 24px 40px',
        background: 'linear-gradient(180deg, rgba(255,179,0,0.06) 0%, transparent 100%)',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 12 }}>
          🏛️ UK Benefits Finder
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 28, maxWidth: 560, margin: '0 auto 28px' }}>
          Find government benefits and entitlements you may be eligible to claim
        </p>
        <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search benefits..."
            style={{
              width: '100%', padding: '14px 14px 14px 46px',
              borderRadius: 12, border: '1px solid var(--border)',
              background: 'var(--bg-card)', fontSize: '0.95rem',
              outline: 'none', boxShadow: 'var(--shadow)',
            }}
          />
        </div>
      </section>

      {/* Filter tabs */}
      <div style={{ padding: '16px 24px', display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 1100, margin: '0 auto' }}>
        {CATS.map(c => (
          <button key={c.key} onClick={() => setCat(c.key)} style={{
            padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
            fontWeight: 600, fontSize: '0.82rem', transition: 'all 0.2s',
            background: cat === c.key ? c.color : 'var(--bg-card)',
            color: cat === c.key ? '#fff' : 'var(--text-secondary)',
            boxShadow: cat === c.key ? `0 4px 12px ${c.color}40` : 'var(--shadow)',
          }}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 24px 60px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            Loading benefits...
          </div>
        ) : benefits.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔄</div>
            <h3 style={{ marginBottom: 8 }}>Fetching benefits data</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
              Our scraper is collecting benefits from GOV.UK. Check back in a few minutes.
            </p>
            <a href="https://www.gov.uk/browse/benefits" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
              Browse GOV.UK benefits directly →
            </a>
          </div>
        ) : (
          <div className="cards-grid">
            {benefits.map(b => <BenefitCard key={b.id} item={b} />)}
          </div>
        )}
      </main>
    </div>
  )
}
