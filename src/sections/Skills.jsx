import { motion } from "framer-motion";
import { HiCode, HiServer, HiTerminal, HiAcademicCap } from "react-icons/hi";
import {
  SiReact, SiJavascript, SiTypescript, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiPython, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiVite, SiFigma, SiDocker,
  SiNextdotjs, SiGraphql, SiPrisma,
} from "react-icons/si";

// ─── Config — personalizá tus categorías ────────────────────────────────────
// Nota: si algún ícono de react-icons/si no existe, simplemente omití el
// campo `icon` — el pill se renderiza igual con solo el nombre.
const CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    icon: HiCode,
    skills: [
      { name: "React",        icon: SiReact       },
      { name: "JavaScript",   icon: SiJavascript  },
      { name: "TypeScript",   icon: SiTypescript  },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "HTML5",        icon: SiHtml5       },
      { name: "CSS3",         icon: SiCss        },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: HiServer,
    skills: [
      { name: "Node.js",    icon: SiNodedotjs  },
      { name: "Express",    icon: SiExpress    },
      { name: "Python",     icon: SiPython     },
      { name: "MongoDB",    icon: SiMongodb    },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
  },
  {
    id: "tools",
    label: "Tools & Workflow",
    icon: HiTerminal,
    skills: [
      { name: "Git",    icon: SiGit    },
      { name: "GitHub", icon: SiGithub },
      { name: "Vite",   icon: SiVite   },
      { name: "Figma",  icon: SiFigma  },
      { name: "Docker", icon: SiDocker },
    ],
  },
  {
    id: "learning",
    label: "Currently Learning",
    icon: HiAcademicCap,
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "GraphQL", icon: SiGraphql   },
      { name: "Prisma",  icon: SiPrisma    },
    ],
  },
];

// ─── Animation variants ──────────────────────────────────────────────────────

// 1er nivel: stagger entre cards
const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

// 2do nivel: entrada de cada card
const cardVariants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// 3er nivel: stagger entre pills dentro de cada card
// delayChildren: 0.3 → espera que la card termine su entrada (0.52s)
// antes de empezar a mostrar los pills
const pillsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    },
  },
};

// 4to nivel: entrada de cada skill pill
const pillVariants = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

// ─── Skills ──────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14"
        >
          {/* Número de sección — ajustá según el orden final */}
          <p className="font-mono text-accent text-sm mb-3 tracking-wide">
            02. skills
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Tech Stack
          </h2>
          <p className="text-muted text-base leading-relaxed max-w-md">
            Technologies I&apos;ve been working with recently.
          </p>
        </motion.div>

        {/* ── Grid de categorías ───────────────────── */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CategoryCard ────────────────────────────────────────────────────────────
function CategoryCard({ label, icon: CategoryIcon, skills }) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative group bg-surface border border-border rounded-2xl p-6 overflow-hidden hover:border-accent/30 transition-colors duration-300"
    >
      {/* Shimmer line — idéntico al de ProjectCard para consistencia */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      {/* Ambient glow */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      {/* Header de la card */}
      <div className="relative flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
          <CategoryIcon size={17} />
        </div>
        <h3 className="font-display font-bold text-foreground">{label}</h3>
      </div>

      {/* Pills con stagger propio — whileInView independiente del padre */}
      <motion.div
        variants={pillsContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative flex flex-wrap gap-2.5"
      >
        {skills.map((skill) => (
          <SkillPill key={skill.name} {...skill} />
        ))}
      </motion.div>
    </motion.div>
  );
}

// ─── SkillPill ───────────────────────────────────────────────────────────────
// `icon` es opcional — si el ícono no existe en react-icons/si, omitilo
// y el pill muestra solo el nombre sin romper nada.
function SkillPill({ name, icon: Icon }) {
  return (
    <motion.div
      variants={pillVariants}
      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border text-muted hover:text-foreground hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 cursor-default group/pill"
    >
      {Icon && (
        <Icon
          size={14}
          aria-hidden="true"
          className="shrink-0 group-hover/pill:text-accent transition-colors duration-200"
        />
      )}
      <span className="text-sm font-medium">{name}</span>
    </motion.div>
  );
}