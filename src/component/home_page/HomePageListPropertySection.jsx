import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PlusCircle,
  PhoneCall,
  Check,
  Building2,
} from "lucide-react";

const HomePageListPropertySection = () => {
  // Four supporting points
  const points = [
    "Easy Listing",
    "Professional Assistance",
    "Wide Property Network",
    "Buyer & Tenant Enquiries",
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-[var(--color-background)]">
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ---------- Dark navy CTA card ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-[var(--radius-2xl)] overflow-hidden shadow-[var(--shadow-xl)]"
        >
          {/* Background image */}
          <img
            src="https://picsum.photos/seed/ptoday-list-cta/1800/900"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Navy brand overlay */}
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(7,29,73,0.97) 0%, rgba(7,29,73,0.92) 45%, rgba(200,16,30,0.75) 100%)",
            }}
          />

          {/* Subtle dot texture */}
          <span
            className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />

          {/* Ambient glows */}
          <span className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />
          <span className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[var(--color-primary)]/30 blur-3xl" />

          {/* ---------- Content ---------- */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 p-8 sm:p-12 lg:p-16">
            {/* Left: text + buttons (7/12) */}
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-[var(--color-secondary)] text-xs font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
                List Your Property
              </span>

              {/* Heading */}
              <h2 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Have a Property to{" "}
                <span className="text-[var(--color-secondary)]">
                  Sell or Rent?
                </span>
              </h2>

              {/* Subtitle */}
              <p className="mt-5 text-base lg:text-lg text-white/75 max-w-xl leading-relaxed">
                List your property with Propertytoday and reach potential
                buyers and tenants.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/list-property"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <PlusCircle className="w-4 h-4" />
                  List Your Property
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] bg-[var(--color-secondary)] shadow-[var(--shadow-gold)] hover:bg-[var(--color-secondary-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <PhoneCall className="w-4 h-4" />
                  Talk to an Expert
                </Link>
              </div>
            </div>

            {/* Right: supporting points (5/12) */}
            <div className="lg:col-span-5 flex items-center">
              <div className="w-full rounded-[var(--radius-xl)] bg-white/[0.06] backdrop-blur-md border border-white/15 p-6 sm:p-7">
                <div className="flex items-center gap-3 pb-5 border-b border-white/10">
                  <span className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-secondary)] flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-[var(--color-navy)]" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50">
                      Why List With Us
                    </p>
                    <p className="text-sm font-bold text-white">
                      Everything handled, end to end
                    </p>
                  </div>
                </div>

                {/* Points */}
                <ul className="mt-5 space-y-4">
                  {points.map((point, i) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-6 h-6 shrink-0 rounded-full bg-[var(--color-secondary)]/20 border border-[var(--color-secondary)]/40 flex items-center justify-center">
                        <Check
                          className="w-3.5 h-3.5 text-[var(--color-secondary)]"
                          strokeWidth={3}
                        />
                      </span>
                      <span className="text-sm font-semibold text-white/90">
                        {point}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Mini footer */}
                <Link
                  to="/list-property"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-secondary)] hover:text-white transition-colors duration-200 group/link"
                >
                  Get started today
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageListPropertySection;