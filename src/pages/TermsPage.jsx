import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight, FileText } from 'lucide-react'

export default function TermsPage() {
  const navigate = useNavigate()

  return (
    <>
      <nav className="navbar">
        <button className="btn-back-nav" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>
        <span className="navbar-breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={12} />
          <span>Terms & Conditions</span>
        </span>
      </nav>

      <div className="detail-page" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="detail-hero" style={{ padding: '40px 0', borderBottom: '1px solid var(--border)', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <FileText size={32} style={{ color: 'var(--accent-primary)' }} />
            <h1 className="detail-title" style={{ margin: 0 }}>Terms & Conditions</h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Last updated: March 30, 2026</p>
        </div>

        <div className="detail-body" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <section className="detail-section" style={{ marginBottom: '32px' }}>
            <h2 className="detail-section-title">1. Introduction</h2>
            <div className="detail-section-body">
              <p>These Terms and Conditions govern your use of the UK Grants Finder website and services. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part of these terms, please do not use our website.</p>
            </div>
          </section>

          <section className="detail-section" style={{ marginBottom: '32px' }}>
            <h2 className="detail-section-title">2. Use of Service</h2>
            <div className="detail-section-body">
              <p>You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website. Prohibited behaviour includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content or disrupting the normal flow of dialogue within our website.</p>
            </div>
          </section>

          <section className="detail-section" style={{ marginBottom: '32px' }}>
            <h2 className="detail-section-title">3. Accuracy of Information</h2>
            <div className="detail-section-body">
              <p>While we strive to provide accurate and up-to-date information regarding grants and funding, the data provided is sourced from various public organizations. UK Grants Finder makes no warranties or representations regarding the accuracy, completeness, or reliability of any information displayed on the website. Users are advised to independently verify all details before submitting applications or making financial decisions.</p>
            </div>
          </section>

          <section className="detail-section" style={{ marginBottom: '32px' }}>
            <h2 className="detail-section-title">4. Third-Party Links</h2>
            <div className="detail-section-body">
              <p>Our website contains links to third-party websites or services that are not owned or controlled by UK Grants Finder. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such websites or services.</p>
            </div>
          </section>

          <section className="detail-section" style={{ marginBottom: '32px' }}>
            <h2 className="detail-section-title">5. Intellectual Property</h2>
            <div className="detail-section-body">
              <p>The content, layout, design, data, databases and graphics on this website are protected by United Kingdom and other international intellectual property laws and are owned by UK Grants Finder or its licensors. Unless expressly permitted in writing, you may not copy, distribute, extract, or reuse any part of our website.</p>
            </div>
          </section>

          <section className="detail-section" style={{ marginBottom: '32px' }}>
            <h2 className="detail-section-title">6. Changes to Terms</h2>
            <div className="detail-section-body">
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
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
