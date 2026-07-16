import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import ProjectCard from "../components/ProjectCard";
import Button from "../components/Button";

// ─── Config — reemplazá con tus proyectos reales ────────────────────────────
// featured: true → el card ocupa md:col-span-2 en el grid
// image: "/path/to/screenshot.png" → opcional, muestra captura en el card
const PROJECTS = [
  {
    title: "Rolling Music",
    description:
      "Web de música con reproductor de audio, playlists y animaciones fluidas. Desarrollada con React, Tailwind CSS, con base de datos. Permite a los usuarios crear y gestionar sus propias listas de reproducción, explorar música por género y artista, y disfrutar de una experiencia de usuario interactiva y atractiva. Consumimos la API de deezer para obtener información de artistas, álbumes y canciones, y utilizamos MongoDB para almacenar datos de usuarios y sus playlists.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Vite", "node.js", "Express", "MongoDB"],
    github: "https://github.com/marcosvalla28/rollingMusic",
    live: "https://rolling-music.vercel.app",
    featured: true,
  },
  {
    title: "Hotel Jamax",
    description:
      "Web hotelera con panel de administrador para modificar precios y subir imagenes, tiene calculadora de precio, uso supabase para guardar imagenes y usuario de admin.",
    tech: ["React", "JavaScript","Tailwind CSS", "SupaBase"],
    github: "https://github.com/marcosvalla28/task-manager",
    live: "https://hotel-jamax.vercel.app",
  },
  {
    title: "Formulario de Incripcion",
    description:
      "Formulario para inscribirse en cursos, Con panel de administrador y posibilidad de exportar listado a archivo en formato xlsx.",
    tech: ["JavaScript", "React", "Tailwind CSS", "SupaBase", "xlsx"],
    github: "https://github.com/marcosvalla28/",
    live: "https://formulario-inscripcion-weld.vercel.app/",
  },
  {
    title: "Weather Dashboard",
    description:
      "Dashboard del clima sobre OpenWeatherMap API con pronóstico de 7 días, búsqueda por ciudad y gráficos interactivos.",
    tech: ["JavaScript", "CSS3", "REST API", "Chart.js"],
    github: "https://github.com/yourusername/weather-app",
    live: "https://weather-demo.netlify.app",
  },
];

// ─── Animation variants ──────────────────────────────────────────────────────

// Grid container — stagger entre los wrappers de cada card
const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

// Wrapper de cada card — controla la entrada escalonada
// La card interna ya tiene whileHover propio; este wrapper maneja solo el enter.
const cardWrapperVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Projects ────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          {/* Textos */}
          <div>
            <p className="font-mono text-accent text-sm mb-3 tracking-wide">
              03. Proyectos
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Trabajos seleccionados
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-md">
              Algunos de mis proyectos personales y colavorativos.
            </p>
          </div>

          {/* CTA — ver todos en GitHub */}
          <Button
            as="a"
            href="https://github.com/marcosvalla28"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="sm"
            iconRight={<HiArrowRight size={14} />}
            className="self-start md:self-auto shrink-0"
          >
            Todos los Proyectos
          </Button>
        </motion.div>

        {/* ── Grid de proyectos ────────────────────── */}
        {/*
          Layout:
            mobile  → 1 columna
            md      → 2 columnas  (featured: col-span-2 → full width)
            lg      → 3 columnas  (featured: col-span-2 → 2/3 del ancho)

          El stagger se maneja acá con gridVariants → cardWrapperVariants.
          ProjectCard recibe el prop `noMotion` implícitamente: como el wrapper
          ya controla la entrada, si querés evitar la doble animación podés
          comentar los props `initial` / `whileInView` dentro de ProjectCard.
          En la práctica la diferencia es imperceptible.
        */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              variants={cardWrapperVariants}
              // featured replica la clase del card para que el grid lo respete
              className={project.featured ? "md:col-span-2" : ""}
            >
              <ProjectCard
                index={i + 1}
                {...project}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}