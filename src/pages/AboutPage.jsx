import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight, Info, Users, Shield, Target } from 'lucide-react'

export default function AboutPage() {
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
          <span>About Us</span>
        </span>
      </nav>

      <div className="detail-page" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="detail-hero" style={{ padding: '40px 0', borderBottom: '1px solid var(--border)', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Info size={32} style={{ color: 'var(--accent-primary)' }} />
            <h1 className="detail-title" style={{ margin: 0 }}>About UK Grants Finder</h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.5' }}>
            Connecting individuals, families, and businesses with essential UK government funding and council grants.
          </p>
        </div>

        <div className="detail-body" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <section className="detail-section" style={{ marginBottom: '40px' }}>
            <h2 className="detail-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={20} style={{ color: 'var(--accent-red)' }} />
              Our Mission
            </h2>
            <div className="detail-section-body">
              <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
                Navigating the complex landscape of UK government grants can be overlapping and confusing. Our mission is to democratize access to financial support by providing a clear, real-time, and easily searchable database of all public funding opportunities.
              </p>
              <p>
                We believe that nobody should miss out on essential financial support—whether for home energy improvements, business growth, or community projects—simply because it was too difficult to find.
              </p>
            </div>
          </section>

          <section className="detail-section" style={{ marginBottom: '40px' }}>
            <h2 className="detail-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={20} style={{ color: 'var(--accent-green)' }} />
              How We Source Data
            </h2>
            <div className="detail-section-body">
              <p>
                Trust and accuracy are our top priorities. All grants listed on our platform are aggregated directly from verified sources:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '10px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>Official <strong>GOV.UK</strong> public APIs and data releases.</li>
                <li style={{ marginBottom: '8px' }}>Direct publications from Local Authority Council websites.</li>
                <li style={{ marginBottom: '8px' }}>National funding bodies and recognized non-profit organizations.</li>
              </ul>
              <p>
                Our database is automatically updated every hour to ensure you only see active and available funding schemes.
              </p>
            </div>
          </section>

          <section className="detail-section" style={{ marginBottom: '40px' }}>
            <h2 className="detail-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} style={{ color: 'var(--accent-purple)' }} />
              Who We Help
            </h2>
            <div className="detail-section-body">
              <p>
                UK Grants Finder is designed to assist:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                <li style={{ marginBottom: '8px' }}><strong>Homeowners & Tenants:</strong> Finding ECO4 energy grants, boiler schemes, and cost-of-living support.</li>
                <li style={{ marginBottom: '8px' }}><strong>Small Businesses:</strong> Discovering local council growth grants, innovation funding, and tax relief schemes.</li>
                <li style={{ marginBottom: '8px' }}><strong>Communities:</strong> Locating regional youth, sports, and environment improvement trusts.</li>
              </ul>
            </div>
          </section>

          <div style={{ padding: '24px', background: 'var(--bg-layer-2)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center', marginTop: '20px' }}>
            <h3 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>Need more help?</h3>
            <p style={{ margin: '0 0 16px 0' }}>If you have questions about how to use the platform, get in touch with our team.</p>
            <Link to="/contact" className="btn-back" style={{ display: 'inline-block', background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: '500' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <footer className="footer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div>
          <Link to="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>← Back to All Grants</Link>
          &nbsp;· Powered by <strong>Supabase</strong> · Data from GOV.UK and UK funding bodies
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/about" style={{ color: 'inherit', textDecoration: 'none', fontWeight: '500' }}>About Us</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms & Conditions</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
        </div>
      </footer>
    </>
  )
}
