import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Building2,
  LandPlot,
  KeyRound,
  ArrowRight,
  MapPin,
  Maximize,
  BadgeCheck,
} from "lucide-react";

const HomePageInvestmentSection = () => {
  // Four investment opportunity cards — swap data / routes as needed
  const opportunities = [
    {
      id: "residential",
      category: "Residential Investment",
      title: "Premium Residential Apartment",
      location: "New Town, Kolkata",
      price: "₹85 Lakh",
      area: "1450 Sq.Ft",
      image: "https://picsum.photos/seed/ptoday-invest-res/720/540",
      icon: Building2,
      color: "var(--color-residential)",
      path: "/invest/residential",
      yield: "Est. 6.2% ROI",
    },
    {
      id: "commercial",
      category: "Commercial Investment",
      title: "Commercial Property",
      location: "Gurgaon, Delhi NCR",
      price: "₹2.5 Cr",
      area: "2500 Sq.Ft",
      image: "https://picsum.photos/seed/ptoday-invest-com/720/540",
      icon: TrendingUp,
      color: "var(--color-navy)",
      path: "/invest/commercial",
      yield: "Est. 8.4% ROI",
    },
    {
      id: "land",
      category: "Land Investment",
      title: "Residential Development Plot",
      location: "Sarjapur Road, Bangalore",
      price: "₹1.1 Cr",
      area: "3200 Sq.Ft",
      image: "https://picsum.photos/seed/ptoday-invest-land/720/540",
      icon: LandPlot,
      color: "var(--color-land)",
      path: "/invest/land",
      yield: "High Growth Zone",
    },
    {
      id: "rental",
      category: "Rental Income Properties",
      title: "Furnished Rental Apartment",
      location: "Andheri West, Mumbai",
      price: "₹1.65 Cr",
      area: "1080 Sq.Ft",
      image: "https://picsum.photos/seed/ptoday-invest-rent/720/540",
      icon: KeyRound,
      color: "var(--color-rental)",
      path: "/invest/rental",
      yield: "Est. 5.8% Yield",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-[var(--color-navy)] py-16 lg:py-24 overflow-hidden">
      {/* Deep navy background with ambient brand glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 15% 10%, rgba(255,210,31,0.10) 0%, transparent 60%), radial-gradient(55% 50% at 90% 90%, rgba(200,16,30,0.18) 0%, transparent 60%)",
        }}
      />

      {/* Subtle dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ---------- Section header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
            Investment Opportunities
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Explore Property{" "}
            <span className="text-[var(--color-secondary)]">
              Investment Opportunities
            </span>
          </h2>

          <p className="mt-4 text-base text-white/70 leading-relaxed">
            Discover properties with potential for long-term ownership and
            investment.
          </p>
        </motion.div>

        {/* ---------- Opportunity cards ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {opportunities.map(
            ({
              id,
              category,
              title,
              location,
              price,
              area,
              image,
              icon: Icon,
              color,
              path,
              yield: yieldText,
            }) => (
              <motion.div key={id} variants={itemVariants}>
                <Link
                  to={path}
                  className="group relative flex flex-col h-full bg-white/[0.04] backdrop-blur-sm rounded-[var(--radius-xl)] border border-white/10 hover:border-[var(--color-secondary)]/40 hover:bg-white/[0.07] shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Dark gradient over image */}
                    <span
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(7,29,73,0.10) 0%, rgba(7,29,73,0.60) 70%, rgba(7,29,73,0.95) 100%)",
                      }}
                    />

                    {/* Category badge */}
                    <span
                      className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white rounded-full shadow-[var(--shadow-sm)]"
                      style={{ backgroundColor: color }}
                    >
                      <Icon className="w-3 h-3" />
                      {category}
                    </span>

                    {/* Yield tag */}
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[var(--color-navy)] bg-[var(--color-secondary)] rounded-full shadow-[var(--shadow-sm)]">
                      <BadgeCheck className="w-3 h-3" />
                      {yieldText}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative flex flex-col flex-1 p-5">
                    {/* Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-[var(--color-secondary)] transition-colors duration-200 leading-snug">
                      {title}
                    </h3>

                    {/* Location */}
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-white/60">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-secondary)] shrink-0" />
                      {location}
                    </p>

                    {/* Divider */}
                    <span className="my-4 block h-px w-full bg-white/10" />

                    {/* Price + area */}
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                          Price
                        </p>
                        <p className="mt-0.5 text-xl font-extrabold text-[var(--color-secondary)]">
                          {price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                          Area
                        </p>
                        <p className="mt-0.5 flex items-center justify-end gap-1 text-sm font-semibold text-white/85">
                          <Maximize className="w-3.5 h-3.5 text-white/50" />
                          {area}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-[var(--color-secondary)] transition-colors duration-200">
                      View Opportunity
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>

                  {/* Bottom accent line */}
                  <span
                    className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
                    style={{ backgroundColor: color }}
                  />
                </Link>
              </motion.div>
            )
          )}
        </motion.div>

        {/* ---------- Bottom note / CTA ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mt-12 lg:mt-14 flex flex-col sm:flex-row items-center justify-center gap-5 text-center sm:text-left"
        >
          <p className="text-sm text-white/60 max-w-md">
            Looking for a tailored investment strategy? Talk to our advisory
            team for curated opportunities.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] bg-[var(--color-secondary)] shadow-[var(--shadow-gold)] hover:bg-[var(--color-secondary-hover)] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            Talk to an Advisor
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageInvestmentSection;