import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiArrowRight, HiCheckCircle, HiExclamationCircle, HiMail } from "react-icons/hi";
import Button from "../components/Button";

// ─── Config ──────────────────────────────────────────────────────────────────
const EMAIL        = "yourname@email.com";
const FORMSPREE_ID = "YOUR_FORM_ID"; // formspree.io → crear cuenta gratis → copiar el ID

const SOCIALS = [
  { icon: FaGithub,     href: "https://github.com/yourusername",      label: "GitHub"   },
  { icon: FaLinkedinIn, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
  { icon: FaXTwitter,   href: "https://x.com/yourusername",           label: "X"        },
];

// ─── Animation variants ──────────────────────────────────────────────────────

// Columna izquierda: stagger en cascada
const leftVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Formulario: stagger entre campos
const formVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fieldVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ─── Contact ─────────────────────────────────────────────────────────────────
export default function Contact() {
  const [form,   setForm]   = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* ── Columna izquierda: CTA ───────────────── */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Label */}
            <motion.p
              variants={itemVariants}
              className="font-mono text-accent text-sm mb-3 tracking-wide"
            >
              04. contact
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mb-6"
            >
              Let&apos;s work<br className="hidden sm:block" /> together
            </motion.h2>

            {/* Descripción */}
            <motion.p
              variants={itemVariants}
              className="text-muted text-base leading-relaxed mb-10 max-w-sm"
            >
              ¿Tenés un proyecto en mente, querés colaborar o simplemente decir hola?
              Mi bandeja de entrada está abierta.
            </motion.p>

            {/* Email link */}
            <motion.a
              variants={itemVariants}
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 mb-10 group"
            >
              <span className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors duration-200">
                <HiMail size={17} />
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-200">
                {EMAIL}
              </span>
              <HiArrowRight
                size={14}
                className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
              />
            </motion.a>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    text-muted hover:text-accent
                    p-2.5 rounded-xl border border-transparent
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
          </motion.div>

          {/* ── Columna derecha: formulario ──────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          >
            <div className="bg-surface border border-border rounded-2xl p-8">
              <AnimatePresence mode="wait">

                {/* ── Success state ─────────────────── */}
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center text-center py-10 gap-4"
                  >
                    <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400">
                      <HiCheckCircle size={34} />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground">
                      Message sent!
                    </h3>
                    <p className="text-muted text-sm max-w-xs leading-relaxed">
                      Gracias por escribirme. Te respondo a la brevedad.
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStatus("idle")}
                      className="mt-2"
                    >
                      Send another
                    </Button>
                  </motion.div>

                ) : (

                  /* ── Form state ───────────────────── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                  >
                    <motion.div
                      variants={formVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex flex-col gap-5"
                    >
                      {/* Name + Email en fila */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <motion.div variants={fieldVariants}>
                          <FormField
                            id="name"
                            label="Name"
                            type="text"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                          />
                        </motion.div>
                        <motion.div variants={fieldVariants}>
                          <FormField
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="you@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                          />
                        </motion.div>
                      </div>

                      {/* Message */}
                      <motion.div variants={fieldVariants}>
                        <FormField
                          id="message"
                          label="Message"
                          type="textarea"
                          placeholder="Tell me about your project..."
                          value={form.message}
                          onChange={handleChange}
                          required
                        />
                      </motion.div>

                      {/* Error inline */}
                      <AnimatePresence>
                        {status === "error" && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1,  y:  0 }}
                            exit={{ opacity: 0,    y: -8 }}
                            className="flex items-start gap-2 text-red-400 text-sm"
                          >
                            <HiExclamationCircle size={16} className="mt-0.5 shrink-0" />
                            <span>
                              Algo salió mal. Intentá de nuevo o escribime directamente
                              a{" "}
                              <a href={`mailto:${EMAIL}`} className="underline underline-offset-2">
                                {EMAIL}
                              </a>
                              .
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <motion.div variants={fieldVariants}>
                        <Button
                          type="submit"
                          isLoading={status === "loading"}
                          iconRight={status !== "loading"
                            ? <HiArrowRight size={15} />
                            : undefined
                          }
                          className="w-full justify-center"
                        >
                          {status === "loading" ? "Sending..." : "Send message"}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── FormField ────────────────────────────────────────────────────────────────
// Input/Textarea estilizado con el design system.
// Usá `type="textarea"` para el mensaje.
function FormField({ id, label, type = "text", placeholder, value, onChange, required }) {
  const sharedClass = `
    w-full px-4 py-3 rounded-xl text-sm
    bg-bg border border-border
    text-foreground placeholder:text-muted/40
    outline-none
    focus:border-accent/60 focus:ring-2 focus:ring-accent/15
    transition-all duration-200
  `;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-muted">
        {label}
        {required && (
          <span className="text-accent ml-1" aria-hidden="true">*</span>
        )}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`${sharedClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={sharedClass}
        />
      )}
    </div>
  );
}