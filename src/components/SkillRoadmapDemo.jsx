import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, BriefcaseBusiness, Check, Code2, Compass, GraduationCap, Laptop2, Target } from 'lucide-react'
import './SkillRoadmapDemo.css'

const paths = {
  'Data Structures & Algorithms': {
    icon: Code2,
    duration: 'Sample 4-week path',
    steps: [
      { title: 'Core language basics', detail: 'Review variables, functions, loops, and complexity thinking.' },
      { title: 'Arrays & strings', detail: 'Build a reliable approach to traversals, hashing, and two pointers.' },
      { title: 'Stacks, queues & trees', detail: 'Practice common structures and recognize when each one helps.' },
      { title: 'Problem-solving sprint', detail: 'Combine patterns in a short, self-paced challenge set.' },
    ],
    next: 'Try one array traversal, then explain its time complexity in your own words.',
  },
  'Web Development': {
    icon: Laptop2,
    duration: 'Sample 4-week path',
    steps: [
      { title: 'HTML & accessible structure', detail: 'Build semantic page sections and forms with keyboard-friendly controls.' },
      { title: 'CSS layout & responsive UI', detail: 'Practise grids, flex layouts, spacing systems, and mobile breakpoints.' },
      { title: 'JavaScript interactions', detail: 'Connect inputs and buttons with clear state and helpful feedback.' },
      { title: 'Ship a mini project', detail: 'Bring the pieces together in a small portfolio-ready interface.' },
    ],
    next: 'Choose one page from a product you like and sketch its structure before coding.',
  },
  'Placement Preparation': {
    icon: BriefcaseBusiness,
    duration: 'Sample 4-week path',
    steps: [
      { title: 'Refresh fundamentals', detail: 'Revisit programming, data structures, and core computer science topics.' },
      { title: 'Build aptitude rhythm', detail: 'Practise reasoning and quantitative questions in focused sessions.' },
      { title: 'Explore role-based tracks', detail: 'Use illustrative company themes to find relevant skills to work on.' },
      { title: 'Mock interview practice', detail: 'Explain your thinking, review sample questions, and plan your next practice.' },
    ],
    next: 'Pick one target role and list three fundamentals you want to strengthen first.',
  },
}

const goals = Object.keys(paths)

export default function SkillRoadmapDemo() {
  const [goal, setGoal] = useState(goals[0])
  const [activeStep, setActiveStep] = useState(0)
  const path = paths[goal]
  const Icon = path.icon
  const progress = Math.round(((activeStep + 1) / path.steps.length) * 100)

  const chooseGoal = (nextGoal) => {
    setGoal(nextGoal)
    setActiveStep(0)
  }

  return (
    <section className="skill-roadmap-demo" aria-labelledby="skill-roadmap-title">
      <div className="skill-roadmap-heading">
        <div>
          <span className="eyebrow eyebrow-purple"><Compass size={14} /> FIND YOUR NEXT STEP</span>
          <h3 id="skill-roadmap-title">A path shaped around your goal.</h3>
          <p>Choose a direction to explore a sample learning roadmap.</p>
        </div>
        <span className="roadmap-sample-tag"><span /> PREVIEW PLAN</span>
      </div>

      <div className="roadmap-goal-tabs" role="group" aria-label="Choose a sample learning goal">
        {goals.map((item) => {
          const GoalIcon = paths[item].icon
          return <button type="button" key={item} className={goal === item ? 'selected' : ''} aria-pressed={goal === item} onClick={() => chooseGoal(item)}><GoalIcon size={16} />{item}</button>
        })}
      </div>

      <div className="roadmap-demo-content">
        <div className="roadmap-milestone-column">
          <div className="roadmap-demo-meta"><span><Icon size={15} /> {goal}</span><span>{path.duration}</span></div>
          <div className="roadmap-demo-track" role="group" aria-label={`${goal} sample milestones`}>
            <motion.span className="roadmap-track-progress" animate={{ height: `${progress}%` }} transition={{ duration: .45, ease: 'easeOut' }} />
            {path.steps.map((step, index) => (
              <motion.button
                type="button"
                key={`${goal}-${step.title}`}
                className={`roadmap-milestone ${activeStep === index ? 'active' : ''} ${index < activeStep ? 'passed' : ''}`}
                onClick={() => setActiveStep(index)}
                aria-current={activeStep === index ? 'step' : undefined}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: .4 }}
                transition={{ duration: .3, delay: index * .07 }}
              >
                <span className="milestone-dot">{index < activeStep ? <Check size={13} /> : index + 1}</span>
                <span className="milestone-name">{step.title}</span>
              </motion.button>
            ))}
          </div>
          <div className="roadmap-preview-progress"><div><span>Preview position</span><strong>{progress}%</strong></div><div className="roadmap-meter"><motion.i animate={{ width: `${progress}%` }} transition={{ duration: .4 }} /></div></div>
        </div>

        <div className="roadmap-step-detail" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={`${goal}-${activeStep}`} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .2 }}>
              <span className="roadmap-step-label">MILESTONE {String(activeStep + 1).padStart(2, '0')}</span>
              <h4>{path.steps[activeStep].title}</h4>
              <p>{path.steps[activeStep].detail}</p>
              <div className="roadmap-next-tip"><Target size={16} /><span><b>Suggested next step</b>{path.next}</span></div>
              <button type="button" className="roadmap-next-button" onClick={() => setActiveStep((current) => Math.min(current + 1, path.steps.length - 1))} disabled={activeStep === path.steps.length - 1}>Explore next milestone <ArrowRight size={15} /></button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="roadmap-disclaimer"><GraduationCap size={13} /> Illustrative plan only; this preview does not track or save learner progress.</p>
    </section>
  )
}
