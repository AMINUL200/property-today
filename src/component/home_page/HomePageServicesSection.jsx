import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  HandCoins,
  KeyRound,
  Map,
  ShieldCheck,
  FileCheck2,
  Calculator,
  MapPin,
  Settings,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const HomePageServicesSection = () => {
  const services = [
    {
      id: "property-buying",
      eyebrow: "Buying",
      title: "Property Buying Assistance",
      short: "Buying",
      description:
        "Get professional assistance in finding, shortlisting and purchasing the right property for your needs.",
      icon: ShoppingCart,
      path: "/services/property-buying",
    },
    {
      id: "property-selling",
      eyebrow: "Selling",
      title: "Property Selling",
      short: "Selling",
      description:
        "Get support to present, promote and sell your property to suitable buyers.",
      icon: HandCoins,
      path: "/services/property-selling",
    },
    {
      id: "property-rental",
      eyebrow: "Rental",
      title: "Property Rental & Leasing",
      short: "Rental",
      description:
        "Find suitable rental and leasing opportunities for residential and commercial properties.",
      icon: KeyRound,
      path: "/services/property-rental",
    },
    {
      id: "land-plot-deals",
      eyebrow: "Land & Plots",
      title: "Land & Plot Deals",
      short: "Land",
      description:
        "Explore residential, commercial and other land opportunities with professional assistance.",
      icon: Map,
      path: "/services/land-plot-deals",
    },
    {
      id: "property-verification",
      eyebrow: "Verification",
      title: "Property Verification",
      short: "Verify",
      description:
        "Get assistance with property ownership, title checks and important property documentation.",
      icon: ShieldCheck,
      path: "/services/property-verification",
    },
    {
      id: "documentation",
      eyebrow: "Documentation",
      title: "Documentation Assistance",
      short: "Docs",
      description:
        "Get guidance with the documents and paperwork involved in your property transaction.",
      icon: FileCheck2,
      path: "/services/documentation",
    },
    {
      id: "property-valuation",
      eyebrow: "Valuation",
      title: "Property Valuation",
      short: "Valuation",
      description:
        "Understand the potential market value of your property with professional valuation assistance.",
      icon: Calculator,
      path: "/services/valuation",
    },
    {
      id: "site-visit",
      eyebrow: "Site Visit",
      title: "Site Visit Assistance",
      short: "Visit",
      description:
        "Schedule and coordinate property visits so you can explore properties with greater convenience.",
      icon: MapPin,
      path: "/services/site-visit",
    },
    {
      id: "property-management",
      eyebrow: "Management",
      title: "Property Management",
      short: "Manage",
      description:
        "Get ongoing support for property maintenance, rental management and day-to-day property needs.",
      icon: Settings,
      path: "/services/property-management",
    },
    {
      id: "investment",
      eyebrow: "Investment",
      title: "Investment Assistance",
      short: "Invest",
      description:
        "Explore real-estate opportunities and get assistance throughout your property investment journey.",
      icon: TrendingUp,
      path: "/services/investment",
    },
  ];

  const [activeId, setActiveId] = useState(services[0].id);

  // Shared palette — one brand color for every column
  const BRAND = "var(--color-navy)";
  const BRAND_HOVER = "var(--color-navy-light)";

  return (
    <section className="relative bg-[var(--color-background)] py-16 lg:py-24">
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 20% 15%, rgba(255,210,31,0.07) 0%, transparent 65%), radial-gradient(45% 40% at 80% 85%, rgba(200,16,30,0.05) 0%, transparent 65%)",
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
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            Our Services
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)]">
            Complete Real Estate{" "}
            <span className="text-[var(--color-primary)]">Solutions</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed">
            From buying and selling to verification, valuation and property
            management, Propertytoday provides assistance throughout your real
            estate journey.
          </p>
        </motion.div>

        {/* =====================================================
            EXPANDING COLUMNS (Desktop) — single brand color
            ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex mt-12 lg:mt-16 h-[520px] rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--color-border-light)] shadow-[var(--shadow-xl)] bg-[var(--color-navy)]"
        >
          {services.map((service) => {
            const { id, eyebrow, title, short, description, icon: Icon, path } = service;
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

                {/* Clickable overlay link */}
                <Link to={path} className="absolute inset-0 z-30" aria-label={title} />

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
                        <Icon className="w-5 h-5 text-white" />
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

                      {/* Middle: title + description */}
                      <div className="max-w-md">
                        <h3 className="font-serif text-2xl xl:text-3xl font-bold leading-tight">
                          {title}
                        </h3>

                        <span className="mt-3 block h-0.5 w-10 rounded-full bg-[var(--color-secondary)]" />

                        <p className="mt-4 text-sm text-white/80 leading-relaxed">
                          {description}
                        </p>
                      </div>

                      {/* Bottom: CTA */}
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-white group/cta">
                        Learn More
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-secondary)] text-[var(--color-navy)] transition-all duration-300 group-hover/cta:translate-x-1">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        {/* =====================================================
            MOBILE / TABLET CARD GRID — same unified palette
            ====================================================== */}
        <div className="lg:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map(({ id, eyebrow, title, description, icon: Icon, path }) => (
            <Link
              key={id}
              to={path}
              className="group relative flex flex-col p-5 rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Left brand bar */}
              <span className="absolute top-0 left-0 h-full w-1 bg-[var(--color-navy)]" />

              <div className="flex items-center gap-3">
                <span className="w-11 h-11 shrink-0 rounded-[var(--radius-md)] flex items-center justify-center shadow-[var(--shadow-sm)] bg-[var(--color-navy)]">
                  <Icon className="w-5 h-5 text-[var(--color-secondary)]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-primary)]">
                    {eyebrow}
                  </p>
                  <h3 className="text-sm font-bold text-[var(--color-navy)] leading-snug truncate">
                    {title}
                  </h3>
                </div>
              </div>

              <p className="mt-3 text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                {description}
              </p>

              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors">
                Learn More
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        {/* =====================================================
            VIEW ALL SERVICES
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white font-bold text-sm shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageServicesSection;