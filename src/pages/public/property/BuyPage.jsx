import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Heart,
  ArrowRight,
  SlidersHorizontal,
  Building2,
  Home,
  Building,
  Trees,
  Store,
  Calendar,
  ShieldCheck,
  BadgeCheck,
  FileCheck2,
  ChevronDown,
} from "lucide-react";
import PageLoader from "../../../component/common/PageLoader";

/* =========================================================
   PLACEHOLDER BUY PROPERTIES
   Swap with real data from your API / admin panel.
   ========================================================= */
const BUY_PROPERTIES = [
  {
    id: "PT-2025-0101",
    title: "3 BHK Premium Apartment in New Town",
    location: "New Town, Kolkata",
    price: "₹85 Lakh",
    pricePerSqft: "₹5,862 / Sq.Ft",
    image: "https://picsum.photos/seed/buy-apt1/800/600",
    badge: "For Sale",
    badgeType: "sale",
    beds: 3,
    baths: 2,
    area: "1450 Sq.Ft",
    facing: "East",
    status: "Ready to Move",
    verified: true,
    category: "apartments",
  },
  {
    id: "PT-2025-0102",
    title: "4 BHK Luxury Villa with Garden",
    location: "Whitefield, Bangalore",
    price: "₹3.2 Cr",
    pricePerSqft: "₹11,228 / Sq.Ft",
    image: "https://picsum.photos/seed/buy-villa1/800/600",
    badge: "For Sale",
    badgeType: "sale",
    beds: 4,
    baths: 4,
    area: "2850 Sq.Ft",
    facing: "North-East",
    status: "Ready to Move",
    verified: true,
    category: "villas",
  },
  {
    id: "PT-2025-0103",
    title: "Residential Plot in Gated Township",
    location: "Sarjapur Road, Bangalore",
    price: "₹65 Lakh",
    pricePerSqft: "₹2,708 / Sq.Ft",
    image: "https://picsum.photos/seed/buy-plot1/800/600",
    badge: "For Sale",
    badgeType: "sale",
    beds: null,
    baths: null,
    area: "2400 Sq.Ft",
    facing: "South",
    status: "Ready to Register",
    verified: true,
    category: "plots",
  },
  {
    id: "PT-2025-0104",
    title: "Prime Office Space in Cyber City",
    location: "Cyber City, Gurgaon",
    price: "₹2.5 Cr",
    pricePerSqft: "₹10,000 / Sq.Ft",
    image: "https://picsum.photos/seed/buy-office1/800/600",
    badge: "Commercial",
    badgeType: "commercial",
    beds: null,
    baths: 3,
    area: "2500 Sq.Ft",
    facing: "West",
    status: "Ready to Move",
    verified: true,
    category: "commercial",
  },
  {
    id: "PT-2025-0105",
    title: "2 BHK Family Apartment with Balcony",
    location: "Behala, Kolkata",
    price: "₹42 Lakh",
    pricePerSqft: "₹5,600 / Sq.Ft",
    image: "https://picsum.photos/seed/buy-apt2/800/600",
    badge: "For Sale",
    badgeType: "sale",
    beds: 2,
    baths: 2,
    area: "750 Sq.Ft",
    facing: "North",
    status: "Under Construction",
    verified: false,
    category: "residential",
  },
  {
    id: "PT-2025-0106",
    title: "5 BHK Independent House in Ballygunge",
    location: "Ballygunge, Kolkata",
    price: "₹4.8 Cr",
    pricePerSqft: "₹16,000 / Sq.Ft",
    image: "https://picsum.photos/seed/buy-house1/800/600",
    badge: "For Sale",
    badgeType: "sale",
    beds: 5,
    baths: 5,
    area: "3000 Sq.Ft",
    facing: "East",
    status: "Ready to Move",
    verified: true,
    category: "residential",
  },
  {
    id: "PT-2025-0107",
    title: "Premium 3 BHK in Gated Community",
    location: "Rajarhat, Kolkata",
    price: "₹95 Lakh",
    pricePerSqft: "₹6,551 / Sq.Ft",
    image: "https://picsum.photos/seed/buy-apt3/800/600",
    badge: "For Sale",
    badgeType: "sale",
    beds: 3,
    baths: 3,
    area: "1450 Sq.Ft",
    facing: "South-East",
    status: "Ready to Move",
    verified: true,
    category: "apartments",
  },
  {
    id: "PT-2025-0108",
    title: "Commercial Showroom on Main Road",
    location: "Salt Lake, Kolkata",
    price: "₹1.85 Cr",
    pricePerSqft: "₹12,333 / Sq.Ft",
    image: "https://picsum.photos/seed/buy-showroom1/800/600",
    badge: "Commercial",
    badgeType: "commercial",
    beds: null,
    baths: 2,
    area: "1500 Sq.Ft",
    facing: "Main Road",
    status: "Ready to Move",
    verified: true,
    category: "commercial",
  },
  {
    id: "PT-2025-0109",
    title: "Agricultural Land Near Highway",
    location: "Kona Expressway, Kolkata",
    price: "₹35 Lakh",
    pricePerSqft: "₹233 / Sq.Ft",
    image: "https://picsum.photos/seed/buy-land1/800/600",
    badge: "Land",
    badgeType: "land",
    beds: null,
    baths: null,
    area: "15000 Sq.Ft",
    facing: "—",
    status: "Clear Title",
    verified: true,
    category: "plots",
  },
];

/* =========================================================
   CATEGORY CONFIG
   slug MUST match the URL segment used by the navbar.
   ========================================================= */
const BUY_CATEGORIES = {
  all: {
    slug: "all",
    label: "All Properties",
    title: "Properties for Sale",
    subtitle:
      "Explore verified residential, commercial, villa and plot listings across India.",
    icon: Building2,
  },
  residential: {
    slug: "residential",
    label: "Residential",
    title: "Residential Properties",
    subtitle:
      "Find homes, apartments and independent houses available for purchase.",
    icon: Home,
  },
  apartments: {
    slug: "apartments",
    label: "Apartments",
    title: "Apartments for Sale",
    subtitle:
      "Explore premium apartments and flats in gated communities and city hubs.",
    icon: Building,
  },
  villas: {
    slug: "villas",
    label: "Villas",
    title: "Luxury Villas",
    subtitle:
      "Discover spacious villas with private gardens, terraces and premium amenities.",
    icon: Home,
  },
  plots: {
    slug: "plots",
    label: "Plots",
    title: "Plots & Land",
    subtitle:
      "Find residential, agricultural and commercial plots with clear titles.",
    icon: Trees,
  },
  commercial: {
    slug: "commercial",
    label: "Commercial",
    title: "Commercial Properties",
    subtitle:
      "Explore office spaces, showrooms and commercial properties for your business.",
    icon: Store,
  },
};

/* ---------- Badge styling ---------- */
const badgeStyles = {
  sale: "bg-[var(--color-primary)] text-white",
  commercial: "bg-[var(--color-navy)] text-white",
  land: "bg-[var(--color-land)] text-white",
};

/* =========================================================
   PROPERTY CARD (buy version)
   ========================================================= */
const BuyCard = ({ property }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    className="group bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col"
  >
    {/* Image */}
    <div className="relative overflow-hidden">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span
        className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full shadow-[var(--shadow-sm)] ${
          badgeStyles[property.badgeType]
        }`}
      >
        {property.badge}
      </span>

      {/* Verified badge */}
      {property.verified && (
        <span className="absolute top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-white/95 backdrop-blur-sm text-[var(--color-success)] shadow-[var(--shadow-sm)]">
          <BadgeCheck className="w-3 h-3" />
          Verified
        </span>
      )}

      <button
        type="button"
        aria-label="Save property"
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] shadow-[var(--shadow-sm)] transition-all duration-200"
      >
        <Heart className="w-4 h-4" />
      </button>
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col flex-1">
      <h3 className="text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors duration-200 leading-snug">
        {property.title}
      </h3>

      <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
        <MapPin className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
        {property.location}
      </p>

      {/* Price */}
      <div className="mt-4">
        <p className="text-2xl font-extrabold text-[var(--color-primary)]">
          {property.price}
        </p>
        <p className="mt-0.5 text-xs font-semibold text-[var(--color-text-muted)]">
          {property.pricePerSqft}
        </p>
      </div>

      {/* Property details grid */}
      <div className="mt-4 pt-4 border-t border-[var(--color-border-light)] grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
        <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
          <Calendar className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
          <span className="truncate">
            <span className="text-[var(--color-text-muted)]">Status: </span>
            <span className="font-semibold">{property.status}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
          <span className="truncate">
            <span className="text-[var(--color-text-muted)]">Facing: </span>
            <span className="font-semibold">{property.facing}</span>
          </span>
        </div>
      </div>

      {/* Specs row */}
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

      {/* CTA */}
      <Link
        to={`/property/${property.id}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-navy)] hover:text-[var(--color-primary)] transition-colors duration-200 group/link"
      >
        View Details
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
      </Link>
    </div>
  </motion.article>
);

/* =========================================================
   RESOLVE ACTIVE CATEGORY — URL is the single source of truth
   Priority:
     1. route param :category        (e.g. /buy/:category)
     2. last path segment            (e.g. /buy/residential)
     3. "all"
   ========================================================= */
const resolveActiveCategory = (urlCategory, pathname) => {
  if (urlCategory && BUY_CATEGORIES[urlCategory]) {
    return urlCategory;
  }

  const segments = pathname.split("/").filter(Boolean);
  const buyIdx = segments.indexOf("buy");
  if (buyIdx !== -1 && segments[buyIdx + 1]) {
    const candidate = segments[buyIdx + 1];
    if (BUY_CATEGORIES[candidate]) return candidate;
  }

  return "all";
};

/* =========================================================
   BUY PAGE
   ========================================================= */
const BuyPage = () => {
  const { category: urlCategory } = useParams();
  const location = useLocation();

  const activeCategory = resolveActiveCategory(
    urlCategory,
    location.pathname
  );

  const [loader, setLoader] = useState(true);
  const [sortBy, setSortBy] = useState("recent");
  const [sortOpen, setSortOpen] = useState(false);

  // Reload animation when category changes
  useEffect(() => {
    setLoader(true);
    const t = setTimeout(() => setLoader(false), 400);
    return () => clearTimeout(t);
  }, [activeCategory]);

  // Filter by category
  const filtered =
    activeCategory === "all"
      ? BUY_PROPERTIES
      : BUY_PROPERTIES.filter((p) => p.category === activeCategory);

  const config = BUY_CATEGORIES[activeCategory];
  const ConfigIcon = config.icon;

  // Sort options
  const sortOptions = [
    { id: "recent", label: "Most Recent" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "area", label: "Larger Area First" },
  ];

  const sortedProperties = [...filtered].sort((a, b) => {
    if (sortBy === "price-low" || sortBy === "price-high") {
      const pa = Number(a.price.replace(/[^\d]/g, ""));
      const pb = Number(b.price.replace(/[^\d]/g, ""));
      return sortBy === "price-low" ? pa - pb : pb - pa;
    }
    if (sortBy === "area") {
      const aa = Number(a.area.replace(/[^\d]/g, ""));
      const ab = Number(b.area.replace(/[^\d]/g, ""));
      return ab - aa;
    }
    return 0;
  });

  if (loader) return <PageLoader />;

  return (
    <div className="bg-[var(--color-background-soft)] min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ---------- Breadcrumb ---------- */}
        <nav className="text-xs text-[var(--color-text-muted)] mb-5 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-[var(--color-primary)]">
            Home
          </Link>
          <span>/</span>
          {activeCategory === "all" ? (
            <span className="text-[var(--color-text)] font-semibold">
              Buy
            </span>
          ) : (
            <>
              <Link
                to="/buy"
                className="hover:text-[var(--color-primary)]"
              >
                Buy
              </Link>
              <span>/</span>
              <span className="text-[var(--color-text)] font-semibold">
                {config.label}
              </span>
            </>
          )}
        </nav>

        {/* ---------- Page header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-[var(--color-navy)] rounded-[var(--radius-2xl)] overflow-hidden p-8 lg:p-12"
        >
          <span className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[var(--color-secondary)]/15 blur-3xl" />
          <span className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[var(--color-primary)]/25 blur-3xl" />
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] text-xs font-bold tracking-widest uppercase">
                <ConfigIcon className="w-3.5 h-3.5" />
                Buy
              </span>

              <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {config.title}
              </h1>

              <p className="mt-3 text-sm lg:text-base text-white/75 max-w-xl leading-relaxed">
                {config.subtitle}
              </p>
            </div>

            {/* Result count */}
            <div className="shrink-0 text-left lg:text-right">
              <p className="text-3xl lg:text-4xl font-black text-[var(--color-secondary)]">
                {sortedProperties.length}
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                {sortedProperties.length === 1 ? "Property" : "Properties"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ---------- Category tabs (URL-driven) ---------- */}
        <div className="mt-8 flex items-center gap-2 flex-wrap">
          {Object.values(BUY_CATEGORIES).map((cfg) => {
            const TabIcon = cfg.icon;
            const isActive = activeCategory === cfg.slug;
            const path =
              cfg.slug === "all" ? "/buy" : `/buy/${cfg.slug}`;

            return (
              <Link
                key={cfg.slug}
                to={path}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-[var(--radius-md)] transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-primary)]"
                    : "bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {cfg.label}
              </Link>
            );
          })}
        </div>

        {/* ---------- Toolbar ---------- */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-[var(--color-text-muted)]">
            Showing{" "}
            <span className="font-bold text-[var(--color-navy)]">
              {sortedProperties.length}
            </span>{" "}
            {sortedProperties.length === 1 ? "property" : "properties"}
          </p>

          <div className="relative">
            <button
              type="button"
              onClick={() => setSortOpen((o) => !o)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-[var(--radius-md)] bg-white border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors duration-200"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {sortOptions.find((o) => o.id === sortBy)?.label}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <>
                <span
                  className="fixed inset-0 z-30"
                  onClick={() => setSortOpen(false)}
                />
                <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] z-40 overflow-hidden">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSortBy(opt.id);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                        sortBy === opt.id
                          ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)]/50 hover:text-[var(--color-primary)]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ---------- Listings grid ---------- */}
        {sortedProperties.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {sortedProperties.map((property) => (
              <BuyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-10 bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-12 text-center">
            <span className="w-16 h-16 mx-auto rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
              <Building2 className="w-8 h-8 text-[var(--color-primary)]" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-[var(--color-navy)]">
              No properties found in this category
            </h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
              Try a different category or browse all available properties.
            </p>
            <Link
              to="/buy"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] transition-all duration-200"
            >
              View All Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* ---------- Trust strip ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              icon: ShieldCheck,
              title: "Verified Listings",
              desc: "Property details reviewed before publishing.",
            },
            {
              icon: FileCheck2,
              title: "Documentation Support",
              desc: "Assistance with property documentation and paperwork.",
            },
            {
              icon: BadgeCheck,
              title: "Transparent Process",
              desc: "Clear information at every step of your purchase.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-5 rounded-[var(--radius-xl)] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)]"
            >
              <span className="w-11 h-11 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[var(--color-primary)]" />
              </span>
              <div>
                <p className="text-sm font-bold text-[var(--color-navy)]">
                  {title}
                </p>
                <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ---------- Bottom CTA ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <div className="relative bg-[var(--color-navy)] rounded-[var(--radius-2xl)] overflow-hidden p-8 lg:p-12">
            <span className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />

            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white">
                  Can't find the right property?
                </h3>
                <p className="mt-2 text-sm text-white/70 max-w-lg">
                  Tell us your requirements and our team will help you find
                  suitable options.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] bg-[var(--color-secondary)] shadow-[var(--shadow-gold)] hover:bg-[var(--color-secondary-hover)] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
              >
                Talk to an Expert
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BuyPage;