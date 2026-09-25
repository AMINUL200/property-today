import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const HomePageFAQSection = () => {
  // FAQ items — swap questions/answers or fetch from admin
  const faqs = [
    {
      id: 1,
      question: "How can I search for a property?",
      answer:
        "Use our property search to filter properties by location, type, budget and other requirements.",
    },
    {
      id: 2,
      question: "Can I list my property on Propertytoday?",
      answer:
        "Yes. Property owners can submit their property details through our property listing process.",
    },
    {
      id: 3,
      question: "Do you help with property verification?",
      answer:
        "Propertytoday provides property verification and documentation support services.",
    },
    {
      id: 4,
      question: "Do you help with home loans?",
      answer:
        "We provide home-loan assistance and guidance as part of our real-estate services.",
    },
    {
      id: 5,
      question: "Which cities does Propertytoday cover?",
      answer:
        "Propertytoday is designed to support property discovery across multiple locations in India.",
    },
  ];

  const [openId, setOpenId] = useState(faqs[0].id);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-[var(--color-background-soft)] py-16 lg:py-24">
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 20% 20%, rgba(200,16,30,0.05) 0%, transparent 65%), radial-gradient(50% 45% at 80% 85%, rgba(255,210,31,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ---------- Left: header (5/12) ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              FAQ
            </span>

            {/* Heading */}
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
              Frequently Asked{" "}
              <span className="text-[var(--color-primary)]">Questions</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-base text-[var(--color-text-muted)] leading-relaxed max-w-md">
              Have a question about buying, selling, renting or investing?
              Here are answers to the ones we hear most often.
            </p>

            {/* Support card */}
            <div className="mt-8 flex items-start gap-4 p-5 bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] max-w-md">
              <span className="w-11 h-11 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-[var(--color-primary)]" />
              </span>
              <div>
                <p className="text-sm font-bold text-[var(--color-navy)]">
                  Still have questions?
                </p>
                <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                  Our team is here to help with anything not covered here.
                </p>
                <a
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-200"
                >
                  Contact Support →
                </a>
              </div>
            </div>
          </motion.div>

          {/* ---------- Right: FAQ accordion (7/12) ---------- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 space-y-3"
          >
            {faqs.map(({ id, question, answer }) => {
              const isOpen = openId === id;

              return (
                <motion.div
                  key={id}
                  variants={itemVariants}
                  className={`group bg-white rounded-[var(--radius-xl)] border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[var(--color-primary)]/40 shadow-[var(--shadow-lg)]"
                      : "border-[var(--color-border-light)] shadow-[var(--shadow-sm)] hover:border-[var(--color-primary)]/25 hover:shadow-[var(--shadow-md)]"
                  }`}
                >
                  {/* Question row */}
                  <button
                    type="button"
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  >
                    <span
                      className={`text-base font-bold leading-snug transition-colors duration-200 ${
                        isOpen
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-navy)] group-hover:text-[var(--color-primary)]"
                      }`}
                    >
                      {question}
                    </span>

                    {/* Plus / Minus indicator */}
                    <span
                      className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-[var(--color-primary)] text-white rotate-180"
                          : "bg-[var(--color-primary-light)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" strokeWidth={3} />
                      ) : (
                        <Plus className="w-4 h-4" strokeWidth={3} />
                      )}
                    </span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <span className="block h-px w-full bg-[var(--color-border-light)] mb-4" />
                          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Left accent bar (visible when open) */}
                  <span
                    className={`absolute left-0 top-0 h-full w-1 bg-[var(--color-primary)] origin-top transition-transform duration-300 ${
                      isOpen ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomePageFAQSection;