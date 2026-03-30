import { Link, useLocation } from 'react-router-dom'
import { Zap, Menu, X } from 'lucide-react'
import { useState } from 'react'

const NAV_LINKS = [
  { to: '/grants',   label: 'Grants' },
  { to: '/benefits', label: 'Benefits' },
  { to: '/loans',    label: 'Loans' },
  { to: '/housing',  label: 'Housing' },
  { to: '/training', label: 'Training' },
  { to: '/about',    label: 'About' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <Zap size={20} />
        UK Funding<span>Hub</span>
      </Link>

      {/* Desktop links */}
      <div className="nav-links-desktop" style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {NAV_LINKS.map(l => {
          const active = pathname === l.to || (l.to !== '/' && pathname.startsWith(l.to))
          return (
            <Link
              key={l.to}
              to={l.to}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: '0.88rem',
                fontWeight: active ? 600 : 500,
                textDecoration: 'none',
                color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                background: active ? 'rgba(0,102,255,0.07)' : 'transparent',
                transition: 'all 0.15s',
              }}
            >
              {l.label}
            </Link>
          )
        })}
        <Link
          to="/tools/eligibility"
          style={{
            marginLeft: 10,
            padding: '8px 18px',
            borderRadius: 20,
            fontSize: '0.85rem',
            fontWeight: 600,
            textDecoration: 'none',
            color: '#fff',
            background: 'linear-gradient(135deg, #0066ff, #004ee0)',
            boxShadow: '0 2px 10px rgba(0,102,255,0.25)',
            whiteSpace: 'nowrap',
          }}
        >
          Check Eligibility →
        </Link>
      </div>

      {/* Mobile burger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="nav-burger"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          padding: 4,
        }}
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: '#fff',
          padding: '12px 20px 20px',
          display: 'flex', flexDirection: 'column', gap: 2,
          borderBottom: '1px solid var(--border)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          zIndex: 200,
        }}>
          {NAV_LINKS.map(l => {
            const active = pathname === l.to || (l.to !== '/' && pathname.startsWith(l.to))
            return (
              <Link
                key={l.to} to={l.to} onClick={() => setOpen(false)}
                style={{
                  padding: '10px 14px', borderRadius: 8, fontSize: '0.95rem',
                  fontWeight: active ? 600 : 500, textDecoration: 'none',
                  color: active ? 'var(--accent-primary)' : 'var(--text-primary)',
                  background: active ? 'rgba(0,102,255,0.07)' : 'transparent',
                }}
              >
                {l.label}
              </Link>
            )
          })}
          <Link
            to="/tools/eligibility" onClick={() => setOpen(false)}
            style={{
              marginTop: 8, padding: '11px 18px', borderRadius: 10,
              fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none',
              color: '#fff', background: 'linear-gradient(135deg, #0066ff, #004ee0)',
              textAlign: 'center',
            }}
          >
            Check My Eligibility →
          </Link>
        </div>
      )}
    </nav>
  )
}
