import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Logo } from "../assets/imagenes"

// ─── Config ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Sobre mi",    href: "#about"    },
  { label: "Habilidades",   href: "#skills"   },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto",  href: "#contact"  },
];

// ─── NavLink ────────────────────────────────────────────────────────────────

function NavLink({ href, label, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="
        relative px-4 py-2 text-sm font-medium
        text-muted hover:text-foreground
        transition-colors duration-200 group
      "
    >
      {label}
      <span
        className="
          absolute bottom-0 left-1/2 -translate-x-1/2
          h-px w-0 group-hover:w-3/5
          bg-accent rounded-full
          transition-all duration-200 ease-out
        "
      />
    </a>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Detecta scroll para activar el glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú mobile al redimensionar a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-500
        ${scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border shadow-xl shadow-black/30"
          : "bg-transparent"
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Logo ─────────────────────────────────── */}
        <motion.a
          href="#hero"
          className="font-display font-bold text-lg text-foreground tracking-tight select-none"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <img src={Logo} alt="LogoMV" className="w-20 sm:w-23" />
        </motion.a>

        {/* ── Desktop nav ───────────────────────────── */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* ── Mobile toggle ─────────────────────────── */}
        <motion.button
          className="
            md:hidden text-muted hover:text-foreground
            transition-colors p-2 rounded-lg hover:bg-surface
          "
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.88 }}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.12, ease: "easeInOut" }}
              className="block"
            >
              {open ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Mobile menu ───────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-surface/95 backdrop-blur-xl border-b border-border"
          >
            <ul className="px-6 py-3 flex flex-col" role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07, duration: 0.22, ease: "easeOut" }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="
                      flex items-center gap-4 py-4
                      text-muted hover:text-foreground font-medium
                      transition-colors duration-150
                      border-b border-border/40 last:border-0
                    "
                  >
                    {/* Número de orden como acento visual */}
                    <span className="text-accent font-mono text-xs tabular-nums opacity-70">
                      0{i + 1}
                    </span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}