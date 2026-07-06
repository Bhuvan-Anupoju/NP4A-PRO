/**
 * StackSection
 * Makes each section sticky so it slides up over the previous one
 * as the user scrolls — creating a card-stacking effect.
 * Scrolling back up unstacks them in reverse order.
 */
export default function StackSection({ children, index }) {
  return (
    <div
      style={{
        position : 'sticky',
        top      : 0,
        zIndex   : 10 + index,
        borderRadius: '20px 20px 0 0',
        overflow : 'hidden',
        // Shadow gives depth — the card above casts onto the one below
        boxShadow: '0 -6px 32px rgba(0,0,0,0.7), 0 -1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Solid black fill so each card fully covers what's beneath */}
      <div className="stack-card-inner" style={{ background: '#000' }}>
        {children}
      </div>
    </div>
  )
}
