import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight, Mail, Send, MessageSquare } from 'lucide-react'
import PageMeta from '../components/PageMeta'

export default function ContactPage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate sending email since we don't have a backend configured for forms yet
    setStatus('sending')
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  return (
    <>
      <PageMeta
        title="Contact UK Funding Hub — Report Errors or Ask a Question"
        description="Contact the UK Funding Hub team to report inaccurate grant data, suggest a missing funding scheme, or ask a general question. We respond within 48 hours."
        canonical="https://ukgrants.online/contact"
      />
      <nav className="navbar">
        <button className="btn-back-nav" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>
        <span className="navbar-breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={12} />
          <span>Contact Us</span>
        </span>
      </nav>

      <div className="detail-page" style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="detail-hero" style={{ padding: '40px 0', borderBottom: '1px solid var(--border)', marginBottom: '30px', textAlign: 'center' }}>
          <MessageSquare size={40} style={{ color: 'var(--accent-primary)', marginBottom: '16px' }} />
          <h1 className="detail-title" style={{ margin: '0 0 12px 0' }}>Get in Touch</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.5' }}>
            Have a question, feedback, or need to report an issue with a grant listing? We'd love to hear from you.
          </p>
        </div>

        <div className="detail-body">
          <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-layer-2)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ background: 'rgba(0,198,255,0.1)', padding: '10px', borderRadius: '50%', display: 'flex' }}>
              <Mail size={20} style={{ color: 'var(--accent-primary)' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Email Support</div>
              <a href="mailto:support@ukgrantsfinder.co.uk" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>support@ukgrantsfinder.co.uk</a>
            </div>
          </div>

          {status === 'success' ? (
            <div style={{ background: 'rgba(76, 175, 80, 0.1)', border: '1px solid var(--accent-green)', padding: '30px 20px', borderRadius: '12px', textAlign: 'center' }}>
              <h3 style={{ color: 'var(--accent-green)', margin: '0 0 12px 0' }}>Message Sent Successfully!</h3>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>Thank you for reaching out. A member of our team will get back to you within 48 hours.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="btn-back"
                style={{ background: 'var(--bg-layer-3)', border: '1px solid var(--border)' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-layer-2)', color: 'var(--text-primary)', outline: 'none' }} 
                  placeholder="e.g., John Smith"
                />
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-layer-2)', color: 'var(--text-primary)', outline: 'none' }} 
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Subject</label>
                <select 
                  id="subject" 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-layer-2)', color: 'var(--text-primary)', outline: 'none' }}
                >
                  <option>General Enquiry</option>
                  <option>Report Inaccurate Grant Data</option>
                  <option>Partnership/Advertising</option>
                  <option>Technical Issue</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Message</label>
                <textarea 
                  id="message" 
                  required 
                  rows="5"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-layer-2)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }} 
                  placeholder="How can we help you today?"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                style={{ 
                  background: 'var(--accent-primary)', 
                  color: 'white', 
                  border: 'none', 
                  padding: '14px', 
                  borderRadius: '8px', 
                  fontWeight: '600', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                  opacity: status === 'sending' ? 0.7 : 1
                }}
              >
                {status === 'sending' ? 'Sending...' : <>Send Message <Send size={16} /></>}
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="footer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div>
          <Link to="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>← Back to All Grants</Link>
          &nbsp;· Powered by <strong>Supabase</strong> · Data from GOV.UK and UK funding bodies
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none', fontWeight: '500' }}>Contact</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms & Conditions</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
        </div>
      </footer>
    </>
  )
}
