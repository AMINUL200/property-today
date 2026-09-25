import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Mail, ArrowRight } from "lucide-react";

const HomePageFinalCTASection = () => {
  return (
    <section className="relative bg-[var(--color-background)] py-16 lg:py-24">
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ---------- CTA panel ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-[var(--radius-2xl)] overflow-hidden shadow-[var(--shadow-xl)]"
        >
          {/* Brand gradient background */}
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, var(--color-primary) 0%, var(--color-primary-dark) 45%, var(--color-secondary-dark) 100%)",
            }}
          />

          {/* Soft gold glow top-right */}
          <span className="pointer-events-none absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full bg-[var(--color-secondary)]/30 blur-3xl" />

          {/* Soft red glow bottom-left */}
          <span className="pointer-events-none absolute -bottom-32 -left-20 w-[420px] h-[420px] rounded-full bg-[var(--color-primary)]/40 blur-3xl" />

          {/* Subtle dot texture */}
          <span
            className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1.2px, transparent 1.2px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Decorative ring */}
          <span className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full border border-white/15" />
          <span className="pointer-events-none absolute -bottom-16 -right-16 w-44 h-44 rounded-full border border-white/10" />

          {/* ---------- Content ---------- */}
          <div className="relative px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20 text-center">
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
              Get Started
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight max-w-3xl mx-auto"
            >
              Let's Find Your Perfect{" "}
              <span className="text-[var(--color-secondary)]">Property Today</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-5 text-base lg:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto"
            >
              Whether you're buying, selling, renting or investing, take your
              next step with Propertytoday.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Primary — gold on red gradient */}
              <Link
                to="/properties"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] bg-[var(--color-secondary)] shadow-[var(--shadow-gold)] hover:bg-[var(--color-secondary-hover)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Search className="w-4 h-4" />
                Explore Properties
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Secondary — outline white */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-white/10 border border-white/30 backdrop-blur-sm hover:bg-white hover:text-[var(--color-primary)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageFinalCTASection;