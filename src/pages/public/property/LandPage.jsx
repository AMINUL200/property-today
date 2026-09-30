import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Heart,
  ArrowRight,
  SlidersHorizontal,
  Building2,
  Trees,
  Tractor,
  Store,
  Maximize,
  Ruler,
  FileCheck2,
  ShieldCheck,
  BadgeCheck,
  Compass,
  Landmark,
  ChevronDown,
  Droplets,
  Zap,
  Car,
  Fence,
} from "lucide-react";
import PageLoader from "../../../component/common/PageLoader";

/* =========================================================
   PLACEHOLDER LAND DATA
   Swap with real data from your API / admin panel.
   ========================================================= */
const LAND_PROPERTIES = [
  {
    id: "LD-2025-0101",
    title: "Fertile Agricultural Land Near Highway",
    location: "Kona Expressway, Kolkata",
    price: "₹35 Lakh",
    pricePerUnit: "₹233 / Sq.Ft",
    image: "https://picsum.photos/seed/land-agri1/800/600",
    badge: "Agricultural",
    badgeType: "agricultural",
    area: "15000 Sq.Ft",
    areaInAcres: "0.34 Acres",
    facing: "East",
    soilType: "Alluvial",
    water: "Canal + Borewell",
    roadAccess: "Highway Access",
    titleStatus: "Clear Title",
    verified: true,
    category: "agricultural",
  },
  {
    id: "LD-2025-0102",
    title: "Farmland with Irrigation Facility",
    location: "Barasat, North 24 Parganas",
    price: "₹48 Lakh",
    pricePerUnit: "₹200 / Sq.Ft",
    image: "https://picsum.photos/seed/land-agri2/800/600",
    badge: "Agricultural",
    badgeType: "agricultural",
    area: "24000 Sq.Ft",
    areaInAcres: "0.55 Acres",
    facing: "South",
    soilType: "Loamy",
    water: "Borewell + Pond",
    roadAccess: "Village Road",
    titleStatus: "Clear Title",
    verified: true,
    category: "agricultural",
  },
  {
    id: "LD-2025-0103",
    title: "Residential Plot in Gated Township",
    location: "Sarjapur Road, Bangalore",
    price: "₹65 Lakh",
    pricePerUnit: "₹2,708 / Sq.Ft",
    image: "https://picsum.photos/seed/land-res1/800/600",
    badge: "Residential Plot",
    badgeType: "residential",
    area: "2400 Sq.Ft",
    areaInAcres: "0.055 Acres",
    facing: "North-East",
    soilType: "—",
    water: "Municipal",
    roadAccess: "40ft Road",
    titleStatus: "Clear Title",
    verified: true,
    category: "residential",
  },
  {
    id: "LD-2025-0104",
    title: "Corner Residential Plot in Prime Layout",
    location: "Rajarhat, Kolkata",
    price: "₹42 Lakh",
    pricePerUnit: "₹2,800 / Sq.Ft",
    image: "https://picsum.photos/seed/land-res2/800/600",
    badge: "Residential Plot",
    badgeType: "residential",
    area: "1500 Sq.Ft",
    areaInAcres: "0.034 Acres",
    facing: "East",
    soilType: "—",
    water: "Municipal",
    roadAccess: "30ft Road",
    titleStatus: "Clear Title",
    verified: true,
    category: "residential",
  },
  {
    id: "LD-2025-0105",
    title: "Commercial Land on Main Road",
    location: "Sector V, Kolkata",
    price: "₹2.8 Cr",
    pricePerUnit: "₹8,750 / Sq.Ft",
    image: "https://picsum.photos/seed/land-com1/800/600",
    badge: "Commercial Land",
    badgeType: "commercial",
    area: "3200 Sq.Ft",
    areaInAcres: "0.073 Acres",
    facing: "Main Road",
    soilType: "—",
    water: "Municipal",
    roadAccess: "60ft Main Road",
    titleStatus: "Clear Title",
    verified: true,
    category: "commercial",
  },
  {
    id: "LD-2025-0106",
    title: "Commercial Plot in Business Hub",
    location: "New Town, Kolkata",
    price: "₹1.85 Cr",
    pricePerUnit: "₹6,166 / Sq.Ft",
    image: "https://picsum.photos/seed/land-com2/800/600",
    badge: "Commercial Land",
    badgeType: "commercial",
    area: "3000 Sq.Ft",
    areaInAcres: "0.069 Acres",
    facing: "West",
    soilType: "—",
    water: "Municipal",
    roadAccess: "40ft Road",
    titleStatus: "Clear Title",
    verified: true,
    category: "commercial",
  },
  {
    id: "LD-2025-0107",
    title: "Agricultural Land with Fruit Orchard",
    location: "Chandanagar, Hooghly",
    price: "₹28 Lakh",
    pricePerUnit: "₹112 / Sq.Ft",
    image: "https://picsum.photos/seed/land-agri3/800/600",
    badge: "Agricultural",
    badgeType: "agricultural",
    area: "25000 Sq.Ft",
    areaInAcres: "0.57 Acres",
    facing: "North",
    soilType: "Fertile Loam",
    water: "Canal",
    roadAccess: "Village Road",
    titleStatus: "Clear Title",
    verified: true,
    category: "agricultural",
  },
  {
    id: "LD-2025-0108",
    title: "Residential Plot Near IT Park",
    location: "Whitefield, Bangalore",
    price: "₹78 Lakh",
    pricePerUnit: "₹3,900 / Sq.Ft",
    image: "https://picsum.photos/seed/land-res3/800/600",
    badge: "Residential Plot",
    badgeType: "residential",
    area: "2000 Sq.Ft",
    areaInAcres: "0.046 Acres",
    facing: "South-East",
    soilType: "—",
    water: "Municipal",
    roadAccess: "40ft Road",
    titleStatus: "Clear Title",
    verified: true,
    category: "residential",
  },
];

/* =========================================================
   CATEGORY CONFIG
   slug MUST match the URL segment used by the navbar.
   ========================================================= */
const LAND_CATEGORIES = {
  all: {
    slug: "all",
    label: "All Land",
    title: "Land & Plots for Sale",
    subtitle:
      "Explore agricultural, residential and commercial land across India with verified titles.",
    icon: Landmark,
  },
  agricultural: {
    slug: "agricultural",
    label: "Agricultural",
    title: "Agricultural Land",
    subtitle:
      "Find fertile farmland, orchards and agricultural plots with water and road access.",
    icon: Tractor,
  },
  residential: {
    slug: "residential",
    label: "Residential Plots",
    title: "Residential Plots",
    subtitle:
      "Explore residential plots in gated townships and prime layouts ready to build.",
    icon: Trees,
  },
  commercial: {
    slug: "commercial",
    label: "Commercial Land",
    title: "Commercial Land",
    subtitle:
      "Find commercial plots in business hubs, main roads and high-growth zones.",
    icon: Store,
  },
};

/* ---------- Badge styling ---------- */
const badgeStyles = {
  agricultural: "bg-[var(--color-land)] text-white",
  residential: "bg-[var(--color-primary)] text-white",
  commercial: "bg-[var(--color-navy)] text-white",
};

/* =========================================================
   LAND CARD
   ========================================================= */
const LandCard = ({ property }) => (
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
          {property.pricePerUnit}
        </p>
      </div>

      {/* Land details grid */}
      <div className="mt-4 pt-4 border-t border-[var(--color-border-light)] grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
        <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
          <Maximize className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
          <span className="truncate">
            <span className="text-[var(--color-text-muted)]">Area: </span>
            <span className="font-semibold">{property.area}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
          <Ruler className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
          <span className="truncate">
            <span className="text-[var(--color-text-muted)]">Size: </span>
            <span className="font-semibold">{property.areaInAcres}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
          <Compass className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
          <span className="truncate">
            <span className="text-[var(--color-text-muted)]">Facing: </span>
            <span className="font-semibold">{property.facing}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
          <Car className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
          <span className="truncate">
            <span className="text-[var(--color-text-muted)]">Access: </span>
            <span className="font-semibold">{property.roadAccess}</span>
          </span>
        </div>

        {property.category === "agricultural" && (
          <>
            <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
              <Fence className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
              <span className="truncate">
                <span className="text-[var(--color-text-muted)]">Soil: </span>
                <span className="font-semibold">{property.soilType}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
              <Droplets className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
              <span className="truncate">
                <span className="text-[var(--color-text-muted)]">Water: </span>
                <span className="font-semibold">{property.water}</span>
              </span>
            </div>
          </>
        )}

        {property.category !== "agricultural" && (
          <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)] col-span-2">
            <Droplets className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
            <span className="truncate">
              <span className="text-[var(--color-text-muted)]">Water: </span>
              <span className="font-semibold">{property.water}</span>
            </span>
          </div>
        )}
      </div>

      {/* Title status strip */}
      <div className="mt-4 pt-4 border-t border-[var(--color-border-light)] flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-[var(--color-success-light)] flex items-center justify-center">
          <FileCheck2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
        </span>
        <span className="text-xs font-bold text-[var(--color-success)]">
          {property.titleStatus}
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
   ========================================================= */
const resolveActiveCategory = (urlCategory, pathname) => {
  if (urlCategory && LAND_CATEGORIES[urlCategory]) {
    return urlCategory;
  }

  const segments = pathname.split("/").filter(Boolean);
  const landIdx = segments.indexOf("land");
  if (landIdx !== -1 && segments[landIdx + 1]) {
    const candidate = segments[landIdx + 1];
    if (LAND_CATEGORIES[candidate]) return candidate;
  }

  return "all";
};

/* =========================================================
   LAND PAGE
   ========================================================= */
const LandPage = () => {
  const { category: urlCategory } = useParams();
  const location = useLocation();

  const activeCategory = resolveActiveCategory(
    urlCategory,
    location.pathname
  );

  const [loader, setLoader] = useState(true);
  const [sortBy, setSortBy] = useState("recent");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    setLoader(true);
    const t = setTimeout(() => setLoader(false), 400);
    return () => clearTimeout(t);
  }, [activeCategory]);

  // Filter by category
  const filtered =
    activeCategory === "all"
      ? LAND_PROPERTIES
      : LAND_PROPERTIES.filter((p) => p.category === activeCategory);

  const config = LAND_CATEGORIES[activeCategory];
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
              Land & Plots
            </span>
          ) : (
            <>
              <Link
                to="/land"
                className="hover:text-[var(--color-primary)]"
              >
                Land & Plots
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
          <span className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[var(--color-land)]/25 blur-3xl" />
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
                Land & Plots
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

        {/* ---------- Category tabs ---------- */}
        <div className="mt-8 flex items-center gap-2 flex-wrap">
          {Object.values(LAND_CATEGORIES).map((cfg) => {
            const TabIcon = cfg.icon;
            const isActive = activeCategory === cfg.slug;
            const path = cfg.slug === "all" ? "/land" : `/land/${cfg.slug}`;

            return (
              <Link
                key={cfg.slug}
                to={path}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-[var(--radius-md)] transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-[var(--color-land)] text-white shadow-[0_10px_25px_rgba(22,163,74,0.25)]"
                    : "bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-land)] hover:text-[var(--color-land)]"
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
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-[var(--radius-md)] bg-white border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-land)] transition-colors duration-200"
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
                          ? "bg-[var(--color-success-light)] text-[var(--color-land)] font-semibold"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-success-light)]/50 hover:text-[var(--color-land)]"
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
              <LandCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-10 bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-12 text-center">
            <span className="w-16 h-16 mx-auto rounded-full bg-[var(--color-success-light)] flex items-center justify-center">
              <Landmark className="w-8 h-8 text-[var(--color-land)]" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-[var(--color-navy)]">
              No land found in this category
            </h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
              Try a different category or browse all available land and plots.
            </p>
            <Link
              to="/land"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-land)] shadow-[0_10px_25px_rgba(22,163,74,0.25)] hover:brightness-95 transition-all duration-200"
            >
              View All Land & Plots
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
              icon: FileCheck2,
              title: "Title Verification",
              desc: "Every listing shows its title status — clear or under review.",
            },
            {
              icon: ShieldCheck,
              title: "Documentation Assistance",
              desc: "Support with land records, registration and paperwork.",
            },
            {
              icon: BadgeCheck,
              title: "Verified Listings",
              desc: "Land details reviewed before publishing.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-5 rounded-[var(--radius-xl)] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)]"
            >
              <span className="w-11 h-11 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-success-light)] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[var(--color-land)]" />
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
                  Looking for a specific plot?
                </h3>
                <p className="mt-2 text-sm text-white/70 max-w-lg">
                  Tell us your requirements and our team will help you find
                  suitable land options.
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

export default LandPage;