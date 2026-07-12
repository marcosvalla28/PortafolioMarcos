import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowRight, HiArrowDown } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { imagen2 } from "../assets/imagenes";

// ─── Config ─────────────────────────────────────────────────────────────────
// Personalizá estos valores
const NAME   = "Marcos Valladares";
const GITHUB = "marcosvalla28";
const BIO    = "Estoy capacitandome, y me gusta actualizarme de forma constante, estoy enfocado en el Frontend y buscando oportunidades para colaborar.";

const ROLES = [
  "Desarrollador Frontend",
  "Desarrollador React",
  "TailwindCss",
];

// ─── Animation variants ──────────────────────────────────────────────────────
// Container orquesta el stagger de todos los hijos
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.25,
    },
  },
};

// Cada elemento del hero entra con fade + slide-up
const itemVariants = {
  hidden:   { opacity: 0, y: 28 },
  visible:  {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Hero ────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Cicla los roles automáticamente
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      2800
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-7 overflow-hidden"
    >
      {/* ── Background orbs ─────────────────────────── */}

      {/* Orb violeta — arriba derecha */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-[10%] -right-[10%] w-150 h-150 rounded-full bg-accent/20 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.18, 1], x: [0, 30, 0], y: [0, -25, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb índigo — abajo izquierda */}
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-[5%] -left-[10%] w-130 h-130 rounded-full bg-[#3b2fc9]/20 blur-[110px] pointer-events-none"
        animate={{ scale: [1, 1.12, 1], x: [0, -20, 0], y: [0, 22, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* ── Hero content ────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center"
      >

        {/* Badge: disponibilidad */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2.5 mb-8 mt-5 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-soft text-sm font-medium"
        >
          {/* Punto pulsante verde — indica disponibilidad */}
          <span className="relative flex h-2 w-2 " aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Disponible para Trabajar
        </motion.div>

        {/* Heading principal + foto */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 mb-4"
        >
          {/* Foto de perfil — sin fondo, con glow detrás y flotación suave */}
          <motion.div
            className="relative shrink-0"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Glow detrás de la imagen */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-accent/30 blur-2xl scale-90 pointer-events-none"
            />
            <img
              src={imagen2}
              alt={NAME}
              className="relative w-50  sm:w-50  md:w-50  object-contain"
              style={{
                maskImage: "linear-gradient(to top, transparent, black 40%)",
                WebkitMaskImage: "linear-gradient(to top, transparent, black 40%)",
              }}
            />
          </motion.div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-[4.5rem] text-foreground leading-[1.06] tracking-tight">
            Hola, Soy{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-soft">
              {NAME}
            </span>
          </h1>
        </motion.div>

        {/* Role cycling — slide vertical con AnimatePresence */}
        <motion.div
          variants={itemVariants}
          className="h-9 flex items-center justify-center mb-6 overflow-hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
              className="text-xl md:text-2xl text-muted font-mono"
            >
              &lt;{ROLES[roleIndex]} /&gt;
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="text-muted text-base md:text-lg leading-relaxed max-w-xl mb-10"
        >
          {BIO}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          {/* Primario — sólido con glow */}
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm shadow-lg shadow-accent/30 hover:bg-accent/90 transition-colors duration-200"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            Ver Proyectos
            <HiArrowRight size={15} />
          </motion.a>

          {/* Secundario — outlined */}
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-accent/50 hover:bg-accent/10 text-foreground font-semibold text-sm transition-all duration-200"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            Contactame
          </motion.a>
        </motion.div>

        {/* GitHub quick-link */}
        <motion.a
          variants={itemVariants}
          href={`https://github.com/${GITHUB}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex mb-2 items-center gap-2 text-sm text-muted hover:text-foreground transition-colors duration-200 group"
        >
          <FaGithub size={15} />
          <span>{GITHUB}</span>
          <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-base leading-none">
            ↗
          </span>
        </motion.a>
      </motion.div>

      {/* ── Scroll indicator ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="fixed bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-[10px] text-muted/40 tracking-[0.2em] uppercase font-mono">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted/40"
        >
          <HiArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}