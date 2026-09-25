import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  FileText,
  ArrowRight,
  Building2,
} from "lucide-react";

const HomePagePropertyVerificationSection = () => {
  // Six verification support points
  const checklist = [
    "Ownership Documentation",
    "Title Verification Support",
    "Property Documents",
    "Legal Check Assistance",
    "Registration Guidance",
    "Transaction Support",
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-[var(--color-background-soft)] py-16 lg:py-24">
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 85% 20%, rgba(200,16,30,0.06) 0%, transparent 65%), radial-gradient(50% 45% at 10% 85%, rgba(255,210,31,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ---------- Left: Visual composition ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main building image */}
              <div className="relative rounded-[var(--radius-2xl)] overflow-hidden shadow-[var(--shadow-xl)] aspect-[4/5]">
                <img
                  src="https://picsum.photos/seed/ptoday-verify-building/800/1000"
                  alt="Property building"
                  className="w-full h-full object-cover"
                />
                {/* Soft red tint gradient */}
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(7,29,73,0.15) 0%, rgba(7,29,73,0.35) 100%)",
                  }}
                />
              </div>

              {/* Overlapping document card */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="absolute -bottom-6 -right-4 sm:-right-8 w-64 sm:w-72 bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] border border-[var(--color-border-light)] p-5"
              >
                {/* Card header */}
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                      Document
                    </p>
                    <p className="text-sm font-bold text-[var(--color-navy)]">
                      Verified
                    </p>
                  </div>
                </div>

                {/* Faux document lines */}
                <div className="mt-4 space-y-2">
                  <span className="block h-2 w-full rounded-full bg-[var(--color-background-muted)]" />
                  <span className="block h-2 w-4/5 rounded-full bg-[var(--color-background-muted)]" />
                  <span className="block h-2 w-3/5 rounded-full bg-[var(--color-background-muted)]" />
                </div>

                {/* Verified stamp row */}
                <div className="mt-4 pt-4 border-t border-[var(--color-border-light)] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[var(--color-success-light)] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[var(--color-success)]" strokeWidth={3} />
                  </span>
                  <span className="text-xs font-semibold text-[var(--color-success)]">
                    Title Clear • Ownership Verified
                  </span>
                </div>
              </motion.div>

              {/* Floating shield badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                className="absolute -top-5 -left-4 sm:-left-6 w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--gradient-brand)] shadow-[var(--shadow-primary)] flex items-center justify-center"
              >
                <ShieldCheck className="w-8 h-8 text-white" />
              </motion.div>

              {/* Decorative dotted ring */}
              <span
                className="hidden sm:block absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-40 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, var(--color-primary) 1.5px, transparent 1.5px)",
                  backgroundSize: "12px 12px",
                }}
              />
            </div>
          </motion.div>

          {/* ---------- Right: Content ---------- */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              Property Verification
            </span>

            {/* Heading */}
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
              Buy With Greater{" "}
              <span className="text-[var(--color-primary)]">Confidence</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-base text-[var(--color-text-muted)] leading-relaxed max-w-xl">
              Property decisions involve more than price and location. Get
              support with property documentation and verification.
            </p>

            {/* Checklist */}
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5"
            >
              {checklist.map((item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 shrink-0 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
                    <Check
                      className="w-3.5 h-3.5 text-[var(--color-primary)]"
                      strokeWidth={3}
                    />
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-text)]">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA + trust note */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-9 flex flex-col sm:flex-row sm:items-center gap-5"
            >
              <Link
                to="/services/verification"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
              >
                Request Verification Support
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-muted)]">
                <Building2 className="w-4 h-4 text-[var(--color-text-light)]" />
                <span>Trusted by property buyers across India</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomePagePropertyVerificationSection;