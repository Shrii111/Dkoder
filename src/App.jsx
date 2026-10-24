import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import Lenis from 'lenis'
import confetti from 'canvas-confetti'
import { FaAmazon, FaMicrosoft } from 'react-icons/fa6'
import {
  siGoogle,
  siTcs,
  siInfosys,
  siWipro,
  siAccenture,
  siHcl,
  siZoho,
} from 'simple-icons'
import {
  Activity,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  CirclePlay,
  Clock3,
  Code2,
  FileCheck2,
  GraduationCap,
  Home,
  Laptop2,
  Lightbulb,
  Map,
  Menu,
  MessageSquareText,
  RotateCcw,
  Rocket,
  Search,
  Sparkles,
  Sun,
  Moon,
  Target,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import './App.css'
import DokiAssistant from './components/DokiAssistant.jsx'
import InteractiveButton from './components/InteractiveButton.jsx'
import SkillRoadmapDemo from './components/SkillRoadmapDemo.jsx'
import CodingPlayground from './components/CodingPlayground.jsx'
import ibmLogo from './assets/logos/ibm.svg'
import adobeLogo from './assets/logos/adobe.svg'

const SkillEngine3D = lazy(() => import('./components/SkillEngine3D.jsx'))

const sidebarLinks = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'playground', label: 'Build', icon: Code2 },
  { id: 'hackathons', label: 'Hackathons', icon: Rocket },
  { id: 'colleges', label: 'Colleges', icon: GraduationCap },
  { id: 'faq', label: 'FAQ', icon: CircleHelp },
]

const journeySteps = [
  {
    id: 'learn',
    number: '01',
    title: 'LEARN',
    subtitle: 'Make the basics feel easy.',
    description: 'Build strong fundamentals with focused lessons, technical MCQs, and aptitude practice.',
    icon: Lightbulb,
    target: 'features',
  },
  {
    id: 'build',
    number: '02',
    title: 'BUILD',
    subtitle: 'Turn ideas into ability.',
    description: 'Solve coding problems, create practical projects, and learn by making things work.',
    icon: Code2,
    target: 'practice',
  },
  {
    id: 'grow',
    number: '03',
    title: 'GROW',
    subtitle: 'Show up ready for what’s next.',
    description: 'Use mock assessments and interview practice to build confidence at your own pace.',
    icon: Target,
    target: 'dashboard',
  },
]

const featureCards = [
  { title: 'Coding practice', description: 'Short, focused challenges for stronger problem-solving habits.', icon: Code2, tone: 'violet' },
  { title: 'MCQs & aptitude', description: 'Sharpen technical fundamentals, reasoning, and accuracy.', icon: Brain, tone: 'yellow' },
  { title: 'Company tracks', description: 'Explore illustrative preparation paths by skill and role.', icon: BriefcaseBusiness, tone: 'pink' },
  { title: 'Mock tests', description: 'Practice pacing and recall with timed assessment previews.', icon: FileCheck2, tone: 'blue' },
  { title: 'Progress tracking', description: 'See a sample view of topics, goals, and weekly activity.', icon: BarChart3, tone: 'green' },
]

const companies = [
  { name: 'Google', group: 'Product Based', focus: 'Algorithms · Problem solving', color: 'google', logo: siGoogle },
  { name: 'Microsoft', group: 'Product Based', focus: 'DSA · Core computer science', color: 'microsoft', logoComponent: FaMicrosoft },
  { name: 'Amazon', group: 'Product Based', focus: 'Coding · Aptitude · Interviews', color: 'amazon', logoComponent: FaAmazon },
  { name: 'TCS', group: 'IT Services', focus: 'Aptitude · Programming basics', color: 'tcs', logo: siTcs },
  { name: 'Infosys', group: 'IT Services', focus: 'Reasoning · Coding · Interviews', color: 'infosys', logo: siInfosys },
  { name: 'Wipro', group: 'IT Services', focus: 'Reasoning · Programming · Interviews', color: 'wipro', logo: siWipro },
  { name: 'Accenture', group: 'IT Services', focus: 'Aptitude · Coding · Role skills', color: 'accenture', logo: siAccenture },
  { name: 'HCLTech', group: 'IT Services', focus: 'Programming · Core technology · Interviews', color: 'hcltech', logo: siHcl },
  { name: 'IBM', group: 'Product Based', focus: 'Computer science · Coding · Interviews', color: 'ibm', logoSrc: ibmLogo },
  { name: 'Adobe', group: 'Product Based', focus: 'Algorithms · Problem solving · Design', color: 'adobe', logoSrc: adobeLogo },
  { name: 'Zoho', group: 'Startups', focus: 'Programming · Product thinking', color: 'zoho', logo: siZoho },
]

const faqs = [
  { question: 'Where should I start if I’m new to coding?', answer: 'Start with the Learn stage: choose a language, strengthen the fundamentals, then move into short, beginner-friendly problems. The roadmap preview is a sample guide, not a required sequence.' },
  { question: 'What can I do in the practice demo?', answer: 'Try the sample multiple-choice question, submit your answer, and reset it to practice again. The demo runs locally in this page and does not save results to an account.' },
  { question: 'Are the company tracks official or affiliated?', answer: 'No. These are illustrative preparation categories only. Dkoder is not claiming an official partnership or endorsement by any of the companies shown.' },
  { question: 'Is the dashboard connected to my account?', answer: 'No. Dashboard metrics and activity are example preview data to show how a learning dashboard could work. No account or backend is connected here.' },
  { question: 'How can a college explore working with Dkoder?', answer: 'Use the Apply for MOU button to review a clear demo notice. It does not submit an application; a verified contact route can be added when one is provided.' },
]

const hackathons = [
  { title: 'Campus Build Sprint', type: 'Build', date: 'Sample format · 1 day', detail: 'A guided, fictional event preview for teams to prototype a campus-life solution.' },
  { title: 'Code & Logic Jam', type: 'Coding', date: 'Sample format · 2 hours', detail: 'A fictional challenge format focused on approachable coding and reasoning rounds.' },
  { title: 'Design to Demo', type: 'Build', date: 'Sample format · Weekend', detail: 'An illustrative team sprint from problem framing to a clickable prototype.' },
]

const practiceOptions = [
  { id: 'a', text: 'A stack', correct: true },
  { id: 'b', text: 'A queue', correct: false },
  { id: 'c', text: 'A binary search tree', correct: false },
]

const heroHeadlineWords = ['Your', 'dream', 'tech', 'career', 'starts', 'with', 'what', 'you', 'do', 'today.']

function SkillEngineVisual({ reducedMotion }) {
  const [show3d, setShow3d] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 701px) and (prefers-reduced-motion: no-preference)')
    const updateScene = () => setShow3d(media.matches && !reducedMotion)
    updateScene()
    media.addEventListener('change', updateScene)
    window.addEventListener('resize', updateScene, { passive: true })
    return () => {
      media.removeEventListener('change', updateScene)
      window.removeEventListener('resize', updateScene)
    }
  }, [reducedMotion])

  return (
    <motion.div className="engine-scene" role="img" aria-label="Illustration of a student connecting coding, DSA, aptitude, projects, and interview skills through the Dkoder Skill Engine" initial={{ opacity: 0, scale: 0.94, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: reducedMotion ? 0 : 1.9, ease: 'easeOut' }}>
      <div className="scene-grid" />
      <div className="scene-sun" />
      <svg className="skill-routes" viewBox="0 0 650 520" fill="none" aria-hidden="true">
        <path d="M82 160 C160 160 160 226 250 226" />
        <path d="M130 340 C188 340 180 292 250 292" />
        <path d="M405 205 C493 205 486 148 570 148" />
        <path d="M405 310 C493 310 486 368 570 368" />
        <path d="M324 92 V170" />
        <circle cx="82" cy="160" r="6" /><circle cx="130" cy="340" r="6" />
        <circle cx="570" cy="148" r="6" /><circle cx="570" cy="368" r="6" />
      </svg>
      <div className="skill-chip chip-dsa"><Code2 size={15} /><span>DSA</span><small>Patterns</small></div>
      <div className="skill-chip chip-aptitude"><Brain size={15} /><span>Aptitude</span><small>Reasoning</small></div>
      <div className="skill-chip chip-projects"><Laptop2 size={15} /><span>Projects</span><small>Hands-on</small></div>
      <div className="skill-chip chip-interview"><MessageSquareText size={15} /><span>Interviews</span><small>Confidence</small></div>
      <div className="engine-3d-wrap" aria-hidden="true">
        <div className="engine-css-model"><i className="engine-css-neck" /><i className="engine-css-cap" /><i className="engine-css-chamber"><b>&lt;/&gt;</b></i><i className="engine-css-base" /></div>
        {show3d && <Suspense fallback={<div className="engine-canvas-fallback"><Code2 size={36} /></div>}>
          <SkillEngine3D reducedMotion={reducedMotion} />
        </Suspense>}
      </div>
      <div className="engine-label-card"><Sparkles size={14} /><span>DKODER SKILL ENGINE</span><b>LEARN → BUILD → GROW</b></div>
      <div className="student-card">
        <div className="student-head"><span className="student-hair" /><span className="student-face" /><span className="student-neck" /><span className="student-body" /><span className="student-arm" /></div>
        <div className="student-laptop"><span>&lt;/&gt;</span></div>
        <div className="student-caption"><span className="caption-dot" /> Your next skill starts here</div>
      </div>
      <div className="engine-note note-confidence"><CheckCircle2 size={15} /> Confusion → confidence</div>
      <div className="engine-spark spark-one">✳</div><div className="engine-spark spark-two">✦</div><div className="engine-spark spark-three">✧</div>
      <div className="engine-shadow" />
    </motion.div>
  )
}

function CompanyLogoMark({ company, className }) {
  if (company.logo) {
    return <svg className={className} viewBox="0 0 24 24" role="img" aria-label={`${company.name} logo`} focusable="false"><path d={company.logo.path} /></svg>
  }

  if (company.logoComponent) {
    const Logo = company.logoComponent
    return <Logo className={`${className} logo-${company.color}`} role="img" aria-label={`${company.name} logo`} focusable="false" />
  }

  if (company.logoSrc) {
    return <img className={`${className} logo-${company.color}`} src={company.logoSrc} alt={`${company.name} logo`} />
  }

  return <span className={`company-chip-text-fallback company-${company.color}`}>{company.name}</span>
}

function App() {
  const shouldReduceMotion = useReducedMotion()
  const lenisRef = useRef(null)
  const companyGridRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.28 })
  const [theme, setTheme] = useState(() => window.localStorage.getItem('dkoder-theme') || 'light')
  const [navbarCompact, setNavbarCompact] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [learnMenuOpen, setLearnMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeSection, setActiveSection] = useState('home')
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [answerSubmitted, setAnswerSubmitted] = useState(false)
  const [answerCorrect, setAnswerCorrect] = useState(false)
  const practiceCardRef = useRef(null)
  const celebrationTriggeredRef = useRef(false)
  const [dashboardTab, setDashboardTab] = useState('Overview')
  const [nextStep, setNextStep] = useState(0)
  const [hackathonFilter, setHackathonFilter] = useState('All')
  const [modal, setModal] = useState(null)
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    window.localStorage.setItem('dkoder-theme', theme)
  }, [theme])

  useEffect(() => {
    const updateNavbar = () => setNavbarCompact(window.scrollY > 24)
    updateNavbar()
    window.addEventListener('scroll', updateNavbar, { passive: true })
    return () => window.removeEventListener('scroll', updateNavbar)
  }, [])

  const categories = ['All', 'IT Services', 'Product Based', 'Startups']

  useEffect(() => {
    if (shouldReduceMotion) return undefined
    const lenis = new Lenis({ autoRaf: true, smoothWheel: true })
    lenisRef.current = lenis
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [shouldReduceMotion])

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-12% 0px -45% 0px' })
    sections.forEach((section) => observer.observe(section))

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item))
    return () => { observer.disconnect(); revealObserver.disconnect() }
  }, [])

  useEffect(() => {
    if (!modal) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') setModal(null) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [modal])

  const filteredCompanies = useMemo(() => companies.filter((company) => {
    const matchesCategory = activeCategory === 'All' || company.group === activeCategory
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch = !query || `${company.name} ${company.group} ${company.focus}`.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  }), [activeCategory, searchQuery])

  const visibleHackathons = hackathons.filter((event) => hackathonFilter === 'All' || event.type === hackathonFilter)

  const scrollToSection = (id) => {
    const target = document.getElementById(id)
    if (target && lenisRef.current) lenisRef.current.scrollTo(target, { offset: -88 })
    else target?.scrollIntoView({ behavior: shouldReduceMotion ? 'instant' : 'smooth', block: 'start' })
    setMobileMenuOpen(false)
    setLearnMenuOpen(false)
  }

  const startPractice = () => {
    setSelectedAnswer('')
    setAnswerSubmitted(false)
    setAnswerCorrect(false)
    celebrationTriggeredRef.current = false
    scrollToSection('practice')
  }

  const submitAnswer = () => {
    if (!selectedAnswer || answerSubmitted) return

    const isCorrect = practiceOptions.find((option) => option.id === selectedAnswer)?.correct === true
    setAnswerCorrect(isCorrect)
    setAnswerSubmitted(true)

    if (isCorrect && !celebrationTriggeredRef.current && !shouldReduceMotion && practiceCardRef.current) {
      celebrationTriggeredRef.current = true
      const bounds = practiceCardRef.current.getBoundingClientRect()
      const origin = {
        x: Math.min(0.9, Math.max(0.1, (bounds.left + bounds.width * 0.62) / window.innerWidth)),
        y: Math.min(0.9, Math.max(0.1, (bounds.top + bounds.height * 0.52) / window.innerHeight)),
      }

      confetti({
        particleCount: 46,
        spread: 52,
        startVelocity: 24,
        gravity: 0.9,
        ticks: 135,
        scalar: 0.72,
        origin,
        colors: ['#FFC928', '#5524A8', '#FFFFFF', '#8B55CE', '#75C995'],
        disableForReducedMotion: true,
      })
    }
  }

  const answerIsCorrect = answerCorrect

  const handleCardPointerMove = (event) => {
    if (event.pointerType !== 'mouse' || shouldReduceMotion) return
    const card = event.target.closest('.feature-card, .company-card, .event-card')
    if (!card) return
    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    card.style.setProperty('--tilt-x', `${-y * 3.2}deg`)
    card.style.setProperty('--tilt-y', `${x * 3.2}deg`)
    card.style.setProperty('--shine-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
    card.style.setProperty('--shine-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
  }

  const resetCardTilt = (event) => {
    const card = event.target.closest('.feature-card, .company-card, .event-card')
    if (!card || (event.relatedTarget && card.contains(event.relatedTarget))) return
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }

  const updateHeroGlow = (event) => {
    if (event.pointerType !== 'mouse' || shouldReduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const localX = event.clientX - bounds.left
    const localY = event.clientY - bounds.top
    event.currentTarget.style.setProperty('--glow-x', `${localX}px`)
    event.currentTarget.style.setProperty('--glow-y', `${localY}px`)
    event.currentTarget.style.setProperty('--parallax-x', `${(localX / bounds.width - .5) * 14}px`)
    event.currentTarget.style.setProperty('--parallax-y', `${(localY / bounds.height - .5) * 10}px`)
  }

  const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light')

  return (
    <MotionConfig reducedMotion="user">
    <div className="page-shell" data-theme={theme} onPointerMove={handleCardPointerMove} onPointerOut={resetCardTilt}>
      <div className="ambient-atmosphere" aria-hidden="true"><span className="ambient-orb ambient-orb-yellow" /><span className="ambient-orb ambient-orb-purple" /><span className="ambient-orb ambient-orb-lavender" /><span className="ambient-grain" /></div>
      <motion.div className="page-scroll-progress" style={{ scaleX: smoothScrollProgress }} aria-hidden="true" />
      <aside className="side-nav" aria-label="Section navigation">
        <a href="#home" className="rail-brand" aria-label="Dkoder home"><span className="brand-mark">D</span></a>
        {sidebarLinks.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" className={`side-nav-item ${activeSection === id ? 'active' : ''}`} onClick={() => scrollToSection(id)} aria-label={label} title={label}>
            <Icon size={18} /><span className="rail-tooltip">{label}</span>
          </button>
        ))}
        <div className="rail-motto">Learn<br />Build<br /><b>Grow.</b></div>
        <button type="button" className="rail-rocket" aria-label="Try a practice challenge" title="Try a challenge" onClick={startPractice}><Rocket size={19} /></button>
      </aside>

      <div className="page-content">
        <header className={`topbar ${navbarCompact ? 'topbar-compact' : ''}`}>
          <div className="container nav-wrap">
            <a href="#home" className="brand" aria-label="Dkoder homepage"><span className="brand-mark">D</span><span className="brand-text">Dkoder</span></a>
            <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
              <button className={`nav-link ${activeSection === 'home' ? 'nav-current' : ''}`} onClick={() => scrollToSection('home')}>Home</button>
              <div className="learn-menu-wrap">
                <button className={`nav-link ${learnMenuOpen ? 'nav-current' : ''}`} aria-expanded={learnMenuOpen} onClick={() => setLearnMenuOpen((value) => !value)}>Learn <ChevronDown size={14} /></button>
                {learnMenuOpen && <div className="learn-dropdown"><button onClick={() => scrollToSection('learn')}><BookOpen size={16} /> Learning journey</button><button onClick={() => scrollToSection('features')}><Sparkles size={16} /> How Dkoder helps</button><button onClick={startPractice}><Code2 size={16} /> Try practice demo</button><button onClick={() => scrollToSection('playground')}><Laptop2 size={16} /> Coding playground</button></div>}
              </div>
              <button className="nav-link" onClick={() => scrollToSection('hackathons')}>Hackathons</button>
              <button className="nav-link" onClick={() => scrollToSection('colleges')}>For Colleges</button>
              <button className="nav-link" onClick={() => setModal({ title: 'Apply for MOU', eyebrow: 'College partnerships', body: 'This landing-page preview does not submit applications or connect to a backend. Add a verified Dkoder contact or application destination to make this action live.' })}>Apply for MOU</button>
            </nav>
            <div className="nav-actions">
              {searchOpen && <label className="nav-search"><span className="sr-only">Search company tracks</span><input autoFocus value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); scrollToSection('tracks') }} placeholder="Search tracks" /></label>}
              <button className="icon-button search-toggle" aria-label={searchOpen ? 'Close track search' : 'Search tracks'} onClick={() => { setSearchOpen((open) => !open); if (!searchOpen) scrollToSection('tracks') }}><Search size={18} /></button>
              <button type="button" className="icon-button theme-toggle" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} aria-pressed={theme === 'dark'} onClick={toggleTheme}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
              <button className="dashboard-cta" onClick={() => scrollToSection('dashboard')}><span className="dashboard-cta-icon">▦</span> Go to Dashboard <ArrowUpRight size={15} /></button>
            </div>
            <button type="button" className="menu-toggle" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((prev) => !prev)}>{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </header>

        <main>
          <section className="hero-section" id="home" onPointerMove={updateHeroGlow}>
            <div className="container hero-grid">
              <motion.div className="hero-copy" initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, ease: 'easeOut' }}>
                <motion.span className="eyebrow" initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: shouldReduceMotion ? 0 : 0.08 }}><span className="eyebrow-dot" /> PLACEMENT PREPARATION PLATFORM</motion.span>
                <h1 aria-label="Your dream tech career starts with what you do today.">
                  <span className="hero-headline-visual" aria-hidden="true">
                    {heroHeadlineWords.map((word, index) => (
                      <span key={`${word}-${index}`}>
                        <motion.span
                          className={`hero-word ${['dream', 'tech', 'career'].includes(word) ? 'hero-highlight' : ''}`}
                          initial={shouldReduceMotion ? false : { opacity: 0, y: 20, x: index % 2 === 0 ? -7 : 7, filter: 'blur(5px)' }}
                          animate={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
                          transition={shouldReduceMotion
                            ? { duration: 0.12, ease: 'easeOut' }
                            : { type: 'spring', stiffness: 155, damping: 22, mass: 0.82, delay: 0.2 + index * 0.095 }}
                        >{word}</motion.span>{index < heroHeadlineWords.length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </span>
                </h1>
                <motion.p className="hero-text" initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, delay: shouldReduceMotion ? 0 : 1.28 }}>Learn concepts, practise with purpose, build real skills, and prepare for assessments—one focused step closer to your dream job.</motion.p>
                <motion.div className="hero-actions" initial={shouldReduceMotion ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, delay: shouldReduceMotion ? 0 : 1.62 }}><InteractiveButton className="primary-btn" magnetic onClick={() => scrollToSection('learn')}>Start Exploring <ArrowRight size={17} /></InteractiveButton><motion.button className="secondary-btn" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} onClick={() => scrollToSection('learn')}>Explore the Journey</motion.button></motion.div>
                <motion.div className="hero-proof" initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 1.82 }}><span className="proof-icon"><Check size={14} /></span><span>A clear path from <b>curious</b> to <b>career-ready</b></span></motion.div>
              </motion.div>
              <SkillEngineVisual reducedMotion={shouldReduceMotion} />
            </div>
            <div className="hero-scroll-cue"><span /> Scroll to explore</div>
          </section>

          <section className="journey-section section-wrap" id="learn">
            <div className="container journey-panel">
              <div className="journey-intro">
                <span className="eyebrow eyebrow-purple"><Sparkles size={14} /> THE DKODER JOURNEY</span>
                <h2>Learn <span>→</span> Build <i>→</i> Grow</h2>
                <p>A complete learning ecosystem for engineering students and future tech professionals.</p>
                <button className="subtle-link" onClick={() => scrollToSection('features')}>Explore the journey <ArrowRight size={15} /></button>
              </div>
              <div className="journey-stages">
                {journeySteps.map(({ id, number, title, subtitle, description, icon: Icon, target }, index) => (
                  <div className="journey-stage-wrap" key={id}>
                    <motion.button className={`journey-stage stage-${id} reveal`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: index * 0.12 }} whileHover={{ y: -5, rotate: index === 1 ? 1 : -1 }} whileTap={{ scale: 0.97 }} onClick={() => scrollToSection(target)} aria-label={`${title}: ${description}`}>
                      <span className="stage-art"><Icon size={34} strokeWidth={1.8} /><span className="stage-art-orbit" /></span>
                      <span className="stage-number">{number}</span><strong>{title}</strong><span className="stage-subtitle">{subtitle}</span>
                    </motion.button>
                    {index < journeySteps.length - 1 && <ArrowRight className="journey-arrow" size={21} aria-hidden="true" />}
                  </div>
                ))}
              </div>
            </div>
            <div className="container"><SkillRoadmapDemo /></div>
          </section>

          <section className="features-section section-wrap" id="features">
            <div className="container feature-layout">
              <div className="section-heading feature-heading reveal"><span className="eyebrow eyebrow-purple"><Sparkles size={14} /> HOW DKODER HELPS YOU</span><h2>Everything you need,<br />all in one place.</h2><p>Small, steady steps make the big goals feel closer.</p></div>
              <div className="features-grid">
                {featureCards.map(({ title, description, icon: Icon, tone }, index) => <article className={`feature-card feature-${tone} reveal`} key={title} style={{ '--delay': `${index * 70}ms` }}><div className="feature-icon"><Icon size={21} /></div><h3>{title}</h3><p>{description}</p><button className="feature-link" onClick={() => scrollToSection(title === 'Company tracks' ? 'tracks' : title === 'Progress tracking' ? 'dashboard' : title === 'Coding practice' ? 'playground' : 'practice')} aria-label={`Explore ${title}`}>Explore <ArrowUpRight size={14} /></button></article>)}
              </div>
            </div>
          </section>

          <section className="tracks-section section-wrap" id="tracks">
            <div className="container">
              <div className="tracks-heading"><div className="section-heading reveal"><span className="eyebrow eyebrow-purple"><BriefcaseBusiness size={14} /> COMPANY PREPARATION TRACKS</span><h2>Target your dream company.</h2><p>Illustrative practice themes—not official or affiliated company programs.</p></div>
                <label className="track-search"><Search size={17} /><span className="sr-only">Search companies or skills</span><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search companies..." /><kbd>/</kbd></label>
              </div>
              <div className="company-showcase reveal">
                <div className="company-showcase-heading">
                  <div><span className="showcase-kicker"><Sparkles size={13} /> PREPARE FOR YOUR DREAM COMPANY</span><h3>Your next opportunity starts here.</h3><p>Explore independent preparation themes for companies that inspire your next step.</p></div>
                  <span className="independent-note">Independent preparation · No affiliations</span>
                </div>
                <div className="company-logo-strip" role="group" aria-label="Explore company preparation tracks" tabIndex={0}>
                  {companies.map((company, index) => (
                    <motion.button
                      type="button"
                      key={company.name}
                      className={`company-logo-chip logo-${company.color}`}
                      aria-label={`Show ${company.name} preparation track`}
                      onClick={() => {
                        setActiveCategory('All')
                        setSearchQuery(company.name)
                        if (companyGridRef.current && lenisRef.current) lenisRef.current.scrollTo(companyGridRef.current, { offset: -135 })
                        else companyGridRef.current?.scrollIntoView({ behavior: shouldReduceMotion ? 'instant' : 'smooth', block: 'center' })
                      }}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: .3 }}
                      transition={{ duration: .32, delay: index * .045 }}
                      whileHover={{ y: -3, scale: 1.025 }}
                      whileTap={{ scale: .98 }}
                    >
                      <CompanyLogoMark company={company} className="company-chip-logo" />
                      <span>{company.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="filter-row" role="group" aria-label="Filter company tracks">{categories.map((category) => <button key={category} className={`filter-btn ${activeCategory === category ? 'active' : ''}`} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
              <div className="company-grid" aria-live="polite" ref={companyGridRef}>{filteredCompanies.length ? filteredCompanies.map((company) => <article className="company-card reveal" key={company.name}><div className="company-card-brand"><CompanyLogoMark company={company} className="company-card-logo" /><div className={`company-wordmark ${company.color}`}>{company.name}</div></div><span className="company-category">{company.group}</span><p>{company.focus}</p><button className="text-btn" onClick={() => setModal({ title: `${company.name} preparation preview`, eyebrow: 'Illustrative company track', body: `This sample track groups practice ideas such as ${company.focus.toLowerCase()}. It is an independent learning preview and does not represent an official company program or affiliation.` })}>Explore track <ArrowRight size={15} /></button></article>) : <div className="empty-state"><Search size={23} /><strong>No matching tracks</strong><span>Try another company or skill keyword.</span></div>}</div>
            </div>
          </section>

          <section className="practice-section section-wrap" id="practice">
            <div className="container practice-layout">
              <div className="practice-copy reveal"><span className="eyebrow eyebrow-purple"><CirclePlay size={14} /> INTERACTIVE PRACTICE PREVIEW</span><h2>One question.<br /><span>One more skill.</span></h2><p>Take a quick sample question, get immediate feedback, and try again. Demo only—your answer stays in this page.</p><div className="practice-micro-stats"><span><Clock3 size={16} /> 1 minute</span><span><Target size={16} /> Fundamentals</span></div></div>
                <div className="practice-card reveal" ref={practiceCardRef}><div className="practice-card-top"><span className="demo-label"><span /> DEMO QUESTION</span><span className="question-count">01 <i>/ 01</i></span></div><div className="practice-progress"><span /></div><div className="question-body"><span className="question-topic">DATA STRUCTURES · EASY</span><h3>Which data structure follows the LIFO principle?</h3><div className="answer-options" role="radiogroup" aria-label="Choose an answer">{practiceOptions.map((option) => <button type="button" role="radio" aria-checked={selectedAnswer === option.id} key={option.id} className={`answer-option ${selectedAnswer === option.id ? 'selected' : ''} ${answerSubmitted && answerIsCorrect && option.correct ? 'correct' : ''} ${answerSubmitted && !answerIsCorrect && selectedAnswer === option.id ? 'incorrect' : ''}`} onClick={() => { setSelectedAnswer(option.id); setAnswerSubmitted(false); setAnswerCorrect(false) }}><span className="option-letter">{option.id.toUpperCase()}</span>{option.text}{answerSubmitted && answerIsCorrect && option.correct && <CheckCircle2 className="answer-check" size={17} />}</button>)}</div>
                  {answerSubmitted && <div className={`answer-feedback ${answerIsCorrect ? 'feedback-correct' : 'feedback-incorrect'}`} role="status">{answerIsCorrect ? 'Correct! You’re getting closer to your dream tech career! 🎉 A stack is Last In, First Out—the most recently added item is removed first.' : 'Not quite—choose another answer. Think about which structure removes the most recently added item first.'}</div>}
                  <div className="practice-controls"><button className="reset-btn" onClick={() => { setSelectedAnswer(''); setAnswerSubmitted(false); setAnswerCorrect(false); celebrationTriggeredRef.current = false }}><RotateCcw size={15} /> Reset</button><button className="primary-btn practice-submit" onClick={submitAnswer} disabled={!selectedAnswer || (answerSubmitted && answerIsCorrect)}>{answerSubmitted && answerIsCorrect ? 'Correct answer' : answerSubmitted ? 'Check new answer' : 'Check answer'} <ArrowRight size={16} /></button></div><p className="demo-disclaimer">Sample question · No score or progress is saved.</p></div></div>
            </div>
          </section>

          <CodingPlayground />

          <section className="dashboard-section section-wrap" id="dashboard">
            <div className="container dashboard-layout">
              <div className="dashboard-copy reveal"><span className="eyebrow eyebrow-purple"><Activity size={14} /> YOUR LEARNING, AT A GLANCE</span><h2>A dashboard that keeps your next step clear.</h2><p>A product preview with example activity—not real account data. Explore the tabs and roadmap stepper.</p><button className="secondary-btn" onClick={() => setDashboardTab(dashboardTab === 'Overview' ? 'Roadmap' : 'Overview')}>Switch to {dashboardTab === 'Overview' ? 'Roadmap' : 'Overview'} <ArrowRight size={16} /></button></div>
              <div className="dashboard-window reveal"><div className="window-topbar"><div className="window-dots"><i /><i /><i /></div><span>DKODER · DASHBOARD PREVIEW</span><span className="preview-badge">SAMPLE DATA</span></div><div className="dash-inner"><aside className="dash-sidebar"><div className="dash-logo"><span className="brand-mark">D</span><b>My learning</b></div><span className="dash-side-item active"><Activity size={15} /> Overview</span><span className="dash-side-item"><Map size={15} /> Roadmap</span><span className="dash-side-item"><Trophy size={15} /> Challenges</span><span className="dash-side-item"><BarChart3 size={15} /> My progress</span></aside><div className="dash-main"><div className="dash-greeting"><div><span>MONDAY · SAMPLE VIEW</span><h3>{dashboardTab === 'Overview' ? 'Your skills are taking shape.' : 'A path, one step at a time.'}</h3></div><div className="avatar-placeholder">S</div></div><div className="dash-metrics"><div className="metric-card"><span>Topics completed</span><strong>08 <small>/ 16</small></strong><div className="mini-meter"><i style={{ width: '50%' }} /></div></div><div className="metric-card"><span>Coding challenges</span><strong>12 <small>tried</small></strong><div className="metric-foot"><Code2 size={14} /> Practice preview</div></div><div className="metric-card"><span>Weekly activity</span><strong>4 <small>days</small></strong><div className="activity-bars"><i /><i /><i /><i /><i /><i /><i /></div></div></div><div className="roadmap-card"><div className="roadmap-head"><div><span>YOUR ROADMAP</span><h4>Build your foundation</h4></div><span className="roadmap-count">{nextStep + 1} / 3</span></div><div className="roadmap-track">{journeySteps.map((step, index) => <button key={step.id} className={`roadmap-node ${index <= nextStep ? 'done' : ''} ${index === nextStep ? 'current' : ''}`} onClick={() => setNextStep(index)} aria-label={`Show roadmap step ${index + 1}: ${step.title}`}><span>{index < nextStep ? <Check size={13} /> : index + 1}</span><small>{step.title}</small></button>)}</div><div className="next-step-row"><div><span>NEXT UP</span><strong>{journeySteps[nextStep].subtitle}</strong></div><button className="round-arrow" aria-label="Advance roadmap" onClick={() => setNextStep((current) => (current + 1) % journeySteps.length)}><ArrowRight size={16} /></button></div></div></div></div></div>
            </div>
          </section>

          <section className="hackathon-section section-wrap" id="hackathons">
            <div className="container"><div className="hackathon-heading"><div className="section-heading reveal"><span className="eyebrow eyebrow-purple"><Trophy size={14} /> HACKATHONS & HANDS-ON LEARNING</span><h2>Make something worth sharing.</h2><p>Explore sample event formats. These are concepts, not scheduled or verified events.</p></div><div className="filter-row event-filters" role="group" aria-label="Filter sample events">{['All', 'Build', 'Coding'].map((filter) => <button key={filter} className={`filter-btn ${hackathonFilter === filter ? 'active' : ''}`} aria-pressed={hackathonFilter === filter} onClick={() => setHackathonFilter(filter)}>{filter}</button>)}</div></div><div className="event-grid">{visibleHackathons.map((event, index) => <article className="event-card reveal" key={event.title}><div className={`event-art event-art-${index + 1}`}><span className="event-art-icon">{event.type === 'Build' ? <Lightbulb size={29} /> : <Code2 size={29} />}</span><span className="event-art-label">SAMPLE EVENT</span><span className="event-orbit" /></div><div className="event-card-copy"><div className="event-meta"><span>{event.type}</span><span><CalendarDays size={13} /> {event.date}</span></div><h3>{event.title}</h3><p>{event.detail}</p><button className="text-btn" onClick={() => setModal({ title: event.title, eyebrow: 'Illustrative event format', body: `${event.detail} This is sample content only, not an announced or scheduled event. No registration is collected in this demo.` })}>View format <ArrowRight size={15} /></button></div></article>)}</div></div>
          </section>

          <section className="colleges-section section-wrap" id="colleges">
            <div className="container college-panel"><div className="college-copy reveal"><span className="eyebrow"><Building2 size={14} /> FOR COLLEGES</span><h2>Help students connect learning with opportunity.</h2><p>Explore how structured practice, skill-building activities, and progress visibility could support a campus placement-readiness program.</p><button className="primary-btn" onClick={() => setModal({ title: 'Apply for MOU', eyebrow: 'Institutional collaboration', body: 'This is a frontend preview only. No application is submitted and no partnership is implied. Add a verified contact address or application URL to enable the next step.' })}>Apply for MOU <ArrowRight size={16} /></button><span className="college-disclaimer">Potential features shown for illustration. No partnership claims.</span></div><div className="college-visual reveal"><div className="college-orbit orbit-a" /><div className="college-orbit orbit-b" /><div className="college-center"><GraduationCap size={38} /><span>STUDENT<br />GROWTH</span></div><div className="college-node node-top"><BookOpen size={17} /> Guided learning</div><div className="college-node node-right"><BarChart3 size={17} /> Progress view</div><div className="college-node node-bottom"><Users size={17} /> Cohort practice</div></div></div>
          </section>

          <section className="faq-section section-wrap" id="faq">
            <div className="container faq-layout">
              <div className="section-heading reveal">
                <span className="eyebrow eyebrow-purple"><MessageSquareText size={14} /> GOOD TO KNOW</span>
                <h2>Questions, meet answers.</h2>
                <p>Clear details about the learning and preview experience.</p>
              </div>
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <article className={`faq-item ${openFaq === index ? 'faq-open' : ''}`} key={faq.question}>
                    <h3><button className="faq-question" aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>{faq.question}<ChevronDown size={18} /></button></h3>
                    <AnimatePresence initial={false}>
                      {openFaq === index && <motion.div className="faq-answer" id={`faq-answer-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}><p>{faq.answer}</p></motion.div>}
                    </AnimatePresence>
                  </article>
                ))}
              </div>
              <DokiAssistant />
            </div>
          </section>

          <section className="final-cta-section"><div className="container final-cta"><div className="cta-decoration cta-decoration-one" /><div className="cta-decoration cta-decoration-two" /><div className="cta-copy"><span className="eyebrow"><Sparkles size={14} /> YOUR NEXT STEP STARTS HERE</span><h2>Make today count.<br /><span>Build what’s next.</span></h2><p>Start with one small step on your Learn → Build → Grow journey.</p></div><div className="cta-actions"><button className="cta-white-btn" onClick={() => scrollToSection('learn')}>Explore the learning path <ArrowRight size={17} /></button><button className="cta-outline-btn" onClick={startPractice}>Try a practice question <Code2 size={16} /></button></div></div></section>
        </main>

        <div className="floating-tools" aria-label="Quick actions"><button onClick={() => scrollToSection('learn')} title="Learning roadmap"><Map size={18} /><span>Roadmap</span></button><button onClick={startPractice} title="Try a challenge"><Code2 size={18} /><span>Try a challenge</span></button><button className="floating-top" onClick={() => scrollToSection('home')} title="Back to top" aria-label="Back to top"><ArrowUp size={18} /></button></div>
        <nav className="mobile-bottom-nav" aria-label="Quick section navigation">{sidebarLinks.slice(0, 5).map(({ id, label, icon: Icon }) => <button key={id} type="button" className={`bottom-nav-item ${activeSection === id ? 'active' : ''}`} onClick={() => scrollToSection(id)} aria-label={label}><Icon size={18} /><span>{label}</span></button>)}</nav>

        <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand-col"><a href="#home" className="brand footer-brand" aria-label="Dkoder homepage"><span className="brand-mark">D</span><span className="brand-text">Dkoder</span></a><p>Learn. Build. Grow.<br />Your next big step starts with one focused practice session.</p><span className="footer-demo-tag"><span /> A learning experience preview</span></div><div><h3>Explore</h3><ul><li><button onClick={() => scrollToSection('learn')}>Learning journey</button></li><li><button onClick={() => scrollToSection('features')}>How Dkoder helps</button></li><li><button onClick={() => scrollToSection('tracks')}>Company tracks</button></li></ul></div><div><h3>Try a demo</h3><ul><li><button onClick={startPractice}>Practice question</button></li><li><button onClick={() => scrollToSection('playground')}>Coding playground</button></li><li><button onClick={() => scrollToSection('dashboard')}>Dashboard preview</button></li><li><button onClick={() => scrollToSection('hackathons')}>Hackathon formats</button></li></ul></div><div><h3>For institutions</h3><ul><li><button onClick={() => scrollToSection('colleges')}>College overview</button></li><li><button onClick={() => setModal({ title: 'Apply for MOU', eyebrow: 'College partnerships', body: 'This page preview does not process applications. A verified Dkoder contact or application destination is needed to continue.' })}>Apply for MOU</button></li><li><button onClick={() => scrollToSection('faq')}>Common questions</button></li></ul></div></div><div className="container footer-bottom"><span>© Dkoder · Product concept preview</span><button onClick={() => scrollToSection('home')}><ArrowUp size={14} /> Back to top</button></div></footer>
      </div>

      {modal && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null) }}><section className="info-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setModal(null)} aria-label="Close dialog"><X size={19} /></button><span className="eyebrow eyebrow-purple"><Sparkles size={14} /> {modal.eyebrow}</span><h2 id="modal-title">{modal.title}</h2><p>{modal.body}</p><button className="primary-btn modal-done" onClick={() => setModal(null)}>Got it <Check size={16} /></button></section></div>}
    </div>
    </MotionConfig>
  )
}

export default App