import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Building2,
  Home,
  MapPin,
  IndianRupee,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Camera,
  User,
  Phone,
  Mail,
  ShieldCheck,
  BadgeCheck,
  Sparkles,
  FileCheck2,
  KeyRound,
  Store,
  Trees,
  Hotel,
  Clock,
  Wrench,
  Users,
  Lock,
} from "lucide-react";
import PageLoader from "../../../component/common/PageLoader";

/* =========================================================
   FORM CONFIG
   ========================================================= */
const STEPS = [
  { id: 1, label: "Rental Type", icon: KeyRound },
  { id: 2, label: "Location", icon: MapPin },
  { id: 3, label: "Property Details", icon: Home },
  { id: 4, label: "Rent & Terms", icon: IndianRupee },
  { id: 5, label: "Photos", icon: Camera },
  { id: 6, label: "Contact", icon: User },
];

const RENTAL_INTENTS = [
  {
    id: "rent",
    label: "Rent Out",
    desc: "Find tenants for residential properties — flats, houses and apartments.",
    icon: KeyRound,
  },
  {
    id: "lease",
    label: "Lease Out",
    desc: "List commercial or long-term lease properties for businesses.",
    icon: FileCheck2,
  },
  {
    id: "pg",
    label: "PG / Hostel",
    desc: "List paying guest rooms and hostel accommodations.",
    icon: Users,
  },
];

const PROPERTY_TYPES = [
  { id: "apartment", label: "Apartment", icon: Building2 },
  { id: "house", label: "Independent House", icon: Home },
  { id: "villa", label: "Villa", icon: Home },
  { id: "studio", label: "Studio / 1 RK", icon: Building2 },
  { id: "office", label: "Office Space", icon: Store },
  { id: "shop", label: "Shop / Showroom", icon: Store },
  { id: "warehouse", label: "Warehouse", icon: Building2 },
  { id: "pg-room", label: "PG / Hostel Room", icon: Hotel },
];

const FURNISHING_OPTIONS = [
  { id: "unfurnished", label: "Unfurnished", desc: "No furniture provided" },
  { id: "semi", label: "Semi-Furnished", desc: "Basic furniture included" },
  { id: "fully", label: "Fully Furnished", desc: "Complete with furniture & appliances" },
];

/* =========================================================
   PAGE
   ========================================================= */
const ListPropertyRentPage = () => {
  const [loader, setLoader] = useState(true);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // ---------- Form state ----------
  const [form, setForm] = useState({
    rentalIntent: "",
    propertyType: "",
    bhk: "",
    location: "",
    city: "",
    pincode: "",
    area: "",
    carpet: "",
    beds: "",
    baths: "",
    floor: "",
    facing: "",
    furnishing: "",
    age: "",
    monthlyRent: "",
    securityDeposit: "",
    maintenance: "",
    maintenanceType: "included",
    leaseDuration: "",
    availableFrom: "",
    preferredTenants: [],
    title: "",
    description: "",
    amenities: [],
    photos: [],
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const t = setTimeout(() => setLoader(false), 600);
    return () => clearTimeout(t);
  }, []);

  const update = (key, value) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleArrayValue = (key, value) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((v) => v !== value)
        : [...f[key], value],
    }));

  // ---------- Step navigation ----------
  const nextStep = () => {
    if (step < STEPS.length) setStep((s) => s + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (loader) return <PageLoader />;

  /* =========================================================
     SUCCESS STATE
     ========================================================= */
  if (submitted) {
    return (
      <div className="bg-[var(--color-background-soft)] min-h-screen pt-24 lg:pt-28 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[var(--radius-2xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-xl)] p-8 sm:p-12 text-center"
          >
            <div className="relative mx-auto w-20 h-20">
              <span className="absolute inset-0 rounded-full bg-[var(--color-success)]/15 animate-ping" />
              <span className="relative w-20 h-20 rounded-full bg-[var(--color-success)] flex items-center justify-center shadow-[var(--shadow-lg)]">
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </span>
            </div>

            <h1 className="mt-6 font-serif text-3xl sm:text-4xl font-bold text-[var(--color-navy)] leading-tight">
              Rental Listing Submitted!
            </h1>

            <p className="mt-3 text-base text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
              Thank you. Our team will review your rental details and reach out
              within 24 hours to help you find suitable tenants.
            </p>

            <div className="mt-8 text-left max-w-md mx-auto">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
                What Happens Next
              </p>

              <ul className="space-y-3">
                {[
                  "Our team reviews your rental details",
                  "We contact you to confirm information",
                  "Your rental listing goes live",
                  "Interested tenants can reach out to you",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
              >
                Back to Home
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-200"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN FORM
     ========================================================= */
  return (
    <div className="bg-[var(--color-background-soft)] min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ---------- Breadcrumb ---------- */}
        <nav className="text-xs text-[var(--color-text-muted)] mb-5 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-[var(--color-primary)]">
            Home
          </Link>
          <span>/</span>
          <Link to="/sell" className="hover:text-[var(--color-primary)]">
            Sell
          </Link>
          <span>/</span>
          <span className="text-[var(--color-text)] font-semibold">
            Rent / Lease Your Property
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

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] text-xs font-bold tracking-widest uppercase">
                <KeyRound className="w-3.5 h-3.5" />
                Rent / Lease Your Property
              </span>

              <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                List Your Property for{" "}
                <span className="text-[var(--color-secondary)]">
                  Rent or Lease
                </span>
              </h1>

              <p className="mt-3 text-sm lg:text-base text-white/75 max-w-xl leading-relaxed">
                Share a few details about your rental property and our team
                will help you find suitable tenants.
              </p>
            </div>

            <div className="shrink-0 inline-flex items-center gap-3 px-5 py-4 rounded-[var(--radius-xl)] bg-white/5 border border-white/15 backdrop-blur-sm">
              <span className="w-11 h-11 rounded-[var(--radius-md)] bg-[var(--color-secondary)]/20 flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-[var(--color-secondary)]" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Free Listing
                </p>
                <p className="text-sm font-bold text-white">
                  No upfront cost
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            STEPPER
            ========================================================= */}
        <div className="mt-10 overflow-x-auto custom-scrollbar pb-2">
          <div className="flex items-center gap-2 min-w-max mx-auto px-2">
            {STEPS.map((s, i) => {
              const StepIcon = s.icon;
              const isActive = step === s.id;
              const isCompleted = step > s.id;

              return (
                <React.Fragment key={s.id}>
                  <button
                    type="button"
                    onClick={() => setStep(s.id)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] transition-all duration-200 group"
                  >
                    <span
                      className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isCompleted
                          ? "bg-[var(--color-success)] text-white"
                          : isActive
                            ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-primary)]"
                            : "bg-white border border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)]"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" strokeWidth={3} />
                      ) : (
                        <StepIcon className="w-4 h-4" />
                      )}
                    </span>

                    <span
                      className={`text-xs font-bold whitespace-nowrap hidden sm:block transition-colors duration-200 ${
                        isActive
                          ? "text-[var(--color-navy)]"
                          : isCompleted
                            ? "text-[var(--color-success)]"
                            : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>

                  {i < STEPS.length - 1 && (
                    <span
                      className={`h-0.5 w-6 lg:w-10 rounded-full transition-colors duration-200 ${
                        step > s.id
                          ? "bg-[var(--color-success)]"
                          : "bg-[var(--color-border)]"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            FORM CARD
            ========================================================= */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-white rounded-[var(--radius-2xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-lg)] overflow-hidden"
        >
          <div className="h-1 bg-[var(--color-background-muted)]">
            <motion.span
              className="block h-full bg-[var(--gradient-brand)]"
              initial={false}
              animate={{ width: `${(step / STEPS.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {/* ============================================
                  STEP 1 — Rental Type
                  ============================================ */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepHeader
                    step="Step 1 of 6"
                    title="What type of rental listing is this?"
                    subtitle="Choose whether you want to rent, lease, or list a PG / hostel."
                  />

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {RENTAL_INTENTS.map((intent) => {
                      const IntentIcon = intent.icon;
                      const isActive = form.rentalIntent === intent.id;

                      return (
                        <button
                          key={intent.id}
                          type="button"
                          onClick={() => update("rentalIntent", intent.id)}
                          className={`group flex flex-col items-start text-left p-5 rounded-[var(--radius-xl)] border-2 transition-all duration-200 ${
                            isActive
                              ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]/40 shadow-[var(--shadow-md)]"
                              : "border-[var(--color-border-light)] bg-white hover:border-[var(--color-primary)]/40 hover:shadow-[var(--shadow-sm)]"
                          }`}
                        >
                          <span
                            className={`w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center mb-3 transition-colors duration-200 ${
                              isActive
                                ? "bg-[var(--color-primary)] text-white"
                                : "bg-[var(--color-background-muted)] text-[var(--color-text-muted)] group-hover:bg-[var(--color-primary-light)] group-hover:text-[var(--color-primary)]"
                            }`}
                          >
                            <IntentIcon className="w-6 h-6" />
                          </span>
                          <span className="text-base font-bold text-[var(--color-navy)]">
                            {intent.label}
                          </span>
                          <span className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                            {intent.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
                      Property Type
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {PROPERTY_TYPES.map((type) => {
                        const TypeIcon = type.icon;
                        const isActive = form.propertyType === type.id;

                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => update("propertyType", type.id)}
                            className={`group flex flex-col items-center text-center gap-2 p-4 rounded-[var(--radius-lg)] border transition-all duration-200 ${
                              isActive
                                ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]/40 shadow-[var(--shadow-sm)]"
                                : "border-[var(--color-border-light)] bg-white hover:border-[var(--color-primary)]/40"
                            }`}
                          >
                            <span
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                                isActive
                                  ? "bg-[var(--color-primary)] text-white"
                                  : "bg-[var(--color-background-muted)] text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]"
                              }`}
                            >
                              <TypeIcon className="w-5 h-5" />
                            </span>
                            <span
                              className={`text-xs font-bold leading-tight ${
                                isActive
                                  ? "text-[var(--color-primary)]"
                                  : "text-[var(--color-text)]"
                              }`}
                            >
                              {type.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ============================================
                  STEP 2 — Location
                  ============================================ */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepHeader
                    step="Step 2 of 6"
                    title="Where is your rental property located?"
                    subtitle="Enter the area and city so tenants can find it easily."
                  />

                  <div className="mt-8 space-y-5 max-w-2xl">
                    <FormField
                      label="Full Address / Area"
                      icon={MapPin}
                      placeholder="e.g. Flat 3B, Sunrise Residency, New Town"
                      value={form.location}
                      onChange={(v) => update("location", v)}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        label="City"
                        icon={Building2}
                        placeholder="e.g. Kolkata"
                        value={form.city}
                        onChange={(v) => update("city", v)}
                      />
                      <FormField
                        label="PIN Code"
                        icon={MapPin}
                        placeholder="e.g. 700156"
                        value={form.pincode}
                        onChange={(v) => update("pincode", v)}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ============================================
                  STEP 3 — Property Details
                  ============================================ */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepHeader
                    step="Step 3 of 6"
                    title="Tell us about your rental property"
                    subtitle="These details help tenants understand your property."
                  />

                  <div className="mt-8 space-y-6 max-w-3xl">
                    {/* BHK + Beds + Baths */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                      <FormField
                        label="BHK"
                        icon={Home}
                        placeholder="e.g. 3"
                        value={form.bhk}
                        onChange={(v) => update("bhk", v)}
                      />
                      <FormField
                        label="Bedrooms"
                        icon={Bed}
                        placeholder="e.g. 3"
                        value={form.beds}
                        onChange={(v) => update("beds", v)}
                      />
                      <FormField
                        label="Bathrooms"
                        icon={Bath}
                        placeholder="e.g. 2"
                        value={form.baths}
                        onChange={(v) => update("baths", v)}
                      />
                      <FormField
                        label="Floor"
                        icon={Building2}
                        placeholder="e.g. 7 of 14"
                        value={form.floor}
                        onChange={(v) => update("floor", v)}
                      />
                    </div>

                    {/* Areas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        label="Built-up Area (Sq.Ft)"
                        icon={Maximize}
                        placeholder="e.g. 1450"
                        value={form.area}
                        onChange={(v) => update("area", v)}
                      />
                      <FormField
                        label="Carpet Area (Sq.Ft)"
                        icon={Maximize}
                        placeholder="e.g. 1180"
                        value={form.carpet}
                        onChange={(v) => update("carpet", v)}
                      />
                    </div>

                    {/* Facing + Age */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <SelectField
                        label="Facing"
                        value={form.facing}
                        onChange={(v) => update("facing", v)}
                        options={[
                          "East",
                          "West",
                          "North",
                          "South",
                          "North-East",
                          "North-West",
                          "South-East",
                          "South-West",
                        ]}
                      />
                      <SelectField
                        label="Property Age"
                        value={form.age}
                        onChange={(v) => update("age", v)}
                        options={[
                          "New / Under Construction",
                          "0-1 Year",
                          "1-3 Years",
                          "3-5 Years",
                          "5-10 Years",
                          "10+ Years",
                        ]}
                      />
                    </div>

                    {/* Furnishing as cards */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
                        Furnishing
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {FURNISHING_OPTIONS.map((opt) => {
                          const isActive = form.furnishing === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => update("furnishing", opt.id)}
                              className={`flex flex-col items-start text-left p-4 rounded-[var(--radius-lg)] border transition-all duration-200 ${
                                isActive
                                  ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]/40 shadow-[var(--shadow-sm)]"
                                  : "border-[var(--color-border-light)] bg-white hover:border-[var(--color-primary)]/40"
                              }`}
                            >
                              <span
                                className={`text-sm font-bold ${
                                  isActive
                                    ? "text-[var(--color-primary)]"
                                    : "text-[var(--color-navy)]"
                                }`}
                              >
                                {opt.label}
                              </span>
                              <span className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                                {opt.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
                        Amenities (Optional)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Parking",
                          "Lift",
                          "Security",
                          "Gym",
                          "Swimming Pool",
                          "Power Backup",
                          "Garden",
                          "Clubhouse",
                          "Water Supply",
                          "CCTV",
                          "Wi-Fi",
                          "Air Conditioning",
                        ].map((amenity) => {
                          const isActive = form.amenities.includes(amenity);
                          return (
                            <button
                              key={amenity}
                              type="button"
                              onClick={() => toggleArrayValue("amenities", amenity)}
                              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 ${
                                isActive
                                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-[var(--shadow-sm)]"
                                  : "bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                              }`}
                            >
                              {isActive && (
                                <Check className="w-3 h-3" strokeWidth={3} />
                              )}
                              {amenity}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ============================================
                  STEP 4 — Rent & Terms
                  ============================================ */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepHeader
                    step="Step 4 of 6"
                    title="Set your rent and terms"
                    subtitle="These are the key details tenants look for first."
                  />

                  <div className="mt-8 space-y-6 max-w-3xl">
                    {/* Monthly Rent */}
                    <FormField
                      label="Monthly Rent"
                      icon={IndianRupee}
                      placeholder="e.g. 25000"
                      value={form.monthlyRent}
                      onChange={(v) => update("monthlyRent", v)}
                    />

                    {/* Security Deposit */}
                    <FormField
                      label="Security Deposit"
                      icon={Lock}
                      placeholder="e.g. 50000"
                      value={form.securityDeposit}
                      onChange={(v) => update("securityDeposit", v)}
                    />

                    {/* Maintenance */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                        Maintenance
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {[
                          { id: "included", label: "Included in Rent" },
                          { id: "tenant", label: "Tenant Pays" },
                          { id: "separate", label: "Separate Amount" },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => update("maintenanceType", opt.id)}
                            className={`px-4 py-2.5 text-xs font-semibold rounded-[var(--radius-md)] transition-all duration-200 ${
                              form.maintenanceType === opt.id
                                ? "bg-[var(--color-navy)] text-white shadow-[var(--shadow-md)]"
                                : "bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-navy)]"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>

                      {form.maintenanceType === "separate" && (
                        <FormField
                          label="Maintenance Amount"
                          icon={Wrench}
                          placeholder="e.g. 3500 / month"
                          value={form.maintenance}
                          onChange={(v) => update("maintenance", v)}
                        />
                      )}
                    </div>

                    {/* Lease Duration + Available From */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <SelectField
                        label="Lease Duration"
                        value={form.leaseDuration}
                        onChange={(v) => update("leaseDuration", v)}
                        options={[
                          "6 Months",
                          "11 Months",
                          "12 Months",
                          "24 Months",
                          "36 Months",
                          "Flexible",
                        ]}
                      />
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                          Available From
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)] pointer-events-none" />
                          <input
                            type="date"
                            value={form.availableFrom}
                            onChange={(e) => update("availableFrom", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preferred Tenants */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                        Preferred Tenants (Optional)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Family",
                          "Bachelor (Male)",
                          "Bachelor (Female)",
                          "Working Professionals",
                          "Students",
                          "Company Lease",
                          "Any",
                        ].map((tenant) => {
                          const isActive = form.preferredTenants.includes(tenant);
                          return (
                            <button
                              key={tenant}
                              type="button"
                              onClick={() =>
                                toggleArrayValue("preferredTenants", tenant)
                              }
                              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 ${
                                isActive
                                  ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                                  : "bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-navy)]"
                              }`}
                            >
                              {isActive && (
                                <Check className="w-3 h-3" strokeWidth={3} />
                              )}
                              {tenant}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Listing Title + Description */}
                    <FormField
                      label="Listing Title"
                      icon={Sparkles}
                      placeholder="e.g. Spacious 2 BHK Flat for Rent in Salt Lake"
                      value={form.title}
                      onChange={(v) => update("title", v)}
                    />

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Highlight what makes your rental property attractive — space, location, amenities, condition..."
                        value={form.description}
                        onChange={(e) => update("description", e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors resize-none outline-none"
                      />
                    </div>

                    {/* Pricing hint */}
                    <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-secondary-light)]/60 border border-[var(--color-secondary)]/30">
                      <span className="w-8 h-8 shrink-0 rounded-full bg-[var(--color-secondary)]/30 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-[var(--color-secondary-dark)]" />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[var(--color-navy)]">
                          Not sure about the rent?
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                          Our team can help you estimate a competitive rent
                          based on your area and property type.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ============================================
                  STEP 5 — Photos
                  ============================================ */}
              {step === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepHeader
                    step="Step 5 of 6"
                    title="Add photos of your rental property"
                    subtitle="Good photos help your listing stand out. You can skip this and add later."
                  />

                  <div className="mt-8 max-w-2xl">
                    <label
                      htmlFor="rent-photo-upload"
                      className="group relative flex flex-col items-center justify-center gap-3 p-12 rounded-[var(--radius-xl)] border-2 border-dashed border-[var(--color-border)] bg-[var(--color-background-soft)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]/30 transition-all duration-200 cursor-pointer"
                    >
                      <span className="w-16 h-16 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-colors duration-200">
                        <Camera className="w-7 h-7 text-[var(--color-primary)] group-hover:text-white transition-colors duration-200" />
                      </span>

                      <span className="text-base font-bold text-[var(--color-navy)]">
                        Click to upload photos
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] text-center max-w-xs">
                        JPG, PNG up to 5MB each. Add up to 10 photos. Drag and
                        drop is supported.
                      </span>

                      <input                        id="rent-photo-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) =>
                          update(
                            "photos",
                            Array.from(e.target.files || []).map((f) => f.name)
                          )
                        }
                      />
                    </label>

                    {form.photos.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {form.photos.map((name, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-semibold"
                          >
                            <Camera className="w-3 h-3" />
                            {name}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        "Include a well-lit photo of the main entrance",
                        "Take photos of every room, kitchen and bathroom",
                        "Show balconies, terraces and views",
                        "Photograph amenities like parking and lobby",
                      ].map((tip) => (
                        <div
                          key={tip}
                          className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]"
                        >
                          <Check
                            className="w-3.5 h-3.5 text-[var(--color-success)] shrink-0 mt-0.5"
                            strokeWidth={3}
                          />
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ============================================
                  STEP 6 — Contact
                  ============================================ */}
              {step === 6 && (
                <motion.div
                  key="step-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepHeader
                    step="Step 6 of 6"
                    title="How can we reach you?"
                    subtitle="Our team will contact you within 24 hours to confirm details."
                  />

                  <div className="mt-8 space-y-5 max-w-2xl">
                    <FormField
                      label="Full Name"
                      icon={User}
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={(v) => update("name", v)}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        label="Phone Number"
                        icon={Phone}
                        placeholder="+91 98300 12345"
                        value={form.phone}
                        onChange={(v) => update("phone", v)}
                      />
                      <FormField
                        label="Email Address"
                        icon={Mail}
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(v) => update("email", v)}
                      />
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          icon: ShieldCheck,
                          text: "Your information is safe",
                        },
                        { icon: BadgeCheck, text: "No spam calls" },
                        {
                          icon: FileCheck2,
                          text: "Free listing — no charges",
                        },
                      ].map(({ icon: Icon, text }) => (
                        <div
                          key={text}
                          className="flex items-center gap-2 p-3 rounded-[var(--radius-md)] bg-[var(--color-background-soft)] border border-[var(--color-border-light)]"
                        >
                          <Icon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                          <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =========================================================
                NAVIGATION BUTTONS
                ========================================================= */}
            <div className="mt-10 pt-6 border-t border-[var(--color-border-light)] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-[var(--radius-md)] transition-all duration-200 ${
                  step === 1
                    ? "text-[var(--color-text-light)] cursor-not-allowed"
                    : "text-[var(--color-navy)] hover:text-[var(--color-primary)]"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {step < STEPS.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Check className="w-4 h-4" strokeWidth={3} />
                  Submit Rental Listing
                </button>
              )}
            </div>
          </div>
        </form>

        {/* =========================================================
            BOTTOM HELP STRIP
            ========================================================= */}
        <div className="mt-8 bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="w-11 h-11 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center">
              <Phone className="w-5 h-5 text-[var(--color-primary)]" />
            </span>
            <div>
              <p className="text-sm font-bold text-[var(--color-navy)]">
                Need help with your rental listing?
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Our team is available to assist you.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+01234567890"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   SUB-COMPONENTS
   ========================================================= */
const StepHeader = ({ step, title, subtitle }) => (
  <div>
    <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
      {step}
    </p>
    <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[var(--color-navy)] leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{subtitle}</p>
    )}
  </div>
);

const FormField = ({ label, icon: Icon, placeholder, value, onChange }) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)] pointer-events-none" />
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${
          Icon ? "pl-10" : "pl-4"
        } pr-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none`}
      />
    </div>
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 pr-10 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none appearance-none cursor-pointer"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)] pointer-events-none" />
    </div>
  </div>
);

export default ListPropertyRentPage;