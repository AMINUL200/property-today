import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Building2,
  Home,
  Building,
  Store,
  Trees,
  Search,
  TrendingUp,
  BadgeCheck,
  Users,
  KeyRound,
} from "lucide-react";
import PageLoader from "../../component/common/PageLoader";

/* =========================================================
   CITY DATA
   x/y are percentages within the map's viewBox (0–100),
   derived from each city's real latitude/longitude.
   ========================================================= */
const CITIES = [
  {
    id: "delhi",
    name: "Delhi",
    state: "Delhi NCR",
    count: "2,480+",
    x: 32.4,
    y: 26.7,
    tagline: "India's capital and a thriving real-estate market.",
    tags: ["Apartments", "Villas", "Commercial", "Land"],
    stats: {
      forSale: 1480,
      forRent: 720,
      commercial: 280,
    },
    popularAreas: ["New Delhi", "Gurgaon", "Noida", "Faridabad"],
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    count: "3,120+",
    x: 18.7,
    y: 59.1,
    tagline: "India's financial capital with premium property demand.",
    tags: ["Apartments", "Commercial", "Luxury", "Rentals"],
    stats: {
      forSale: 1820,
      forRent: 980,
      commercial: 320,
    },
    popularAreas: ["Andheri", "Bandra", "Powai", "Thane"],
  },
  {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    count: "1,240+",
    x: 67.8,
    y: 47.2,
    tagline: "The cultural capital with growing property opportunities.",
    tags: ["Apartments", "Villas", "Commercial", "Land"],
    stats: {
      forSale: 720,
      forRent: 380,
      commercial: 140,
    },
    popularAreas: ["New Town", "Salt Lake", "Rajarhat", "Ballygunge"],
  },
  {
    id: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    count: "2,850+",
    x: 33.6,
    y: 79.8,
    tagline: "The Silicon Valley of India with strong tech-driven demand.",
    tags: ["Apartments", "Villas", "Commercial", "Plots"],
    stats: {
      forSale: 1650,
      forRent: 890,
      commercial: 310,
    },
    popularAreas: ["Whitefield", "Sarjapur", "Electronic City", "Hebbal"],
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    count: "1,680+",
    x: 42.1,
    y: 79.4,
    tagline: "A coastal metro with a stable and diversified property market.",
    tags: ["Apartments", "Villas", "Land", "Rentals"],
    stats: {
      forSale: 980,
      forRent: 480,
      commercial: 220,
    },
    popularAreas: ["OMR", "Adyar", "Velachery", "Anna Nagar"],
  },
];

/* =========================================================
   INDIA OUTLINE
   ========================================================= */
const INDIA_PATH =
  "M 10.84,1.01 L 11.91,2.18 L 11.81,2.99 L 12.21,3.51 L 12.18,4.02 L 11.46,3.88 L 11.74,4.98 L 12.72,5.62 L 14.11,6.32 L 13.48,6.77 L 13.09,7.71 L 14.06,8.08 L 15.0,8.57 L 16.3,9.14 L 17.68,9.27 L 18.25,9.77 L 19.02,9.87 L 20.23,10.1 L 21.06,10.09 L 21.17,9.69 L 21.04,9.05 L 21.12,8.62 L 21.73,8.41 L 21.81,9.2 L 21.84,9.4 L 22.74,9.78 L 23.37,9.62 L 24.22,9.69 L 25.03,9.66 L 25.1,9.05 L 24.7,8.73 L 25.5,8.6 L 26.41,7.86 L 27.57,7.22 L 28.4,7.47 L 29.12,7.05 L 29.59,7.67 L 29.25,8.09 L 30.33,8.24 L 30.4,8.62 L 30.05,8.8 L 30.13,9.42 L 29.42,9.24 L 28.12,9.93 L 28.16,10.5 L 27.6,11.34 L 27.55,11.82 L 27.11,12.65 L 26.33,12.42 L 26.29,13.46 L 26.06,13.8 L 26.17,14.22 L 25.67,14.46 L 25.15,12.87 L 24.87,12.88 L 24.71,13.51 L 24.16,13.0 L 24.47,12.43 L 24.92,12.37 L 25.38,11.52 L 24.8,11.35 L 23.87,11.37 L 22.92,11.23 L 22.83,10.53 L 22.36,10.49 L 21.56,10.05 L 21.21,10.73 L 21.93,11.26 L 21.31,11.63 L 21.08,12.0 L 21.7,12.27 L 21.53,12.87 L 21.88,13.62 L 22.03,14.44 L 21.89,14.81 L 21.21,14.8 L 19.98,15.0 L 20.03,15.76 L 19.5,16.35 L 18.06,17.02 L 16.94,18.2 L 16.19,18.83 L 15.19,19.48 L 15.19,19.94 L 14.69,20.19 L 13.79,20.55 L 13.32,20.6 L 13.03,21.36 L 13.23,22.66 L 13.29,23.49 L 12.86,24.44 L 12.86,26.14 L 12.34,26.19 L 11.89,26.95 L 12.19,27.28 L 11.28,27.57 L 10.94,28.25 L 10.54,28.53 L 9.59,27.6 L 9.13,26.2 L 8.75,25.19 L 8.4,24.72 L 7.86,23.76 L 7.62,22.51 L 7.44,21.88 L 6.53,20.51 L 6.12,18.57 L 5.82,17.29 L 5.82,16.08 L 5.63,15.14 L 4.18,15.74 L 3.47,15.62 L 2.16,14.41 L 2.64,14.05 L 2.35,13.66 L 1.18,12.81 L 1.84,12.14 L 4.04,12.14 L 3.84,11.28 L 3.28,10.78 L 3.17,10.01 L 2.51,9.56 L 3.62,8.51 L 4.78,8.59 L 5.82,7.54 L 6.45,6.52 L 7.42,5.52 L 7.41,4.81 L 8.26,4.23 L 7.45,3.74 L 7.1,3.06 L 6.75,2.18 L 7.24,1.75 L 8.76,2.0 L 9.87,1.85 L 10.84,1.01 Z";

/* =========================================================
   LOCATIONS PAGE
   ========================================================= */
const LocationsPage = () => {
  const [loader, setLoader] = useState(true);
  const [activeCity, setActiveCity] = useState(CITIES[2]); // Kolkata as default

  useEffect(() => {
    const t = setTimeout(() => setLoader(false), 600);
    return () => clearTimeout(t);
  }, []);

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
          <span className="text-[var(--color-text)] font-semibold">
            Locations
          </span>
        </nav>

        {/* =========================================================
            HERO HEADER
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-[var(--color-navy)] rounded-[var(--radius-2xl)] overflow-hidden p-8 lg:p-12"
        >
          <span className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--color-secondary)]/15 blur-3xl" />
          <span className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[var(--color-primary)]/25 blur-3xl" />
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] text-xs font-bold tracking-widest uppercase">
              <MapPin className="w-3.5 h-3.5" />
              Explore by Location
            </span>

            <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Find Properties Across{" "}
              <span className="text-[var(--color-secondary)]">India</span>
            </h1>

            <p className="mt-4 text-base lg:text-lg text-white/75 max-w-2xl leading-relaxed">
              Discover properties in some of India's leading real-estate
              markets — from Delhi and Mumbai to Bangalore, Chennai and
              Kolkata.
            </p>

            {/* Quick stat row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div>
                <p className="text-2xl lg:text-3xl font-black text-[var(--color-secondary)]">
                  {CITIES.length}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Featured Cities
                </p>
              </div>
              <span className="w-px h-10 bg-white/15" />
              <div>
                <p className="text-2xl lg:text-3xl font-black text-[var(--color-secondary)]">
                  10K+
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Listings Across Cities
                </p>
              </div>
              <span className="w-px h-10 bg-white/15" />
              <div>
                <p className="text-2xl lg:text-3xl font-black text-[var(--color-secondary)]">
                  Buy • Rent • Invest
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  All Property Types
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            MAP + ACTIVE CITY (interactive)
            ========================================================= */}
        <section className="mt-12 lg:mt-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              Interactive Map
            </span>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
              Pick a City on the{" "}
              <span className="text-[var(--color-primary)]">Map</span>
            </h2>

            <p className="mt-4 text-base text-[var(--color-text-muted)]">
              Click any city to see its property breakdown and popular areas.
            </p>
          </div>

          <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
            {/* -------- Map (3/5) -------- */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 relative"
            >
              <div className="relative aspect-[63/59] w-full max-w-xl mx-auto rounded-[var(--radius-2xl)] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-lg)] overflow-hidden p-4">
                {/* Dot-grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, var(--color-border-dark) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* India silhouette */}
                <svg
                  viewBox="0 0 31.5 29.5"
                  className="absolute inset-0 w-full h-full p-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d={INDIA_PATH}
                    fill="url(#indiaGradient)"
                    stroke="var(--color-primary)"
                    strokeWidth="0.18"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  <defs>
                    <linearGradient
                      id="indiaGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--color-primary-light)"
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--color-secondary-light)"
                      />
                    </linearGradient>
                  </defs>
                </svg>

                {/* City pins — every pin glows continuously */}
                {CITIES.map((city, idx) => {
                  const isActive = activeCity.id === city.id;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => setActiveCity(city)}
                      aria-label={`Select ${city.name}`}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
                      style={{ left: `${city.x}%`, top: `${city.y}%` }}
                    >
                      {/* Blink ring */}
                      <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]/40"
                        style={{
                          width: 44,
                          height: 44,
                          animation: `ptBlink 2s ease-out ${idx * 0.3}s infinite`,
                        }}
                      />

                      {/* Glow halo */}
                      <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]/35 blur-md"
                        style={{
                          width: isActive ? 52 : 40,
                          height: isActive ? 52 : 40,
                          animation: `ptGlow 2s ease-in-out ${idx * 0.3}s infinite`,
                        }}
                      />

                      {/* Dot */}
                      <span
                        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-5 h-5 bg-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/30 shadow-[0_0_20px_rgba(200,16,30,0.85)]"
                            : "w-4 h-4 bg-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/20 shadow-[0_0_14px_rgba(200,16,30,0.65)] group-hover:scale-125"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </span>

                      {/* Label */}
                      <span
                        className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full transition-all duration-200 ${
                          isActive
                            ? "bg-[var(--color-primary)] text-white shadow-[0_0_14px_rgba(200,16,30,0.6)]"
                            : "bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]"
                        }`}
                      >
                        {city.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* -------- Active City Card (2/5) -------- */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="relative bg-white rounded-[var(--radius-2xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-xl)] p-8 lg:p-10 overflow-hidden">
                {/* Top accent bar */}
                <span className="absolute top-0 left-0 h-1.5 w-full bg-[var(--gradient-brand)]" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCity.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Icon + city name */}
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-primary-light)] flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                          {activeCity.state}
                        </p>
                        <h3 className="text-2xl font-extrabold text-[var(--color-navy)] leading-tight">
                          {activeCity.name}
                        </h3>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="mt-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {activeCity.tagline}
                    </p>

                    {/* Count */}
                    <p className="mt-6 text-3xl font-black text-[var(--color-primary)]">
                      {activeCity.count}{" "}
                      <span className="text-base font-semibold text-[var(--color-text-muted)]">
                        Properties
                      </span>
                    </p>

                    {/* Stats row */}
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {[
                        {
                          label: "For Sale",
                          value: activeCity.stats.forSale,
                        },
                        {
                          label: "For Rent",
                          value: activeCity.stats.forRent,
                        },
                        {
                          label: "Commercial",
                          value: activeCity.stats.commercial,
                        },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="p-3 rounded-[var(--radius-md)] bg-[var(--color-background-soft)] border border-[var(--color-border-light)] text-center"
                        >
                          <p className="text-lg font-black text-[var(--color-navy)]">
                            {stat.value}
                          </p>
                          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Popular Areas */}
                    <div className="mt-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                        Popular Areas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activeCity.popularAreas.map((area) => (
                          <span
                            key={area}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-background-muted)] text-xs font-semibold text-[var(--color-text-secondary)]"
                          >
                            <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Explore link */}
                    <Link
                      to={`/locations/${activeCity.id}`}
                      className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-200 group/cta"
                    >
                      Explore {activeCity.name}
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Quick-pick chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                {CITIES.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => setActiveCity(city)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      activeCity.id === city.id
                        ? "bg-[var(--color-navy)] text-white shadow-[var(--shadow-sm)]"
                        : "bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            ALL CITIES GRID
            ========================================================= */}
        <section className="mt-16 lg:mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              All Locations
            </span>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
              Browse Every{" "}
              <span className="text-[var(--color-primary)]">City</span>
            </h2>

            <p className="mt-4 text-base text-[var(--color-text-muted)]">
              Explore property listings and popular areas across our featured
              cities.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITIES.map((city, i) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Link
                  to={`/locations/${city.id}`}
                  className="group block bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1.5 hover:border-[var(--color-primary)]/25 transition-all duration-300 overflow-hidden"
                >
                  {/* Image banner */}
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={`https://picsum.photos/seed/ptd-city-${city.id}/800/500`}
                      alt={`Properties in ${city.name}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <span
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(7,29,73,0.15) 0%, rgba(7,29,73,0.75) 100%)",
                      }}
                    />

                    {/* City name overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-secondary)]">
                        {city.state}
                      </p>
                      <h3 className="mt-0.5 text-2xl font-extrabold text-white leading-tight">
                        {city.name}
                      </h3>
                    </div>

                    {/* Count badge */}
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-white/95 backdrop-blur-sm text-[var(--color-navy)] shadow-[var(--shadow-sm)]">
                      <Building2 className="w-3 h-3" />
                      {city.count}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                      {city.tagline}
                    </p>

                    {/* Popular areas preview */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {city.popularAreas.slice(0, 3).map((area) => (
                        <span
                          key={area}
                          className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[var(--color-background-muted)] text-[var(--color-text-muted)]"
                        >
                          {area}
                        </span>
                      ))}
                      {city.popularAreas.length > 3 && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                          +{city.popularAreas.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                      Explore {city.name}
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* =========================================================
            WHY BUY THROUGH LOCATION PAGE
            ========================================================= */}
        <section className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: TrendingUp,
              title: "Market Insights",
              desc: "Understand pricing trends and demand in each city before you decide.",
            },
            {
              icon: BadgeCheck,
              title: "Verified Listings",
              desc: "Every property across our cities is reviewed before it goes live.",
            },
            {
              icon: Users,
              title: "Local Expertise",
              desc: "Get assistance from teams who understand each city's market.",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex items-start gap-4 p-6 rounded-[var(--radius-xl)] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-300"
            >
              <span className="w-12 h-12 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center">
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
            </motion.div>
          ))}
        </section>

        {/* =========================================================
            BOTTOM CTA
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-14 lg:mt-16"
        >
          <div className="relative bg-[var(--color-navy)] rounded-[var(--radius-2xl)] overflow-hidden p-8 lg:p-14">
            <span className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />
            <span className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[var(--color-primary)]/25 blur-3xl" />

            <div className="relative max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase">
                <Search className="w-3.5 h-3.5" />
                Not Sure Where to Start?
              </span>

              <h2 className="mt-5 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Let Us Help You Find the{" "}
                <span className="text-[var(--color-secondary)]">
                  Right Location
                </span>
              </h2>

              <p className="mt-4 text-sm lg:text-base text-white/75 leading-relaxed max-w-2xl mx-auto">
                Tell us what you're looking for — budget, property type, and
                preferred city — and our team will help you explore suitable
                options.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/buy"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Building className="w-4 h-4" />
                  Browse Properties
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] bg-[var(--color-secondary)] shadow-[var(--shadow-gold)] hover:bg-[var(--color-secondary-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <KeyRound className="w-4 h-4" />
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          KEYFRAMES for the map pin glow + blink
          ========================================================= */}
      <style>{`
        @keyframes ptGlow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.55;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.25);
            opacity: 0.25;
          }
        }
        @keyframes ptBlink {
          0% {
            transform: translate(-50%, -50%) scale(0.6);
            opacity: 0.7;
          }
          70% {
            transform: translate(-50%, -50%) scale(1.9);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.9);
            opacity: 0;
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LocationsPage;