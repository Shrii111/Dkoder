import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Code2, Play, RotateCcw, Terminal } from 'lucide-react'
import './CodingPlayground.css'

const demos = {
  'Array total': {
    language: 'JavaScript',
    starter: 'const scores = [8, 12, 5]\n\nconst total = scores.reduce(\n  (sum, score) => sum + score,\n  0\n)\n\nconsole.log(total)',
    output: '> 25\n\nSample output for the selected example.',
  },
  'Reverse a string': {
    language: 'JavaScript',
    starter: 'const word = "dkoder"\n\nconst reversed = word\n  .split("")\n  .reverse()\n  .join("")\n\nconsole.log(reversed)',
    output: '> redokd\n\nSample output for the selected example.',
  },
}

const demoNames = Object.keys(demos)

export default function CodingPlayground() {
  const [selectedDemo, setSelectedDemo] = useState(demoNames[0])
  const [code, setCode] = useState(demos[demoNames[0]].starter)
  const [output, setOutput] = useState('Choose “Run demo” to view the sample output for this example.')
  const [hasRun, setHasRun] = useState(false)
  const demo = demos[selectedDemo]

  const selectDemo = (name) => {
    setSelectedDemo(name)
    setCode(demos[name].starter)
    setOutput('Choose “Run demo” to view the sample output for this example.')
    setHasRun(false)
  }

  const runDemo = () => {
    setOutput(demo.output)
    setHasRun(true)
  }

  const resetDemo = () => {
    setCode(demo.starter)
    setOutput('Choose “Run demo” to view the sample output for this example.')
    setHasRun(false)
  }

  return (
    <section className="coding-playground-section section-wrap" id="playground" aria-labelledby="playground-title">
      <div className="container playground-layout">
        <div className="playground-copy reveal">
          <span className="eyebrow eyebrow-purple"><Code2 size={14} /> MINI CODING PLAYGROUND</span>
          <h2 id="playground-title">A little code.<br /><span>A clear result.</span></h2>
          <p>Explore a sample snippet in an editor-style preview. Pick an example, make edits, and view its predefined output.</p>
          <span className="playground-demo-badge"><Terminal size={14} /> Frontend demo · no code execution</span>
        </div>

        <div className="playground-window reveal">
          <div className="playground-toolbar">
            <div className="playground-window-dots"><i /><i /><i /></div>
            <label className="playground-example-label" htmlFor="playground-example">Example</label>
            <select id="playground-example" value={selectedDemo} onChange={(event) => selectDemo(event.target.value)}>
              {demoNames.map((name) => <option key={name}>{name}</option>)}
            </select>
            <span className="playground-language">{demo.language}</span>
          </div>
          <div className="playground-editor-wrap">
            <div className="playground-line-numbers" aria-hidden="true">{code.split('\n').map((_, index) => <span key={index}>{index + 1}</span>)}</div>
            <label className="sr-only" htmlFor="playground-code">Editable sample code</label>
            <textarea id="playground-code" className="playground-editor" value={code} onChange={(event) => setCode(event.target.value)} spellCheck="false" aria-describedby="playground-editor-note" />
          </div>
          <div className="playground-actions">
            <p id="playground-editor-note">Editing is local; this preview doesn’t evaluate your changes.</p>
            <div><button type="button" className="playground-reset" onClick={resetDemo}><RotateCcw size={14} /> Reset</button><button type="button" className="playground-run" onClick={runDemo}><Play size={14} fill="currentColor" /> Run demo</button></div>
          </div>
          <div className="playground-terminal">
            <div className="terminal-heading"><span><Terminal size={13} /> OUTPUT</span><span>{hasRun ? 'SAMPLE FIXTURE' : 'READY'}</span></div>
            <div aria-live="polite" aria-atomic="true"><AnimatePresence mode="wait"><motion.pre key={`${selectedDemo}-${hasRun}`} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: .18 }}>{output}</motion.pre></AnimatePresence></div>
          </div>
          <p className="playground-disclaimer">No arbitrary code is run. Output is a predefined example for the selected challenge.</p>
        </div>
      </div>
    </section>
  )
}
