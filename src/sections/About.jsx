import { motion } from "framer-motion";
import { HiDownload } from "react-icons/hi";
import Button from "../components/Button";

// ─── Config ──────────────────────────────────────────────────────────────────
const STATS = [
  { value: "2+",  label: "Years coding"    },
  { value: "15+", label: "Projects built"  },
  { value: "∞",   label: "Cups of coffee"  },
];

// ─── Animation variants ──────────────────────────────────────────────────────

// Columna izquierda: stagger en cascada para cada elemento de texto
const textContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

const textItemVariants = {
  hidden:  { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Stats: entran después de que la foto ya está visible
const statsContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.25 },
  },
};

const statItemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: "easeOut" },
  },
};

// ─── About ───────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Columna izquierda: texto ─────────────── */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Label de sección */}
            <motion.p
              variants={textItemVariants}
              className="font-mono text-accent text-sm mb-3 tracking-wide"
            >
              01. about
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={textItemVariants}
              className="font-display font-bold text-4xl md:text-5xl text-foreground mb-8 leading-tight"
            >
              A bit about me
            </motion.h2>

            {/* Párrafos — personalizá el contenido */}
            <motion.div
              variants={textItemVariants}
              className="space-y-5 text-muted text-base leading-relaxed mb-10"
            >
              <p>
                Hola, soy{" "}
                <span className="text-foreground font-medium">Your Name</span>,
                desarrollador frontend basado en{" "}
                <span className="text-foreground font-medium">Tu Ciudad</span>.
                Me gusta convertir ideas en experiencias reales en la web —
                desde interfaces limpias y minimalistas hasta apps interactivas más complejas.
              </p>
              <p>
                Llevo{" "}
                <span className="text-foreground font-medium">2+ años</span>{" "}
                construyendo para la web, principalmente con React y su ecosistema.
                Me importan los detalles: animaciones fluidas, código accesible y
                soluciones que sean fáciles de mantener en el tiempo.
              </p>
              <p>
                Cuando no estoy programando, estoy{" "}
                <span className="text-foreground font-medium">escuchando música,
                jugando videojuegos</span>{" "}
                o explorando nuevas herramientas y frameworks.
              </p>
            </motion.div>

            {/* CTA: descargar CV */}
            {/* Colocá tu CV en /public/cv.pdf */}
            <motion.div variants={textItemVariants}>
              <Button
                as="a"
                href="/cv.pdf"
                download
                variant="secondary"
                iconRight={<HiDownload size={15} />}
              >
                Download CV
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Columna derecha: foto + stats ────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            className="flex flex-col items-center lg:items-start gap-8"
          >
            {/* ── Foto con frame accent ──────────────── */}
            {/*
              El frame es un `div` con border accent desplazado que queda
              "detrás" de la foto. Se desplaza un poco más en hover.
            */}
            <div className="relative group w-64 h-72 md:w-72 md:h-80 shrink-0">

              {/* Border accent offset */}
              <div
                aria-hidden="true"
                className="
                  absolute inset-0 rounded-2xl
                  border-2 border-accent/45
                  translate-x-3.5 translate-y-3.5
                  group-hover:translate-x-5 group-hover:translate-y-5
                  transition-transform duration-300
                "
              />

              {/* Contenedor de la foto */}
              <div className="relative rounded-2xl overflow-hidden w-full h-full bg-surface border border-border z-10">
                {/*
                  ── Reemplazá este bloque con tu foto real ──
                  <img
                    src="/img/profile.jpg"
                    alt="Your Name"
                    className="w-full h-full object-cover object-center"
                  />
                */}
                <div className="w-full h-full bg-linear-to-br from-accent/20 via-surface to-bg flex items-center justify-center select-none">
                  <span className="font-display font-bold text-6xl text-accent/25">
                    YN
                  </span>
                </div>

                {/* Overlay sutil para dar profundidad al placeholder */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-bg/40 to-transparent"
                />
              </div>
            </div>

            {/* ── Stat cards ─────────────────────────── */}
            <motion.div
              variants={statsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-3 w-full max-w-xs md:max-w-sm"
            >
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={statItemVariants}
                  className="
                    flex flex-col items-center gap-1.5 p-4 rounded-xl
                    bg-surface border border-border text-center
                    hover:border-accent/30 hover:bg-accent/5
                    transition-all duration-200 cursor-default
                  "
                >
                  <span className="font-display font-bold text-2xl text-accent leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted leading-tight">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
