import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";

// ─── ProjectCard ─────────────────────────────────────────────────────────────
/**
 * Props:
 *   index       {number}   — número de orden (01, 02…)
 *   title       {string}   — nombre del proyecto
 *   description {string}   — descripción breve (2-3 líneas)
 *   tech        {string[]} — ["React", "Tailwind", "Node.js"]
 *   github      {string}   — URL al repositorio (opcional)
 *   live        {string}   — URL al deploy (opcional)
 *   image       {string}   — URL de captura de pantalla (opcional)
 *   featured    {boolean}  — ocupa 2 columnas en desktop (opcional)
 *
 * Uso en Projects section:
 *   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
 *     {projects.map((p, i) => (
 *       <ProjectCard key={p.title} index={i + 1} {...p} />
 *     ))}
 *   </div>
 */
export default function ProjectCard({
  index       = 1,
  title       = "",
  description = "",
  tech        = [],
  github,
  live,
  image,
  featured    = false,
}) {
  return (
    <motion.article
      className={`
        relative group flex flex-col
        bg-surface border border-border rounded-2xl overflow-hidden
        ${featured ? "md:col-span-2" : ""}
      `}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 280, damping: 20 },
      }}
    >
      {/* Shimmer line en el top — aparece en hover */}
      <span
        aria-hidden="true"
        className="
          absolute inset-x-0 top-0 h-px z-10
          bg-linear-to-r from-transparent via-accent/60 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
      />

      {/* Ambient glow de fondo en hover */}
      <span
        aria-hidden="true"
        className="
          absolute inset-0
          bg-linear-to-br from-accent/5 via-transparent to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300 pointer-events-none
        "
      />

      {/* ── Imagen del proyecto (opcional) ──────── */}
      {image && (
        <div className="relative h-44 overflow-hidden border-b border-border group-hover:border-accent/20 transition-colors duration-300">
          <img
            src={image}
            alt={`${title} preview`}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Gradiente que integra la imagen con el fondo oscuro */}
          <div className="absolute inset-0 bg-linear-to-t from-surface/70 to-transparent" />
        </div>
      )}

      {/* ── Contenido ───────────────────────────── */}
      <div className="relative flex flex-col flex-1 p-6">

        {/* Header: ícono + número */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-sm text-accent/60 select-none" aria-hidden="true">
            {featured ? "⋆ featured" : "{}"}
          </span>
          <span className="font-mono text-xs text-muted/30 tabular-nums select-none" aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        {/* Título */}
        <h3 className="
          font-display font-bold text-lg leading-snug mb-2
          text-foreground group-hover:text-accent
          transition-colors duration-200
        ">
          {title}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-muted leading-relaxed mb-5 flex-1">
          {description}
        </p>

        {/* Tech stack */}
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {tech.map((t) => (
              <span
                key={t}
                className="
                  px-2.5 py-1 rounded-md
                  text-xs font-mono text-muted/70
                  border border-border/60
                "
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        {(github || live) && (
          <div className="flex items-center gap-5 pt-4 border-t border-border/40">
            {github && (
              <CardLink
                href={github}
                icon={<FaGithub size={14} />}
                label="GitHub"
                ariaLabel={`${title} — código fuente`}
              />
            )}
            {live && (
              <CardLink
                href={live}
                icon={<HiExternalLink size={15} />}
                label="Live demo"
                ariaLabel={`${title} — demo en vivo`}
              />
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

// ─── CardLink ─────────────────────────────────────────────────────────────────
// Link interno de la card con micro-animación en X al hover
function CardLink({ href, icon, label, ariaLabel }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="
        inline-flex items-center gap-1.5
        text-xs font-medium text-muted
        hover:text-accent transition-colors duration-200
      "
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {icon}
      {label}
    </motion.a>
  );
}