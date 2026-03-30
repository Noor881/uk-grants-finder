import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import LandingPage from './pages/LandingPage.jsx'
import HomePage from './pages/HomePage.jsx'
import GrantDetail from './pages/GrantDetail.jsx'
import BenefitsPage from './pages/BenefitsPage.jsx'
import LoansPage from './pages/LoansPage.jsx'
import HousingPage from './pages/HousingPage.jsx'
import TrainingPage from './pages/TrainingPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<LandingPage />} />
        <Route path="/grants"    element={<HomePage />} />
        <Route path="/grant/:slug" element={<GrantDetail />} />
        <Route path="/benefits"  element={<BenefitsPage />} />
        <Route path="/loans"     element={<LoansPage />} />
        <Route path="/housing"   element={<HousingPage />} />
        <Route path="/training"  element={<TrainingPage />} />
        <Route path="/terms"     element={<TermsPage />} />
        <Route path="/privacy"   element={<PrivacyPage />} />
        <Route path="/about"     element={<AboutPage />} />
        <Route path="/contact"   element={<ContactPage />} />
      </Routes>
      <CookieBanner />
    </>
  )
}
