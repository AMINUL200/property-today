import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Heart,
  Bed,
  Bath,
  Maximize,
  ArrowRight,
} from "lucide-react";

/* =========================================================
   PLACEHOLDER PROPERTY DATA
   Swap these for real listings from your API / CMS.
   ========================================================= */
const PROPERTIES = [
  {
    id: 1,
    title: "3 BHK Premium Apartment",
    location: "New Town, Kolkata",
    price: "₹78 Lakh",
    image: "https://picsum.photos/seed/ptoday-feat1/640/420",
    badge: "For Sale",
    badgeType: "sale",
    beds: 3,
    baths: 2,
    area: "1450 Sq.Ft",
    category: "sale",
  },
  {
    id: 2,
    title: "Luxury 4 BHK Villa",
    location: "Whitefield, Bangalore",
    price: "₹1.85 Cr",
    image: "https://picsum.photos/seed/ptoday-feat2/640/420",
    badge: "For Sale",
    badgeType: "sale",
    beds: 4,
    baths: 4,
    area: "2800 Sq.Ft",
    category: "sale",
  },
  {
    id: 3,
    title: "2 BHK Furnished Flat",
    location: "Andheri West, Mumbai",
    price: "₹42,000 / mo",
    image: "https://picsum.photos/seed/ptoday-feat3/640/420",
    badge: "For Rent",
    badgeType: "rent",
    beds: 2,
    baths: 2,
    area: "1080 Sq.Ft",
    category: "rent",
  },
  {
    id: 4,
    title: "Prime Office Space",
    location: "Cyber City, Gurgaon",
    price: "₹1.2 Cr",
    image: "https://picsum.photos/seed/ptoday-feat4/640/420",
    badge: "Commercial",
    badgeType: "commercial",
    beds: null,
    baths: 3,
    area: "2200 Sq.Ft",
    category: "commercial",
  },
  {
    id: 5,
    title: "Residential Plot 2400 Sq.Ft",
    location: "Sarjapur Road, Bangalore",
    price: "₹65 Lakh",
    image: "https://picsum.photos/seed/ptoday-feat5/640/420",
    badge: "Land & Plots",
    badgeType: "land",
    beds: null,
    baths: null,
    area: "2400 Sq.Ft",
    category: "land",
  },
  {
    id: 6,
    title: "3 BHK Sea View Apartment",
    location: "Marine Drive, Kochi",
    price: "₹95 Lakh",
    image: "https://picsum.photos/seed/ptoday-feat6/640/420",
    badge: "For Sale",
    badgeType: "sale",
    beds: 3,
    baths: 3,
    area: "1720 Sq.Ft",
    category: "sale",
  },
];

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "sale", label: "For Sale" },
  { id: "rent", label: "For Rent" },
  { id: "commercial", label: "Commercial" },
  { id: "land", label: "Land & Plots" },
];

/* ---------- Badge styling per property type ---------- */
const badgeStyles = {
  sale: "bg-[var(--color-primary)] text-white",
  rent: "bg-[var(--color-info)] text-white",
  commercial: "bg-[var(--color-navy)] text-white",
  land: "bg-[var(--color-success)] text-white",
};

const HomePageFeaturedPropertiesSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter properties based on active tab
  const filteredProperties =
    activeFilter === "all"
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.category === activeFilter);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-[var(--color-background-soft)] py-16 lg:py-24">
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 80% 10%, rgba(200,16,30,0.05) 0%, transparent 70%)",
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
            Handpicked Listings
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)]">
            Featured <span className="text-[var(--color-primary)]">Properties</span>
          </h2>

          <p className="mt-4 text-base text-[var(--color-text-muted)]">
            Handpicked properties for your next move.
          </p>
        </motion.div>

        {/* ---------- Filter tabs ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex items-center justify-center gap-2 flex-wrap"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2 text-sm font-semibold rounded-[var(--radius-md)] transition-all duration-200 ${
                activeFilter === tab.id
                  ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-primary)]"
                  : "bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* ---------- Property grid ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property) => (
              <motion.article
                key={property.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                className="group bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* ---------- Image ---------- */}
                <div className="relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badge */}
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full shadow-[var(--shadow-sm)] ${
                      badgeStyles[property.badgeType]
                    }`}
                  >
                    {property.badge}
                  </span>

                  {/* Wishlist heart */}
                  <button
                    type="button"
                    aria-label="Save property"
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-white shadow-[var(--shadow-sm)] transition-all duration-200"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* ---------- Content ---------- */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors duration-200 leading-snug">
                    {property.title}
                  </h3>

                  <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                    <MapPin className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    {property.location}
                  </p>

                  {/* Price */}
                  <p className="mt-4 text-2xl font-extrabold text-[var(--color-primary)]">
                    {property.price}
                  </p>

                  {/* Amenities row */}
                  <div className="mt-4 pt-4 border-t border-[var(--color-border-light)] flex items-center gap-5 text-sm text-[var(--color-text-secondary)]">
                    {property.beds !== null && (
                      <span className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-[var(--color-text-muted)]" />
                        {property.beds}
                      </span>
                    )}
                    {property.baths !== null && (
                      <span className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-[var(--color-text-muted)]" />
                        {property.baths}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Maximize className="w-4 h-4 text-[var(--color-text-muted)]" />
                      {property.area}
                    </span>
                  </div>

                  {/* View Details */}
                  <Link
                    to={`/property/${property.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-navy)] hover:text-[var(--color-primary)] transition-colors duration-200 group/link"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ---------- CTA ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mt-12 lg:mt-16 flex justify-center"
        >
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
          >
            View All Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageFeaturedPropertiesSection;