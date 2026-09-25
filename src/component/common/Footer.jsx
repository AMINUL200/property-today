import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Search,
  PlusCircle,
  Calendar,
} from "lucide-react";

const Footer = () => {
  // ---------- Link sections (per your spec) ----------
  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "Buy", url: "/buy" },
    { name: "Sell", url: "/sell" },
    { name: "Rent", url: "/rent" },
    { name: "Land & Plots", url: "/land" },
    { name: "Services", url: "/services" },
    { name: "Contact", url: "/contact" },
  ];

  const propertyTypes = [
    { name: "Residential", url: "/buy/residential" },
    { name: "Commercial", url: "/commercial" },
    { name: "Land", url: "/land" },
    { name: "Plots", url: "/buy/plots" },
    { name: "New Projects", url: "/new-projects" },
  ];

  const locations = [
    { name: "Mumbai", url: "/locations/mumbai" },
    { name: "Bengaluru", url: "/locations/bangalore" },
    { name: "Delhi", url: "/locations/delhi" },
    { name: "Chennai", url: "/locations/chennai" },
    { name: "Kolkata", url: "/locations/kolkata" },
  ];

  // ---------- Main CTA buttons ----------
  const mainButtons = [
    {
      label: "Find Property",
      url: "/search",
      icon: Search,
      style:
        "bg-gold-gradient text-[var(--color-navy)] shadow-[var(--shadow-gold)] hover:brightness-105",
    },
    {
      label: "List Your Property",
      url: "/list-property",
      icon: PlusCircle,
      style:
        "bg-[var(--color-primary)] text-white shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)]",
    },
    {
      label: "Schedule a Site Visit",
      url: "/schedule-visit",
      icon: Calendar,
      style:
        "bg-white/10 text-white border border-white/25 hover:bg-white hover:text-[var(--color-navy)]",
    },
  ];

  return (
    <footer className="bg-[var(--color-navy)] text-white">
      {/* =========================================================
          Main Buttons strip
          ========================================================= */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            {mainButtons.map(({ label, url, icon: Icon, style }) => (
              <Link
                key={label}
                to={url}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold rounded-[var(--radius-md)] hover:-translate-y-0.5 transition-all duration-200 ${style}`}
              >
                <Icon className="w-4 h-4" />
                <span className="uppercase tracking-wide">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================
          Main Footer
          ========================================================= */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* ---------- Brand + Contact (wider on desktop) ---------- */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary)] flex items-center justify-center shadow-[var(--shadow-primary)]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="leading-none">
                <h2 className="text-lg font-extrabold tracking-tight">
                  Property<span className="text-[var(--color-secondary)]">today</span>
                </h2>
                <p className="text-[10px] font-medium text-white/60 tracking-wide">
                  REAL ESTATE
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-base font-serif italic text-white/80 max-w-xs leading-relaxed">
              "Your Next Move, Today."
            </p>

            {/* Get In Touch */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-secondary)] mb-4">
                Get In Touch
              </h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-[var(--color-secondary)] shrink-0" />
                  <span>123 Street, New York, USA</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[var(--color-secondary)] shrink-0" />
                  <a
                    href="tel:+01234567890"
                    className="hover:text-[var(--color-secondary)] transition-colors"
                  >
                    +012 345 67890
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[var(--color-secondary)] shrink-0" />
                  <a
                    href="mailto:info@example.com"
                    className="hover:text-[var(--color-secondary)] transition-colors"
                  >
                    info@example.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { icon: <Facebook className="w-4 h-4" />, url: "#", label: "Facebook" },
                { icon: <Twitter className="w-4 h-4" />, url: "#", label: "Twitter" },
                { icon: <Instagram className="w-4 h-4" />, url: "#", label: "Instagram" },
                { icon: <Linkedin className="w-4 h-4" />, url: "#", label: "LinkedIn" },
                { icon: <Youtube className="w-4 h-4" />, url: "#", label: "YouTube" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ---------- Quick Links ---------- */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-secondary)] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.url}
                    className="text-white/70 hover:text-[var(--color-secondary)] transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]/40 group-hover:bg-[var(--color-secondary)] transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Property Types ---------- */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-secondary)] mb-4">
              Property Types
            </h3>
            <ul className="space-y-2.5 text-sm">
              {propertyTypes.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.url}
                    className="text-white/70 hover:text-[var(--color-secondary)] transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]/40 group-hover:bg-[var(--color-secondary)] transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Locations ---------- */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-secondary)] mb-4">
              Locations
            </h3>
            <ul className="space-y-2.5 text-sm">
              {locations.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.url}
                    className="text-white/70 hover:text-[var(--color-secondary)] transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]/40 group-hover:bg-[var(--color-secondary)] transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================================
          Bottom Bar
          ========================================================= */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-white">Propertytoday</span>. All
              Rights Reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link
                to="/"
                className="hover:text-[var(--color-secondary)] transition-colors"
              >
                Home
              </Link>
              <Link
                to="/cookies"
                className="hover:text-[var(--color-secondary)] transition-colors"
              >
                Cookies
              </Link>
              <Link
                to="/help"
                className="hover:text-[var(--color-secondary)] transition-colors"
              >
                Help
              </Link>
              <Link
                to="/faqs"
                className="hover:text-[var(--color-secondary)] transition-colors"
              >
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;