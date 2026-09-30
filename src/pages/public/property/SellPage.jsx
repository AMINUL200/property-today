import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  Check,
  ChevronRight,
  FileCheck2,
  HandCoins,
  Home,
  IndianRupee,
  KeyRound,
  Landmark,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRoundCheck,
  Users,
  Wrench,
} from "lucide-react";
import PageLoader from "../../../component/common/PageLoader";

/* =========================================================
   SELL PAGE
   This is a seller-focused page. Instead of a listings grid,
   it guides property owners through:
     1. Why sell with Propertytoday
     2. Two clear selling paths (Sell Direct / Rent-Out)
     3. A step-by-step selling process
     4. A quick listing form
     5. Trust + FAQ + final CTA
   ========================================================= */
const SellPage = () => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoader(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loader) return <PageLoader />;

  /* ---------- Selling benefits ---------- */
  const benefits = [
    {
      icon: BadgeCheck,
      title: "Verified Buyer Network",
      desc: "Connect with genuine buyers actively searching in your area.",
    },
    {
      icon: TrendingUp,
      title: "Competitive Pricing Support",
      desc: "Get guidance on pricing your property based on market trends.",
    },
    {
      icon: Camera,
      title: "Professional Listing",
      desc: "Well-presented property listings that highlight what matters.",
    },
    {
      icon: FileCheck2,
      title: "Documentation Assistance",
      desc: "Support with the paperwork involved in your property sale.",
    },
    {
      icon: UserRoundCheck,
      title: "Dedicated Assistance",
      desc: "Get guidance from our team from listing to final handover.",
    },
    {
      icon: ShieldCheck,
      title: "Transparent Process",
      desc: "Clear communication and straightforward steps throughout.",
    },
  ];

  /* ---------- Two selling paths ---------- */
  const sellPaths = [
    {
      id: "sell",
      icon: HandCoins,
      badge: "Sell Your Property",
      title: "Sell Directly to a Buyer",
      desc: "List your property for sale and connect with buyers looking for homes, apartments, villas, land or commercial spaces.",
      features: [
        "Reach verified buyer enquiries",
        "Support with pricing and presentation",
        "Documentation and handover assistance",
      ],
      cta: "Sell Your Property",
      path: "/list-property",
      accent: "primary",
    },
    {
      id: "rent-out",
      icon: KeyRound,
      badge: "Rent / Lease Your Property",
      title: "Rent or Lease Your Property",
      desc: "List your property for rent or lease and connect with tenants, families and businesses looking for suitable spaces.",
      features: [
        "Find residential and commercial tenants",
        "Coordinate site visits and enquiries",
        "Support with lease documentation",
      ],
      cta: "List For Rent / Lease",
      path: "/list-property/rent",
      accent: "navy",
    },
  ];

  /* ---------- Process steps ---------- */
  const steps = [
    {
      id: "01",
      icon: Home,
      title: "Share Property Details",
      desc: "Tell us about your property — type, location, size, expected price and any other details.",
    },
    {
      id: "02",
      icon: Camera,
      title: "Listing Preparation",
      desc: "We help present your property clearly so it reaches the right buyers or tenants.",
    },
    {
      id: "03",
      icon: Users,
      title: "Connect With Interested Parties",
      desc: "We coordinate buyer or tenant enquiries and help arrange site visits.",
    },
    {
      id: "04",
      icon: FileCheck2,
      title: "Documentation & Handover",
      desc: "Get assistance with the paperwork and steps involved in finalising the deal.",
    },
  ];

  /* ---------- Trust strip ---------- */
  const trustPoints = [
    { icon: ShieldCheck, label: "Verified Enquiries" },
    { icon: BadgeCheck, label: "Transparent Process" },
    { icon: UserRoundCheck, label: "Professional Assistance" },
    { icon: FileCheck2, label: "Documentation Support" },
  ];

  return (
    <div className="bg-[var(--color-background-soft)] min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ---------- Breadcrumb ---------- */}
        <nav className="text-xs text-[var(--color-text-muted)] mb-5 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-[var(--color-primary)]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[var(--color-text)] font-semibold">Sell</span>
        </nav>

        {/* =========================================================
            HERO — Navy panel with primary CTA
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-[var(--color-navy)] rounded-[var(--radius-2xl)] overflow-hidden"
        >
          {/* Background image */}
          <img
            src="/image/sell/sell-hero.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(7,29,73,0.96) 0%, rgba(7,29,73,0.90) 45%, rgba(200,16,30,0.75) 100%)",
            }}
          />

          {/* Ambient glows */}
          <span className="pointer-events-none absolute -top-32 -right-24 w-96 h-96 rounded-full bg-[var(--color-secondary)]/15 blur-3xl" />
          <span className="pointer-events-none absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-[var(--color-primary)]/30 blur-3xl" />

          {/* Dot texture */}
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />

          <div className="relative p-8 sm:p-12 lg:p-16">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] text-xs font-bold tracking-widest uppercase">
                <HandCoins className="w-3.5 h-3.5" />
                Sell With Propertytoday
              </span>

              <h1 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Sell or Rent Out Your Property{" "}
                <span className="text-[var(--color-secondary)]">
                  With Confidence
                </span>
              </h1>

              <p className="mt-5 text-base lg:text-lg text-white/75 leading-relaxed max-w-2xl">
                List your property with Propertytoday and connect with genuine
                buyers and tenants. From pricing support to documentation
                assistance, our team helps you move forward with clarity.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/list-property"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <HandCoins className="w-4 h-4" />
                  List Your Property
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <a
                  href="tel:+01234567890"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-white/10 border border-white/25 backdrop-blur-sm hover:bg-white hover:text-[var(--color-navy)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  Talk to an Expert
                </a>
              </div>

              {/* Trust points */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {trustPoints.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white/80"
                  >
                    <span className="w-5 h-5 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center">
                      <Icon className="w-3 h-3 text-[var(--color-secondary)]" />
                    </span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            WHY SELL WITH PROPERTYTODAY
            ========================================================= */}
        <section className="mt-16 lg:mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              Why Propertytoday
            </span>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
              Why{" "}
              <span className="text-[var(--color-primary)]">Propertytoday?</span>
            </h2>

            <p className="mt-4 text-base text-[var(--color-text-muted)]">
              Making every property decision simpler, clearer and more confident.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group relative bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 hover:border-[var(--color-primary)]/25 transition-all duration-300 p-7 overflow-hidden"
              >
                <span className="w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center bg-[var(--color-primary-light)] group-hover:bg-[var(--color-primary)] transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[var(--color-primary)] group-hover:text-white transition-colors duration-300" />
                </span>

                <h3 className="mt-5 text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                  {title}
                </h3>

                <span className="mt-3 block h-0.5 w-10 rounded-full bg-[var(--color-secondary)]/60 transition-all duration-300 group-hover:w-16" />

                <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {desc}
                </p>

                <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 group-hover:scale-x-100 bg-[var(--color-primary)] transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* =========================================================
            TWO SELLING PATHS
            ========================================================= */}
        <section className="mt-16 lg:mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              Choose Your Path
            </span>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
              How Do You Want to{" "}
              <span className="text-[var(--color-primary)]">List It?</span>
            </h2>

            <p className="mt-4 text-base text-[var(--color-text-muted)]">
              Sell directly to a buyer, or list your property for rent and lease.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {sellPaths.map((path) => {
              const PathIcon = path.icon;
              const isPrimary = path.accent === "primary";

              return (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                  className="group relative flex flex-col bg-white rounded-[var(--radius-2xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1.5 transition-all duration-300 p-8 lg:p-10 overflow-hidden"
                >
                  {/* Top accent bar */}
                  <span
                    className={`absolute top-0 left-0 h-1.5 w-full ${
                      isPrimary
                        ? "bg-[var(--gradient-primary)]"
                        : "bg-[var(--gradient-navy)]"
                    }`}
                  />

                  {/* Corner glow */}
                  <span
                    className={`pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                      isPrimary
                        ? "bg-[var(--color-primary)]"
                        : "bg-[var(--color-navy)]"
                    }`}
                  />

                  {/* Icon + badge */}
                  <div className="relative flex items-center justify-between">
                    <span
                      className={`w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center shadow-[var(--shadow-md)] ${
                        isPrimary
                          ? "bg-[var(--color-primary)] shadow-[var(--shadow-primary)]"
                          : "bg-[var(--color-navy)]"
                      }`}
                    >
                      <PathIcon className="w-7 h-7 text-white" />
                    </span>

                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                        isPrimary
                          ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/25"
                          : "bg-[var(--color-navy)]/10 text-[var(--color-navy)] border border-[var(--color-navy)]/25"
                      }`}
                    >
                      {path.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="relative mt-6 font-serif text-2xl lg:text-3xl font-bold text-[var(--color-navy)] leading-tight">
                    {path.title}
                  </h3>

                  {/* Divider */}
                  <span
                    className={`mt-4 block h-0.5 w-12 rounded-full ${
                      isPrimary
                        ? "bg-[var(--color-primary)]"
                        : "bg-[var(--color-navy)]"
                    }`}
                  />

                  {/* Description */}
                  <p className="relative mt-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {path.desc}
                  </p>

                  {/* Feature list */}
                  <ul className="relative mt-6 space-y-3 flex-1">
                    {path.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span
                          className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center mt-0.5 ${
                            isPrimary
                              ? "bg-[var(--color-primary-light)]"
                              : "bg-[var(--color-navy)]/10"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              isPrimary
                                ? "text-[var(--color-primary)]"
                                : "text-[var(--color-navy)]"
                            }`}
                            strokeWidth={3}
                          />
                        </span>
                        <span className="text-sm font-semibold text-[var(--color-text)]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={path.path}
                    className={`relative mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold rounded-[var(--radius-md)] transition-all duration-200 hover:-translate-y-0.5 ${
                      isPrimary
                        ? "text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)]"
                        : "text-white bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)]"
                    }`}
                  >
                    {path.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            PROCESS
            ========================================================= */}
        <section className="mt-16 lg:mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              How It Works
            </span>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
              Your Selling Journey,{" "}
              <span className="text-[var(--color-primary)]">Made Simple</span>
            </h2>

            <p className="mt-4 text-base text-[var(--color-text-muted)]">
              From listing to handover, we're with you at every step.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="relative bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6"
                >
                  {/* Step number */}
                  <span className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[var(--color-navy)] text-white text-xs font-extrabold flex items-center justify-center shadow-[var(--shadow-md)]">
                    {step.id}
                  </span>

                  <span className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center bg-[var(--color-primary-light)]">
                    <StepIcon className="w-6 h-6 text-[var(--color-primary)]" />
                  </span>

                  <h3 className="mt-5 text-base font-bold text-[var(--color-navy)] leading-snug">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            QUICK LISTING FORM + CONTACT
            ========================================================= */}
        <section className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ---------- Form (7/12) ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-[var(--radius-2xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-md)] p-6 sm:p-8 lg:p-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Quick Start
              </span>

              <h2 className="mt-4 font-serif text-2xl lg:text-3xl font-bold text-[var(--color-navy)]">
                Tell Us About Your Property
              </h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Share a few details and our team will get in touch.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-6 space-y-4"
              >
                {/* Property type + listing intent */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                      Property Type
                    </label>
                    <select className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors appearance-none cursor-pointer">
                      <option>Apartment</option>
                      <option>Villa</option>
                      <option>Independent House</option>
                      <option>Plot / Land</option>
                      <option>Office Space</option>
                      <option>Shop / Showroom</option>
                      <option>Warehouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                      I Want To
                    </label>
                    <select className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors appearance-none cursor-pointer">
                      <option>Sell My Property</option>
                      <option>Rent / Lease My Property</option>
                    </select>
                  </div>
                </div>

                {/* Location + Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)]" />
                      <input
                        type="text"
                        placeholder="Area, City"
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                      Built-up Area (Sq.Ft)
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)]" />
                      <input
                        type="text"
                        placeholder="e.g. 1450"
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Expected price */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                    Expected Price / Rent
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)]" />
                    <input
                      type="text"
                      placeholder="e.g. ₹85 Lakh or ₹25,000 / month"
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Full name"
                      className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98300 12345"
                      className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                    Additional Details (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us anything else about your property..."
                    className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors resize-none outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  Submit Property Details
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-xs text-center text-[var(--color-text-muted)]">
                  Our team will reach out within 24 hours.
                </p>
              </form>
            </div>
          </motion.div>

          {/* ---------- Contact rail (5/12) ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Talk to expert card */}
            <div className="relative bg-[var(--color-navy)] text-white rounded-[var(--radius-2xl)] shadow-[var(--shadow-xl)] p-8 overflow-hidden">
              <span className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />

              <span className="relative w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 flex items-center justify-center">
                <Phone className="w-6 h-6 text-[var(--color-secondary)]" />
              </span>

              <h3 className="relative mt-5 font-serif text-xl font-bold">
                Prefer to Talk First?
              </h3>
              <p className="relative mt-2 text-sm text-white/70 leading-relaxed">
                Speak with our team to understand the process, pricing and how
                we can help you sell or rent out your property.
              </p>

              <div className="relative mt-6 space-y-3">
                <a
                  href="tel:+01234567890"
                  className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span className="w-9 h-9 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-[var(--color-secondary)]" />
                  </span>
                  <div>
                    <p className="text-xs text-white/60">Call Now</p>
                    <p className="text-sm font-bold">+012 345 67890</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919830012345"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span className="w-9 h-9 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  </span>
                  <div>
                    <p className="text-xs text-white/60">WhatsApp</p>
                    <p className="text-sm font-bold">+91 98300 12345</p>
                  </div>
                </a>

                <a
                  href="mailto:sell@propertytoday.com"
                  className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span className="w-9 h-9 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center">
                    <Landmark className="w-4 h-4 text-[var(--color-secondary)]" />
                  </span>
                  <div>
                    <p className="text-xs text-white/60">Email</p>
                    <p className="text-sm font-bold">sell@propertytoday.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick answers card */}
            <div className="bg-white rounded-[var(--radius-2xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-7">
              <h3 className="text-base font-bold text-[var(--color-navy)]">
                Quick Answers
              </h3>

              <ul className="mt-5 space-y-4">
                {[
                  {
                    q: "Is listing free?",
                    a: "Yes — you can list your property at no upfront cost.",
                  },
                  {
                    q: "How long does it take?",
                    a: "Timelines vary based on property type, pricing and market demand.",
                  },
                  {
                    q: "Can I edit my listing later?",
                    a: "Yes — you can update details, price and photos at any time.",
                  },
                ].map(({ q, a }) => (
                  <li
                    key={q}
                    className="pb-4 border-b border-[var(--color-border-light)] last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-bold text-[var(--color-navy)]">
                      {q}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                      {a}
                    </p>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors group"
              >
                More questions? Contact us
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* =========================================================
            FINAL CTA
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-16 lg:mt-20"
        >
          <div className="relative bg-[var(--color-navy)] rounded-[var(--radius-2xl)] overflow-hidden p-8 lg:p-14">
            <span className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />
            <span className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[var(--color-primary)]/25 blur-3xl" />

            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Ready to List Your{" "}
                <span className="text-[var(--color-secondary)]">Property?</span>
              </h2>

              <p className="mt-4 text-sm lg:text-base text-white/75 leading-relaxed">
                Sell directly, rent it out, or just talk to our team to
                understand your options. We're here to help you take the next
                step.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/list-property"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <HandCoins className="w-4 h-4" />
                  List Your Property
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] bg-[var(--color-secondary)] shadow-[var(--shadow-gold)] hover:bg-[var(--color-secondary-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SellPage;