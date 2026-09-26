import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, Tag, KeyRound } from "lucide-react";

const HomePageBuySellRentSection = () => {
  // Three large panels — swap images, copy, or routes as needed
  const panels = [
    {
      id: "buy",
      eyebrow: "Buy",
      title: "Find a Place You'll Love",
      description:
        "Explore homes, apartments, villas, land and commercial properties.",
      cta: "Find a Property",
      path: "/buy",
      image: "https://picsum.photos/seed/ptoday-buy-panel/900/1200",
      icon: Home,
      overlay:
        "linear-gradient(180deg, rgba(7,29,73,0.15) 0%, rgba(7,29,73,0.85) 60%, rgba(200,16,30,0.9) 100%)",
    },
    {
      id: "sell",
      eyebrow: "Sell",
      title: "Ready to Sell Your Property?",
      description:
        "List your property and connect with potential buyers.",
      cta: "List Your Property",
      path: "/sell",
      image: "https://picsum.photos/seed/ptoday-sell-panel/900/1200",
      icon: Tag,
      overlay:
        "linear-gradient(180deg, rgba(7,29,73,0.15) 0%, rgba(7,29,73,0.85) 60%, rgba(229,173,0,0.9) 100%)",
    },
    {
      id: "rent",
      eyebrow: "Rent",
      title: "Find Your Next Rental",
      description:
        "Discover homes, offices, shops and other rental opportunities.",
      cta: "Find Rentals",
      path: "/rent",
      image: "https://picsum.photos/seed/ptoday-rent-panel/900/1200",
      icon: KeyRound,
      overlay:
        "linear-gradient(180deg, rgba(7,29,73,0.15) 0%, rgba(7,29,73,0.85) 60%, rgba(37,99,235,0.9) 100%)",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-[var(--color-background)] py-16 lg:py-24">
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 15% 15%, rgba(200,16,30,0.05) 0%, transparent 65%), radial-gradient(50% 40% at 85% 85%, rgba(255,210,31,0.07) 0%, transparent 65%)",
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
            Buy • Sell • Rent
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)]">
            Whatever Your Property Goal,{" "}
            <span className="text-[var(--color-primary)]">We're Here</span>
          </h2>
        </motion.div>

        {/* ---------- Three large panels ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {panels.map(
            ({
              id,
              eyebrow,
              title,
              description,
              cta,
              path,
              image,
              icon: Icon,
              overlay,
            }) => (
              <motion.div key={id} variants={itemVariants}>
                <Link
                  to={path}
                  className="group relative block h-[560px] lg:h-[620px] rounded-[var(--radius-2xl)] overflow-hidden shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Background image */}
                  <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />

                  {/* Colored gradient overlay — darker at bottom, fades in stronger on hover */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: overlay }}
                  />

                  {/* Subtle grain / texture layer */}
                  <span
                    className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #fff 1px, transparent 1px)",
                      backgroundSize: "14px 14px",
                    }}
                  />

                  {/* ---------- Always-visible eyebrow badge (top-left) ---------- */}
                  <span className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-[var(--shadow-md)] transition-all duration-500 group-hover:bg-white group-hover:text-[var(--color-navy)] group-hover:border-white">
                    <Icon className="w-3.5 h-3.5" />
                    {eyebrow}
                  </span>

                  {/* ---------- Always-visible hint at bottom (when collapsed) ---------- */}
                  <span className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90 drop-shadow-lg">
                      {eyebrow}
                    </span>
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </span>

                  {/* ---------- Hover-revealed content panel (slides up from bottom) ---------- */}
                  <div
                    className="
                      absolute inset-x-0 bottom-0 z-10 p-7 lg:p-9 text-white
                      translate-y-full opacity-0
                      group-hover:translate-y-0 group-hover:opacity-100
                      transition-all duration-[700ms] ease-[cubic-bezier(0.65,0,0.35,1)]
                    "
                  >
                    {/* Backdrop panel for readability */}
                    <span
                      className="absolute inset-0 -z-10"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(7,29,73,0) 0%, rgba(7,29,73,0.55) 25%, rgba(7,29,73,0.95) 100%)",
                      }}
                    />

                    {/* Eyebrow badge repeated inside content */}
                    <span className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-[11px] font-extrabold uppercase tracking-widest">
                      <Icon className="w-3.5 h-3.5" />
                      {eyebrow}
                    </span>

                    {/* Title */}
                    <h3 className="mt-5 text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight">
                      {title}
                    </h3>

                    {/* Divider */}
                    <span className="mt-4 block h-0.5 w-12 rounded-full bg-white/70 transition-all duration-700 group-hover:w-20" />

                    {/* Description */}
                    <p className="mt-4 text-sm lg:text-base text-white/85 leading-relaxed max-w-[320px]">
                      {description}
                    </p>

                    {/* CTA */}
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white">
                      {cta}
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 border border-white/25 backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-[var(--color-navy)] group-hover:translate-x-1">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </span>
                  </div>

                  {/* Top-right corner glow */}
                  <span
                    className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: "white" }}
                  />
                </Link>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageBuySellRentSection;