import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp, Bot, MessageCircle, Sparkles, X } from 'lucide-react'
import './DokiAssistant.css'

const suggestedQuestions = [
  'How does Dkoder work?',
  'Where should I start?',
  'How can I prepare for placements?',
  'Can I build projects with Dkoder?',
  'How do I participate in hackathons?',
]

const responses = [
  { terms: ['how does', 'work', 'dkoder'], answer: 'Dkoder is designed around Learn → Build → Grow: strengthen fundamentals, practise with coding and aptitude challenges, then explore interview and career-readiness activities.' },
  { terms: ['start', 'begin', 'new to coding'], answer: 'Start with the Learn stage. Pick one programming language, review core concepts, and build a steady habit with small practice questions. You can use the journey cards above as a sample roadmap.' },
  { terms: ['placement', 'interview', 'company', 'prepare'], answer: 'Build up from fundamentals, practise problem solving and aptitude, and use the company-track and mock-test previews to focus your preparation. Company tracks here are illustrative and not official programs.' },
  { terms: ['project', 'build', 'hands-on'], answer: 'Yes—the Build stage is about applying concepts through coding challenges and practical project ideas. This landing page is a frontend preview, so it doesn’t host or save projects.' },
  { terms: ['hackathon', 'participate', 'event'], answer: 'The hackathon cards show sample event formats only; there are no confirmed events or registrations on this page. Check Dkoder’s official channels for real opportunities.' },
]

function answerQuestion(question) {
  const normalized = question.toLowerCase()
  return responses.find(({ terms }) => terms.some((term) => normalized.includes(term)))?.answer
    ?? 'I can help with the learning journey, getting started, placement preparation, projects, or hackathon formats. Try one of the suggested questions for a more specific answer.'
}

function DokiMascot() {
  return (
    <div className="doki-mascot" aria-hidden="true">
      <span className="doki-antenna"><i /></span>
      <span className="doki-ear doki-ear-left" />
      <span className="doki-ear doki-ear-right" />
      <span className="doki-head">
        <span className="doki-face">
          <i className="doki-eye doki-eye-left" />
          <i className="doki-eye doki-eye-right" />
          <i className="doki-smile" />
          <i className="doki-cheek doki-cheek-left" />
          <i className="doki-cheek doki-cheek-right" />
        </span>
      </span>
      <span className="doki-neck" />
      <span className="doki-body"><Bot size={22} strokeWidth={2.3} /><i /></span>
      <span className="doki-arm doki-arm-left" />
      <span className="doki-arm doki-arm-right" />
      <span className="doki-shadow" />
    </div>
  )
}

export default function DokiAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [question, setQuestion] = useState('')
  const [typing, setTyping] = useState(false)
  const inputRef = useRef(null)
  const logRef = useRef(null)
  const responseTimerRef = useRef(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages, typing])

  useEffect(() => () => window.clearTimeout(responseTimerRef.current), [])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const ask = (text) => {
    const trimmed = text.trim()
    if (!trimmed || typing) return
    setMessages((current) => [...current, { from: 'you', text: trimmed }])
    setQuestion('')
    setTyping(true)
    responseTimerRef.current = window.setTimeout(() => {
      setMessages((current) => [...current, { from: 'doki', text: answerQuestion(trimmed) }])
      setTyping(false)
    }, 520)
  }

  return (
    <aside className="doki-assistant" aria-label="Doki FAQ assistant">
      <motion.div className="doki-prompt" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}><Sparkles size={14} /><span>Stuck on something? Ask me!</span></motion.div>
      <motion.button className="doki-launcher" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="doki-chat-panel" aria-label={open ? 'Close Doki assistant' : 'Open Doki assistant'} whileHover={{ y: -3, rotate: 2, scale: 1.025 }} whileTap={{ scale: 0.96 }} transition={{ type: 'spring', stiffness: 360, damping: 18 }}>
        <DokiMascot />
        <span className="doki-launcher-hint"><MessageCircle size={15} /> Ask Doki</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.section
            id="doki-chat-panel"
            className="doki-chat-panel"
            role="region"
            aria-label="Chat with Doki"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 330, damping: 28 }}
          >
            <header className="doki-chat-header">
              <div className="doki-chat-avatar"><DokiMascot /></div>
              <div><strong>Doki</strong><span>Quick answers · Demo assistant</span></div>
              <button type="button" className="doki-close" aria-label="Close assistant" onClick={() => setOpen(false)}><X size={17} /></button>
            </header>
            <div className="doki-chat-log" role="log" aria-live="polite" aria-relevant="additions text" ref={logRef}>
              <p className="doki-welcome">Hi! I can answer a few questions about Dkoder and this page preview. What would you like to know?</p>
              <AnimatePresence initial={false}>{messages.map((message, index) => <motion.p className={`doki-message ${message.from}`} key={`${message.from}-${index}`} initial={{ opacity: 0, y: 7, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .2 }}>{message.text}</motion.p>)}</AnimatePresence>
              <AnimatePresence>{typing && <motion.div className="doki-typing" role="status" aria-label="Doki is preparing a reply" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><i /><i /><i /><span>Doki is thinking</span></motion.div>}</AnimatePresence>
            </div>
            <div className="doki-suggestions" aria-label="Suggested questions">
              {suggestedQuestions.map((suggestion) => <button type="button" key={suggestion} disabled={typing} onClick={() => ask(suggestion)}>{suggestion}</button>)}
            </div>
            <form className="doki-input-row" onSubmit={(event) => { event.preventDefault(); ask(question) }}>
              <label className="sr-only" htmlFor="doki-question">Ask Doki a question</label>
              <input id="doki-question" ref={inputRef} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about Dkoder…" maxLength={240} disabled={typing} />
              <button type="submit" disabled={!question.trim() || typing} aria-label="Send question"><ArrowUp size={17} /></button>
            </form>
            <p className="doki-demo-note">Predefined demo replies · Nothing is saved or sent.</p>
          </motion.section>
        )}
      </AnimatePresence>
    </aside>
  )
}
