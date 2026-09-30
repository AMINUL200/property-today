import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, PlusCircle } from "lucide-react";

const AboutCTASection = () => {
  return (
    <section className="relative bg-[var(--color-background)] py-16 lg:py-24">
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative rounded-[var(--radius-2xl)] overflow-hidden shadow-[var(--shadow-xl)]">
          {/* Background image */}
          <img
            src="/image/about/about-cta.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Navy overlay */}
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(7,29,73,0.97) 0%, rgba(7,29,73,0.92) 45%, rgba(200,16,30,0.75) 100%)",
            }}
          />

          {/* Ambient glows */}
          <span className="pointer-events-none absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />
          <span className="pointer-events-none absolute -bottom-32 -left-20 w-[420px] h-[420px] rounded-full bg-[var(--color-primary)]/30 blur-3xl" />

          {/* Dot texture */}
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1.2px, transparent 1.2px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Content */}
          <div className="relative px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
              Get Started
            </span>

            <h2 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight max-w-3xl mx-auto">
              Ready to Make Your{" "}
              <span className="text-[var(--color-secondary)]">
                Next Property Move?
              </span>
            </h2>

            <p className="mt-5 text-base lg:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">
              Whether you're buying, selling, renting or exploring investment
              opportunities, Propertytoday is here to help.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/buy/residential"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Search className="w-4 h-4" />
                Explore Properties
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/list-property"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] bg-[var(--color-secondary)] shadow-[var(--shadow-gold)] hover:bg-[var(--color-secondary-hover)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <PlusCircle className="w-4 h-4" />
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTASection;