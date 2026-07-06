import { motion } from "framer-motion";

const SPECS = [
  {
    label: "Processor",
    value: "Snapdragon 7 Gen 4",
    sub: "Advanced AI performance · Efficient architecture",
  },
  {
    label: "Display",
    value: '6.83" Flexible AMOLED',
    sub: "1.5K · 144Hz · HDR · 5000 nits peak",
  },
  {
    label: "Battery",
    value: "5400 mAh",
    sub: "India variant",
  },
  {
    label: "Charging",
    value: "50W Wired · 7.5W Reverse Wired",
    sub: "Fast charging support",
  },
  {
    label: "Storage",
    value: "128GB / 256GB",
    sub: "UFS 3.1",
  },
  {
    label: "RAM",
    value: "8GB / 12GB",
    sub: "LPDDR5X",
  },
  {
    label: "Camera",
    value: "50MP + 50MP + 8MP",
    sub: "OIS · Periscope Telephoto · 4K Video",
  },
  {
    label: "OS",
    value: "Nothing OS 4.1",
    sub: "Based on Android 16",
  },
  {
    label: "Build",
    value: "Gorilla Glass 7i · Aluminum Frame",
    sub: "IP65 dust & splash resistant",
  },
];

export default function Specs() {
  return (
    <section
      id="specifications"
      className="bg-black py-24 lg:py-32 border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-nothing-red text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
            Specifications
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold">
            <span className="gradient-text">The Details.</span>
          </h2>
        </motion.div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="spec-row flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 gap-1"
            >
              <span className="text-nothing-secondary text-sm font-medium w-32 shrink-0">
                {spec.label}
              </span>
              <div className="flex-1 sm:text-right">
                <div className="text-white font-semibold text-base">
                  {spec.value}
                </div>
                <div className="text-nothing-secondary text-xs mt-0.5">
                  {spec.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-nothing-secondary text-xs mt-6 text-center"
        >
          Specifications may vary by region. All measurements are approximate.
        </motion.p>
      </div>
    </section>
  );
}
