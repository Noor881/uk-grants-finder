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
    <nav className="navbar" style={{ justifyContent: 'space-between' }}>
      <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
        <Zap size={20} fill="currentColor" />
        UK Funding Hub
      </Link>

      {/* Desktop */}
      <div className="nav-links-desktop" style={{
        display: 'flex', gap: 4, alignItems: 'center'
      }}>
        {NAV_LINKS.map(l => (
          <Link
            key={l.to}
            to={l.to}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: '0.88rem',
              fontWeight: 500,
              textDecoration: 'none',
              color: pathname.startsWith(l.to) ? '#fff' : 'rgba(255,255,255,0.65)',
              background: pathname.startsWith(l.to) ? 'rgba(0,102,255,0.25)' : 'transparent',
              transition: 'all 0.2s',
            }}
          >
            {l.label}
          </Link>
        ))}
        <Link
          to="/grants"
          style={{
            marginLeft: 8,
            padding: '7px 18px',
            borderRadius: 20,
            fontSize: '0.85rem',
            fontWeight: 600,
            textDecoration: 'none',
            color: '#fff',
            background: 'linear-gradient(135deg, #0066ff, #004ee0)',
            boxShadow: '0 2px 12px rgba(0,102,255,0.3)',
          }}
        >
          Find Funding →
        </Link>
      </div>

      {/* Mobile burger */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        className="nav-burger"
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(4,5,10,0.97)', backdropFilter: 'blur(20px)',
          padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4,
          borderBottom: '1px solid rgba(255,255,255,0.08)', zIndex: 200,
        }}>
          {NAV_LINKS.map(l => (
            <Link
              key={l.to} to={l.to} onClick={() => setOpen(false)}
              style={{
                padding: '10px 14px', borderRadius: 8, fontSize: '0.95rem',
                fontWeight: 500, textDecoration: 'none',
                color: pathname.startsWith(l.to) ? '#fff' : 'rgba(255,255,255,0.7)',
                background: pathname.startsWith(l.to) ? 'rgba(0,102,255,0.2)' : 'transparent',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
