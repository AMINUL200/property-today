import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  User,
  Building2,
  ChevronDown,
  CheckCircle2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
} from "lucide-react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const subjects = [
    "General Enquiry",
    "Buying a Property",
    "Selling a Property",
    "Renting a Property",
    "Property Verification",
    "Home Loan Assistance",
    "Investment Advisory",
    "Other",
  ];

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  // ---------- Contact cards ----------
  const contactCards = [
    {
      id: "address",
      icon: MapPin,
      label: "Office Address",
      lines: ["123 Street, New York, USA", "Mon – Sat, 9:00 AM – 7:00 PM"],
      action: null,
      color: "var(--color-primary)",
    },
    {
      id: "phone",
      icon: Phone,
      label: "Phone",
      lines: ["+012 345 67890", "+012 345 67891"],
      action: { label: "Call Now", href: "tel:+01234567890" },
      color: "var(--color-navy)",
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      lines: ["+91 98300 12345", "Quick responses, 24×7"],
      action: { label: "Chat on WhatsApp", href: "https://wa.me/919830012345" },
      color: "#25D366",
    },
    {
      id: "email",
      icon: Mail,
      label: "Email",
      lines: ["info@propertytoday.com", "support@propertytoday.com"],
      action: { label: "Send Email", href: "mailto:info@propertytoday.com" },
      color: "var(--color-secondary-dark)",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="bg-[var(--color-background-soft)] min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ---------- Breadcrumb ---------- */}
        <nav className="text-xs text-[var(--color-text-muted)] mb-4 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-[var(--color-primary)]">Home</Link>
          <span>/</span>
          <span className="text-[var(--color-text)] font-semibold">Contact</span>
        </nav>

        {/* =========================================================
            Header
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            Get In Touch
          </span>

          <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
            We'd Love to{" "}
            <span className="text-[var(--color-primary)]">Hear From You</span>
          </h1>

          <p className="mt-4 text-base text-[var(--color-text-muted)]">
            Whether you're buying, selling, renting or investing, our team is
            here to help you take the next step.
          </p>
        </motion.div>

        {/* =========================================================
            Contact cards
            ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {contactCards.map(({ id, icon: Icon, label, lines, action, color }) => (
            <motion.div
              key={id}
              variants={itemVariants}
              className="group bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col"
            >
              <span
                className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center shadow-[var(--shadow-md)] mb-4"
                style={{ backgroundColor: color }}
              >
                <Icon className="w-5 h-5 text-white" />
              </span>

              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                {label}
              </h3>

              <div className="mt-2 space-y-1 flex-1">
                {lines.map((line) => (
                  <p
                    key={line}
                    className="text-sm font-semibold text-[var(--color-navy)] leading-snug"
                  >
                    {line}
                  </p>
                ))}
              </div>

              {action && (
                <a
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
                >
                  {action.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* =========================================================
            Form + Map
            ========================================================= */}
        <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ---------- Contact form (7/12) ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-md)] p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-[var(--color-navy)]">
                Send Us a Message
              </h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Fill in the form and our team will get back to you within 24
                hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 flex flex-col items-center text-center gap-3 p-8 rounded-[var(--radius-xl)] bg-[var(--color-success-light)] border border-[var(--color-success)]/30"
                >
                  <span className="w-14 h-14 rounded-full bg-[var(--color-success)] flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  </span>
                  <h3 className="text-lg font-bold text-[var(--color-success)]">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">
                    Thanks for reaching out. Our team will contact you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)]" />
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)]" />
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone + Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)]" />
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98300 12345"
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Subject
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)] pointer-events-none" />
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full pl-10 pr-10 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors appearance-none cursor-pointer"
                        >
                          {subjects.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)] pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us how we can help..."
                      required
                      className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* ---------- Map + extras (5/12) ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Google Maps placeholder */}
            <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-md)] overflow-hidden">
              <div className="relative aspect-[4/3] bg-[var(--color-background-muted)]">
                {/* Replace this img with a Google Maps iframe */}
                <img
                  src="https://picsum.photos/seed/ptd-contact-map/900/700"
                  alt="Office location"
                  className="w-full h-full object-cover opacity-90"
                />

                {/* Center marker */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 px-5 py-4 rounded-[var(--radius-lg)] bg-white/95 backdrop-blur-sm shadow-[var(--shadow-lg)]">
                    <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
                    <p className="text-xs font-bold text-[var(--color-navy)] text-center">
                      Propertytoday Head Office
                    </p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">
                      123 Street, New York, USA
                    </p>
                  </div>
                </div>
              </div>

              {/* Directions strip */}
              <a
                href="https://maps.google.com/?q=123+Street+New+York+USA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 px-5 py-4 border-t border-[var(--color-border-light)] hover:bg-[var(--color-primary-light)]/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[var(--color-navy)]">
                      Get Directions
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Open in Google Maps
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--color-primary)]" />
              </a>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[var(--color-primary)]" />
                </span>
                <h3 className="text-base font-bold text-[var(--color-navy)]">
                  Office Hours
                </h3>
              </div>

              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)]">Monday – Friday</span>
                  <span className="font-semibold text-[var(--color-navy)]">
                    9:00 AM – 7:00 PM
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)]">Saturday</span>
                  <span className="font-semibold text-[var(--color-navy)]">
                    10:00 AM – 5:00 PM
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)]">Sunday</span>
                  <span className="font-semibold text-[var(--color-primary)]">
                    Closed
                  </span>
                </li>
              </ul>
            </div>

            {/* Social row */}
            <div className="bg-[var(--color-navy)] text-white rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] p-6 relative overflow-hidden">
              <span className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[var(--color-secondary)]/25 blur-3xl" />

              <h3 className="relative text-base font-bold">Follow Us</h3>
              <p className="relative mt-1.5 text-xs text-white/70">
                Stay updated with new listings and insights.
              </p>

              <div className="relative mt-5 flex items-center gap-2">
                {[
                  { icon: <Facebook className="w-4 h-4" />, url: "#", label: "Facebook" },
                  { icon: <Twitter className="w-4 h-4" />, url: "#", label: "Twitter" },
                  { icon: <Instagram className="w-4 h-4" />, url: "#", label: "Instagram" },
                  { icon: <Linkedin className="w-4 h-4" />, url: "#", label: "LinkedIn" },
                  { icon: <Youtube className="w-4 h-4" />, url: "#", label: "YouTube" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    aria-label={s.label}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-[var(--color-secondary)] hover:text-[var(--color-navy)] hover:border-[var(--color-secondary)] transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;