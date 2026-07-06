import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Colors',         id: 'colors'         },
  { label: 'Features',       id: 'features'       },
  { label: 'Specifications', id: 'specifications' },
  { label: 'Pricing',        id: 'pricing'        },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <motion.div
          className="flex items-center gap-2.5 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="grid grid-cols-3 gap-[3px] p-0.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-[4px] h-[4px] rounded-full bg-white" />
            ))}
          </div>
          <span className="font-dotmatrix text-white text-xs tracking-[0.18em] uppercase">
            Nothing
          </span>
        </motion.div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollTo('pricing')}
          className="hidden md:block btn-primary px-5 py-2 rounded-full text-sm font-semibold"
        >
          Buy Now
        </motion.button>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 relative z-50"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-5 h-0.5 bg-white rounded-full transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden absolute top-16 left-0 right-0 z-40"
            style={{
              background: '#000',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-white/70 hover:text-white text-base font-medium text-left py-3
                             border-b border-white/5 last:border-0 transition-colors duration-200
                             w-full"
                >
                  {label}
                </button>
              ))}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('pricing')}
                className="btn-primary mt-3 px-6 py-3 rounded-full text-sm font-semibold w-fit"
              >
                Buy Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
