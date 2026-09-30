import React from "react";
import {
  ShieldCheck,
  Globe2,
  Eye,
  Cpu,
  Sparkles,
  Building2,
} from "lucide-react";

const AboutVisionSection = () => {
  const pillars = [
    {
      id: "trust",
      title: "Trust",
      description: "Building confidence through reliable property information.",
      icon: ShieldCheck,
    },
    {
      id: "accessibility",
      title: "Accessibility",
      description: "Making property exploration easier for everyone.",
      icon: Globe2,
    },
    {
      id: "transparency",
      title: "Transparency",
      description: "Keeping information and processes clear and open.",
      icon: Eye,
    },
    {
      id: "technology",
      title: "Technology",
      description: "Using modern tools to improve the property experience.",
      icon: Cpu,
    },
    {
      id: "experiences",
      title: "Better Experiences",
      description: "Designing smoother journeys for buyers and sellers.",
      icon: Sparkles,
    },
    {
      id: "cities",
      title: "Growing Cities",
      description: "Supporting emerging real-estate markets across India.",
      icon: Building2,
    },
  ];

  return (
    <section className="relative bg-[var(--color-navy)] py-16 lg:py-24 overflow-hidden">
      {/* Ambient glows */}
      <span className="pointer-events-none absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-[var(--color-secondary)]/10 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-[var(--color-primary)]/20 blur-3xl" />

      {/* Dot texture */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ---------- Header ---------- */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
            Our Vision
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Our Vision
          </h2>

          <p className="mt-6 text-xl lg:text-2xl font-semibold text-white/90 leading-snug">
            To become a{" "}
            <span className="text-[var(--color-secondary)]">
              trusted property platform
            </span>{" "}
            for people across India.
          </p>

          <p className="mt-5 text-base text-white/70 leading-relaxed max-w-2xl">
            We're working towards a property experience that feels approachable,
            honest and modern — powered by clear information, thoughtful
            technology and a genuine focus on the people we serve.
          </p>
        </div>

        {/* ---------- Pillar grid ---------- */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map(({ id, title, description, icon: Icon }) => (
            <div
              key={id}
              className="group relative p-6 rounded-[var(--radius-xl)] bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] hover:border-[var(--color-secondary)]/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30">
                  <Icon className="w-5 h-5 text-[var(--color-secondary)]" />
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-[var(--color-secondary)] transition-colors duration-200">
                  {title}
                </h3>
              </div>

              <p className="mt-4 text-sm text-white/70 leading-relaxed">
                {description}
              </p>

              <span className="mt-5 block h-0.5 w-8 rounded-full bg-[var(--color-secondary)]/60 transition-all duration-300 group-hover:w-14" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutVisionSection;