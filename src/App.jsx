import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import LandingPage from './pages/LandingPage.jsx'
import HomePage from './pages/HomePage.jsx'
import GrantDetail from './pages/GrantDetail.jsx'
import BenefitsPage from './pages/BenefitsPage.jsx'
import BenefitDetail from './pages/BenefitDetail.jsx'
import LoansPage from './pages/LoansPage.jsx'
import LoanDetail from './pages/LoanDetail.jsx'
import HousingPage from './pages/HousingPage.jsx'
import HousingDetail from './pages/HousingDetail.jsx'
import TrainingPage from './pages/TrainingPage.jsx'
import TrainingDetail from './pages/TrainingDetail.jsx'
import EligibilityChecker from './pages/EligibilityChecker.jsx'
import TermsPage from './pages/TermsPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import BlogPost from './pages/BlogPost.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"                     element={<LandingPage />} />
        <Route path="/grants"               element={<HomePage />} />
        <Route path="/grant/:slug"          element={<GrantDetail />} />
        <Route path="/benefits"             element={<BenefitsPage />} />
        <Route path="/benefit/:slug"        element={<BenefitDetail />} />
        <Route path="/loans"                element={<LoansPage />} />
        <Route path="/loan/:slug"           element={<LoanDetail />} />
        <Route path="/housing"              element={<HousingPage />} />
        <Route path="/housing/:slug"        element={<HousingDetail />} />
        <Route path="/training"             element={<TrainingPage />} />
        <Route path="/training/:slug"       element={<TrainingDetail />} />
        <Route path="/tools/eligibility"    element={<EligibilityChecker />} />
        <Route path="/terms"                element={<TermsPage />} />
        <Route path="/privacy"              element={<PrivacyPage />} />
        <Route path="/about"                element={<AboutPage />} />
        <Route path="/contact"              element={<ContactPage />} />
        <Route path="/guides"               element={<BlogPage />} />
        <Route path="/guides/:slug"         element={<BlogPost />} />
      </Routes>
      <CookieBanner />
      <Analytics />
    </>
  )
}
