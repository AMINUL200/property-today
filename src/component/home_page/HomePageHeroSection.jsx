import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Building2,
  IndianRupee,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Home,
  Building,
  Trees,
  KeyRound,
  ShieldCheck,
  Landmark,
} from "lucide-react";

/* =========================================================
   PLACEHOLDER IMAGERY
   ========================================================= */
const POOL = [
  "https://picsum.photos/seed/ptoday-living/560/720",
  "https://picsum.photos/seed/ptoday-tower/560/680",
  "https://picsum.photos/seed/ptoday-villa/560/720",
  "https://picsum.photos/seed/ptoday-office/560/680",
  "https://picsum.photos/seed/ptoday-lobby/560/720",
  "https://picsum.photos/seed/ptoday-lounge/560/680",
  "https://picsum.photos/seed/ptoday-garden/560/720",
  "https://picsum.photos/seed/ptoday-poolside/560/680",
  "https://picsum.photos/seed/ptoday-terrace/560/720",
];
const POOL_SIZE = POOL.length;
const MAX_MAG = Math.floor(POOL_SIZE / 2);

const arcDelta = (i, slide, n) => {
  let d = (i - slide) % n;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
};

const arcTransform = (d) => {
  const mag = Math.abs(d);
  const side = Math.sign(d);
  return {
    x: `${side * (10 + (mag - 1) * 9)}vw`,
    y: `${(mag - 1) * 1.9}vw`,
    z: -(mag - 1) * 30,
    rotateY: side * (12 + mag * 7),
    scale: 1 - (mag - 1) * 0.13,
    opacity: mag <= MAX_MAG ? 1 - (mag - 1) * 0.22 : 0,
    zIndex: 30 - mag,
  };
};

const SEARCH_TABS = ["Buy", "Rent", "Commercial", "Land & Plots"];

const CITIES = ["Select City", "Delhi", "Mumbai", "Kolkata", "Bangalore", "Chennai", "Hyderabad", "Pune"];
const PROPERTY_TYPES = ["Property Type", "Apartment", "Villa", "Independent House", "Office", "Shop", "Warehouse", "Plot"];
const BUDGETS = ["Budget", "Under \u20b950 Lakh", "\u20b950 Lakh \u2013 1 Cr", "\u20b91 Cr \u2013 2 Cr", "\u20b92 Cr+"];

const POPULAR_LOCATIONS = ["Delhi", "Mumbai", "Kolkata", "Bangalore", "Chennai", "Hyderabad"];

const QUICK_LINKS = [
  { label: "Residential\nProperties", icon: Home, color: "var(--color-residential)" },
  { label: "Commercial\nProperties", icon: Building, color: "var(--color-secondary-dark)" },
  { label: "Land & Plots", icon: Trees, color: "var(--color-land)" },
  { label: "Buy / Sell\nServices", icon: KeyRound, color: "var(--color-rental)" },
  { label: "Property\nVerification", icon: ShieldCheck, color: "var(--color-investment)" },
  { label: "Home Loan\nAssistance", icon: Landmark, color: "var(--color-warning)" },
];

/* ---------- Filter Dropdown ---------- */
const FilterDropdown = ({ icon: Icon, options, value, onChange, isOpen, onToggle }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) onToggle(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onToggle]);

  return (
    <div ref={ref} className="relative flex-1 min-w-[160px]">
      <button
        type="button"
        onClick={() => onToggle(!isOpen)}
        className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-background-soft)] transition-colors duration-150"
      >
        <Icon className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`w-4 h-4 ml-auto text-[var(--color-text-muted)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-56 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] z-[999] overflow-hidden py-1"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  onToggle(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors duration-150"
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HomePageHeroSection = () => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [city, setCity] = useState(CITIES[0]);
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeCity, setActiveCity] = useState("Kolkata");
  const [slide, setSlide] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % POOL_SIZE), 3200);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  const prevSlide = () => setSlide((s) => (s - 1 + POOL_SIZE) % POOL_SIZE);
  const nextSlide = () => setSlide((s) => (s + 1) % POOL_SIZE);

  const arcImages = useMemo(
    () =>
      POOL.map((src, i) => ({
        src,
        key: i,
        delta: arcDelta(i, slide, POOL_SIZE),
      })).filter((img) => img.delta !== 0 && Math.abs(img.delta) <= MAX_MAG),
    [slide]
  );

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-[var(--color-background-soft)]">
      {/* Ambient brand wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 20%, rgba(255,210,31,0.10) 0%, transparent 60%), radial-gradient(55% 45% at 85% 80%, rgba(200,16,30,0.08) 0%, transparent 60%)",
        }}
      />

      {/* ---------- Curved carousel ---------- */}
      <div className="hidden xl:block absolute inset-0 overflow-hidden" style={{ perspective: 1800 }}>
        <div className="relative w-full h-full">
          {arcImages.map(({ src, key, delta }) => {
            const t = arcTransform(delta);
            const mag = Math.abs(delta);
            const h = 240 + (MAX_MAG - mag) * 42;
            return (
              <motion.img
                key={key}
                src={src}
                alt=""
                className="absolute top-1/2 left-1/2 w-44 object-cover rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)]"
                style={{ height: h, marginTop: -h / 2, marginLeft: -88, transformStyle: "preserve-3d" }}
                animate={{
                  x: t.x,
                  y: t.y,
                  z: t.z,
                  rotateY: t.rotateY,
                  scale: t.scale,
                  opacity: t.opacity,
                  zIndex: t.zIndex,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 110, damping: 20, mass: 0.9 }
                }
              />
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous"
        className="hidden xl:flex absolute left-6 top-1/3 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-primary)] hover:-translate-x-0.5 transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next"
        className="hidden xl:flex absolute right-6 top-1/3 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-primary)] hover:translate-x-0.5 transition-all duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ---------- Main content ---------- */}
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="relative flex items-center justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 w-full max-w-[820px] text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text)]"
            >
              Your Next Move,{" "}
              <span className="text-[var(--color-secondary-dark)]">Today</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-base sm:text-lg text-[var(--color-text-muted)] max-w-md mx-auto"
            >
              Find the perfect property for living, business or investment
              across India.
            </motion.p>

            {/* Search tabs */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center justify-center gap-2 flex-wrap"
            >
              {SEARCH_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 text-sm font-semibold rounded-[var(--radius-md)] transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-[var(--color-navy)] text-white shadow-[var(--shadow-md)]"
                      : "bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-navy)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            {/* Search bar — z-index raised so dropdowns float above the category strip */}
            <motion.div
              variants={itemVariants}
              className="relative z-30 mt-4 bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] border border-[var(--color-border-light)] flex flex-col sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border-light)]"
            >
              <FilterDropdown
                icon={MapPin}
                options={CITIES}
                value={city}
                onChange={setCity}
                isOpen={openDropdown === "city"}
                onToggle={(open) => setOpenDropdown(open ? "city" : null)}
              />
              <FilterDropdown
                icon={Building2}
                options={PROPERTY_TYPES}
                value={propertyType}
                onChange={setPropertyType}
                isOpen={openDropdown === "type"}
                onToggle={(open) => setOpenDropdown(open ? "type" : null)}
              />
              <FilterDropdown
                icon={IndianRupee}
                options={BUDGETS}
                value={budget}
                onChange={setBudget}
                isOpen={openDropdown === "budget"}
                onToggle={(open) => setOpenDropdown(open ? "budget" : null)}
              />
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors duration-200 whitespace-nowrap rounded-b-[var(--radius-xl)] sm:rounded-b-none sm:rounded-r-[var(--radius-xl)]"
              >
                <Search className="w-4 h-4" />
                Search Properties
              </button>
            </motion.div>

            {/* Popular locations */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-center justify-center gap-2 flex-wrap text-sm"
            >
              <span className="font-semibold text-[var(--color-text)]">Popular Locations:</span>
              {POPULAR_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setActiveCity(loc)}
                  className={`px-3 py-1 rounded-full transition-colors duration-150 ${
                    activeCity === loc
                      ? "font-bold text-[var(--color-primary)] underline underline-offset-4"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </motion.div>

            {/* Slide dots */}
            <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center gap-2">
              {POOL.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Rotate to image ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === slide ? "w-6 bg-[var(--color-primary)]" : "w-2 bg-[var(--color-border-dark)]"
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ---------- Quick category strip ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 mt-16 lg:mt-20 bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] border border-[var(--color-border-light)] px-6 sm:px-8 py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8"
        >
          {QUICK_LINKS.map(({ label, icon: Icon, color }) => (
            <button
              key={label}
              type="button"
              className="hover-lift group flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left"
            >
              <span
                className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center shadow-[var(--shadow-sm)] transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: color }}
              >
                <Icon className="w-5 h-5 text-white" />
              </span>
              <span className="text-sm font-semibold text-[var(--color-navy)] whitespace-pre-line leading-snug">
                {label}
              </span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageHeroSection;