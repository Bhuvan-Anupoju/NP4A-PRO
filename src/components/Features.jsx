import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Camera, Cpu, Battery, Monitor, Zap, Grid3x3 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: Camera,
    title: "Ultra Camera",
    desc: "50MP main sensor with optical image stabilization. Capture every detail in stunning clarity.",
    accent: "#F3C5D7",
  },
  {
    icon: Cpu,
    title: "AI Photography",
    desc: "On-device AI enhances every shot in real time. Night mode, portrait, and scene detection.",
    accent: "#fff",
  },
  {
    icon: Grid3x3,
    title: "Glyph Matrix",
    desc: "An evolved LED interface that communicates through light. Notifications reimagined.",
    accent: "#FF3B30",
  },
  {
    icon: Zap,
    title: "Fast Processor",
    desc: "Snapdragon 7s Gen 4 delivers flagship-level performance in a refined package.",
    accent: "#F3C5D7",
  },
  {
    icon: Battery,
    title: "Long Battery",
    desc: "5400mAh battery with 50W fast charging. All-day power, charged in under an hour.",
    accent: "#fff",
  },
  {
    icon: Monitor,
    title: "Premium Display",
    desc: '6.83" AMOLED, 120Hz adaptive refresh, 2400 nits peak brightness. Vivid in any light.',
    accent: "#F3C5D7",
  },
];

const HIGHLIGHTS = [
  {
    tag: "Camera System",
    title: "See More.\nCapture Everything.",
    desc: "Triple camera system with a 50MP main, 50MP ultrawide, and 8MP macro. AI-powered scene recognition adapts to every environment automatically.",
    stat: "50MP",
    statLabel: "Main Sensor",
    reverse: false,
  },
  {
    tag: "Display",
    title: "Vivid.\nBeyond Vivid.",
    desc: '6.83" LTPO AMOLED display with 1-120Hz adaptive refresh rate. HDR10+ certified. 5000 nits peak brightness for outdoor visibility.',
    stat: "144Hz",
    statLabel: "Adaptive Refresh",
    reverse: true,
  },
  {
    tag: "Battery",
    title: "Power That\nKeeps Up.",
    desc: "5400mAh silicon-carbon battery with 45W wired and 15W wireless charging. Intelligent power management extends usage by up to 30%.",
    stat: "50W",
    statLabel: "Fast Charging",
    reverse: false,
  },
  {
    tag: "Glyph Matrix",
    title: "Light as\nInterface.",
    desc: "The Glyph Matrix is a 137-zone LED system on the back. It shows notifications, charging status, and custom light compositions.",
    stat: "137",
    statLabel: "mini-LED's",
    reverse: true,
  },
];

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      exit={{ opacity: 0, y: 60 }}
      className="feature-card glass rounded-2xl p-6 flex flex-col gap-4 cursor-default"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: `${feature.accent}12`,
          border: `1px solid ${feature.accent}20`,
        }}
      >
        <Icon size={18} style={{ color: feature.accent }} strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-white font-semibold text-base mb-1.5">
          {feature.title}
        </h3>
        <p className="text-nothing-secondary text-sm leading-relaxed">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}

function HighlightRow({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={`flex flex-col ${item.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20 py-16 lg:py-24`}
    >
      {/* Visual side */}
      <motion.div
        initial={{ opacity: 0, x: item.reverse ? 60 : -60 }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: item.reverse ? 60 : -60 }
        }
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex-1 flex items-center justify-center"
      >
        <div className="relative w-full max-w-[16rem] sm:max-w-sm aspect-[4/5] sm:aspect-square">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(243,197,215,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="glass rounded-3xl w-full h-full flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text-pink mb-2 leading-none">
                {item.stat}
              </div>
              <div className="text-nothing-secondary text-sm tracking-widest uppercase">
                {item.statLabel}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: item.reverse ? -60 : 60 }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: item.reverse ? -60 : 60 }
        }
        transition={{
          duration: 0.8,
          delay: 0.12,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="flex-1 flex flex-col gap-5"
      >
        <span className="text-nothing-red text-xs font-semibold tracking-[0.2em] uppercase">
          {item.tag}
        </span>
        <h3 className="text-4xl lg:text-5xl font-bold leading-tight text-white whitespace-pre-line">
          {item.title}
        </h3>
        <p className="text-nothing-secondary leading-relaxed text-base max-w-md">
          {item.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="bg-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-nothing-red text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
            Features
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Built Different.</span>
          </h2>
          <p className="text-nothing-secondary text-lg max-w-xl mx-auto">
            Every component chosen with intention. Every detail refined to
            perfection.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>

        {/* Highlight Rows */}
        <div className="divide-y divide-white/5">
          {HIGHLIGHTS.map((item, i) => (
            <HighlightRow key={item.tag} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
