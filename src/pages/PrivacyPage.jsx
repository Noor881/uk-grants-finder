import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight, ShieldCheck } from 'lucide-react'
import PageMeta from '../components/PageMeta'

export default function PrivacyPage() {
  const navigate = useNavigate()

  return (
    <>
      <PageMeta
        title="Privacy Policy — UK Funding Hub"
        description="UK Funding Hub privacy policy. We do not sell personal data. Read how we collect, use and protect your information in compliance with UK GDPR."
        canonical="https://ukgrants.online/privacy"
      />
      <nav className="navbar">
        <button className="btn-back-nav" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>
        <span className="navbar-breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={12} />
          <span>Privacy Policy</span>
        </span>
      </nav>

      <div className="detail-page" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="detail-hero" style={{ padding: '40px 0', borderBottom: '1px solid var(--border)', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <ShieldCheck size={32} style={{ color: 'var(--accent-green)' }} />
            <h1 className="detail-title" style={{ margin: 0 }}>Privacy Policy</h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Last updated: March 30, 2026</p>
        </div>

        <div className="detail-body" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <section className="detail-section" style={{ marginBottom: '32px' }}>
            <h2 className="detail-section-title">1. Introduction</h2>
            <div className="detail-section-body">
              <p>Welcome to UK Grants Finder. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
            </div>
          </section>

          <section className="detail-section" style={{ marginBottom: '32px' }}>
            <h2 className="detail-section-title">2. The Data We Collect About You</h2>
            <div className="detail-section-body">
              <p>Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                <li style={{ marginBottom: '8px' }}><strong>Identity Data</strong> includes first name, maiden name, last name, username or similar identifier.</li>
                <li style={{ marginBottom: '8px' }}><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                <li style={{ marginBottom: '8px' }}><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li style={{ marginBottom: '8px' }}><strong>Usage Data</strong> includes information about how you use our website.</li>
              </ul>
            </div>
          </section>

          <section className="detail-section" style={{ marginBottom: '32px' }}>
            <h2 className="detail-section-title">3. How We Use Your Personal Data</h2>
            <div className="detail-section-body">
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                <li style={{ marginBottom: '8px' }}>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li style={{ marginBottom: '8px' }}>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li style={{ marginBottom: '8px' }}>Where we need to comply with a legal obligation.</li>
              </ul>
            </div>
          </section>

          <section className="detail-section" style={{ marginBottom: '32px' }}>
            <h2 className="detail-section-title">4. Data Security</h2>
            <div className="detail-section-body">
              <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.</p>
            </div>
          </section>

          <section className="detail-section" style={{ marginBottom: '32px' }}>
            <h2 className="detail-section-title">5. Your Legal Rights</h2>
            <div className="detail-section-body">
              <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                <li style={{ marginBottom: '8px' }}>Request access to your personal data.</li>
                <li style={{ marginBottom: '8px' }}>Request correction of your personal data.</li>
                <li style={{ marginBottom: '8px' }}>Request erasure of your personal data.</li>
                <li style={{ marginBottom: '8px' }}>Object to processing of your personal data.</li>
                <li style={{ marginBottom: '8px' }}>Request restriction of processing your personal data.</li>
                <li style={{ marginBottom: '8px' }}>Request transfer of your personal data.</li>
                <li style={{ marginBottom: '8px' }}>Right to withdraw consent.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <footer className="footer">
        <Link to="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>← Back to All Grants</Link>
        &nbsp;· Powered by <strong>Supabase</strong> · Data from GOV.UK and UK funding bodies
      </footer>
    </>
  )
}
