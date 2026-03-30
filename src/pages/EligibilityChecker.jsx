import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react'

const QUESTIONS = [
  {
    id: 'age',
    question: 'How old are you?',
    hint: 'Some schemes are age-restricted',
    options: [
      { value: 'under18',  label: 'Under 18' },
      { value: '18to24',   label: '18 – 24' },
      { value: '25to59',   label: '25 – 59' },
      { value: '60plus',   label: '60 or over' },
    ],
  },
  {
    id: 'status',
    question: 'What is your current employment status?',
    hint: 'This affects which schemes you can access',
    options: [
      { value: 'employed',    label: 'Employed (full or part time)' },
      { value: 'selfemployed',label: 'Self-employed or running a business' },
      { value: 'unemployed',  label: 'Not currently working' },
      { value: 'student',     label: 'In education or training' },
      { value: 'retired',     label: 'Retired' },
    ],
  },
  {
    id: 'housing',
    question: 'What is your housing situation?',
    hint: 'Several housing schemes depend on whether you rent or own',
    options: [
      { value: 'owner',       label: 'I own my home (with or without a mortgage)' },
      { value: 'private_rent',label: 'I rent privately' },
      { value: 'social_rent', label: 'I rent from a council or housing association' },
      { value: 'living_with', label: 'I live with family or friends' },
    ],
  },
  {
    id: 'income',
    question: 'What is your approximate annual household income?',
    hint: 'Used to check means-tested benefits and grants',
    options: [
      { value: 'under16k',  label: 'Under £16,000' },
      { value: '16to25k',   label: '£16,000 – £25,000' },
      { value: '25to50k',   label: '£25,000 – £50,000' },
      { value: 'over50k',   label: 'Over £50,000' },
    ],
  },
  {
    id: 'interest',
    question: 'What type of support are you most interested in?',
    hint: 'Pick the one that matches your main need right now',
    options: [
      { value: 'grants',    label: '💰 Grants — free money for a project or need' },
      { value: 'benefits',  label: '🏛️ Benefits — regular payments I may be owed' },
      { value: 'loans',     label: '🏦 Business loan — to start or grow a business' },
      { value: 'housing',   label: '🏠 Housing — help with rent, buying, or repairs' },
      { value: 'training',  label: '🎓 Training — free courses or skills funding' },
    ],
  },
]

function matchResults(answers) {
  const results = []

  // Always relevant
  results.push({
    section: 'Grants',
    to: '/grants',
    emoji: '💰',
    reason: 'Over 150 UK government grants are currently listed — browse by category to find what applies to you.',
    color: '#0066ff',
    bg: 'rgba(0,102,255,0.07)',
  })

  // Benefits
  if (['under16k', '16to25k'].includes(answers.income) || answers.status === 'unemployed') {
    results.push({
      section: 'Benefits',
      to: '/benefits',
      emoji: '🏛️',
      reason: 'Based on your income and employment status, you may be eligible for Universal Credit, Council Tax Reduction or other payments.',
      color: '#ffb300',
      bg: 'rgba(255,179,0,0.07)',
    })
  }

  // Housing
  if (['private_rent', 'social_rent'].includes(answers.housing) && ['under16k', '16to25k'].includes(answers.income)) {
    results.push({
      section: 'Housing Benefits & Schemes',
      to: '/housing',
      emoji: '🏠',
      reason: 'As a renter on a lower income you may qualify for Housing Benefit, Council Tax Reduction or the ECO4 energy efficiency scheme.',
      color: '#00bfa5',
      bg: 'rgba(0,191,165,0.07)',
    })
  }

  if (answers.housing === 'owner') {
    results.push({
      section: 'Home Improvement Schemes',
      to: '/housing',
      emoji: '🏠',
      reason: 'As a homeowner you may be eligible for the Boiler Upgrade Scheme, ECO4 energy improvements or the Disabled Facilities Grant.',
      color: '#00bfa5',
      bg: 'rgba(0,191,165,0.07)',
    })
  }

  // Business loans
  if (['employed', 'selfemployed', 'unemployed'].includes(answers.status)) {
    results.push({
      section: 'Business Loans',
      to: '/loans',
      emoji: '🏦',
      reason: 'Government-backed Start Up Loans (up to £25,000 at 6%) are available to anyone aged 18+ looking to start or grow a UK business.',
      color: '#7c3aed',
      bg: 'rgba(124,58,237,0.07)',
    })
  }

  // Training
  if (['18to24', '25to59'].includes(answers.age)) {
    results.push({
      section: 'Free Training',
      to: '/training',
      emoji: '🎓',
      reason: 'Free Skills Bootcamps, Level 3 courses and apprenticeships are available for eligible adults in England — most are fully funded.',
      color: '#ec407a',
      bg: 'rgba(236,64,122,0.07)',
    })
  }

  // Interest-based boost
  if (answers.interest === 'benefits' && !results.find(r => r.section === 'Benefits')) {
    results.push({
      section: 'Benefits',
      to: '/benefits',
      emoji: '🏛️',
      reason: 'Browse the full list of UK benefits including Universal Credit, PIP, Child Benefit and more.',
      color: '#ffb300',
      bg: 'rgba(255,179,0,0.07)',
    })
  }

  // Deduplicate by section
  const seen = new Set()
  return results.filter(r => {
    if (seen.has(r.section)) return false
    seen.add(r.section)
    return true
  })
}

export default function EligibilityChecker() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)
  const [results, setResults] = useState([])

  function select(id, value) {
    const updated = { ...answers, [id]: value }
    setAnswers(updated)
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 200)
    } else {
      const matched = matchResults(updated)
      setResults(matched)
      setDone(true)
    }
  }

  function restart() {
    setStep(0)
    setAnswers({})
    setDone(false)
    setResults([])
  }

  const q = QUESTIONS[step]
  const progress = ((step) / QUESTIONS.length) * 100

  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '60px 24px' }}>
          <div style={{
            background: '#fff', borderRadius: 20,
            border: '1px solid var(--border)', boxShadow: 'var(--shadow)',
            padding: '40px 40px 36px',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>
                Your Results
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Based on your answers, here is what you may be eligible for:
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
              {results.map(r => (
                <Link
                  key={r.section} to={r.to}
                  style={{
                    display: 'flex', gap: 16, alignItems: 'flex-start',
                    padding: '18px 20px', borderRadius: 14,
                    background: r.bg, border: `1px solid ${r.color}25`,
                    textDecoration: 'none', color: 'inherit',
                    transition: 'transform 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{r.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: r.color, marginBottom: 4 }}>
                      {r.section}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {r.reason}
                    </div>
                  </div>
                  <ChevronRight size={18} color={r.color} style={{ marginLeft: 'auto', flexShrink: 0, marginTop: 2 }} />
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={restart}
                style={{
                  padding: '10px 24px', borderRadius: 10, border: '1px solid var(--border)',
                  background: '#fff', cursor: 'pointer', fontWeight: 600,
                  fontSize: '0.9rem', color: 'var(--text-secondary)',
                }}
              >
                Start Again
              </button>
              <Link
                to="/grants"
                style={{
                  padding: '10px 24px', borderRadius: 10,
                  background: 'linear-gradient(135deg, #0066ff, #004ee0)',
                  color: '#fff', fontWeight: 600, fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                Browse All Grants →
              </Link>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 20 }}>
            This tool is for guidance only. Always check official GOV.UK sources to confirm your eligibility.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 24px' }}>

        {/* Progress bar */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Question {step + 1} of {QUESTIONS.length}
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
              {Math.round(progress)}% complete
            </span>
          </div>
          <div style={{ height: 6, background: 'var(--border)', borderRadius: 99 }}>
            <div style={{
              height: '100%', borderRadius: 99,
              background: 'linear-gradient(90deg, #0066ff, #004ee0)',
              width: `${progress}%`, transition: 'width 0.3s ease',
            }} />
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: '#fff', borderRadius: 20,
          border: '1px solid var(--border)', boxShadow: 'var(--shadow)',
          padding: '40px',
        }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 8 }}>{q.hint}</p>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', fontWeight: 800, marginBottom: 28, color: 'var(--text-primary)', lineHeight: 1.3 }}>
            {q.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map(opt => {
              const selected = answers[q.id] === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => select(q.id, opt.value)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 12,
                    border: selected ? '2px solid var(--accent-primary)' : '1.5px solid var(--border)',
                    background: selected ? 'rgba(0,102,255,0.06)' : '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.95rem',
                    fontWeight: selected ? 600 : 500,
                    color: selected ? 'var(--accent-primary)' : 'var(--text-primary)',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = 'var(--border-hover)' }}
                  onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  {opt.label}
                  {selected && <CheckCircle size={18} color="var(--accent-primary)" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Back */}
        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            style={{
              marginTop: 20, display: 'flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 500,
            }}
          >
            <ChevronLeft size={16} /> Back
          </button>
        )}

        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 24 }}>
          No personal data is stored. Your answers are used only to show relevant results.
        </p>
      </div>
    </div>
  )
}
