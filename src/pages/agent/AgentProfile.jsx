import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  BadgeCheck,
  Star,
  Building2,
  Users,
  Calendar,
  Award,
  TrendingUp,
  CheckCircle2,
  Globe,
  Clock,
  Heart,
  Share2,
  ArrowRight,
  Briefcase,
  Languages,
  Sparkles,
  Eye,
  HandCoins,
  Home,
  Pencil,
} from "lucide-react";

const AgentProfile = () => {
  /* =========================================================
     DUMMY AGENT DATA
     Swap with real data from your API.
     ========================================================= */
  const agent = {
    id: "AGT-2025-0042",
    name: "Ankit Sengupta",
    role: "Senior Property Agent",
    agency: "Sengupta Realty Partners",
    location: "New Town, Kolkata",
    city: "Kolkata",
    experience: "12 Years",
    languages: ["English", "Hindi", "Bengali"],
    phone: "+91 98300 12345",
    whatsapp: "+919830012345",
    email: "ankit@propertytoday.com",
    website: "senguptarealty.in",
    avatar: "https://i.pravatar.cc/240?img=15",
    cover:
      "https://picsum.photos/seed/agent-cover-ankit/1600/500",
    verified: true,
    rating: 4.9,
    reviews: 142,
    responseTime: "Under 2 hours",
    bio: "Ankit is a senior property consultant with over a decade of experience helping families and businesses find the right property across Kolkata. He specialises in premium residential apartments, luxury villas, and commercial spaces in New Town, Salt Lake, and Rajarhat. His approach is built on clear communication, transparent pricing, and long-term client relationships.",
    specialities: [
      "Residential Apartments",
      "Luxury Villas",
      "Commercial Spaces",
      "Investment Advisory",
    ],
    stats: [
      { label: "Listings", value: "48", icon: Building2 },
      { label: "Deals Closed", value: "186", icon: HandCoins },
      { label: "Active Clients", value: "24", icon: Users },
      { label: "Years Experience", value: "12", icon: Award },
    ],
  };

  /* ---------- Current listings preview ---------- */
  const listings = [
    {
      id: "PT-2025-0417",
      title: "3 BHK Premium Apartment",
      location: "New Town, Kolkata",
      price: "₹85 Lakh",
      image: "https://picsum.photos/seed/agent-listing-1/600/400",
      badge: "For Sale",
      badgeType: "sale",
      beds: 3,
      baths: 2,
      area: "1450 Sq.Ft",
    },
    {
      id: "PT-2025-0418",
      title: "2 BHK Furnished Flat",
      location: "Salt Lake, Kolkata",
      price: "₹32,000 / month",
      image: "https://picsum.photos/seed/agent-listing-2/600/400",
      badge: "For Rent",
      badgeType: "rent",
      beds: 2,
      baths: 2,
      area: "1080 Sq.Ft",
    },
    {
      id: "PT-2025-0419",
      title: "Luxury 4 BHK Villa",
      location: "Rajarhat, Kolkata",
      price: "₹2.4 Cr",
      image: "https://picsum.photos/seed/agent-listing-3/600/400",
      badge: "For Sale",
      badgeType: "sale",
      beds: 4,
      baths: 4,
      area: "2850 Sq.Ft",
    },
  ];

  /* ---------- Reviews ---------- */
  const reviews = [
    {
      id: 1,
      name: "Priya Nair",
      role: "Home Buyer",
      rating: 5,
      date: "2 weeks ago",
      text: "Ankit was extremely patient and guided us through every step of buying our first home. He explained the documentation clearly and never rushed us. Highly recommended.",
      avatar: "https://i.pravatar.cc/80?img=45",
    },
    {
      id: 2,
      name: "Amit Verma",
      role: "Property Seller",
      rating: 5,
      date: "1 month ago",
      text: "Listed my commercial property with him and got genuine enquiries within a week. Very professional and transparent throughout the process.",
      avatar: "https://i.pravatar.cc/80?img=33",
    },
    {
      id: 3,
      name: "Sneha Iyer",
      role: "Tenant",
      rating: 5,
      date: "1 month ago",
      text: "Found a great rental through Ankit. He coordinated the site visit quickly and helped with the lease agreement too. Smooth experience overall.",
      avatar: "https://i.pravatar.cc/80?img=48",
    },
  ];

  const [activeTab, setActiveTab] = useState("listings");

  /* ---------- Badge styles ---------- */
  const badgeStyles = {
    sale: "bg-[var(--color-primary)] text-white",
    rent: "bg-[var(--color-info)] text-white",
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <div className="space-y-6">
      {/* =========================================================
          COVER + PROFILE HEADER
          ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-[var(--radius-2xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-md)] overflow-hidden"
      >
        {/* Cover image */}
        <div className="relative h-40 sm:h-52 lg:h-60 overflow-hidden">
          <img
            src={agent.cover}
            alt=""
            className="w-full h-full object-cover"
          />
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(7,29,73,0.55) 0%, rgba(7,29,73,0.35) 45%, rgba(200,16,30,0.35) 100%)",
            }}
          />

          {/* Edit button top-right */}
          <Link
            to="/agent/settings/profile"
            className="absolute top-4 right-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-[var(--radius-md)] text-white bg-white/15 border border-white/25 backdrop-blur-sm hover:bg-white hover:text-[var(--color-navy)] transition-all duration-200"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit Profile
          </Link>
        </div>

        {/* Profile info block */}
        <div className="relative px-5 sm:px-8 pb-6 lg:pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end gap-5 lg:gap-8 -mt-12 lg:-mt-16">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full p-1 bg-white shadow-[var(--shadow-xl)]">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* Verified badge */}
              {agent.verified && (
                <span className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center ring-3 ring-white shadow-[var(--shadow-primary)]">
                  <BadgeCheck className="w-4 h-4 text-white" />
                </span>
              )}
            </div>

            {/* Name + Meta */}
            <div className="flex-1 min-w-0 lg:pb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy leading-tight">
                  {agent.name}
                </h1>

                {agent.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--color-success-light)] text-[var(--color-success)] text-[10px] font-extrabold uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Agent
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm font-semibold text-primary">
                {agent.role} · {agent.agency}
              </p>

              <div className="mt-3 flex items-center flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  {agent.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-primary" />
                  {agent.experience} experience
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[var(--color-secondary-dark)] fill-[var(--color-secondary)]" />
                  <span className="font-bold text-navy">{agent.rating}</span>
                  ({agent.reviews} reviews)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  Responds {agent.responseTime}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2 lg:pb-2">
              <a
                href={`tel:${agent.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>

              <a
                href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[#25D366] hover:brightness-95 hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>

              <Link
                to="/agent/messages"
                className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-[var(--radius-md)] text-navy border border-[var(--color-border)] hover:border-primary hover:text-primary transition-colors"
                aria-label="Message agent"
              >
                <Mail className="w-4 h-4" />
              </Link>

              <button
                type="button"
                aria-label="Share profile"
                className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-[var(--radius-md)] text-navy border border-[var(--color-border)] hover:border-primary hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* =========================================================
          STATS STRIP
          ========================================================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {agent.stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="property-card p-5 flex items-center gap-4"
            >
              <span className="w-12 h-12 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </span>
              <div className="min-w-0">
                <p className="text-2xl font-black text-navy leading-none">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-muted truncate">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* =========================================================
          MAIN CONTENT: TABS
          ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ---------- Left: Main Content (2/3) ---------- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] overflow-hidden">
            <div className="flex items-center border-b border-[var(--color-border-light)] overflow-x-auto custom-scrollbar">
              {[
                { id: "listings", label: "Listings", icon: Building2 },
                { id: "about", label: "About", icon: Users },
                { id: "reviews", label: "Reviews", icon: Star },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-4 text-sm font-bold whitespace-nowrap transition-all duration-200 border-b-2 ${
                      isActive
                        ? "text-primary border-[var(--color-primary)] bg-[var(--color-primary-light)]/30"
                        : "text-muted border-transparent hover:text-navy"
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="p-5 sm:p-6">
              {/* ---------- LISTINGS TAB ---------- */}
              {activeTab === "listings" && (
                <motion.div
                  key="listings"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {listings.map((listing) => (
                    <Link
                      key={listing.id}
                      to={`/property/${listing.id}`}
                      className="group flex flex-col sm:flex-row gap-4 p-4 rounded-[var(--radius-lg)] bg-[var(--color-background-soft)] border border-[var(--color-border-light)] hover:border-primary/30 hover:shadow-[var(--shadow-md)] transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative w-full sm:w-40 shrink-0 rounded-[var(--radius-md)] overflow-hidden aspect-[4/3] sm:aspect-square">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span
                          className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded-full shadow-sm ${badgeStyles[listing.badgeType]}`}
                        >
                          {listing.badge}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="text-base font-bold text-navy group-hover:text-primary transition-colors leading-snug">
                          {listing.title}
                        </h3>
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                          {listing.location}
                        </p>
                        <p className="mt-2 text-lg font-extrabold text-primary">
                          {listing.price}
                        </p>

                        <div className="mt-3 flex items-center gap-4 text-xs text-text-secondary">
                          <span className="inline-flex items-center gap-1">
                            <Home className="w-3.5 h-3.5 text-muted" />
                            {listing.beds} Beds
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-muted" />
                            {listing.baths} Baths
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-muted" />
                            {listing.area}
                          </span>
                        </div>
                      </div>

                      <span className="hidden sm:flex items-center self-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </Link>
                  ))}

                  <Link
                    to="/agent/listings/all"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-[var(--radius-md)] text-navy border border-[var(--color-border)] hover:border-primary hover:text-primary transition-colors"
                  >
                    View All {agent.stats[0].value} Listings
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )}

              {/* ---------- ABOUT TAB ---------- */}
              {activeTab === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-base font-bold text-navy mb-3">
                      About {agent.name}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {agent.bio}
                    </p>
                  </div>

                  {/* Specialities */}
                  <div>
                    <h3 className="text-base font-bold text-navy mb-3">
                      Specialities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialities.map((spec) => (
                        <span
                          key={spec}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                        >
                          <Sparkles className="w-3 h-3" />
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 className="text-base font-bold text-navy mb-3">
                      Languages Spoken
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.languages.map((lang) => (
                        <span
                          key={lang}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-background-muted)] text-navy text-xs font-semibold"
                        >
                          <Languages className="w-3 h-3 text-primary" />
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Trust points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[var(--color-border-light)]">
                    {[
                      { icon: BadgeCheck, text: "ID Verified" },
                      { icon: CheckCircle2, text: "Background Checked" },
                      { icon: Clock, text: `Responds ${agent.responseTime}` },
                      { icon: Award, text: "Top Rated Agent" },
                    ].map(({ icon: Icon, text }) => (
                      <div
                        key={text}
                        className="flex items-center gap-2 p-3 rounded-[var(--radius-md)] bg-[var(--color-background-soft)] border border-[var(--color-border-light)]"
                      >
                        <Icon className="w-4 h-4 text-[var(--color-success)] shrink-0" />
                        <span className="text-xs font-semibold text-text-secondary">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ---------- REVIEWS TAB ---------- */}
              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-background-soft)] border border-[var(--color-border-light)]"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div>
                              <p className="text-sm font-bold text-navy">
                                {review.name}
                              </p>
                              <p className="text-[11px] text-muted">
                                {review.role}
                              </p>
                            </div>
                            <span className="text-[11px] text-muted">
                              {review.date}
                            </span>
                          </div>

                          {/* Stars */}
                          <div className="mt-2 flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < review.rating
                                    ? "fill-[var(--color-secondary)] text-[var(--color-secondary)]"
                                    : "text-[var(--color-border-dark)]"
                                }`}
                              />
                            ))}
                          </div>

                          <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                            "{review.text}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Link
                    to="/agent/reviews"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-[var(--radius-md)] text-navy border border-[var(--color-border)] hover:border-primary hover:text-primary transition-colors"
                  >
                    View All {agent.reviews} Reviews
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* ---------- Right: Sidebar (1/3) ---------- */}
        <div className="space-y-6">
          {/* ---------- Rating Card ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6"
          >
            <div className="text-center">
              <p className="text-5xl font-black text-navy leading-none">
                {agent.rating}
              </p>
              <div className="mt-3 flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(agent.rating)
                        ? "fill-[var(--color-secondary)] text-[var(--color-secondary)]"
                        : "text-[var(--color-border-dark)]"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted">
                Based on{" "}
                <span className="font-bold text-navy">{agent.reviews}</span>{" "}
                verified reviews
              </p>
            </div>

            {/* Rating breakdown bars */}
            <div className="mt-6 space-y-3">
              {[
                { stars: 5, pct: 92 },
                { stars: 4, pct: 6 },
                { stars: 3, pct: 2 },
                { stars: 2, pct: 0 },
                { stars: 1, pct: 0 },
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-navy w-6">
                    {row.stars}★
                  </span>
                  <div className="flex-1 h-1.5 bg-[var(--color-background-muted)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-secondary)] rounded-full"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-muted w-8 text-right">
                    {row.pct}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ---------- Contact Card ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6"
          >
            <h3 className="text-base font-bold text-navy mb-4">
              Contact Details
            </h3>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="w-9 h-9 shrink-0 rounded-[var(--radius-md)] bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </span>
                <a
                  href={`tel:${agent.phone.replace(/\s/g, "")}`}
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  {agent.phone}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-9 h-9 shrink-0 rounded-[var(--radius-md)] bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </span>
                <a
                  href={`mailto:${agent.email}`}
                  className="text-text-secondary hover:text-primary transition-colors truncate"
                >
                  {agent.email}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-9 h-9 shrink-0 rounded-[var(--radius-md)] bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </span>
                <span className="text-text-secondary">{agent.location}</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-9 h-9 shrink-0 rounded-[var(--radius-md)] bg-primary/10 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-primary" />
                </span>
                <a
                  href={`https://${agent.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary transition-colors truncate"
                >
                  {agent.website}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-9 h-9 shrink-0 rounded-[var(--radius-md)] bg-primary/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </span>
                <span className="text-text-secondary">
                  Responds in{" "}
                  <span className="font-bold text-navy">
                    {agent.responseTime}
                  </span>
                </span>
              </li>
            </ul>
          </motion.div>

          {/* ---------- Quick Stats Card ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-navy relative rounded-[var(--radius-xl)] overflow-hidden p-6 text-white"
          >
            <span className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />

            <h3 className="relative text-base font-bold">
              Agent Snapshot
            </h3>

            <div className="relative mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Member Since</span>
                <span className="font-bold">Jan 2013</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Speciality Focus</span>
                <span className="font-bold text-right truncate max-w-[55%]">
                  Premium Residential
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Areas Covered</span>
                <span className="font-bold text-right max-w-[55%]">
                  New Town, Salt Lake, Rajarhat
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-white/70">Verified</span>
                <span className="inline-flex items-center gap-1 font-bold text-[var(--color-secondary)]">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Yes
                </span>
              </div>
            </div>

            <Link
              to="/agent/settings/profile"
              className="relative mt-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--color-secondary)] hover:text-white transition-colors"
            >
              Update Profile
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* ---------- Share CTA ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 text-center"
          >
            <span className="w-12 h-12 mx-auto rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center">
              <Share2 className="w-5 h-5 text-[var(--color-secondary-dark)]" />
            </span>

            <h3 className="mt-4 text-sm font-bold text-navy">
              Share Your Profile
            </h3>
            <p className="mt-1 text-xs text-muted leading-relaxed">
              Let clients find you and get in touch directly.
            </p>

            <button
              type="button"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Copy Profile Link
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;