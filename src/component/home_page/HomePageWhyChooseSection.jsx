import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  BadgeCheck,
  Users,
  Building2,
  Workflow,
  HeartHandshake,
} from "lucide-react";

const HomePageWhyChooseSection = () => {
  // Six feature blocks — swap icons / copy as needed
  const features = [
    {
      id: "01",
      title: "Trusted & Transparent",
      description:
        "Clear information and straightforward property assistance.",
      icon: ShieldCheck,
      color: "var(--color-primary)",
    },
    {
      id: "02",
      title: "Verified Properties",
      description:
        "Property information and documentation support to help you make informed decisions.",
      icon: BadgeCheck,
      color: "var(--color-land)",
    },
    {
      id: "03",
      title: "Experienced Team",
      description:
        "Get guidance from experienced real-estate professionals.",
      icon: Users,
      color: "var(--color-secondary-dark)",
    },
    {
      id: "04",
      title: "Wide Range of Options",
      description:
        "Residential, commercial, land, rental and investment properties.",
      icon: Building2,
      color: "var(--color-navy)",
    },
    {
      id: "05",
      title: "Hassle-Free Process",
      description:
        "From property discovery to transaction support, we're with you throughout the journey.",
      icon: Workflow,
      color: "var(--color-rental)",
    },
    {
      id: "06",
      title: "Customer Focused",
      description:
        "Your requirements remain at the center of our service.",
      icon: HeartHandshake,
      color: "var(--color-investment)",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-[var(--color-background)] py-16 lg:py-24">
      {/* Ambient brand wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 15% 20%, rgba(255,210,31,0.07) 0%, transparent 65%), radial-gradient(45% 40% at 85% 80%, rgba(200,16,30,0.05) 0%, transparent 65%)",
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
            Why Propertytoday
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)]">
            Why Choose{" "}
            <span className="text-[var(--color-primary)]">Propertytoday?</span>
          </h2>

          <p className="mt-4 text-base text-[var(--color-text-muted)]">
            Your trusted partner for every property decision.
          </p>
        </motion.div>

        {/* ---------- Feature grid ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map(({ id, title, description, icon: Icon, color }) => (
            <motion.div
              key={id}
              variants={itemVariants}
              className="group relative bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1.5 hover:border-[var(--color-primary)]/20 transition-all duration-300 p-7 lg:p-8 overflow-hidden"
            >
              {/* Faint index watermark */}
              <span
                className="absolute -top-3 -right-1 text-7xl lg:text-8xl font-black leading-none opacity-[0.06] select-none pointer-events-none"
                style={{ color }}
              >
                {id}
              </span>

              {/* Icon circle */}
              <span
                className="relative w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center shadow-[var(--shadow-md)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                style={{ backgroundColor: color }}
              >
                <Icon className="w-6 h-6 text-white" />
              </span>

              {/* Index label */}
              <p
                className="mt-5 text-xs font-extrabold tracking-widest"
                style={{ color }}
              >
                {id}
              </p>

              {/* Title */}
              <h3 className="mt-1 text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors duration-200 leading-snug">
                {title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                {description}
              </p>

              {/* Bottom accent line */}
              <span
                className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
                style={{ backgroundColor: color }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageWhyChooseSection;