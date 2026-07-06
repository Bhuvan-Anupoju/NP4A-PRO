import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const COLORS = [
  {
    id: "black",
    label: "Obsidian Black",
    swatch: "#2a2a2a",
    border: "#555",
    glow: "rgba(255,255,255,0.07)",
    accent: "#ffffff",
    desc: "Matte black finish with a subtle texture that absorbs light.",
    img: "/black.png",
  },
  {
    id: "white",
    label: "Lunar White",
    swatch: "#e8e8e8",
    border: "#bbb",
    glow: "rgba(255,255,255,0.12)",
    accent: "#ffffff",
    desc: "Clean white with a frosted glass-like translucency.",
    img: "/white.png",
  },
  {
    id: "pink",
    label: "Blush Pink",
    swatch: "#F3C5D7",
    border: "#F3C5D7",
    glow: "rgba(243,197,215,0.16)",
    accent: "#F3C5D7",
    desc: "Soft blush tone — bold enough to stand out, refined enough to stay elegant.",
    img: "/pink.png",
  },
];

const phoneVariants = {
  enter: (d) => ({ opacity: 0, x: d * 50, scale: 0.93, filter: "blur(8px)" }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (d) => ({
    opacity: 0,
    x: d * -50,
    scale: 0.93,
    filter: "blur(8px)",
    transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] },
  }),
};

/* ── Arrow button ── */
function ArrowBtn({ direction, onClick, disabled }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.92 }}
      className="flex items-center justify-center rounded-full transition-all duration-300"
      style={{
        width: 40,
        height: 40,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        opacity: disabled ? 0.25 : 1,
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {direction === "prev" ? (
        <ChevronLeft size={18} color="#fff" strokeWidth={1.8} />
      ) : (
        <ChevronRight size={18} color="#fff" strokeWidth={1.8} />
      )}
    </motion.button>
  );
}

/* ── Shared phone image area with arrows overlaid ── */
function PhoneStage({ color, dir, active, onPrev, onNext }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow */}
      <AnimatePresence>
        <motion.div
          key={`glow-${color.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 75% 75% at 50% 55%, ${color.glow} 0%, transparent 65%)`,
          }}
        />
      </AnimatePresence>

      {/* Phone image */}
      <AnimatePresence custom={dir} mode="wait">
        <motion.img
          key={color.id}
          src={color.img}
          alt={color.label}
          custom={dir}
          variants={phoneVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="relative z-10 object-contain max-h-full max-w-full"
          style={{
            filter: `drop-shadow(0 24px 56px rgba(0,0,0,0.75)) drop-shadow(0 0 32px ${color.glow})`,
          }}
          draggable={false}
        />
      </AnimatePresence>

      {/* ── Arrows — absolutely positioned left/right centre of the image area ── */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <ArrowBtn direction="prev" onClick={onPrev} disabled={active === 0} />
        </div>
        <div className="pointer-events-auto">
          <ArrowBtn
            direction="next"
            onClick={onNext}
            disabled={active === COLORS.length - 1}
          />
        </div>
      </div>

      {/* Floating label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`lbl-${color.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20"
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: color.swatch }}
          />
          <span className="font-dotmatrix text-white/25 text-[9px] tracking-[0.25em] uppercase">
            {color.label}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function ColorShowcase() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const switchTo = (idx) => {
    if (idx === active || idx < 0 || idx >= COLORS.length) return;
    setDir(idx > active ? 1 : -1);
    setActive(idx);
  };

  const prev = () => switchTo(active - 1);
  const next = () => switchTo(active + 1);

  const color = COLORS[active];

  /* ── shared swatch row ── */
  const Swatches = ({ size = 9 }) => (
    <div className="flex items-center gap-5">
      {COLORS.map((c, i) => (
        <motion.button
          key={c.id}
          onClick={() => switchTo(i)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center gap-1.5"
        >
          <div
            style={{
              width: size,
              height: size,
              borderRadius: "50%",
              background: c.swatch,
              boxShadow:
                active === i
                  ? `0 0 0 2px #000, 0 0 0 3.5px ${c.border}, 0 0 14px ${c.glow}`
                  : "none",
              transform: active === i ? "scale(1.18)" : "scale(1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          />
          <span
            className="text-[9px] font-medium"
            style={{ color: active === i ? "#fff" : "#555" }}
          >
            {c.id.charAt(0).toUpperCase() + c.id.slice(1)}
          </span>
        </motion.button>
      ))}
    </div>
  );

  /* ── shared dot indicators ── */
  const Dots = () => (
    <div className="flex items-center gap-2">
      {COLORS.map((_, i) => (
        <motion.button
          key={i}
          onClick={() => switchTo(i)}
          animate={{
            width: active === i ? 20 : 5,
            opacity: active === i ? 1 : 0.25,
          }}
          transition={{ duration: 0.3 }}
          className="h-1 rounded-full bg-white"
        />
      ))}
    </div>
  );

  return (
    <section
      id="colors"
      className="relative bg-black overflow-hidden border-t border-white/5"
    >
      {/* Section-level ambient glow */}
      <AnimatePresence>
        <motion.div
          key={color.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 65% 55% at 65% 45%, ${color.glow} 0%, transparent 70%)`,
          }}
        />
      </AnimatePresence>

      {/* ══════════════════════════════════════
          MOBILE  (< lg)
          Phone top 58vh · Controls bottom 42vh
      ══════════════════════════════════════ */}
      <div className="lg:hidden flex flex-col h-screen">
        {/* Phone */}
        <div className="relative flex-[0_0_58%] overflow-hidden">
          <PhoneStage
            color={color}
            dir={dir}
            active={active}
            onPrev={prev}
            onNext={next}
          />
        </div>

        {/* Controls */}
        <div className="flex-[0_0_42%] flex flex-col justify-center px-6 pb-6 gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mt-${color.id}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
            >
              <h3
                className="text-2xl font-bold mb-1"
                style={{ color: color.accent }}
              >
                {color.label}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed">
                {color.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <Swatches size={32} />

          <div className="flex flex-wrap gap-2">
            {["Gorilla Glass 5", "IP54", "Aluminium"].map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full text-[10px] text-white/40"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {t}
              </span>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-primary w-fit px-7 py-3 rounded-full text-sm font-semibold"
          >
            Order {color.label}
          </motion.button>

          <Dots />
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP  (≥ lg)
          Side by side
      ══════════════════════════════════════ */}
      <div className="hidden lg:block py-28 xl:py-36">
        <div className="max-w-7xl mx-auto px-8 xl:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-nothing-red text-xs font-semibold tracking-[0.22em] uppercase mb-3 block">
              Colorways
            </span>
            <h2 className="text-5xl xl:text-6xl font-bold leading-tight">
              <span className="gradient-text">Choose Your</span>
              <br />
              <span className="text-white">Expression.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-0 items-center">
            {/* Left: info */}
            <div className="flex flex-col gap-7 pr-16 xl:pr-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`dt-${color.id}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.38 }}
                >
                  <h3
                    className="text-4xl xl:text-5xl font-bold mb-3"
                    style={{ color: color.accent }}
                  >
                    {color.label}
                  </h3>
                  <p className="text-white/45 text-base leading-relaxed max-w-sm">
                    {color.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <Swatches size={36} />

              <div className="flex flex-wrap gap-3">
                {["Gorilla Glass 5", "IP65 Rated", "Aluminium Frame"].map(
                  (t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-full text-xs text-white/45"
                      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary w-fit px-8 py-3.5 rounded-full text-sm font-semibold"
              >
                Order {color.label}
              </motion.button>

              <Dots />
            </div>

            {/* Right: phone + arrows */}
            <div className="h-[520px] xl:h-[600px]">
              <PhoneStage
                color={color}
                dir={dir}
                active={active}
                onPrev={prev}
                onNext={next}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
