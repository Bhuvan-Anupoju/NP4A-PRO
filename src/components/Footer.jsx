import { motion } from "framer-motion";
import { Twitter, Instagram, Youtube, Github } from "lucide-react";

const LINKS = {
  Product: ["Phone (4a) Pro", "Phone (3a)", "Ear (2)", "CMF by Nothing"],
  Company: ["About", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Warranty", "Contact", "Community"],
};

const SOCIALS = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "YouTube" },
  { Icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="grid grid-cols-3 gap-[3px] p-0.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[4px] h-[4px] rounded-full bg-white"
                  />
                ))}
              </div>
              <span className="font-dotmatrix text-white text-xs tracking-[0.18em] uppercase">
                Nothing
              </span>
            </div>
            <p className="text-nothing-secondary text-sm leading-relaxed max-w-xs">
              Crafting technology that feels human. Designed to be seen, built
              to last.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, color: "#fff" }}
                  className="text-nothing-secondary hover:text-white transition-colors"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-4">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-nothing-secondary hover:text-white text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-nothing-secondary text-[10px] tracking-[0.2em] uppercase">
              Glyph Interface
            </span>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.25, 0.9, 0.25] }}
                transition={{
                  duration: 1.8,
                  delay: i * 0.08,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-[6px] h-[6px] rounded-[2px] bg-white/80"
              />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-nothing-secondary text-xs">
            © 2025 Nothing Technology Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-nothing-secondary hover:text-white text-xs transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
