import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import {
  Search, RefreshCw, MapPin, Clock, Wifi, WifiOff,
  Building2, Zap, ChevronRight, Flame, Briefcase,
  Home, CreditCard, Users, Baby, LayoutGrid, Heart
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

// ── Category config ───────────────────────────────────────────
export const CATEGORIES = [
  { key: 'all',                   label: 'All',              icon: LayoutGrid, color: '#00c6ff' },
  { key: 'Energy & Home',         label: 'Energy & Home',    icon: Flame,      color: '#ff7043' },
  { key: 'Business',              label: 'Business',         icon: Briefcase,  color: '#7c4dff' },
  { key: 'Housing',               label: 'Housing',          icon: Home,       color: '#00bfa5' },
  { key: 'Benefits & Tax',        label: 'Benefits & Tax',   icon: CreditCard, color: '#ffb300' },
  { key: 'Community',             label: 'Community',        icon: Users,      color: '#26c6da' },
  { key: 'Families & Children',   label: 'Families',         icon: Baby,       color: '#ec407a' },
  { key: 'Health & Wellbeing',    label: 'Health',           icon: Heart,      color: '#66bb6a' },
  { key: 'Agriculture & Environment', label: 'Agriculture',  icon: Flame,      color: '#8d6e63' },
]

function getCat(key) {
  return CATEGORIES.find(c => c.key === key) || CATEGORIES[0]
}

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

// ── Grant Card ────────────────────────────────────────────────
function GrantCard({ grant }) {
  const navigate = useNavigate()
  const cat = getCat(grant.category)
  const CatIcon = cat.icon

  return (
    <div
      className="grant-card"
      onClick={() => navigate(`/grant/${grant.slug}`)}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/grant/${grant.slug}`)}
    >
      <div className="card-header">
        <span className="card-grant-type">{grant.grant_type}</span>
        <span className={`status-badge ${statusClass(grant.status)}`}>
          <span className="live-dot" style={{ width: 6, height: 6 }} />
          {grant.status}
        </span>
      </div>

      <div className="card-council">
        <Building2 size={13} />
        <span>{grant.council_name}</span>
      </div>

      <div className="card-cat-chip" style={{ borderColor: `${cat.color}40`, color: cat.color, background: `${cat.color}12` }}>
        <CatIcon size={11} />
        {grant.category}
      </div>

      {grant.unique_content && (
        <p className="card-description">
          {grant.unique_content.length > 160 ? grant.unique_content.slice(0, 160) + '…' : grant.unique_content}
        </p>
      )}

      <div className="card-footer">
        <div>
          <div className="funding-label">Max Funding</div>
          <div className="funding-value">{grant.max_funding || 'Varies'}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          {grant.last_updated && (
            <div className="card-date"><Clock size={11} />{timeAgo(grant.last_updated)}</div>
          )}
          <span className="card-view-link">View Details <ChevronRight size={12} /></span>
        </div>
      </div>
    </div>
  )
}

// ── HomePage ──────────────────────────────────────────────────
export default function HomePage() {
  const location = useLocation()
  const [grants, setGrants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [refreshing, setRefreshing] = useState(false)
  const [online, setOnline] = useState(navigator.onLine)
  const [toast, setToast] = useState(null)
  const [lastFetched, setLastFetched] = useState(null)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 24

  const fetchGrants = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    else setRefreshing(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('uk_grants')
        .select('id,slug,grant_type,council_name,status,max_funding,unique_content,category,last_updated')
        .order('last_updated', { ascending: false })
      if (err) throw err
      setGrants(data || [])
      setLastFetched(new Date())
      if (silent) showToast(`✅ Refreshed — ${data?.length || 0} grants`)
    } catch (e) {
      setError(e.message)
      if (silent) showToast('❌ Refresh failed')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchGrants()
    const ch = supabase.channel('hp_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'uk_grants' }, p => {
        setGrants(prev => [p.new, ...prev])
        showToast(`🆕 ${p.new.grant_type}`)
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'uk_grants' }, p => {
        setGrants(prev => prev.map(g => g.id === p.new.id ? { ...g, ...p.new } : g))
      })
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [fetchGrants])

  useEffect(() => {
    const on  = () => { setOnline(true);  showToast('🌐 Back online'); fetchGrants(true) }
    const off = () => { setOnline(false); showToast('📡 Offline') }
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [fetchGrants])

  // Reset page when filters change
  useEffect(() => { setPage(1) }, [search, activeCategory, filterStatus])

  // Parse direct AdSense/SEO category links
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const cat = params.get('cat')
    if (cat && CATEGORIES.some(c => c.key === cat)) {
      setActiveCategory(cat)
    }
  }, [location.search])

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 3500) }

  const catCounts = CATEGORIES.reduce((a, c) => ({
    ...a,
    [c.key]: c.key === 'all' ? grants.length : grants.filter(g => g.category === c.key).length
  }), {})

  const filtered = grants.filter(g => {
    const q = search.toLowerCase()
    return (
      (!q || [g.grant_type, g.council_name, g.unique_content, g.category].some(f => f?.toLowerCase().includes(q))) &&
      (activeCategory === 'all' || g.category === activeCategory) &&
      (filterStatus === 'all' || g.status?.toLowerCase() === filterStatus)
    )
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const totalActive = grants.filter(g => g.status?.toLowerCase() === 'active').length
  const uniqueCouncils = [...new Set(grants.map(g => g.council_name).filter(Boolean))].length
  const categories = CATEGORIES.filter(c => c.key !== 'all').filter(c => (catCounts[c.key] || 0) > 0).length

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo"><Zap size={22} />UK Grants Finder</div>
        <div className="navbar-meta">
          {online ? <><span className="live-dot" /> Live</> : <><WifiOff size={13} /> Offline</>}
          {lastFetched && <span style={{ marginLeft: 8 }}>· {timeAgo(lastFetched)}</span>}
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge"><Wifi size={12} />Real-time · Auto-Updated Every Hour</div>
        <h1>Find UK Government<br /><span className="highlight">Grants & Funding</span></h1>
        <p>Every grant sourced directly from GOV.UK and UK funding bodies. Full details, eligibility and how to apply — all on one site.</p>
      </section>

      <div className="stats-row">
        <div className="stat-card"><div className="stat-value">{grants.length.toLocaleString()}</div><div className="stat-label">Total Grants</div></div>
        <div className="stat-card"><div className="stat-value">{totalActive.toLocaleString()}</div><div className="stat-label">Active Now</div></div>
        <div className="stat-card"><div className="stat-value">{uniqueCouncils}</div><div className="stat-label">Organisations</div></div>
        <div className="stat-card"><div className="stat-value">{categories}</div><div className="stat-label">Categories</div></div>
      </div>

      {/* Category tabs */}
      <div className="category-tabs-wrapper">
        <div className="category-tabs">
          {CATEGORIES.filter(c => c.key === 'all' || (catCounts[c.key] || 0) > 0).map(cat => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.key
            return (
              <button key={cat.key} id={`cat-${cat.key.replace(/[\s&]/g, '-')}`}
                className={`cat-tab ${isActive ? 'cat-tab-active' : ''}`}
                style={isActive ? { borderColor: cat.color, color: cat.color, background: `${cat.color}15` } : {}}
                onClick={() => setActiveCategory(cat.key)}
              >
                <Icon size={14} style={{ color: isActive ? cat.color : undefined }} />
                {cat.label}
                <span className="cat-count" style={isActive ? { background: cat.color } : {}}>
                  {catCounts[cat.key] || 0}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="controls">
        <div className="search-wrapper">
          <Search size={15} />
          <input id="search-grants" className="search-input" type="text"
            placeholder="Search grants, councils, keywords…" value={search}
            onChange={e => setSearch(e.target.value)} />
        </div>
        <select id="filter-status" className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button id="refresh-btn" className="refresh-btn" onClick={() => fetchGrants(true)} disabled={refreshing}>
          <RefreshCw size={15} className={refreshing ? 'spinning' : ''} />
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      <main className="grants-section">
        <div className="section-header">
          <span className="section-title">
            <MapPin size={15} style={{ verticalAlign: 'middle', marginRight: 6, color: 'var(--accent-primary)' }} />
            {activeCategory === 'all' ? 'All Funding Opportunities' : activeCategory}
          </span>
          <span className="section-count">{filtered.length.toLocaleString()} result{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="grants-grid">
          {loading && (
            <div className="state-container">
              <div className="spinner" />
              <span className="state-title">Fetching grants…</span>
              <span className="state-sub">Loading live data from database</span>
            </div>
          )}
          {!loading && error && (
            <div className="state-container">
              <span className="state-icon">⚠️</span>
              <span className="state-title">Failed to load</span>
              <span className="state-sub">{error}</span>
              <button className="refresh-btn" style={{ marginTop: 12 }} onClick={() => fetchGrants()}>
                <RefreshCw size={15} /> Try Again
              </button>
            </div>
          )}
          {!loading && !error && paginated.length === 0 && (
            <div className="state-container">
              <span className="state-icon">🔍</span>
              <span className="state-title">No grants found</span>
              <span className="state-sub">{search || filterStatus !== 'all' || activeCategory !== 'all' ? 'Try different filters.' : 'Our system is updating. Check back soon!'}</span>
            </div>
          )}
          {!loading && !error && paginated.map(g => <GrantCard key={g.id} grant={g} />)}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button className="page-btn" disabled={page === 1} onClick={() => { setPage(p => p-1); window.scrollTo(0,0) }}>← Prev</button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let p = i + 1
              if (totalPages > 7) {
                if (page <= 4) p = i + 1
                else if (page >= totalPages - 3) p = totalPages - 6 + i
                else p = page - 3 + i
              }
              return (
                <button key={p} className={`page-btn ${p === page ? 'page-btn-active' : ''}`}
                  onClick={() => { setPage(p); window.scrollTo(0,0) }}>
                  {p}
                </button>
              )
            })}
            <button className="page-btn" disabled={page === totalPages} onClick={() => { setPage(p => p+1); window.scrollTo(0,0) }}>Next →</button>
          </div>
        )}
      </main>

      {/* AdSense Value Add Content */}
      <section style={{ maxWidth: '1000px', margin: '60px auto 40px', padding: '0 20px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px', fontSize: '1.5rem', textAlign: 'center' }}>How UK Grants Finder Empowers You</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          <div style={{ background: 'var(--bg-layer-2)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={18} style={{ color: 'var(--accent-primary)' }} /> 1. Real-Time Tracking</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>We constantly monitor UK Government APIs, local council boards, and official funding bodies to aggregate new grant opportunities the moment they are announced. Our system auto-updates every hour so you never miss a deadline.</p>
          </div>
          <div style={{ background: 'var(--bg-layer-2)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Search size={18} style={{ color: 'var(--accent-primary)' }} /> 2. Simplified Search</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Government websites can be intentionally difficult to navigate. We standardize all data, categorizing grants by type, location, and funding amount, allowing you to filter through thousands of schemes in seconds.</p>
          </div>
          <div style={{ background: 'var(--bg-layer-2)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={18} style={{ color: 'var(--accent-primary)' }} /> 3. Direct Access</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>We are a transparent platform. We do not act as middlemen; we simply provide you with all required eligibility criteria and direct links straight to the official application portals.</p>
          </div>
        </div>
      </section>

      {/* Bot-Crawlable Semantic Links for AdSense / SEO Compliance */}
      <section style={{ maxWidth: '1000px', margin: '0 auto 40px', padding: '0 20px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '16px' }}>Popular Funding Categories</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          {CATEGORIES.filter(c => c.key !== 'all').map(cat => (
            <Link key={cat.key} to={`/?cat=${encodeURIComponent(cat.key)}`} style={{ padding: '8px 16px', background: 'var(--bg-layer-2)', border: '1px solid var(--border)', borderRadius: '20px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.2s' }}>
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      <footer className="footer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div>
          Powered by <strong>Supabase</strong> · Sourced from GOV.UK and UK funding bodies · Auto-updated every 6 hours
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

      {toast && <div className="toast">{toast}</div>}
    </>
  )
}
