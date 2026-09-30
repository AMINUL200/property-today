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
  KeyRound,
  Home,
  Store,
  Users,
  Calendar,
  Shield,
  Wrench,
  Clock,
  ChevronDown,
} from "lucide-react";
import PageLoader from "../../../component/common/PageLoader";

/* =========================================================
   PLACEHOLDER RENTAL DATA
   ========================================================= */
const RENTAL_PROPERTIES = [
  {
    id: "RT-2025-0101",
    title: "2 BHK Furnished Flat in Salt Lake",
    location: "Salt Lake, Kolkata",
    price: "₹25,000",
    period: "/ month",
    securityDeposit: "₹50,000",
    maintenance: "Included",
    leaseDuration: "11 Months",
    availableFrom: "Immediately",
    image: "https://picsum.photos/seed/rent-flat1/800/600",
    badge: "For Rent",
    badgeType: "rent",
    beds: 2,
    baths: 2,
    area: "1080 Sq.Ft",
    furnishing: "Fully Furnished",
    category: "residential",
  },
  {
    id: "RT-2025-0102",
    title: "3 BHK Semi-Furnished Apartment",
    location: "New Town, Kolkata",
    price: "₹38,000",
    period: "/ month",
    securityDeposit: "₹76,000",
    maintenance: "₹3,500 / month",
    leaseDuration: "12 Months",
    availableFrom: "1 Feb 2025",
    image: "https://picsum.photos/seed/rent-flat2/800/600",
    badge: "For Rent",
    badgeType: "rent",
    beds: 3,
    baths: 2,
    area: "1450 Sq.Ft",
    furnishing: "Semi-Furnished",
    category: "residential",
  },
  {
    id: "RT-2025-0103",
    title: "Office Space in Sector V",
    location: "Sector V, Kolkata",
    price: "₹85,000",
    period: "/ month",
    securityDeposit: "₹2,55,000",
    maintenance: "Included",
    leaseDuration: "36 Months",
    availableFrom: "1 Mar 2025",
    image: "https://picsum.photos/seed/rent-office/800/600",
    badge: "Commercial",
    badgeType: "commercial",
    beds: null,
    baths: 2,
    area: "2200 Sq.Ft",
    furnishing: "Furnished",
    category: "commercial",
  },
  {
    id: "RT-2025-0104",
    title: "1 BHK PG for Working Professionals",
    location: "Behala, Kolkata",
    price: "₹12,000",
    period: "/ month",
    securityDeposit: "₹24,000",
    maintenance: "Included",
    leaseDuration: "6 Months",
    availableFrom: "Immediately",
    image: "https://picsum.photos/seed/rent-pg/800/600",
    badge: "PG / Hostel",
    badgeType: "pg",
    beds: 1,
    baths: 1,
    area: "320 Sq.Ft",
    furnishing: "Fully Furnished",
    category: "pg",
  },
  {
    id: "RT-2025-0105",
    title: "4 BHK Independent House",
    location: "Ballygunge, Kolkata",
    price: "₹75,000",
    period: "/ month",
    securityDeposit: "₹1,50,000",
    maintenance: "Tenant Pays",
    leaseDuration: "24 Months",
    availableFrom: "15 Feb 2025",
    image: "https://picsum.photos/seed/rent-house/800/600",
    badge: "For Rent",
    badgeType: "rent",
    beds: 4,
    baths: 4,
    area: "2600 Sq.Ft",
    furnishing: "Unfurnished",
    category: "residential",
  },
  {
    id: "RT-2025-0106",
    title: "Shop Space in Shopping Complex",
    location: "Park Street, Kolkata",
    price: "₹55,000",
    period: "/ month",
    securityDeposit: "₹1,65,000",
    maintenance: "Included",
    leaseDuration: "36 Months",
    availableFrom: "Immediately",
    image: "https://picsum.photos/seed/rent-shop/800/600",
    badge: "Commercial",
    badgeType: "commercial",
    beds: null,
    baths: 1,
    area: "800 Sq.Ft",
    furnishing: "Unfurnished",
    category: "commercial",
  },
];

/* =========================================================
   CATEGORY CONFIG
   The `slug` MUST match the URL segment used by the navbar.
   ========================================================= */
const RENT_CATEGORIES = {
  all: {
    slug: "all",
    label: "All Rentals",
    title: "Rental Properties",
    subtitle:
      "Discover residential, commercial and PG rentals across Kolkata and beyond.",
    icon: KeyRound,
  },
  residential: {
    slug: "residential",
    label: "Residential",
    title: "Residential Rentals",
    subtitle:
      "Find flats, apartments and independent houses available for rent.",
    icon: Home,
  },
  commercial: {
    slug: "commercial",
    label: "Commercial",
    title: "Commercial Rentals",
    subtitle:
      "Explore office spaces, shops and commercial properties available for lease.",
    icon: Store,
  },
  pg: {
    slug: "pg",
    label: "PG / Hostels",
    title: "PG / Hostels",
    subtitle:
      "Find paying guest accommodations and hostels for students and professionals.",
    icon: Users,
  },
};

/* ---------- Badge styling ---------- */
const badgeStyles = {
  rent: "bg-[var(--color-info)] text-white",
  commercial: "bg-[var(--color-navy)] text-white",
  pg: "bg-[var(--color-investment)] text-white",
};

/* =========================================================
   RENTAL CARD
   ========================================================= */
const RentalCard = ({ property }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    className="group bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col"
  >
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

      <button
        type="button"
        aria-label="Save property"
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] shadow-[var(--shadow-sm)] transition-all duration-200"
      >
        <Heart className="w-4 h-4" />
      </button>
    </div>

    <div className="p-5 flex flex-col flex-1">
      <h3 className="text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors duration-200 leading-snug">
        {property.title}
      </h3>

      <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
        <MapPin className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
        {property.location}
      </p>

      <div className="mt-4">
        <p className="text-2xl font-extrabold text-[var(--color-primary)]">
          {property.price}
          <span className="text-sm font-semibold text-[var(--color-text-muted)] ml-1">
            {property.period}
          </span>
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--color-border-light)] grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
        <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
          <Shield className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
          <span className="truncate">
            <span className="text-[var(--color-text-muted)]">Deposit: </span>
            <span className="font-semibold">{property.securityDeposit}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
          <Wrench className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
          <span className="truncate">
            <span className="text-[var(--color-text-muted)]">Maint: </span>
            <span className="font-semibold">{property.maintenance}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
          <Clock className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
          <span className="truncate">
            <span className="text-[var(--color-text-muted)]">Lease: </span>
            <span className="font-semibold">{property.leaseDuration}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
          <Calendar className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
          <span className="truncate">
            <span className="text-[var(--color-text-muted)]">From: </span>
            <span className="font-semibold">{property.availableFrom}</span>
          </span>
        </div>
      </div>

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
     1. route param :category        (e.g. /rent/:category)
     2. last path segment            (e.g. /rent/residential)
     3. "all"
   ========================================================= */
const resolveActiveCategory = (urlCategory, pathname) => {
  // 1) Param-based routing
  if (urlCategory && RENT_CATEGORIES[urlCategory]) {
    return urlCategory;
  }

  // 2) Pathname-based routing — split and take the segment after "rent"
  const segments = pathname.split("/").filter(Boolean);
  const rentIdx = segments.indexOf("rent");
  if (rentIdx !== -1 && segments[rentIdx + 1]) {
    const candidate = segments[rentIdx + 1];
    if (RENT_CATEGORIES[candidate]) return candidate;
  }

  // 3) Fallback
  return "all";
};

/* =========================================================
   RENT PAGE
   ========================================================= */
const RentPage = () => {
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
      ? RENTAL_PROPERTIES
      : RENTAL_PROPERTIES.filter((p) => p.category === activeCategory);

  const config = RENT_CATEGORIES[activeCategory];
  const ConfigIcon = config.icon;

  // Sort
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
              Rent
            </span>
          ) : (
            <>
              <Link
                to="/rent"
                className="hover:text-[var(--color-primary)]"
              >
                Rent
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
                Rent
              </span>

              <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {config.title}
              </h1>

              <p className="mt-3 text-sm lg:text-base text-white/75 max-w-xl leading-relaxed">
                {config.subtitle}
              </p>
            </div>

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
          {Object.values(RENT_CATEGORIES).map((cfg) => {
            const TabIcon = cfg.icon;
            const isActive = activeCategory === cfg.slug;
            const path =
              cfg.slug === "all" ? "/rent" : `/rent/${cfg.slug}`;

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
            rental {sortedProperties.length === 1 ? "property" : "properties"}
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
              <RentalCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-10 bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-12 text-center">
            <span className="w-16 h-16 mx-auto rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
              <Building2 className="w-8 h-8 text-[var(--color-primary)]" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-[var(--color-navy)]">
              No rentals found in this category
            </h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
              Try a different category or browse all available rental properties.
            </p>
            <Link
              to="/rent"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] transition-all duration-200"
            >
              View All Rentals
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* ---------- Bottom CTA ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-14 lg:mt-16"
        >
          <div className="relative bg-[var(--color-navy)] rounded-[var(--radius-2xl)] overflow-hidden p-8 lg:p-12">
            <span className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />

            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white">
                  Can't find the right rental?
                </h3>
                <p className="mt-2 text-sm text-white/70 max-w-lg">
                  Tell us your requirements and our team will help you find
                  suitable rental options.
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

export default RentPage;