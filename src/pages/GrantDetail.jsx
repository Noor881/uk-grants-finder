import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Building2, MapPin, Clock, CalendarDays,
  PoundSterling, CheckCircle, ExternalLink, BookOpen,
  Users, Tag, Wifi, AlertCircle, ChevronRight
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { CATEGORIES } from './HomePage.jsx'

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

  return (
    <>
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
              <p>{grant.full_description || grant.unique_content || 'No description available.'}</p>
            </Section>

            {/* Who can apply */}
            <Section icon={Users} title="Who Can Apply" accent={cat.color}>
              <p>{grant.who_can_apply || grant.eligibility_details || grant.eligibility || 'Check the applying body for eligibility criteria.'}</p>
            </Section>

            {/* Eligibility */}
            {grant.eligibility_details && grant.eligibility_details !== grant.who_can_apply && (
              <Section icon={CheckCircle} title="Eligibility Criteria" accent="var(--accent-green)">
                <p>{grant.eligibility_details}</p>
              </Section>
            )}

            {/* How to apply */}
            {grant.how_to_apply && (
              <Section icon={Tag} title="How to Apply" accent="var(--accent-purple)">
                <p>{grant.how_to_apply}</p>
              </Section>
            )}

            {/* Additional info */}
            {grant.additional_info && (
              <Section icon={Wifi} title="Additional Information" accent="var(--accent-secondary)">
                <p>{grant.additional_info}</p>
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
          </div>

          {/* ── Sidebar ── */}
          <aside className="detail-sidebar">

            {/* Key details */}
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Key Details</h3>
              <MetaRow label="Applying Body" value={grant.applying_body || grant.council_name} />
              <MetaRow label="Location" value={grant.location} />
              <MetaRow label="Opening Date" value={grant.opening_date} />
              <MetaRow label="Closing Date" value={grant.closing_date} />
              <MetaRow label="Grant Size" value={grant.grant_size} />
              <MetaRow label="Funding Type" value={grant.funding_type} />
              <MetaRow label="Status" value={grant.status} />
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

      <footer className="footer">
        <Link to="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>← Back to All Grants</Link>
        &nbsp;· Powered by <strong>Supabase</strong> · Data from GOV.UK and UK funding bodies
      </footer>
    </>
  )
}
