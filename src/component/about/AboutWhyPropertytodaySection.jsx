import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck,
  UserRoundCheck,
  Eye,
  MapPinned,
  CalendarCheck,
  FileCheck2,
  SearchCheck,
} from "lucide-react";

const AboutWhyPropertytodaySection = () => {
  const features = [
    {
      id: "01",
      short: "Verified",
      eyebrow: "Trust",
      title: "Verified Properties",
      description:
        "Explore property options with a focus on accurate and reliable property information.",
      icon: BadgeCheck,
    },
    {
      id: "02",
      short: "Assistance",
      eyebrow: "Support",
      title: "Professional Property Assistance",
      description:
        "Get guidance throughout your property journey from search to final decision.",
      icon: UserRoundCheck,
    },
    {
      id: "03",
      short: "Transparent",
      eyebrow: "Clarity",
      title: "Transparent Process",
      description:
        "We believe property transactions should be clear, straightforward and easy to understand.",
      icon: Eye,
    },
    {
      id: "04",
      short: "Locations",
      eyebrow: "Reach",
      title: "Multiple Locations",
      description:
        "Discover property opportunities across multiple cities and growing real-estate markets.",
      icon: MapPinned,
    },
    {
      id: "05",
      short: "Site Visit",
      eyebrow: "Convenience",
      title: "Site Visit Support",
      description:
        "Coordinate property visits and get practical assistance while evaluating a property.",
      icon: CalendarCheck,
    },
    {
      id: "06",
      short: "Docs",
      eyebrow: "Paperwork",
      title: "Documentation Assistance",
      description:
        "Get support understanding the documentation involved in your property transaction.",
      icon: FileCheck2,
    },
    {
      id: "07",
      short: "Search",
      eyebrow: "Personal",
      title: "Personalized Property Search",
      description:
        "Find property options based on your location, budget, property type and requirements.",
      icon: SearchCheck,
    },
  ];

  // The active column is driven purely by hover.
  // `null` means nothing is expanded → every column shows its vertical strip.
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
      {/* Soft ambient wash — subtle, so the section stays light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 15% 15%, rgba(255,210,31,0.10) 0%, transparent 60%), radial-gradient(55% 50% at 88% 85%, rgba(200,16,30,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Subtle dot texture in light grey */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border-dark) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ---------- Header ---------- */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            Why Propertytoday
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
            Why{" "}
            <span className="text-[var(--color-primary)]">
              Propertytoday?
            </span>
          </h2>

          <p className="mt-4 text-base text-[var(--color-text-muted)]">
            Making every property decision simpler, clearer and more confident.
          </p>
        </div>

        {/* =====================================================
            EXPANDING COLUMNS (Desktop) — light palette
            - Hover a column → it expands horizontally
            - Move the cursor away → every column returns to strip form
            ====================================================== */}
        <div
          onMouseLeave={() => setActiveId(null)}
          className="hidden lg:flex mt-12 lg:mt-16 h-[520px] rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--color-border)] shadow-[var(--shadow-lg)] bg-white"
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
                {/* Base gradient — light when collapsed, tinted when active */}
                <span
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: isActive
                      ? "linear-gradient(160deg, var(--color-primary-light) 0%, #ffffff 45%, var(--color-secondary-light) 100%)"
                      : "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
                  }}
                />

                {/* Subtle dot texture */}
                <span
                  className="pointer-events-none absolute inset-0 opacity-[0.25]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, var(--color-border-dark) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />

                {/* Divider between columns */}
                <span className="pointer-events-none absolute top-0 right-0 h-full w-px bg-[var(--color-border)]" />

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
                      <span className="w-11 h-11 rounded-full bg-white border border-[var(--color-border)] shadow-[var(--shadow-sm)] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                      </span>

                      <span
                        className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[var(--color-navy)] whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {short}
                      </span>

                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]/70" />
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
                      className="absolute inset-0 z-20 flex flex-col justify-between p-9 text-[var(--color-text)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="w-14 h-14 rounded-[var(--radius-lg)] bg-white border border-[var(--color-border)] shadow-[var(--shadow-sm)] flex items-center justify-center">
                          <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                        </span>

                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/25 text-[var(--color-primary)]">
                          {eyebrow}
                        </span>
                      </div>

                      <div className="max-w-md">
                        <p className="text-xs font-extrabold tracking-widest text-[var(--color-primary)]">
                          {id}
                        </p>

                        <h3 className="mt-1 font-serif text-2xl xl:text-3xl font-bold leading-tight text-[var(--color-navy)]">
                          {title}
                        </h3>

                        <span className="mt-3 block h-0.5 w-10 rounded-full bg-[var(--color-primary)]" />

                        <p className="mt-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                          {description}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                        Trusted by property buyers across India
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            MOBILE / TABLET CARD GRID — light palette
            ====================================================== */}
        <div className="lg:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map(({ id, title, description, icon: Icon }) => (
            <div
              key={id}
              className="group relative flex flex-col p-5 rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute top-0 left-0 h-full w-1 bg-[var(--gradient-gold)]" />

              <div className="flex items-center gap-3">
                <span className="w-11 h-11 shrink-0 rounded-[var(--radius-md)] flex items-center justify-center bg-[var(--color-primary-light)] border border-[var(--color-primary)]/20">
                  <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-primary)]">
                    {id}
                  </p>
                  <h3 className="text-sm font-bold text-[var(--color-navy)] leading-snug truncate">
                    {title}
                  </h3>
                </div>
              </div>

              <p className="mt-3 text-xs text-[var(--color-text-muted)] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutWhyPropertytodaySection;