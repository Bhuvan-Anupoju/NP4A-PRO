import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const STORAGE_OPTIONS = [
  { storage: "128GB", ram: "8GB", price: "₹49,999" },
  { storage: "256GB", ram: "8GB", price: "₹52,999" },
  { storage: "256GB", ram: "12GB", price: "₹55,999" },
];

const BASE_URL = import.meta.env.BASE_URL || "/";

const DISPLAY_STORAGE_OPTIONS = STORAGE_OPTIONS.filter(
  (option, index, array) =>
    index ===
    array.findIndex(
      (item) => item.ram === option.ram && item.storage === option.storage,
    ),
);

const VARIANT_URLS = {
  black: {
    "8GB+128GB": {
      url: "https://www.flipkart.com/nothing-phone-4a-pro-black-128-gb/p/itm4d004931f8d69?pid=MOBHM2ZUUYUNJD6M&marketplace=FLIPKART&lid=LSTMOBHM2ZUUYUNJD6M5AZDHB&pageUID=1783316551690",
    },
    "8GB+256GB": {
      url: "https://www.flipkart.com/nothing-phone-4a-pro-black-256-gb/p/itm4d004931f8d69?pid=MOBHM2ZUVKHTBFWT&marketplace=FLIPKART&lid=LSTMOBHM2ZUVKHTBFWTYEHE2K&pageUID=1783316551690",
    },
    "12GB+256GB": {
      url: "https://www.flipkart.com/nothing-phone-4a-pro-black-256-gb/p/itm4d004931f8d69?pid=MOBHM2ZUGGWXUNP2&marketplace=FLIPKART&lid=LSTMOBHM2ZUGGWXUNP2XRMN9R&pageUID=1783316551690",
    },
  },
  white: {
    "8GB+128GB": {
      url: "https://www.flipkart.com/nothing-phone-4a-pro-silver-128-gb/p/itm4d004931f8d69?pid=MOBHM2ZUZXSJAZT4&marketplace=FLIPKART&lid=LSTMOBHM2ZUZXSJAZT4XWCNY3&pageUID=1783316551690",
    },
    "8GB+256GB": {
      url: "https://www.flipkart.com/nothing-phone-4a-pro-silver-256-gb/p/itm4d004931f8d69?pid=MOBHM2ZUKHGGBWGB&marketplace=FLIPKART&lid=LSTMOBHM2ZUKHGGBWGBXMLARR&pageUID=1783316551690",
    },
    "12GB+256GB": {
      url: "https://www.flipkart.com/nothing-phone-4a-pro-silver-256-gb/p/itm4d004931f8d69?pid=MOBHM2ZUEVZQRPGT&marketplace=FLIPKART&lid=LSTMOBHM2ZUEVZQRPGTTXCIIX&pageUID=1783316551690",
    },
  },
  pink: {
    "8GB+128GB": {
      url: "https://www.flipkart.com/nothing-phone-4a-pro-pink-256-gb/p/itm4d004931f8d69?pid=MOBHM2ZU3ZBXJH82&marketplace=FLIPKART&lid=LSTMOBHM2ZU3ZBXJH82MEF9T2&pageUID=1783316551690",
    },
    "8GB+256GB": {
      url: "https://www.flipkart.com/nothing-phone-4a-pro-pink-256-gb/p/itm4d004931f8d69?pid=MOBHM2ZU3ZBXJH82&marketplace=FLIPKART&lid=LSTMOBHM2ZU3ZBXJH82MEF9T2&pageUID=1783316551690",
    },
    "12GB+256GB": {
      url: "https://www.flipkart.com/nothing-phone-4a-pro-pink-256-gb/p/itm4d004931f8d69?pid=MOBHM2ZU3ZBXJH82&marketplace=FLIPKART&lid=LSTMOBHM2ZU3ZBXJH82MEF9T2&pageUID=1783316551690",
    },
  },
};

const COLOR_OPTIONS = [
  {
    id: "black",
    label: "Black",
    swatch: "#2a2a2a",
    image: `${BASE_URL}black.png`,
  },
  {
    id: "white",
    label: "White",
    swatch: "#e8e8e8",
    image: `${BASE_URL}white.png`,
  },
  {
    id: "pink",
    label: "Pink",
    swatch: "#F3C5D7",
    image: `${BASE_URL}pink.png`,
  },
];

const PERKS = [
  "2 years of OS updates",
  "3 years of security patches",
  "Nothing Care warranty",
  "Free express delivery",
];

export default function Price() {
  const [selected, setSelected] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const activeColorKey = COLOR_OPTIONS[selectedColor].id;
  const activeVariant = DISPLAY_STORAGE_OPTIONS[selected];

  const handleBuyNow = () => {
    const key = `${activeVariant.ram}+${activeVariant.storage}`;
    const selectedUrl = VARIANT_URLS[activeColorKey]?.[key]?.url;

    if (selectedUrl) {
      window.open(selectedUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="pricing"
      className="bg-black pt-32 pb-24 lg:pt-40 lg:pb-32 border-t border-white/5 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(243,197,215,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-nothing-red text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Own It.</span>
          </h2>
          <p className="text-nothing-secondary text-lg">
            Premium doesn't have to mean unaffordable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden light-sweep"
        >
          {/* Card glow border */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
          />

          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-center">
            {/* Phone visual */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4 w-full lg:w-auto">
              <div className="flex justify-center w-full lg:justify-end">
                <div className="relative w-32 h-56 lg:w-36 lg:h-64 rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <img
                    src={COLOR_OPTIONS[selectedColor].image}
                    alt={COLOR_OPTIONS[selectedColor].label}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-nothing-secondary text-xs tracking-widest uppercase">
                Nothing Phone (4a) Pro
              </span>
            </div>

            {/* Pricing details */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Color selector */}
              <div>
                <p className="text-nothing-secondary text-xs tracking-widest uppercase mb-3">
                  Choose Color
                </p>
                <div className="flex gap-2 flex-wrap">
                  {COLOR_OPTIONS.map((color, i) => (
                    <motion.button
                      key={color.id}
                      onClick={() => setSelectedColor(i)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-8 h-8 rounded-full border transition-all duration-300"
                      style={{
                        background: color.swatch,
                        borderColor:
                          selectedColor === i
                            ? "rgba(255,255,255,0.9)"
                            : "rgba(255,255,255,0.15)",
                        boxShadow:
                          selectedColor === i
                            ? `0 0 0 3px ${color.swatch}40`
                            : "none",
                      }}
                      aria-label={color.label}
                    />
                  ))}
                </div>
              </div>

              {/* Storage selector */}
              <div>
                <p className="text-nothing-secondary text-xs tracking-widest uppercase mb-3">
                  Choose Storage
                </p>
                <div className="flex gap-3 flex-wrap">
                  {DISPLAY_STORAGE_OPTIONS.map((opt, i) => (
                    <motion.button
                      key={`${opt.ram}-${opt.storage}`}
                      onClick={() => setSelected(i)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                      style={{
                        background:
                          selected === i
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(255,255,255,0.03)",
                        border:
                          selected === i
                            ? "1px solid rgba(255,255,255,0.25)"
                            : "1px solid rgba(255,255,255,0.08)",
                        color: selected === i ? "#fff" : "#888",
                      }}
                    >
                      {opt.ram} · {opt.storage}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl font-bold text-white"
                >
                  {DISPLAY_STORAGE_OPTIONS[selected].price}
                </motion.div>
                <p className="text-nothing-secondary text-sm mt-1">
                  Inclusive of all taxes · Free delivery
                </p>
              </div>

              {/* Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PERKS.map((perk) => (
                  <div key={perk} className="flex items-center gap-2">
                    <Check size={14} className="text-nothing-pink shrink-0" />
                    <span className="text-nothing-secondary text-sm">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBuyNow}
                  className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold"
                >
                  Buy Now
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
