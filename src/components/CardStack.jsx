/**
 * CardStack
 * ─────────
 * Each child section gets `position: sticky; top: 0` so it pins
 * to the top of the viewport while the next card scrolls over it.
 *
 * The key insight: we do NOT constrain height. Each card is as tall
 * as its content. The browser scrolls through the full content height
 * of every card. When the NEXT card reaches top:0 it overlaps the
 * current one, creating the stacking illusion.
 *
 * Scrolling back up reverses the effect naturally.
 */
export default function CardStack({ children }) {
  const items = Array.isArray(children) ? children : [children]

  return (
    <div>
      {items.map((child, i) => (
        <div
          key={i}
          style={{
            position    : 'sticky',
            top         : 0,
            zIndex      : 10 + i,
            /* Rounded top corners on every card except the first */
            borderRadius: i === 0 ? '0' : '22px 22px 0 0',
            overflow    : 'hidden',
            /* Shadow: incoming card casts depth on the card below */
            boxShadow   : i > 0
              ? '0 -10px 50px rgba(0,0,0,0.85), 0 -1px 0 rgba(255,255,255,0.06)'
              : 'none',
          }}
        >
          {/* Solid black so each card fully covers what's beneath */}
          <div style={{ background: '#000' }}>
            {child}
          </div>
        </div>
      ))}
    </div>
  )
}
