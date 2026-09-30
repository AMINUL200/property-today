import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Building2,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Video,
  Play,
  ChevronLeft,
  ChevronRight,
  Car,
  Dumbbell,
  ShieldCheck,
  Waves,
  Zap,
  ArrowRight,
  ArrowLeft,
  Star,
  BadgeCheck,
  Check,
  Calendar,
  Clock,
  Home,
} from "lucide-react";
import PageLoader from "../../../component/common/PageLoader";

/* =========================================================
   PLACEHOLDER DATA
   Swap with real data from your API / admin panel.
   ========================================================= */
const PROPERTY = {
  id: "PT-2025-0417",
  title: "3 BHK Premium Apartment",
  location: "New Town, Kolkata",
  fullLocation: "New Town, Kolkata, West Bengal",
  price: "₹85 Lakh",
  pricePerSqft: "₹5,862 / Sq.Ft",
  badge: "For Sale",
  status: "Ready to Move",
  beds: 3,
  baths: 2,
  area: "1450 Sq.Ft",
  description:
    "A beautifully designed 3 BHK apartment located in the heart of New Town, Kolkata. This east-facing unit offers abundant natural light, spacious rooms, and premium fittings throughout. The project features a clubhouse, landscaped gardens, and 24×7 security. Perfect for families looking for a modern, well-connected home close to schools, hospitals, and IT hubs.",
  images: [
    "https://picsum.photos/seed/ptd-hero1/1200/800",
    "https://picsum.photos/seed/ptd-hero2/600/400",
    "https://picsum.photos/seed/ptd-hero3/600/400",
    "https://picsum.photos/seed/ptd-hero4/600/400",
  ],
  amenities: [
    { icon: Car, label: "Parking" },
    { icon: Building2, label: "Lift" },
    { icon: ShieldCheck, label: "Security" },
    { icon: Dumbbell, label: "Gym" },
    { icon: Waves, label: "Swimming Pool" },
    { icon: Zap, label: "Power Backup" },
  ],
  verification: [
    "Property details reviewed",
    "Documents reviewed",
    "Location verified",
  ],
  agent: {
    name: "Ankit Sengupta",
    role: "Senior Property Consultant",
    phone: "+91 98300 12345",
    whatsapp: "+919830012345",
    rating: 4.9,
    deals: 142,
    avatar: "https://i.pravatar.cc/160?img=15",
  },
};

const PropertyDetails = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const nextImage = () =>
    setActiveImage((i) => (i + 1) % PROPERTY.images.length);
  const prevImage = () =>
    setActiveImage(
      (i) => (i - 1 + PROPERTY.images.length) % PROPERTY.images.length
    );

  // Key spec chips
  const specs = [
    { icon: Bed, label: `${PROPERTY.beds} Bedrooms` },
    { icon: Bath, label: `${PROPERTY.baths} Bathrooms` },
    { icon: Maximize, label: PROPERTY.area },
    { icon: Home, label: PROPERTY.status },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loader) return <PageLoader />;

  return (
    <div className="bg-[var(--color-background-soft)] min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* =========================================================
            Back to Properties
            ========================================================= */}
        <Link
          to="/buy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 mb-6 group"
        >
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[var(--color-border)] group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </span>
          Back to Properties
        </Link>

        {/* =========================================================
            Top: title + location
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 lg:mb-8"
        >
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-[var(--color-primary)] text-white shadow-[var(--shadow-sm)]">
              {PROPERTY.badge}
            </span>
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-[var(--color-secondary-light)] text-[var(--color-secondary-dark)] border border-[var(--color-secondary)]/30">
              {PROPERTY.status}
            </span>
            <span className="text-xs font-semibold text-[var(--color-text-muted)]">
              Property ID: {PROPERTY.id}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-navy)] leading-tight">
            {PROPERTY.title}
          </h1>

          <p className="mt-3 flex items-center gap-1.5 text-base text-[var(--color-text-muted)]">
            <MapPin className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
            {PROPERTY.location}
          </p>
        </motion.div>

        {/* =========================================================
            Image Gallery
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main image */}
          <div className="relative rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] aspect-[16/9] bg-[var(--color-background-muted)]">
            <img
              src={PROPERTY.images[activeImage]}
              alt={PROPERTY.title}
              className="w-full h-full object-cover"
            />

            {/* Top-right actions */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                type="button"
                aria-label="Save property"
                onClick={() => setIsSaved((s) => !s)}
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-[var(--shadow-md)] transition-colors duration-200 ${
                  isSaved
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
              </button>
              <button
                type="button"
                aria-label="Share property"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] shadow-[var(--shadow-md)] transition-colors duration-200"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Prev / Next */}
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Video / Virtual Tour */}
            <button
              type="button"
              className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full bg-[var(--color-navy)]/90 backdrop-blur-sm text-white hover:bg-[var(--color-primary)] transition-colors duration-200"
            >
              <Play className="w-3.5 h-3.5" />
              Video / Virtual Tour
            </button>

            {/* Image counter */}
            <span className="absolute bottom-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-black/60 text-white">
              {activeImage + 1} / {PROPERTY.images.length}
            </span>
          </div>

          {/* Thumbnails */}
          <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
            {PROPERTY.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`relative rounded-[var(--radius-md)] overflow-hidden aspect-[4/3] border-2 transition-all duration-200 ${
                  activeImage === i
                    ? "border-[var(--color-primary)] shadow-[var(--shadow-md)]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
                {i === 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Video className="w-4 h-4 text-white" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* =========================================================
            Lower: Content (8/12) + Right rail (4/12)
            ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
        >
          {/* ---------- LEFT COLUMN (8/12) ---------- */}
          <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            {/* ---------- Price + Key Specs ---------- */}
            <motion.section
              variants={itemVariants}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 lg:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-[var(--color-border-light)]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Price
                  </p>
                  <p className="mt-1 text-3xl lg:text-4xl font-black text-[var(--color-primary)]">
                    {PROPERTY.price}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[var(--color-text-muted)]">
                    {PROPERTY.pricePerSqft}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Status
                  </p>
                  <p className="mt-1 text-lg font-bold text-[var(--color-navy)]">
                    {PROPERTY.status}
                  </p>
                </div>
              </div>

              {/* Key specs */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {specs.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center gap-2 p-4 rounded-[var(--radius-lg)] bg-[var(--color-background-soft)] border border-[var(--color-border-light)]"
                  >
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-primary-light)]">
                      <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                    </span>
                    <span className="text-xs font-bold text-[var(--color-navy)]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ---------- Description ---------- */}
            <motion.section
              variants={itemVariants}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 lg:p-8"
            >
              <h2 className="text-lg font-bold text-[var(--color-navy)]">
                Description
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {PROPERTY.description}
              </p>
            </motion.section>

            {/* ---------- Amenities ---------- */}
            <motion.section
              variants={itemVariants}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 lg:p-8"
            >
              <h2 className="text-lg font-bold text-[var(--color-navy)]">
                Amenities
              </h2>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {PROPERTY.amenities.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-background-soft)] border border-[var(--color-border-light)] hover:border-[var(--color-primary)]/30 transition-colors duration-200"
                  >
                    <span className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[var(--color-primary-light)]">
                      <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-text)]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ---------- Location ---------- */}
            <motion.section
              variants={itemVariants}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 lg:p-8"
            >
              <h2 className="text-lg font-bold text-[var(--color-navy)]">
                Location
              </h2>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                {PROPERTY.fullLocation}
              </p>

              {/* Placeholder map — swap for Google Maps / Mapbox iframe */}
              <div className="mt-5 relative rounded-[var(--radius-lg)] overflow-hidden aspect-[16/9] border border-[var(--color-border)] bg-[var(--color-background-muted)]">
                <img
                  src="https://picsum.photos/seed/ptd-map/1200/675"
                  alt="Map location"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 px-5 py-4 rounded-[var(--radius-lg)] bg-white/95 backdrop-blur-sm shadow-[var(--shadow-lg)]">
                    <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
                    <p className="text-xs font-bold text-[var(--color-navy)]">
                      {PROPERTY.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ---------- Property Verification ---------- */}
            <motion.section
              variants={itemVariants}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 lg:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="w-12 h-12 shrink-0 rounded-[var(--radius-md)] bg-[var(--gradient-brand)] flex items-center justify-center shadow-[var(--shadow-primary)]">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </span>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-[var(--color-navy)]">
                    Propertytoday Verification
                  </h2>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    Every step reviewed and confirmed by our team.
                  </p>
                </div>
              </div>

              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PROPERTY.verification.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-success-light)]/60 border border-[var(--color-success)]/20"
                  >
                    <span className="w-7 h-7 shrink-0 rounded-full bg-[var(--color-success)] flex items-center justify-center">
                      <Check
                        className="w-4 h-4 text-white"
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-text)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* ---------- RIGHT RAIL (4/12) ---------- */}
          <div className="lg:col-span-4 space-y-6">
            {/* ---------- Schedule Visit CTA ---------- */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-md)] p-6 lg:sticky lg:top-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-11 h-11 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[var(--color-navy)]">
                    Schedule Visit
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Confirmed within 24 hours
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-3"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                />
                <input
                  type="date"
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Visit
                </button>
              </form>

              {/* Quick contact alternatives */}
              <div className="mt-4 pt-4 border-t border-[var(--color-border-light)] grid grid-cols-2 gap-2">
                <a
                  href={`tel:${PROPERTY.agent.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </a>
                <a
                  href={`https://wa.me/${PROPERTY.agent.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold rounded-[var(--radius-md)] text-white bg-[#25D366] hover:brightness-95 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* ---------- Agent Card ---------- */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
                Listed By
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={PROPERTY.agent.avatar}
                  alt={PROPERTY.agent.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[var(--color-primary-light)]"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[var(--color-navy)] truncate flex items-center gap-1.5">
                    {PROPERTY.agent.name}
                    <BadgeCheck className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] truncate">
                    {PROPERTY.agent.role}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 font-bold text-[var(--color-navy)]">
                  <Star className="w-3.5 h-3.5 fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                  {PROPERTY.agent.rating}
                </span>
                <span className="text-[var(--color-text-muted)]">
                  {PROPERTY.agent.deals} deals closed
                </span>
              </div>
            </motion.div>

            {/* ---------- EMI Calculator teaser ---------- */}
            <motion.div
              variants={itemVariants}
              className="bg-[var(--color-navy)] text-white rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] p-6 relative overflow-hidden"
            >
              <span className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[var(--color-secondary)]/25 blur-3xl" />

              <h3 className="relative text-base font-bold">Estimate Your EMI</h3>
              <p className="relative mt-1.5 text-xs text-white/70">
                Calculate monthly payments for this property.
              </p>

              <div className="relative mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Loan Amount</span>
                  <span className="font-bold">₹68 Lakh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Tenure</span>
                  <span className="font-bold">20 Years</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-white/70">Approx. EMI</span>
                  <span className="text-lg font-black text-[var(--color-secondary)]">
                    ₹57,100
                  </span>
                </div>
              </div>

              <Link
                to="/services/investment"
                className="relative mt-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--color-secondary)] hover:text-white transition-colors duration-200 group/emi"
              >
                Get Home Loan Assistance
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/emi:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyDetails;