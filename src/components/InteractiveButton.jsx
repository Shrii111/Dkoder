import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/** A compact CTA with restrained magnetic pull, shine, ripple, and spring feedback. */
export default function InteractiveButton({ children, className = '', magnetic = false, onClick, ...props }) {
  const buttonRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const handlePointerMove = (event) => {
    if (!magnetic || reducedMotion || !window.matchMedia('(pointer: fine)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const pullX = (event.clientX - rect.left - rect.width / 2) * 0.12
    const pullY = (event.clientY - rect.top - rect.height / 2) * 0.12
    event.currentTarget.style.setProperty('--magnetic-x', `${Math.max(-8, Math.min(8, pullX))}px`)
    event.currentTarget.style.setProperty('--magnetic-y', `${Math.max(-6, Math.min(6, pullY))}px`)
  }

  const handlePointerLeave = (event) => {
    event.currentTarget.style.setProperty('--magnetic-x', '0px')
    event.currentTarget.style.setProperty('--magnetic-y', '0px')
  }

  const handlePointerDown = (event) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    button.style.setProperty('--ripple-x', `${event.clientX - rect.left}px`)
    button.style.setProperty('--ripple-y', `${event.clientY - rect.top}px`)
    button.classList.remove('ripple-active')
    requestAnimationFrame(() => button.classList.add('ripple-active'))
  }

  return (
    <motion.button
      ref={buttonRef}
      className={`interactive-button ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onClick={onClick}
      whileHover={reducedMotion ? undefined : { y: -2, scale: 1.025 }}
      whileTap={reducedMotion ? undefined : { scale: 0.97, y: 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 22 }}
      {...props}
    >
      <span className="interactive-button-content">{children}</span>
      <span className="button-ripple" aria-hidden="true" />
    </motion.button>
  )
}
