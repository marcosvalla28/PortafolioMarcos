import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiArrowUp } from "react-icons/hi";
import { Logo } from "../assets/imagenes"

// ─── Config ────────────────────────────────────────────────────────────────
// Reemplaza los hrefs con tus perfiles reales
const SOCIAL_LINKS = [
  {
    icon: FaGithub,
    href: "https://github.com/yourusername",
    label: "GitHub",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com/in/yourusername",
    label: "LinkedIn",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com/yourusername",
    label: "X / Twitter",
  },
];

// ─── Animation variant ──────────────────────────────────────────────────────
// custom = índice del elemento para el stagger
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      delay: custom * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// ─── Footer ─────────────────────────────────────────────────────────────────
export default function Footer() {
  const scrollToTop = () => {
    // Si usas Lenis, reemplazá por: lenis.scrollTo(0)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border bg-surface/30">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-4">

        {/* ── Main row ─────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Caption / créditos */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-sm text-muted order-2 md:order-1"
          >
            <img src={Logo} alt="LogoMV" className="w-40 " />
          </motion.p>

          {/* Social icons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="flex items-center gap-2 order-1 md:order-2"
            aria-label="Social media links"
          >
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="
                  text-muted hover:text-accent
                  p-2.5 rounded-xl
                  border border-transparent
                  hover:border-accent/20 hover:bg-accent/10
                  transition-colors duration-200
                "
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </motion.div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="
              flex items-center gap-2.5 text-sm
              text-muted hover:text-accent
              transition-colors duration-200 group
              order-3
            "
            aria-label="Back to top"
          >
            Volver al Inicio
            <span
              className="
                p-1.5 rounded-lg
                border border-border
                group-hover:border-accent/40 group-hover:bg-accent/10
                transition-all duration-200
              "
            >
              <HiArrowUp size={13} />
            </span>
          </motion.button>
        </div>

        {/* ── Copyright strip ───────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          className="mt-8 pt-5 border-t border-border/30 text-center"
        >
          <p className="text-xs text-muted/50 tracking-wide">
            © {new Date().getFullYear()} {''}Marcos Valladares &middot; Hecho con React &amp; Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
}