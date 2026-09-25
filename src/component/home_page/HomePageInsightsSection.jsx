import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";

const HomePageInsightsSection = () => {
  // Four blog preview cards — swap for real articles from your CMS
  const insights = [
    {
      id: 1,
      category: "Buying Guide",
      title: "How to Choose the Right Property Location",
      excerpt:
        "Key factors to consider before buying a property.",
      image: "https://picsum.photos/seed/ptoday-blog1/720/480",
      date: "12 Jan 2025",
      readTime: "5 min read",
      color: "var(--color-primary)",
      path: "/blog/choose-right-location",
    },
    {
      id: 2,
      category: "Documentation",
      title: "Documents You Should Check Before Buying Property",
      excerpt:
        "Understand the key documents involved in a property transaction.",
      image: "https://picsum.photos/seed/ptoday-blog2/720/480",
      date: "08 Jan 2025",
      readTime: "7 min read",
      color: "var(--color-navy)",
      path: "/blog/documents-before-buying",
    },
    {
      id: 3,
      category: "Rent vs Buy",
      title: "Buy vs Rent: What Should You Consider?",
      excerpt:
        "Important factors to consider when deciding between buying and renting.",
      image: "https://picsum.photos/seed/ptoday-blog3/720/480",
      date: "02 Jan 2025",
      readTime: "6 min read",
      color: "var(--color-rental)",
      path: "/blog/buy-vs-rent",
    },
    {
      id: 4,
      category: "Investment",
      title: "Guide to Property Investment in India",
      excerpt:
        "Things to consider before investing in real estate.",
      image: "https://picsum.photos/seed/ptoday-blog4/720/480",
      date: "28 Dec 2024",
      readTime: "8 min read",
      color: "var(--color-investment)",
      path: "/blog/property-investment-guide",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
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
            "radial-gradient(45% 40% at 20% 15%, rgba(200,16,30,0.05) 0%, transparent 65%), radial-gradient(45% 40% at 85% 85%, rgba(255,210,31,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ---------- Section header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-5xl mx-auto"
        >
          <div className="text-center md:text-left max-w-xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              Property Insights
            </span>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
              Property{" "}
              <span className="text-[var(--color-primary)]">Insights</span>
            </h2>

            <p className="mt-4 text-base text-[var(--color-text-muted)]">
              Helpful information for buyers, sellers, investors and property
              owners.
            </p>
          </div>

          {/* Desktop-only CTA in the header row */}
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-[var(--color-navy)] hover:text-[var(--color-primary)] transition-colors duration-200 group/head"
          >
            View All Insights
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/head:translate-x-1" />
          </Link>
        </motion.div>

        {/* ---------- Insights grid ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {insights.map(
            ({
              id,
              category,
              title,
              excerpt,
              image,
              date,
              readTime,
              color,
              path,
            }) => (
              <motion.article
                key={id}
                variants={itemVariants}
                className="group flex flex-col bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <Link
                  to={path}
                  className="relative block overflow-hidden aspect-[4/3]"
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark gradient on hover for depth */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, rgba(7,29,73,0.55) 100%)",
                    }}
                  />

                  {/* Category pill */}
                  <span
                    className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white rounded-full shadow-[var(--shadow-sm)]"
                    style={{ backgroundColor: color }}
                  >
                    <BookOpen className="w-3 h-3" />
                    {category}
                  </span>
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-light)]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <Link to={path}>
                    <h3 className="mt-3 text-base font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors duration-200 leading-snug line-clamp-2">
                      {title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed flex-1 line-clamp-2">
                    {excerpt}
                  </p>

                  {/* Read Article link */}
                  <Link
                    to={path}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors duration-200"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Bottom accent line */}
                <span
                  className="block h-1 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: color }}
                />
              </motion.article>
            )
          )}
        </motion.div>

        {/* ---------- Mobile / bottom CTA ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mt-12 lg:mt-14 flex justify-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
          >
            View All Insights
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageInsightsSection;