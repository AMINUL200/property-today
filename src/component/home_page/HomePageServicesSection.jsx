import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  KeyRound,
  Building2,
  Landmark,
  TrendingUp,
  Settings,
  HardHat,
  ArrowRight,
} from "lucide-react";

const HomePageServicesSection = () => {
  // Seven real-estate services — swap icons, copy, or routes as needed
  const services = [
    {
      id: "verification",
      eyebrow: "Property Verification",
      title: "Property Verification",
      description:
        "Support with title checks, ownership documentation and property verification.",
      icon: ShieldCheck,
      color: "var(--color-primary)",
      path: "/services/verification",
    },
    {
      id: "buy-sell",
      eyebrow: "Buy & Sell Assistance",
      title: "Buy / Sell Services",
      description:
        "Get professional assistance throughout your property transaction.",
      icon: KeyRound,
      color: "var(--color-secondary-dark)",
      path: "/services/buy-sell",
    },
    {
      id: "rental",
      eyebrow: "Rental Services",
      title: "Rental Services",
      description:
        "Find suitable rental properties and get assistance throughout the rental process.",
      icon: Building2,
      color: "var(--color-rental)",
      path: "/services/rental",
    },
    {
      id: "home-loan",
      eyebrow: "Home Loan",
      title: "Home Loan Assistance",
      description:
        "Guidance to help you navigate the home-loan process.",
      icon: Landmark,
      color: "var(--color-warning)",
      path: "/services/home-loan",
    },
    {
      id: "investment",
      eyebrow: "Investment",
      title: "Investment Advisory",
      description:
        "Explore property opportunities aligned with your investment goals.",
      icon: TrendingUp,
      color: "var(--color-investment)",
      path: "/services/investment",
    },
    {
      id: "management",
      eyebrow: "Property Management",
      title: "Property Management",
      description:
        "Maintenance and rental-management support for property owners.",
      icon: Settings,
      color: "var(--color-navy)",
      path: "/services/management",
    },
    {
      id: "construction",
      eyebrow: "Construction",
      title: "Construction & Development",
      description:
        "Support for plots, projects and custom property development.",
      icon: HardHat,
      color: "var(--color-land)",
      path: "/services/construction",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

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
        {/* ---------- Section header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            Our Real Estate Services
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)]">
            More Than{" "}
            <span className="text-[var(--color-primary)]">Property Listings</span>
          </h2>

          <p className="mt-4 text-base text-[var(--color-text-muted)]">
            Complete real-estate assistance for buying, selling, renting and
            investing.
          </p>
        </motion.div>

        {/* ---------- Services grid ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map(
            ({ id, eyebrow, title, description, icon: Icon, color, path }) => (
              <motion.div
                key={id}
                variants={itemVariants}
                className="group relative bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1.5 hover:border-[var(--color-primary)]/20 transition-all duration-300 p-7 lg:p-8 flex flex-col overflow-hidden"
              >
                {/* Colored corner glow on hover */}
                <span
                  className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500"
                  style={{ backgroundColor: color }}
                />

                {/* Icon */}
                <span
                  className="relative w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center shadow-[var(--shadow-md)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </span>

                {/* Eyebrow label */}
                <p
                  className="relative mt-5 text-[11px] font-extrabold uppercase tracking-widest"
                  style={{ color }}
                >
                  {eyebrow}
                </p>

                {/* Title */}
                <h3 className="relative mt-1 text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors duration-200 leading-snug">
                  {title}
                </h3>

                {/* Description */}
                <p className="relative mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">
                  {description}
                </p>

                {/* Learn More */}
                <Link
                  to={path}
                  className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                {/* Bottom accent line */}
                <span
                  className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: color }}
                />
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageServicesSection;