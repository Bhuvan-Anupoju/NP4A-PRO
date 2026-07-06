import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ITEMS = [
  { text: 'Nothing Phone (4a) Pro', accent: true  },
  { text: 'Snapdragon 7s Gen 3',    accent: false },
  { text: '50MP Triple Camera',     accent: true  },
  { text: '8GB · 12GB RAM',         accent: false },
  { text: '128GB · 256GB ROM',      accent: true  },
  { text: '5000mAh Battery',        accent: false },
  { text: '45W Fast Charging',      accent: true  },
  { text: '6.77" AMOLED 120Hz',     accent: false },
  { text: 'Glyph Matrix 900 LEDs',  accent: true  },
  { text: 'Nothing OS 3.0',         accent: false },
  { text: 'IP54 Splash Resistant',  accent: true  },
  { text: '4K@30fps Video',         accent: false },
]

/* Separator between items */
function Sep() {
  return (
    <span className="mx-6 text-white/15 font-light select-none">·</span>
  )
}

/* One full set of items */
function ItemSet() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center whitespace-nowrap">
          <span
            className="font-dotmatrix text-[11px] tracking-[0.18em] uppercase"
            style={{ color: item.accent ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)' }}
          >
            {item.text}
          </span>
          <Sep />
        </span>
      ))}
    </>
  )
}

function MarqueeRow({ reverse = false, duration = 30 }) {
  return (
    <div
      className="flex overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      {/* Two identical sets side by side — animate by exactly -50% for seamless loop */}
      <div
        className="flex shrink-0"
        style={{
          animation: `marquee${reverse ? 'Rev' : 'Fwd'} ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <ItemSet />
        <ItemSet />
      </div>
    </div>
  )
}

export default function MarqueeBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15px', '15px'])

  return (
    <>
      {/* Inject keyframes once */}
      <style>{`
        @keyframes marqueeFwd {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <div
        ref={ref}
        className="relative bg-black overflow-hidden py-12"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Tilted band */}
        <motion.div
          style={{ y, rotate: -3 }}
          className="flex flex-col gap-5 scale-[1.08]"
        >
          <MarqueeRow reverse={false} duration={35} />
          <MarqueeRow reverse={true}  duration={28} />
        </motion.div>

        {/* Top/bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.5) 100%)',
          }}
        />
      </div>
    </>
  )
}
