import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Home,
  Briefcase,
  Building,
  Store,
  Car,
  LandPlot,
  Hotel,
} from "lucide-react";

const HomePageCategorySection = () => {
  // Property categories — swap icons, labels, and counts as needed
  const categories = [
    { id: "apartment", label: "Apartment", count: 123, icon: Building2, color: "var(--color-residential)", path: "/buy/apartments" },
    { id: "villa", label: "Villa", count: 123, icon: Hotel, color: "var(--color-secondary-dark)", path: "/buy/villas" },
    { id: "home", label: "Home", count: 123, icon: Home, color: "var(--color-land)", path: "/buy/homes" },
    { id: "office", label: "Office", count: 123, icon: Briefcase, color: "var(--color-navy)", path: "/commercial/office" },
    { id: "building", label: "Building", count: 123, icon: Building, color: "var(--color-investment)", path: "/buy/buildings" },
    { id: "townhouse", label: "Townhouse", count: 123, icon: LandPlot, color: "var(--color-rental)", path: "/buy/townhouses" },
    { id: "shop", label: "Shop", count: 123, icon: Store, color: "var(--color-warning)", path: "/commercial/shop" },
    { id: "garage", label: "Garage", count: 123, icon: Car, color: "var(--color-info)", path: "/buy/garages" },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-[var(--color-background)] py-16 lg:py-24">
      {/* Soft ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, rgba(255,210,31,0.06) 0%, transparent 70%)",
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
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            Property Types
          </span>

          {/* Heading */}
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)]">
            Explore by <span className="text-[var(--color-primary)]">Category</span>
          </h2>

          {/* Description */}
          <p className="mt-4 text-base text-[var(--color-text-muted)] leading-relaxed">
            Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore
            lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum
            vero dolor duo.
          </p>
        </motion.div>

        {/* ---------- Category grid ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map(({ id, label, count, icon: Icon, color, path }) => (
            <motion.div key={id} variants={itemVariants}>
              <Link
                to={path}
                className="group relative flex flex-col items-center text-center p-8 bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-xl)] hover:border-[var(--color-primary)]/30 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Icon circle */}
                <span
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-[var(--shadow-md)] transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </span>

                {/* Label */}
                <h3 className="mt-5 text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                  {label}
                </h3>

                {/* Count */}
                <p className="mt-1 text-sm font-medium text-[var(--color-text-muted)]">
                  {count} Properties
                </p>

                {/* Hover underline accent */}
                <span className="mt-4 block h-0.5 w-8 rounded-full bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageCategorySection;