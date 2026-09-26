import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Building2 } from "lucide-react";

/* =========================================================
   CITY DATA — only 5 featured markets
   ========================================================= */
const CITIES = [
  {
    id: "delhi",
    name: "Delhi",
    count: "2,480+",
    x: 32.4,
    y: 26.7,
    tags: ["Apartments", "Villas", "Commercial", "Land"],
  },
  {
    id: "mumbai",
    name: "Mumbai",
    count: "3,120+",
    x: 18.7,
    y: 59.1,
    tags: ["Apartments", "Commercial", "Luxury", "Rentals"],
  },
  {
    id: "kolkata",
    name: "Kolkata",
    count: "1,240+",
    x: 67.8,
    y: 47.2,
    tags: ["Apartments", "Villas", "Commercial", "Land"],
  },
  {
    id: "bangalore",
    name: "Bangalore",
    count: "2,850+",
    x: 33.6,
    y: 79.8,
    tags: ["Apartments", "Villas", "Commercial", "Plots"],
  },
  {
    id: "chennai",
    name: "Chennai",
    count: "1,680+",
    x: 42.1,
    y: 79.4,
    tags: ["Apartments", "Villas", "Land", "Rentals"],
  },
];

/* =========================================================
   INDIA OUTLINE
   ========================================================= */
const INDIA_PATH =
  "M 10.84,1.01 L 11.91,2.18 L 11.81,2.99 L 12.21,3.51 L 12.18,4.02 L 11.46,3.88 L 11.74,4.98 L 12.72,5.62 L 14.11,6.32 L 13.48,6.77 L 13.09,7.71 L 14.06,8.08 L 15.0,8.57 L 16.3,9.14 L 17.68,9.27 L 18.25,9.77 L 19.02,9.87 L 20.23,10.1 L 21.06,10.09 L 21.17,9.69 L 21.04,9.05 L 21.12,8.62 L 21.73,8.41 L 21.81,9.2 L 21.84,9.4 L 22.74,9.78 L 23.37,9.62 L 24.22,9.69 L 25.03,9.66 L 25.1,9.05 L 24.7,8.73 L 25.5,8.6 L 26.41,7.86 L 27.57,7.22 L 28.4,7.47 L 29.12,7.05 L 29.59,7.67 L 29.25,8.09 L 30.33,8.24 L 30.4,8.62 L 30.05,8.8 L 30.13,9.42 L 29.42,9.24 L 28.12,9.93 L 28.16,10.5 L 27.6,11.34 L 27.55,11.82 L 27.11,12.65 L 26.33,12.42 L 26.29,13.46 L 26.06,13.8 L 26.17,14.22 L 25.67,14.46 L 25.15,12.87 L 24.87,12.88 L 24.71,13.51 L 24.16,13.0 L 24.47,12.43 L 24.92,12.37 L 25.38,11.52 L 24.8,11.35 L 23.87,11.37 L 22.92,11.23 L 22.83,10.53 L 22.36,10.49 L 21.56,10.05 L 21.21,10.73 L 21.93,11.26 L 21.31,11.63 L 21.08,12.0 L 21.7,12.27 L 21.53,12.87 L 21.88,13.62 L 22.03,14.44 L 21.89,14.81 L 21.21,14.8 L 19.98,15.0 L 20.03,15.76 L 19.5,16.35 L 18.06,17.02 L 16.94,18.2 L 16.19,18.83 L 15.19,19.48 L 15.19,19.94 L 14.69,20.19 L 13.79,20.55 L 13.32,20.6 L 13.03,21.36 L 13.23,22.66 L 13.29,23.49 L 12.86,24.44 L 12.86,26.14 L 12.34,26.19 L 11.89,26.95 L 12.19,27.28 L 11.28,27.57 L 10.94,28.25 L 10.54,28.53 L 9.59,27.6 L 9.13,26.2 L 8.75,25.19 L 8.4,24.72 L 7.86,23.76 L 7.62,22.51 L 7.44,21.88 L 6.53,20.51 L 6.12,18.57 L 5.82,17.29 L 5.82,16.08 L 5.63,15.14 L 4.18,15.74 L 3.47,15.62 L 2.16,14.41 L 2.64,14.05 L 2.35,13.66 L 1.18,12.81 L 1.84,12.14 L 4.04,12.14 L 3.84,11.28 L 3.28,10.78 L 3.17,10.01 L 2.51,9.56 L 3.62,8.51 L 4.78,8.59 L 5.82,7.54 L 6.45,6.52 L 7.42,5.52 L 7.41,4.81 L 8.26,4.23 L 7.45,3.74 L 7.1,3.06 L 6.75,2.18 L 7.24,1.75 L 8.76,2.0 L 9.87,1.85 L 10.84,1.01 Z";

const HomePageLocationsSection = () => {
  const [activeCity, setActiveCity] = useState(CITIES[2]); // Kolkata as default

  return (
    <section className="relative bg-[var(--color-background-soft)] py-16 lg:py-24">
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 80% 15%, rgba(200,16,30,0.05) 0%, transparent 65%), radial-gradient(45% 40% at 15% 85%, rgba(255,210,31,0.07) 0%, transparent 65%)",
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
            Explore by Location
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)]">
            Explore Properties Across{" "}
            <span className="text-[var(--color-primary)]">India</span>
          </h2>

          <p className="mt-4 text-base text-[var(--color-text-muted)]">
            Discover properties in some of India's leading real-estate markets.
          </p>
        </motion.div>

        {/* ---------- Main layout: Map + Active City Card ---------- */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
          {/* -------- India Map (left, 3/5) -------- */}
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
                  <linearGradient id="indiaGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary-light)" />
                    <stop offset="100%" stopColor="var(--color-secondary-light)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* City pins — every pin glows and blinks continuously */}
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

                    {/* Label — always visible for all 5 cities */}
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

          {/* -------- Active City Card (right, 2/5) -------- */}
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
                        City
                      </p>
                      <h3 className="text-2xl font-extrabold text-[var(--color-navy)] leading-tight">
                        {activeCity.name}
                      </h3>
                    </div>
                  </div>

                  {/* Count */}
                  <p className="mt-6 text-3xl font-black text-[var(--color-primary)]">
                    {activeCity.count}{" "}
                    <span className="text-base font-semibold text-[var(--color-text-muted)]">
                      Properties
                    </span>
                  </p>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {activeCity.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-background-muted)] text-xs font-semibold text-[var(--color-text-secondary)]"
                      >
                        <Building2 className="w-3 h-3 text-[var(--color-primary)]" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Explore city */}
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

            {/* City quick-pick chips */}
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

        {/* ---------- Main CTA ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mt-12 lg:mt-16 flex justify-center"
        >
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Explore All Locations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* =========================================================
          KEYFRAMES — continuous glow + blink for every pin
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
      `}</style>
    </section>
  );
};

export default HomePageLocationsSection;