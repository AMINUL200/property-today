import React from "react";
import { motion } from "framer-motion";
import { Search, ListChecks, Users, ArrowRight } from "lucide-react";

const HomePageHowItWorksSection = () => {
  // Four steps — swap icons / copy as needed
  const steps = [
    {
      id: "01",
      title: "Search",
      description:
        "Tell us what you're looking for and explore suitable properties.",
      icon: Search,
      color: "var(--color-primary)",
    },
    {
      id: "02",
      title: "Shortlist",
      description:
        "Compare properties based on location, price, type and features.",
      icon: ListChecks,
      color: "var(--color-secondary-dark)",
    },
    {
      id: "03",
      title: "Connect",
      description:
        "Connect with our property team and schedule a visit.",
      icon: Users,
      color: "var(--color-rental)",
    },
    {
      id: "04",
      title: "Move Forward",
      description:
        "Get the assistance you need to proceed with your property decision.",
      icon: ArrowRight,
      color: "var(--color-land)",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-[var(--color-background-soft)] py-16 lg:py-24">
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 50% 0%, rgba(255,210,31,0.07) 0%, transparent 65%)",
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
            How Propertytoday Works
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)]">
            Your Property Journey,{" "}
            <span className="text-[var(--color-primary)]">Made Simple</span>
          </h2>

          <p className="mt-4 text-base text-[var(--color-text-muted)]">
            From finding the right property to taking the next step, we're here
            to help.
          </p>
        </motion.div>

        {/* ---------- Steps grid with connecting arrows ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 lg:mt-20"
        >
          {/* Desktop / tablet: 4-column flow with arrows between */}
          <div className="hidden md:grid grid-cols-4 gap-6 lg:gap-4 relative">
            {/* Dotted connector line behind the cards */}
            <div className="absolute top-[68px] left-[12%] right-[12%] h-px border-t-2 border-dashed border-[var(--color-border-dark)] -z-0" />

            {steps.map((step, index) => {
              const { id, title, description, icon: Icon, color } = step;
              const isLast = index === steps.length - 1;

              return (
                <motion.div
                  key={id}
                  variants={itemVariants}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  {/* Step number + icon cluster */}
                  <div className="relative">
                    {/* Number badge */}
                    <span
                      className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white shadow-[var(--shadow-md)] z-10"
                      style={{ backgroundColor: color }}
                    >
                      {id}
                    </span>

                    {/* Icon circle */}
                    <div
                      className="group w-24 h-24 rounded-full bg-white border-2 border-[var(--color-border-light)] shadow-[var(--shadow-md)] flex items-center justify-center transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1"
                    >
                      <span
                        className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${color}1A` }}
                      >
                        <Icon
                          className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
                          style={{ color }}
                        />
                      </span>
                    </div>

                    {/* Arrow connector to next step */}
                    {!isLast && (
                      <span className="hidden md:flex absolute top-1/2 -right-[calc(1.5rem+18px)] lg:-right-[calc(1rem+22px)] -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-[var(--color-navy)] text-white shadow-[var(--shadow-md)] z-20">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-lg font-bold text-[var(--color-navy)]">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[240px] mx-auto">
                    {description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: vertical flow with down arrows */}
          <div className="md:hidden flex flex-col items-center gap-2">
            {steps.map((step, index) => {
              const { id, title, description, icon: Icon, color } = step;
              const isLast = index === steps.length - 1;

              return (
                <React.Fragment key={id}>
                  <motion.div
                    variants={itemVariants}
                    className="w-full max-w-sm bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 flex items-start gap-4"
                  >
                    {/* Icon circle */}
                    <div className="relative shrink-0">
                      <span
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white shadow-[var(--shadow-sm)] z-10"
                        style={{ backgroundColor: color }}
                      >
                        {id}
                      </span>
                      <span
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${color}1A` }}
                      >
                        <Icon className="w-6 h-6" style={{ color }} />
                      </span>
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="text-base font-bold text-[var(--color-navy)]">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Down arrow between steps */}
                  {!isLast && (
                    <motion.span
                      variants={itemVariants}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-navy)] text-white shadow-[var(--shadow-sm)] rotate-90"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageHowItWorksSection;