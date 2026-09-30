import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

const AboutHeroSection = () => {
  return (
    <section className="relative bg-[var(--color-navy)] overflow-hidden">
      {/* =========================================================
          BACKGROUND IMAGE + OVERLAY
          ========================================================= */}
      <div className="absolute inset-0">
        <img
          src="/image/about/about-hero.jpg"
          alt="Premium residential property in India"
          className="w-full h-full object-cover"
        />
        <span
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(7,29,73,0.96) 0%, rgba(7,29,73,0.88) 45%, rgba(200,16,30,0.65) 100%)",
          }}
        />
      </div>

      {/* Subtle dot texture */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient glows */}
      <span className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-[var(--color-secondary)]/15 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-[var(--color-primary)]/30 blur-3xl" />

      {/* =========================================================
          CONTENT
          ========================================================= */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-[var(--color-secondary)] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
            About Propertytoday
          </span>

          {/* Main heading */}
          <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            Your Trusted{" "}
            <span className="text-[var(--color-secondary)]">
              Property Dealing
            </span>{" "}
            Partner
          </h1>

          {/* Tagline */}
          <p className="mt-5 text-lg lg:text-xl font-semibold text-white/90">
            Your Next Move, Today
          </p>

          {/* Description */}
          <p className="mt-5 text-base lg:text-lg text-white/75 leading-relaxed max-w-2xl">
            Propertytoday helps people discover, buy, sell, rent and invest in
            properties with a transparent and guided experience. From the first
            search to the final decision, we're here to make every step clearer
            and more confident.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              to="/buy/residential"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Explore Properties
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-white/10 border border-white/25 backdrop-blur-sm hover:bg-white hover:text-[var(--color-navy)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <MapPin className="w-4 h-4" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;