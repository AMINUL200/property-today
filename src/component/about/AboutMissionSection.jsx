import React from "react";
import { Compass, Check } from "lucide-react";

const AboutMissionSection = () => {
  const focusPoints = [
    "Useful property information",
    "Professional assistance",
    "Site visit support",
    "Documentation guidance",
    "Personalized property search",
  ];

  return (
    <section className="relative bg-[var(--color-background)] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ---------- Left: editorial content ---------- */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              Our Mission
            </span>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
              Our Mission
            </h2>

            {/* Large mission statement */}
            <p className="mt-6 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--color-navy)] leading-snug border-l-4 border-[var(--color-primary)] pl-6">
              To make property transactions{" "}
              <span className="text-[var(--color-primary)]">
                simpler, more transparent
              </span>{" "}
              and more accessible.
            </p>

            <p className="mt-6 text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
              Propertytoday aims to simplify the property journey by providing
              useful property information, professional assistance, site visit
              support, documentation guidance and personalized property search
              — so people can move forward with clarity.
            </p>

            {/* Focus list */}
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {focusPoints.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="w-5 h-5 shrink-0 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
                    <Check
                      className="w-3 h-3 text-[var(--color-primary)]"
                      strokeWidth={3}
                    />
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-text)]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Right: visual panel ---------- */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[var(--radius-2xl)] bg-[var(--color-navy)] shadow-[var(--shadow-xl)] p-8 lg:p-10 overflow-hidden">
              {/* Ambient gold glow */}
              <span className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />

              {/* Dot texture */}
              <span
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative">
                <span className="w-14 h-14 rounded-[var(--radius-lg)] bg-[var(--color-primary)] flex items-center justify-center shadow-[var(--shadow-primary)]">
                  <Compass className="w-7 h-7 text-white" />
                </span>

                <h3 className="mt-6 font-serif text-xl font-bold text-white">
                  Guiding every step
                </h3>

                <p className="mt-3 text-sm text-white/75 leading-relaxed">
                  From initial search to final decision, our focus stays on
                  making the property journey clearer, calmer and easier to
                  navigate.
                </p>

                <span className="mt-6 block h-0.5 w-14 rounded-full bg-[var(--color-secondary)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMissionSection;