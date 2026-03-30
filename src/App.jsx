import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import GrantDetail from './pages/GrantDetail.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/grant/:slug" element={<GrantDetail />} />
    </Routes>
  )
}
