import { motion } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'

const SECTIONS = ['Hero', 'Features', 'Specs', 'Pricing']

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {/* Progress track */}
      <div className="w-0.5 h-24 bg-white/10 rounded-full overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 w-full bg-white rounded-full"
          style={{ height: `${progress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Section dots */}
      {SECTIONS.map((section, i) => {
        const sectionProgress = i / (SECTIONS.length - 1)
        const isActive = progress >= sectionProgress - 0.1 && progress < sectionProgress + 0.15
        return (
          <motion.button
            key={section}
            onClick={() => {
              const el = document.getElementById(section.toLowerCase())
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
            title={section}
            animate={{
              scale: isActive ? 1.5 : 1,
              backgroundColor: isActive ? '#fff' : 'rgba(255,255,255,0.25)',
            }}
            transition={{ duration: 0.3 }}
            className="w-1.5 h-1.5 rounded-full"
          />
        )
      })}
    </div>
  )
}
