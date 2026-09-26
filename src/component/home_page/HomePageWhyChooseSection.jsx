import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck,
  Headset,
  Eye,
  MapPin,
  CalendarCheck,
  FileCheck2,
  Search,
} from "lucide-react";

const HomePageWhyChooseSection = () => {
  // Seven feature blocks — unified navy + gold palette
  const features = [
    {
      id: "01",
      short: "Verified",
      eyebrow: "Trust",
      title: "Verified Properties",
      description:
        "Every listing is checked for authenticity so you can explore with confidence.",
      icon: BadgeCheck,
    },
    {
      id: "02",
      short: "Assistance",
      eyebrow: "Support",
      title: "Professional Property Assistance",
      description:
        "Get guidance from experienced real-estate professionals at every step.",
      icon: Headset,
    },
    {
      id: "03",
      short: "Transparent",
      eyebrow: "Clarity",
      title: "Transparent Process",
      description:
        "Clear information and straightforward assistance with no hidden surprises.",
      icon: Eye,
    },
    {
      id: "04",
      short: "Locations",
      eyebrow: "Reach",
      title: "Multiple Locations",
      description:
        "Explore properties across leading real-estate markets in India.",
      icon: MapPin,
    },
    {
      id: "05",
      short: "Site Visit",
      eyebrow: "Convenience",
      title: "Site Visit Support",
      description:
        "Schedule and coordinate property visits with greater convenience.",
      icon: CalendarCheck,
    },
    {
      id: "06",
      short: "Docs",
      eyebrow: "Paperwork",
      title: "Documentation Assistance",
      description:
        "Get help with the paperwork involved in your property transaction.",
      icon: FileCheck2,
    },
    {
      id: "07",
      short: "Search",
      eyebrow: "Personal",
      title: "Personalized Property Search",
      description:
        "Tell us your requirements and we'll help you find suitable matches.",
      icon: Search,
    },
  ];

  const [activeId, setActiveId] = useState(features[0].id);

  return (
    <section className="relative bg-[var(--color-navy)] py-16 lg:py-24 overflow-hidden">
      {/* Deep navy background wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 15% 15%, rgba(255,210,31,0.10) 0%, transparent 60%), radial-gradient(55% 50% at 88% 85%, rgba(200,16,30,0.18) 0%, transparent 60%)",
        }}
      />

      {/* Subtle dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
            Why Propertytoday
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Why Choose{" "}
            <span className="text-[var(--color-secondary)]">
              Propertytoday?
            </span>
          </h2>

          <p className="mt-4 text-base text-white/70">
            Your trusted partner for every property decision.
          </p>
        </motion.div>

        {/* =====================================================
            EXPANDING COLUMNS (Desktop) — 7 features
            ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex mt-12 lg:mt-16 h-[520px] rounded-[var(--radius-2xl)] overflow-hidden border border-white/10 shadow-[var(--shadow-xl)] bg-[var(--color-navy)]"
        >
          {features.map((feature) => {
            const { id, short, eyebrow, title, description, icon: Icon } = feature;
            const isActive = activeId === id;

            return (
              <div
                key={id}
                onMouseEnter={() => setActiveId(id)}
                className="relative h-full overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{
                  flex: isActive ? "6 1 0%" : "1 1 0%",
                  minWidth: isActive ? 0 : 88,
                }}
              >
                {/* Base brand background with subtle vertical gradient */}
                <span
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: isActive
                      ? "linear-gradient(160deg, var(--color-navy) 0%, var(--color-navy-light) 55%, var(--color-primary-dark) 100%)"
                      : "linear-gradient(180deg, var(--color-navy) 0%, var(--color-navy-dark) 100%)",
                  }}
                />

                {/* Subtle dot texture */}
                <span
                  className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />

                {/* Divider between collapsed columns */}
                <span className="pointer-events-none absolute top-0 right-0 h-full w-px bg-white/10" />

                {/* Gold accent bar at bottom when active */}
                <span
                  className="pointer-events-none absolute bottom-0 left-0 h-1 w-full origin-left bg-[var(--gradient-gold)] transition-transform duration-500"
                  style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                />

                {/* ---------- Collapsed (vertical) state ---------- */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-between py-8"
                    >
                      {/* Icon */}
                      <span className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors duration-300">
                        <Icon className="w-5 h-5 text-[var(--color-secondary)]" />
                      </span>

                      {/* Vertical title */}
                      <span
                        className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/85 whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {short}
                      </span>

                      {/* Small index dot */}
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]/70" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ---------- Expanded (horizontal) state ---------- */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: 0.15 }}
                      className="absolute inset-0 z-20 flex flex-col justify-between p-9 text-white"
                    >
                      {/* Top row: icon + eyebrow */}
                      <div className="flex items-center justify-between">
                        <span className="w-14 h-14 rounded-[var(--radius-lg)] bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-[var(--color-secondary)]" />
                        </span>

                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] backdrop-blur-sm">
                          {eyebrow}
                        </span>
                      </div>

                      {/* Middle: id + title + description */}
                      <div className="max-w-md">
                        <p className="text-xs font-extrabold tracking-widest text-[var(--color-secondary)]">
                          {id}
                        </p>

                        <h3 className="mt-1 font-serif text-2xl xl:text-3xl font-bold leading-tight">
                          {title}
                        </h3>

                        <span className="mt-3 block h-0.5 w-10 rounded-full bg-[var(--color-secondary)]" />

                        <p className="mt-4 text-sm text-white/80 leading-relaxed">
                          {description}
                        </p>
                      </div>

                      {/* Bottom: small detail */}
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
                        Trusted by property buyers across India
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        {/* =====================================================
            MOBILE / TABLET CARD GRID
            ====================================================== */}
        <div className="lg:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map(({ id, title, description, icon: Icon }) => (
            <div
              key={id}
              className="group relative flex flex-col p-5 rounded-[var(--radius-xl)] border border-white/10 bg-white/[0.05] backdrop-blur-sm shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 hover:bg-white/[0.08] transition-all duration-300 overflow-hidden"
            >
              {/* Left gold bar */}
              <span className="absolute top-0 left-0 h-full w-1 bg-[var(--gradient-gold)]" />

              <div className="flex items-center gap-3">
                <span className="w-11 h-11 shrink-0 rounded-[var(--radius-md)] flex items-center justify-center bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30">
                  <Icon className="w-5 h-5 text-[var(--color-secondary)]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-secondary)]">
                    {id}
                  </p>
                  <h3 className="text-sm font-bold text-white leading-snug truncate">
                    {title}
                  </h3>
                </div>
              </div>

              <p className="mt-3 text-xs text-white/70 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageWhyChooseSection;