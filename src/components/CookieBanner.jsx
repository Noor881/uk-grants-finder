import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setShow(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, 
      background: 'var(--bg-card)', borderTop: '1px solid var(--border)',
      padding: '20px', zIndex: 9999, display: 'flex', 
      justifyContent: 'center', boxShadow: '0 -4px 12px rgba(0,0,0,0.1)'
    }}>
      <div style={{ maxWidth: '1000px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', flex: '1 1 300px', lineHeight: '1.5' }}>
          We use cookies to ensure you get the best experience on our website, to analyze our traffic, and for personalized advertising via Google AdSense. 
          By clicking "Accept All", you consent to our use of cookies.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          <Link to="/privacy" style={{ background: 'transparent', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: '6px', color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>Privacy Policy</Link>
          <button onClick={accept} style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600 }}>Accept All</button>
        </div>
      </div>
    </div>
  )
}
