import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const AboutWhoWeAreSection = () => {
  const focusAreas = [
    "Buying",
    "Selling",
    "Renting",
    "Land & Plots",
    "New Projects",
    "Property Services",
  ];

  const supportPoints = [
    "Multiple Locations",
    "Property Assistance",
    "End-to-End Support",
  ];

  return (
    <section className="relative bg-[var(--color-background-soft)] py-16 lg:py-24">
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 85% 15%, rgba(200,16,30,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ---------- Left: image ---------- */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-[var(--radius-2xl)] overflow-hidden shadow-[var(--shadow-xl)] aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85"
                alt="Propertytoday team assisting clients with property decisions"
                className="w-full h-full object-cover"
              />
              <span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(7,29,73,0.0) 40%, rgba(7,29,73,0.35) 100%)",
                }}
              />
            </div>

            {/* Floating accent chip */}
            <span className="hidden sm:block absolute -bottom-5 -right-5 px-5 py-3 rounded-[var(--radius-xl)] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-lg)]">
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-primary)]">
                Trusted
              </span>
              <span className="block text-sm font-bold text-[var(--color-navy)]">
                Property Dealing Partner
              </span>
            </span>

            {/* Dotted accent */}
            <span
              className="hidden sm:block absolute -top-6 -left-6 w-28 h-28 rounded-full opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--color-primary) 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />
          </div>

          {/* ---------- Right: content ---------- */}
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              About Propertytoday
            </span>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
              Who We Are
            </h2>

            <h3 className="mt-3 text-xl lg:text-2xl font-semibold text-[var(--color-navy)] leading-snug">
              Helping People Make Better{" "}
              <span className="text-[var(--color-primary)]">
                Property Decisions
              </span>
            </h3>

            <p className="mt-5 text-base text-[var(--color-text-secondary)] leading-relaxed">
              Propertytoday is a property dealing platform that connects people
              with property opportunities and professional assistance — for
              buying, selling, renting, land and plots, new projects and
              property-related services. We help people explore, evaluate and
              move forward with confidence at every stage.
            </p>

            {/* Focus areas */}
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
              {focusAreas.map((area) => (
                <div key={area} className="flex items-center gap-2">
                  <span className="w-5 h-5 shrink-0 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
                    <Check
                      className="w-3 h-3 text-[var(--color-primary)]"
                      strokeWidth={3}
                    />
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-text)]">
                    {area}
                  </span>
                </div>
              ))}
            </div>

            {/* Support points — visual hierarchy, not fake stats */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {supportPoints.map((point) => (
                <div
                  key={point}
                  className="px-4 py-3 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)]"
                >
                  <span className="block h-0.5 w-6 rounded-full bg-[var(--color-secondary)] mb-2" />
                  <span className="block text-sm font-bold text-[var(--color-navy)] leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/services"
              className="group mt-9 inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Explore Our Services
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWhoWeAreSection;