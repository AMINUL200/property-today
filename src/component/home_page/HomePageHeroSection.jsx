
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Building2,
  IndianRupee,
  Search,
  ChevronDown,
  Home,
  KeyRound,
  ArrowUpRight,
  Check,
} from "lucide-react";

const SEARCH_TABS = [
  { label: "Buy", icon: Home },
  { label: "Rent", icon: KeyRound },
  { label: "Commercial", icon: Building2 },
  { label: "Land & Plots", icon: MapPin },
];

const CITIES = [
  "Delhi", "Mumbai", "Kolkata", "Bangalore",
  "Chennai", "Hyderabad", "Pune", "Ahmedabad",
  "Jaipur", "Lucknow",
];

const PROPERTY_TYPES = [
  "Apartment", "Villa", "Independent House",
  "Office", "Shop", "Warehouse", "Plot",
];

const BUDGETS = [
  "Under ₹50 Lakh",
  "₹50 Lakh – 1 Cr",
  "₹1 Cr – 2 Cr",
  "₹2 Cr – 5 Cr",
  "Above ₹5 Cr",
];

const POPULAR_LOCATIONS = [
  "Delhi", "Mumbai", "Kolkata",
  "Bangalore", "Chennai", "Hyderabad",
];

const SelectField = ({
  icon: Icon,
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="relative flex min-w-0 items-center gap-3 px-4 py-3 sm:px-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">
        <Icon className="h-5 w-5 text-[var(--color-primary)]" />
      </div>

      <div className="min-w-0 flex-1">
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
          {label}
        </label>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-sm font-bold text-[var(--color-navy)] outline-none"
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <ChevronDown className="pointer-events-none h-4 w-4 shrink-0 text-[var(--color-text-muted)]" />
    </div>
  );
};

const HomePageHeroSection = () => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [activeCity, setActiveCity] = useState("Kolkata");

  const handlePopularCity = (location) => {
    setActiveCity(location);
    setCity(location);
  };

  const handleSearch = () => {
    const searchData = {
      category: activeTab,
      city,
      propertyType,
      budget,
    };

    console.log("Property Search:", searchData);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy)]">

      {/* Background image */}

      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/image/hero-background.png')",
        }}
      />

      {/* Unified overlay */}

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/65 to-white/10" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-white/90 via-white/10 to-white/5" />

      <div className="mx-auto flex min-h-[780px] max-w-[1440px] flex-col justify-between px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:min-h-[820px] lg:px-10 lg:pt-36">

        {/* HERO HEADING */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-[850px] pb-10 lg:pb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-white/75 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-primary)] shadow-sm backdrop-blur-md sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
            Your Trusted Property Dealing Partner
          </span>

          <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.12] tracking-tight text-[var(--color-primary-dark)] sm:text-5xl md:text-6xl lg:text-[68px]">
            Find the perfect match
            <span className="mt-2 block text-[var(--color-primary)]">
              for living, business or investment across India.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-navy)] sm:text-base lg:text-lg">
            Discover the right property for your lifestyle and goals.
            Explore buying, renting, commercial spaces and land with
            professional assistance from Propertytoday.
          </p>

          <div className="mt-6 flex flex-wrap gap-5 text-xs font-bold text-[var(--color-navy)] sm:text-sm">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[var(--color-primary)]" />
              Verified Property Options
            </span>

            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[var(--color-primary)]" />
              Professional Assistance
            </span>
          </div>
        </motion.div>

        {/* UNIFIED SEARCH PANEL */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative z-20 w-full"
        >
          <div className="overflow-visible rounded-[24px] border border-white/80 bg-white/95 shadow-[0_20px_70px_rgba(7,29,73,0.20)] backdrop-blur-xl sm:rounded-[30px]">

            {/* CATEGORY TABS */}

            <div className="flex gap-1 overflow-x-auto border-b border-[var(--color-border)] px-3 pt-3 sm:px-5 sm:pt-4">
              {SEARCH_TABS.map(({ label, icon: Icon }) => {
                const active = activeTab === label;

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveTab(label)}
                    className={`relative flex shrink-0 items-center gap-2 rounded-t-xl px-4 py-3 text-xs font-bold transition-all sm:px-7 sm:text-sm ${
                      active
                        ? "bg-[var(--color-primary)] text-white"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
                    }`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    {label}
                  </button>
                );
              })}
            </div>

            {/* SEARCH FILTERS + BUTTON */}

            <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 sm:gap-3 sm:p-5 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-center">

              <div className="rounded-xl border border-[var(--color-border)] bg-white transition-colors focus-within:border-[var(--color-primary)]">
                <SelectField
                  icon={MapPin}
                  label="Location"
                  value={city}
                  options={CITIES}
                  onChange={(value) => {
                    setCity(value);
                    setActiveCity(value);
                  }}
                />
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-white transition-colors focus-within:border-[var(--color-primary)]">
                <SelectField
                  icon={Building2}
                  label="Property Type"
                  value={propertyType}
                  options={PROPERTY_TYPES}
                  onChange={setPropertyType}
                />
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-white transition-colors focus-within:border-[var(--color-primary)]">
                <SelectField
                  icon={IndianRupee}
                  label="Your Budget"
                  value={budget}
                  options={BUDGETS}
                  onChange={setBudget}
                />
              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="group flex min-h-[64px] items-center justify-center gap-3 rounded-xl bg-[var(--color-primary)] px-7 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-xl sm:col-span-2 lg:col-span-1"
              >
                <Search className="h-5 w-5" />
                <span>Search Properties</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>

            {/* POPULAR LOCATIONS IN SAME PANEL */}

            <div className="border-t border-[var(--color-border)] px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <div className="flex shrink-0 items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
                  <span className="text-xs font-extrabold text-[var(--color-navy)] sm:text-sm">
                    Popular Locations
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {POPULAR_LOCATIONS.map((location) => {
                    const active = activeCity === location;

                    return (
                      <button
                        key={location}
                        type="button"
                        onClick={() => handlePopularCity(location)}
                        className={`rounded-full border px-4 py-2 text-xs font-bold transition-all duration-200 ${
                          active
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-sm"
                            : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                        }`}
                      >
                        {location}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HomePageHeroSection;
