import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

/* =========================================================
   TESTIMONIAL DATA
   ========================================================= */
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Propertytoday helped us find the right apartment and guided us throughout the process.",
    rating: 5,
    name: "Rahul Sharma",
    city: "Kolkata",
    role: "Property Buyer",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    id: 2,
    quote:
      "Their team verified every document before we closed. That peace of mind was worth everything.",
    rating: 5,
    name: "Priya Nair",
    city: "Bangalore",
    role: "Home Buyer",
    avatar: "https://i.pravatar.cc/120?img=45",
  },
  {
    id: 3,
    quote:
      "Listed my commercial property and got genuine enquiries within a week. Very professional service.",
    rating: 5,
    name: "Amit Verma",
    city: "Gurgaon",
    role: "Property Seller",
    avatar: "https://i.pravatar.cc/120?img=33",
  },
  {
    id: 4,
    quote:
      "From rental search to final agreement, everything was handled smoothly. Highly recommended.",
    rating: 5,
    name: "Sneha Iyer",
    city: "Mumbai",
    role: "Tenant",
    avatar: "https://i.pravatar.cc/120?img=48",
  },
  {
    id: 5,
    quote:
      "Their investment advisory helped me identify a plot with strong long-term potential.",
    rating: 5,
    name: "Karthik Reddy",
    city: "Hyderabad",
    role: "Investor",
    avatar: "https://i.pravatar.cc/120?img=15",
  },
  {
    id: 6,
    quote:
      "The team was patient with all our questions and never rushed us. Truly customer-focused.",
    rating: 5,
    name: "Meera Joshi",
    city: "Pune",
    role: "Property Buyer",
    avatar: "https://i.pravatar.cc/120?img=25",
  },
];

/* ---------- Star rating row ---------- */
const StarRating = ({ rating = 5 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-[var(--color-secondary)] text-[var(--color-secondary)]"
            : "text-[var(--color-border-dark)]"
        }`}
      />
    ))}
  </div>
);

/* ---------- Single testimonial card ---------- */
const TestimonialCard = ({ quote, rating, name, city, role, avatar }) => (
  <article className="group relative h-full bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-shadow duration-300 p-7 flex flex-col overflow-hidden">
    {/* Decorative quote mark */}
    <Quote
      className="absolute -top-2 -right-2 w-20 h-20 text-[var(--color-primary)]/[0.06] rotate-180 pointer-events-none"
      strokeWidth={1}
    />

    <StarRating rating={rating} />

    <p className="relative mt-5 text-[15px] leading-relaxed text-[var(--color-text-secondary)] italic flex-1">
      "{quote}"
    </p>

    <span className="my-6 block h-px w-full bg-[var(--color-border-light)]" />

    <div className="flex items-center gap-3">
      <div className="relative shrink-0">
        <span className="block w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--color-primary-light)]">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </span>
        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--color-primary)] border-2 border-white" />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-bold text-[var(--color-navy)] truncate">
          {name}
        </h3>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
          <MapPin className="w-3 h-3 text-[var(--color-primary)] shrink-0" />
          <span className="truncate">
            {city} • {role}
          </span>
        </p>
      </div>
    </div>

    <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 group-hover:scale-x-100 bg-[var(--color-primary)] transition-transform duration-300" />
  </article>
);

const HomePageTestimonialsSection = () => {
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef(null);

  // Responsive cards per view
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = TESTIMONIALS.length;
  // One "page" = perView cards. Loop back to 0 after the last full page.
  const maxIndex = Math.max(0, total - perView);

  // Build an extended track: clone the first `perView` cards onto the end
  // so the slide from the last page to the first is seamless.
  const trackItems = [...TESTIMONIALS, ...TESTIMONIALS.slice(0, perView)];

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  // Autoplay every 4s, paused on hover
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next, isPaused, prefersReducedMotion]);

  // How far to translate, in % of one card slot
  const cardWidthPercent = 100 / perView;
  const trackX = -(index * cardWidthPercent);

  return (
    <section className="relative bg-[var(--color-background-soft)] py-16 lg:py-24 overflow-hidden">
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 15% 20%, rgba(255,210,31,0.08) 0%, transparent 65%), radial-gradient(50% 45% at 85% 80%, rgba(200,16,30,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ---------- Section header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            Testimonials
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
            What Our{" "}
            <span className="text-[var(--color-primary)]">Customers Say</span>
          </h2>

          <p className="mt-4 text-base text-[var(--color-text-muted)]">
            Real experiences from people we've helped with their property
            journey.
          </p>
        </motion.div>

        {/* ---------- Carousel ---------- */}
        <div
          className="relative mt-12 lg:mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Prev / Next — desktop only */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonials"
            className="hidden md:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-primary)] hover:-translate-x-1 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonials"
            className="hidden md:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-primary)] hover:translate-x-1 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Overflow viewport */}
          <div className="overflow-hidden">
            {/* Sliding track */}
            <motion.div
              ref={trackRef}
              className="flex"
              animate={{ x: `${trackX}%` }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 90, damping: 20, mass: 0.9 }
              }
              style={{ willChange: "transform" }}
            >
              {trackItems.map((t, i) => (
                <div
                  key={`${t.id}-${i}`}
                  className="shrink-0 px-3"
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <TestimonialCard {...t} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots + mobile controls */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonials"
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-7 bg-[var(--color-primary)]"
                      : "w-2 bg-[var(--color-border-dark)] hover:bg-[var(--color-primary)]/50"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonials"
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageTestimonialsSection;