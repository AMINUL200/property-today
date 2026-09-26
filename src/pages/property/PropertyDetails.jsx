import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Building2,
  Layers,
  Calendar,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Video,
  Play,
  ChevronLeft,
  ChevronRight,
  Check,
  Car,
  Dumbbell,
  Waves,
  Trees,
  ShieldCheck,
  Zap,
  Droplets,
  ArrowRight,
  School,
  Hospital,
  ShoppingBag,
  Train,
  Utensils,
  Star,
  BadgeCheck,
} from "lucide-react";
import PageLoader from "../../component/common/PageLoader";

/* =========================================================
   PLACEHOLDER DATA
   Swap with real data from your API / admin panel.
   ========================================================= */
const PROPERTY = {
  id: "PT-2025-0417",
  title: "3 BHK Premium Apartment in New Town",
  location: "New Town, Kolkata, West Bengal",
  price: "₹78 Lakh",
  pricePerSqft: "₹5,379 / Sq.Ft",
  badge: "For Sale",
  badgeType: "sale",
  beds: 3,
  baths: 2,
  balconies: 2,
  area: "1450 Sq.Ft",
  carpet: "1180 Sq.Ft",
  floor: "7 of 14",
  facing: "East",
  furnishing: "Semi-Furnished",
  age: "1 Year",
  propertyType: "Apartment",
  status: "Ready to Move",
  postedOn: "Posted 3 days ago",
  description:
    "A beautifully designed 3 BHK apartment located in the heart of New Town, Kolkata. This east-facing unit offers abundant natural light, spacious rooms, and premium fittings throughout. The project features a clubhouse, landscaped gardens, and 24×7 security. Perfect for families looking for a modern, well-connected home close to schools, hospitals, and IT hubs.",
  images: [
    "https://picsum.photos/seed/ptd-hero1/1200/800",
    "https://picsum.photos/seed/ptd-hero2/600/400",
    "https://picsum.photos/seed/ptd-hero3/600/400",
    "https://picsum.photos/seed/ptd-hero4/600/400",
    "https://picsum.photos/seed/ptd-hero5/600/400",
  ],
  amenities: [
    { icon: Car, label: "Covered Parking" },
    { icon: Dumbbell, label: "Gymnasium" },
    { icon: Waves, label: "Swimming Pool" },
    { icon: Trees, label: "Landscaped Garden" },
    { icon: ShieldCheck, label: "24×7 Security" },
    { icon: Zap, label: "Power Backup" },
    { icon: Droplets, label: "24×7 Water Supply" },
    { icon: Building2, label: "Clubhouse" },
  ],
  nearby: [
    { icon: School, label: "Delhi Public School", distance: "1.2 km" },
    { icon: Hospital, label: "Apollo Multispeciality", distance: "2.5 km" },
    { icon: ShoppingBag, label: "City Centre Mall", distance: "1.8 km" },
    { icon: Train, label: "Metro – New Town", distance: "0.8 km" },
    { icon: Utensils, label: "Restaurants & Cafés", distance: "0.5 km" },
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

const AMENITY_ICONS_FALLBACK = Building2;

const PropertyDetails = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const nextImage = () =>
    setActiveImage((i) => (i + 1) % PROPERTY.images.length);
  const prevImage = () =>
    setActiveImage(
      (i) => (i - 1 + PROPERTY.images.length) % PROPERTY.images.length,
    );

  // Spec chips under the header
  const specs = [
    { icon: Bed, label: `${PROPERTY.beds} Beds` },
    { icon: Bath, label: `${PROPERTY.baths} Baths` },
    { icon: Maximize, label: PROPERTY.area },
    { icon: Layers, label: `Floor ${PROPERTY.floor}` },
    { icon: Building2, label: PROPERTY.propertyType },
    { icon: Calendar, label: PROPERTY.status },
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
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);

    // Cleanup timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Show loader for 1 second
  if (loader) {
    return <PageLoader />;
  }

  return (
    <div className="bg-[var(--color-background-soft)] min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ---------- Breadcrumb ---------- */}
        <nav className="text-xs text-[var(--color-text-muted)] mb-4 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-[var(--color-primary)]">
            Home
          </Link>
          <span>/</span>
          <Link to="/buy" className="hover:text-[var(--color-primary)]">
            Buy
          </Link>
          <span>/</span>
          <span className="text-[var(--color-text)] font-semibold">
            {PROPERTY.title}
          </span>
        </nav>

        {/* =========================================================
            TOP: Gallery + Summary
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ---------- Gallery (7/12) ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            {/* Main image */}
            <div className="relative rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] aspect-[4/3] bg-[var(--color-background-muted)]">
              <img
                src={PROPERTY.images[activeImage]}
                alt={PROPERTY.title}
                className="w-full h-full object-cover"
              />

              {/* Badge */}
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-[var(--color-primary)] text-white shadow-[var(--shadow-md)]">
                {PROPERTY.badge}
              </span>

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
                  <Heart
                    className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
                  />
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
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Video / Virtual Tour button */}
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
            <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
              {PROPERTY.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative rounded-[var(--radius-md)] overflow-hidden aspect-square border-2 transition-all duration-200 ${
                    activeImage === i
                      ? "border-[var(--color-primary)] shadow-[var(--shadow-md)]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Video className="w-4 h-4 text-white" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ---------- Summary Card (5/12) ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-lg)] p-6 lg:p-7 lg:sticky lg:top-28">
              {/* Property ID + posted */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                  Property ID: {PROPERTY.id}
                </span>
                <span className="text-[var(--color-text-light)]">
                  {PROPERTY.postedOn}
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-3 text-xl lg:text-2xl font-extrabold text-[var(--color-navy)] leading-snug">
                {PROPERTY.title}
              </h1>

              {/* Location */}
              <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                <MapPin className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                {PROPERTY.location}
              </p>

              {/* Price */}
              <div className="mt-5 pb-5 border-b border-[var(--color-border-light)]">
                <p className="text-3xl font-black text-[var(--color-primary)]">
                  {PROPERTY.price}
                </p>
                <p className="mt-1 text-xs font-semibold text-[var(--color-text-muted)]">
                  {PROPERTY.pricePerSqft} • {PROPERTY.furnishing}
                </p>
              </div>

              {/* Spec chips */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                {specs.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-background-soft)] border border-[var(--color-border-light)]"
                  >
                    <Icon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span className="text-xs font-semibold text-[var(--color-text)] truncate">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-6 space-y-2.5">
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  Contact Agent
                </button>

                <a
                  href={`https://wa.me/${PROPERTY.agent.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[#25D366] hover:brightness-95 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Enquiry
                </a>

                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] bg-[var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:brightness-105 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Site Visit
                </button>
              </div>

              {/* Agent mini card */}
              <div className="mt-6 pt-6 border-t border-[var(--color-border-light)] flex items-center gap-3">
                <img
                  src={PROPERTY.agent.avatar}
                  alt={PROPERTY.agent.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[var(--color-primary-light)]"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[var(--color-navy)] truncate flex items-center gap-1.5">
                    {PROPERTY.agent.name}
                    <BadgeCheck className="w-4 h-4 text-[var(--color-primary)]" />
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] truncate">
                    {PROPERTY.agent.role}
                  </p>
                </div>
                <div className="text-right">
                  <p className="flex items-center gap-1 justify-end text-xs font-bold text-[var(--color-navy)]">
                    <Star className="w-3.5 h-3.5 fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                    {PROPERTY.agent.rating}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">
                    {PROPERTY.agent.deals} deals
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================================================
            LOWER: Details, Amenities, Map, Nearby
            ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
        >
          {/* ---------- Left column (8/12) ---------- */}
          <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            {/* ---------- Overview ---------- */}
            <motion.section
              variants={itemVariants}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 lg:p-8"
            >
              <h2 className="text-lg font-bold text-[var(--color-navy)]">
                Property Overview
              </h2>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
                {[
                  { label: "Property Type", value: PROPERTY.propertyType },
                  { label: "Carpet Area", value: PROPERTY.carpet },
                  { label: "Built-up Area", value: PROPERTY.area },
                  { label: "Floor", value: PROPERTY.floor },
                  { label: "Facing", value: PROPERTY.facing },
                  { label: "Furnishing", value: PROPERTY.furnishing },
                  { label: "Age", value: PROPERTY.age },
                  { label: "Status", value: PROPERTY.status },
                  { label: "Balconies", value: `${PROPERTY.balconies}` },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">
                      {value}
                    </p>
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

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {PROPERTY.amenities.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center gap-2 p-4 rounded-[var(--radius-lg)] bg-[var(--color-background-soft)] border border-[var(--color-border-light)] hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary-light)]/40 transition-colors duration-200"
                  >
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-primary-light)]">
                      <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                    </span>
                    <span className="text-xs font-semibold text-[var(--color-text)]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ---------- Map ---------- */}
            <motion.section
              variants={itemVariants}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 lg:p-8"
            >
              <h2 className="text-lg font-bold text-[var(--color-navy)]">
                Location
              </h2>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                {PROPERTY.location}
              </p>

              {/* Placeholder map — swap for Google Maps / Mapbox iframe */}
              <div className="mt-5 relative rounded-[var(--radius-lg)] overflow-hidden aspect-[16/9] border border-[var(--color-border)] bg-[var(--color-background-muted)]">
                <img
                  src="https://picsum.photos/seed/ptd-map/1200/675"
                  alt="Map"
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

            {/* ---------- Nearby Facilities ---------- */}
            <motion.section
              variants={itemVariants}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 lg:p-8"
            >
              <h2 className="text-lg font-bold text-[var(--color-navy)]">
                Nearby Facilities
              </h2>

              <div className="mt-5 space-y-3">
                {PROPERTY.nearby.map(({ icon: Icon, label, distance }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 p-3.5 rounded-[var(--radius-md)] bg-[var(--color-background-soft)] border border-[var(--color-border-light)]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-[var(--color-primary-light)]">
                        <Icon className="w-4 h-4 text-[var(--color-primary)]" />
                      </span>
                      <span className="text-sm font-semibold text-[var(--color-text)] truncate">
                        {label}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[var(--color-text-muted)] whitespace-nowrap">
                      {distance}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* ---------- Right rail (4/12) ---------- */}
          <div className="lg:col-span-4 space-y-6 lg:space-y-8">
            {/* ---------- Schedule a Visit ---------- */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-md)] p-6"
            >
              <h3 className="text-base font-bold text-[var(--color-navy)]">
                Schedule a Site Visit
              </h3>
              <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">
                Pick a date and our team will confirm within 24 hours.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-5 space-y-3"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] transition-colors"
                />
                <input
                  type="date"
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] transition-all duration-200"
                >
                  Request Visit
                </button>
              </form>
            </motion.div>

            {/* ---------- EMI Calculator teaser ---------- */}
            <motion.div
              variants={itemVariants}
              className="bg-[var(--color-navy)] text-white rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] p-6 relative overflow-hidden"
            >
              <span className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[var(--color-secondary)]/25 blur-3xl" />

              <h3 className="relative text-base font-bold">
                Estimate Your EMI
              </h3>
              <p className="relative mt-1.5 text-xs text-white/70">
                Calculate monthly payments for this property.
              </p>

              <div className="relative mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Loan Amount</span>
                  <span className="font-bold">₹62.4 Lakh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Tenure</span>
                  <span className="font-bold">20 Years</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-white/70">Approx. EMI</span>
                  <span className="text-lg font-black text-[var(--color-secondary)]">
                    ₹52,400
                  </span>
                </div>
              </div>

              <Link
                to="/services/home-loan"
                className="relative mt-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--color-secondary)] hover:text-white transition-colors duration-200 group/emi"
              >
                Get Home Loan Assistance
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/emi:translate-x-1" />
              </Link>
            </motion.div>

            {/* ---------- Verification Badge ---------- */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6"
            >
              <div className="flex items-start gap-4">
                <span className="w-12 h-12 shrink-0 rounded-[var(--radius-md)] bg-[var(--gradient-brand)] flex items-center justify-center shadow-[var(--shadow-primary)]">
                  <ShieldCheck className="w-6 h-6 " />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-navy)]">
                    Verification Available
                  </h3>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                    Get title checks, ownership documentation and legal support
                    for this property.
                  </p>
                  <Link
                    to="/services/verification"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
                  >
                    Request Verification
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyDetails;
