import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const BASE_URL = import.meta.env.BASE_URL || "/";

const VARIANTS = [
  {
    key: "black",
    label: "Black",
    folder: `${BASE_URL}frames`,
    total: 175,
    swatch: "#2a2a2a",
    swatchBorder: "rgba(255,255,255,0.2)",
  },
  {
    key: "white",
    label: "White",
    folder: `${BASE_URL}whiteFrames`,
    total: 175,
    swatch: "#e8e8e8",
    swatchBorder: "rgba(0,0,0,0.15)",
  },
  {
    key: "pink",
    label: "Pink",
    folder: `${BASE_URL}pinkFrames`,
    total: 200,
    swatch: "#F3C5D7",
    swatchBorder: "rgba(243,197,215,0.4)",
  },
];

function preloadSet(folder, total, onProgress, onDone) {
  const imgs = [];
  let loaded = 0;
  for (let i = 0; i < total; i++) {
    const img = new Image();
    img.src = `${folder}/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;
    img.onload = img.onerror = () => {
      loaded++;
      onProgress(loaded / total);
      if (loaded === total) onDone(imgs);
    };
    imgs.push(img);
  }
  return imgs;
}

export default function Hero() {
  const containerRef = useRef(null);
  const frameProxy = useRef({ value: 0 });
  const currentFrame = useRef(0); // 0–1 normalised progress
  const targetFrame = useRef(0);
  const rafRef = useRef(null);

  // One canvas ref + image array per variant
  const canvasRefs = useRef({ black: null, white: null, pink: null });
  const imageRefs = useRef({ black: [], white: [], pink: [] });

  const [ready, setReady] = useState({
    black: false,
    white: false,
    pink: false,
  });
  const [prog, setProg] = useState({ black: 0, white: 0, pink: 0 });
  const [active, setActive] = useState("black");

  const allReady = ready.black && ready.white && ready.pink;

  /* ── draw a single canvas at normalised progress 0-1 ── */
  const drawVariant = useCallback((key, progress) => {
    const canvas = canvasRefs.current[key];
    const imgs = imageRefs.current[key];
    const total = VARIANTS.find((v) => v.key === key).total;
    if (!canvas || !imgs.length) return;

    const idx = Math.max(
      0,
      Math.min(total - 1, Math.round(progress * (total - 1))),
    );
    const img = imgs[idx];
    if (!img?.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    let drawW, drawH, drawX, drawY;

    if (cw < 768) {
      // Mobile — fill height, center
      drawH = ch;
      drawW = ch * imgAspect;
      drawX = (cw - drawW) / 2;
      drawY = 0;
    } else {
      // Desktop — fill height, push right
      drawH = ch;
      drawW = ch * imgAspect;
      drawX = cw - drawW + cw * 0.18;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  const drawAll = useCallback(
    (progress) => {
      VARIANTS.forEach((v) => drawVariant(v.key, progress));
    },
    [drawVariant],
  );

  /* ── render loop ── */
  const renderLoop = useCallback(() => {
    const diff = targetFrame.current - currentFrame.current;
    if (Math.abs(diff) > 0.0003) {
      currentFrame.current += diff * 0.12;
      drawAll(currentFrame.current);
    }
    rafRef.current = requestAnimationFrame(renderLoop);
  }, [drawAll]);

  /* ── preload all 3 sets in parallel ── */
  useEffect(() => {
    VARIANTS.forEach(({ key, folder, total }) => {
      imageRefs.current[key] = preloadSet(
        folder,
        total,
        (p) => setProg((prev) => ({ ...prev, [key]: p })),
        (imgs) => {
          imageRefs.current[key] = imgs;
          setReady((prev) => ({ ...prev, [key]: true }));
        },
      );
    });
  }, []);

  /* ── draw frame 0 once all ready ── */
  useEffect(() => {
    if (allReady) drawAll(0);
  }, [allReady, drawAll]);

  /* ── resize all canvases ── */
  useEffect(() => {
    const resize = () => {
      VARIANTS.forEach(({ key }) => {
        const c = canvasRefs.current[key];
        if (c) {
          c.width = window.innerWidth;
          c.height = window.innerHeight;
        }
      });
      drawAll(currentFrame.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawAll]);

  /* ── ScrollTrigger ── */
  useEffect(() => {
    if (!allReady) return;
    const ctx = gsap.context(() => {
      gsap.to(frameProxy.current, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => {
            targetFrame.current = self.progress;
          },
        },
      });
    }, containerRef);
    rafRef.current = requestAnimationFrame(renderLoop);
    return () => {
      ctx.revert();
      cancelAnimationFrame(rafRef.current);
    };
  }, [allReady, renderLoop]);

  // Average load progress across all 3
  const loadPct = Math.round(((prog.black + prog.white + prog.pink) / 3) * 100);

  const s = (i) => ({
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.13,
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  });

  return (
    <div ref={containerRef} style={{ height: "600vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* ── 3 canvases stacked, opacity crossfade ── */}
        {VARIANTS.map(({ key }) => (
          <canvas
            key={key}
            ref={(el) => (canvasRefs.current[key] = el)}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: allReady && active === key ? 1 : 0,
              transition: "opacity 0.55s ease",
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `
            linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.70) 30%, rgba(0,0,0,0.25) 58%, rgba(0,0,0,0.00) 100%),
            linear-gradient(to top,  rgba(0,0,0,0.60) 0%, transparent 30%),
            linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 18%)
          `,
          }}
        />

        {/* Loading */}
        {!allReady && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-black">
            <div className="w-52 h-px bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${loadPct}%` }}
                transition={{ duration: 0.08 }}
              />
            </div>
            <span className="font-dotmatrix text-white/30 text-[10px] tracking-[0.3em]">
              {loadPct}%
            </span>
          </div>
        )}

        {/* ── TEXT ── */}
        <div className="absolute inset-0 z-[2] flex flex-col justify-center pt-20 pb-16 px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="max-w-md sm:max-w-lg xl:max-w-xl">
            <motion.div
              variants={s(0)}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 mb-5 sm:mb-6"
            ></motion.div>

            <motion.h1
              variants={s(1)}
              initial="hidden"
              animate="visible"
              className="font-bold leading-[0.9] tracking-tight mb-5 sm:mb-6"
              style={{ fontSize: "clamp(2.6rem, 8vw, 6.5rem)" }}
            >
              <span className="gradient-text">Nothing</span>
              <br />
              <span className="text-white">Phone</span>
              <br />
              <span className="text-white/35 font-light">(4a) Pro</span>
            </motion.h1>

            <motion.p
              variants={s(2)}
              initial="hidden"
              animate="visible"
              className="font-dotmatrix text-white/75 mb-4 sm:mb-5 leading-snug"
              style={{ fontSize: "clamp(0.75rem, 1.8vw, 1.1rem)" }}
            >
              Engineered to be Seen.
            </motion.p>

            <motion.p
              variants={s(3)}
              initial="hidden"
              animate="visible"
              className="text-white/40 text-sm leading-relaxed mb-7 sm:mb-9 max-w-xs sm:max-w-sm"
            >
              Transparent design meets intelligent performance. The Glyph Matrix
              evolves. The camera sees more.
            </motion.p>

            <motion.div
              variants={s(4)}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 mb-7"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm font-semibold"
              >
                Buy Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-secondary px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm font-medium"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* ── 3-way color toggle ── */}
            <motion.div
              variants={s(5)}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3"
            >
              <span className="font-dotmatrix text-white/30 text-[9px] tracking-[0.25em] uppercase">
                Color
              </span>
              <div
                className="flex items-center gap-1 p-1 rounded-full"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {VARIANTS.map(({ key, label, swatch, swatchBorder }) => (
                  <motion.button
                    key={key}
                    onClick={() => setActive(key)}
                    whileTap={{ scale: 0.93 }}
                    className="relative flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-300"
                    style={{
                      color: active === key ? "#000" : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {active === key && (
                      <motion.div
                        layoutId="variantPill"
                        className="absolute inset-0 rounded-full bg-white"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                      />
                    )}
                    <span
                      className="relative z-10 w-2.5 h-2.5 rounded-full shrink-0"
                      style={{
                        background: swatch,
                        border: `1px solid ${swatchBorder}`,
                      }}
                    />
                    <span className="relative z-10">{label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: allReady ? 1 : 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
        >
          <span className="font-dotmatrix text-white/20 text-[9px] tracking-[0.35em] uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-7 bg-gradient-to-b from-white/35 to-transparent"
          />
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: allReady ? 1 : 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 right-6 sm:right-10 z-[2] font-dotmatrix text-white/20 text-[9px] tracking-widest"
        >
          NP4A·PRO
        </motion.span>
      </div>
    </div>
  );
}
