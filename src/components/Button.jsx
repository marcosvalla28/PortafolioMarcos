import { motion } from "framer-motion";

// ─── Estilos por variante ────────────────────────────────────────────────────
const VARIANTS = {
  primary: `
    bg-accent text-white
    shadow-md shadow-accent/25
    hover:bg-accent/90
  `,
  secondary: `
    border border-border text-foreground
    hover:border-accent/50 hover:bg-accent/10
  `,
  ghost: `
    text-muted hover:text-foreground hover:bg-surface
  `,
};

// ─── Estilos por tamaño ──────────────────────────────────────────────────────
const SIZES = {
  sm: "px-3.5 py-2    text-xs   gap-1.5 rounded-lg",
  md: "px-5   py-2.5  text-sm   gap-2   rounded-xl",
  lg: "px-7   py-3.5  text-base gap-2.5 rounded-xl",
};

// ─── Button ──────────────────────────────────────────────────────────────────
/**
 * Uso:
 *   <Button>Click me</Button>
 *   <Button variant="secondary" size="sm">Learn more</Button>
 *   <Button iconRight={<HiArrowRight />}>View all</Button>
 *   <Button as="a" href="#projects">Ver proyectos</Button>
 *   <Button isLoading>Enviando...</Button>
 */
export default function Button({
  children,
  variant   = "primary",
  size      = "md",
  iconLeft,
  iconRight,
  isLoading = false,
  as: Tag   = "button",    // "button" | "a"
  className = "",
  ...props
}) {
  // Renderiza como motion.a o motion.button según el prop `as`
  const Component = Tag === "a" ? motion.a : motion.button;

  return (
    <Component
      className={`
        inline-flex items-center justify-center font-semibold select-none
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${className}
      `}
      whileHover={!isLoading ? { scale: 1.04, y: -2 }  : undefined}
      whileTap={!isLoading   ? { scale: 0.97 }          : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      // disabled solo aplica a <button>, no a <a>
      {...(Tag === "button" ? { disabled: isLoading || props.disabled } : {})}
      {...props}
    >
      {isLoading ? (
        <>
          {/* Spinner CSS puro — no requiere icono externo */}
          <span className="shrink-0 h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          {children}
        </>
      ) : (
        <>
          {iconLeft  && <span className="shrink-0">{iconLeft}</span>}
          {children}
          {iconRight && <span className="shrink-0">{iconRight}</span>}
        </>
      )}
    </Component>
  );
}