import { motion } from 'framer-motion'

const COLORS = [
  { id: 'black', label: 'Black', hex: '#1a1a1a', border: '#444' },
  { id: 'white', label: 'White', hex: '#f0f0f0', border: '#ccc' },
  { id: 'pink', label: 'Pink', hex: '#F3C5D7', border: '#F3C5D7' },
]

export default function ColorSelector({ selected, onChange }) {
  return (
    <div className="flex items-center gap-4">
      {COLORS.map((color) => (
        <motion.button
          key={color.id}
          onClick={() => onChange(color.id)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex flex-col items-center gap-2 group"
          title={color.label}
        >
          <div
            className="w-7 h-7 rounded-full transition-all duration-300"
            style={{
              background: color.hex,
              border: selected === color.id
                ? `2px solid ${color.border}`
                : '2px solid transparent',
              boxShadow: selected === color.id
                ? `0 0 0 2px rgba(255,255,255,0.15), 0 0 12px ${color.hex}66`
                : 'none',
            }}
          />
          <span
            className="text-xs font-medium transition-colors duration-300"
            style={{ color: selected === color.id ? '#fff' : '#666' }}
          >
            {color.label}
          </span>
          {selected === color.id && (
            <motion.div
              layoutId="colorIndicator"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}
