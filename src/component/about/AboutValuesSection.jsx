import React from "react";
import {
  ShieldCheck,
  Eye,
  HeartHandshake,
  Scale,
  Award,
} from "lucide-react";

const AboutValuesSection = () => {
  const values = [
    {
      id: "01",
      title: "Trust",
      description:
        "Building relationships through reliability and honest communication.",
      icon: ShieldCheck,
    },
    {
      id: "02",
      title: "Transparency",
      description:
        "Keeping property information and processes clear and understandable.",
      icon: Eye,
    },
    {
      id: "03",
      title: "Customer First",
      description:
        "Putting customer requirements at the center of every property journey.",
      icon: HeartHandshake,
    },
    {
      id: "04",
      title: "Integrity",
      description:
        "Doing business responsibly and maintaining professional standards.",
      icon: Scale,
    },
    {
      id: "05",
      title: "Excellence",
      description:
        "Continuously improving our service, technology and property experience.",
      icon: Award,
    },
  ];

  return (
    <section className="relative bg-[var(--color-background-soft)] py-16 lg:py-24">
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            Our Values
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
            Our{" "}
            <span className="text-[var(--color-primary)]">Values</span>
          </h2>

          <p className="mt-4 text-base text-[var(--color-text-muted)]">
            The principles that guide how we work and serve our customers.
          </p>
        </div>

        {/* Values layout — horizontal editorial rows, distinct from Why section */}
        <div className="mt-12 lg:mt-16 space-y-4">
          {values.map(({ id, title, description, icon: Icon }) => (
            <div
              key={id}
              className="group relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 p-6 lg:p-7 bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:border-[var(--color-primary)]/25 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              {/* Left accent bar */}
              <span className="absolute left-0 top-0 h-full w-1 bg-[var(--color-primary)] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />

              {/* Number */}
              <span className="shrink-0 text-2xl sm:text-3xl font-black tracking-tight text-[var(--color-primary)]/30 group-hover:text-[var(--color-primary)] transition-colors duration-300 sm:w-14">
                {id}
              </span>

              {/* Icon */}
              <span className="shrink-0 w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center bg-[var(--color-primary-light)] group-hover:bg-[var(--color-primary)] transition-colors duration-300">
                <Icon className="w-6 h-6 text-[var(--color-primary)] group-hover:text-white transition-colors duration-300" />
              </span>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Gold accent on right */}
              <span className="hidden sm:block shrink-0 h-0.5 w-12 rounded-full bg-[var(--color-secondary)]/60 transition-all duration-300 group-hover:w-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValuesSection;