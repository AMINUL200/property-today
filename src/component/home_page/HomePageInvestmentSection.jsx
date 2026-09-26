import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useAnimationControls } from "framer-motion";
import {
  TrendingUp,
  Building2,
  LandPlot,
  KeyRound,
  ArrowRight,
  MapPin,
  Maximize,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const HomePageInvestmentSection = () => {
  const opportunities = [
    {
      id: "residential",
      category: "Residential Investment",
      title: "Premium Residential Apartment",
      location: "New Town, Kolkata",
      price: "₹85 Lakh",
      area: "1450 Sq.Ft",
      image: "https://picsum.photos/seed/ptoday-invest-res/720/540",
      icon: Building2,
      color: "var(--color-residential)",
      path: "/invest/residential",
      yield: "Est. 6.2% ROI",
    },
    {
      id: "commercial",
      category: "Commercial Investment",
      title: "Commercial Property",
      location: "Gurgaon, Delhi NCR",
      price: "₹2.5 Cr",
      area: "2500 Sq.Ft",
      image: "https://picsum.photos/seed/ptoday-invest-com/720/540",
      icon: TrendingUp,
      color: "var(--color-navy)",
      path: "/invest/commercial",
      yield: "Est. 8.4% ROI",
    },
    {
      id: "land",
      category: "Land Investment",
      title: "Residential Development Plot",
      location: "Sarjapur Road, Bangalore",
      price: "₹1.1 Cr",
      area: "3200 Sq.Ft",
      image: "https://picsum.photos/seed/ptoday-invest-land/720/540",
      icon: LandPlot,
      color: "var(--color-land)",
      path: "/invest/land",
      yield: "High Growth Zone",
    },
    {
      id: "rental",
      category: "Rental Income Properties",
      title: "Furnished Rental Apartment",
      location: "Andheri West, Mumbai",
      price: "₹1.65 Cr",
      area: "1080 Sq.Ft",
      image: "https://picsum.photos/seed/ptoday-invest-rent/720/540",
      icon: KeyRound,
      color: "var(--color-rental)",
      path: "/invest/rental",
      yield: "Est. 5.8% Yield",
    },
    {
      id: "residential-2",
      category: "Residential Investment",
      title: "Luxury 4 BHK Villa",
      location: "Whitefield, Bangalore",
      price: "₹3.2 Cr",
      area: "2850 Sq.Ft",
      image: "https://picsum.photos/seed/ptoday-invest-villa/720/540",
      icon: Building2,
      color: "var(--color-investment)",
      path: "/invest/villa",
      yield: "Est. 7.1% ROI",
    },
    {
      id: "commercial-2",
      category: "Commercial Investment",
      title: "Prime Office Space",
      location: "Cyber City, Gurgaon",
      price: "₹4.8 Cr",
      area: "3600 Sq.Ft",
      image: "https://picsum.photos/seed/ptoday-invest-office/720/540",
      icon: TrendingUp,
      color: "var(--color-secondary-dark)",
      path: "/invest/office",
      yield: "Est. 9.2% ROI",
    },
  ];

  const [perView, setPerView] = useState(4);
  const [displayIndex, setDisplayIndex] = useState(0); // for dots
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // The animation controls drive the actual track transform.
  const controls = useAnimationControls();

  // Refs let us mutate position without triggering re-renders on every tick.
  const posRef = useRef(0);           // current logical index (can go past total)
  const animatingRef = useRef(false); // prevent overlapping transitions

  // Responsive cards per view
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);
      else if (w < 1024) setPerView(2);
      else if (w < 1280) setPerView(3);
      else setPerView(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = opportunities.length;
  // We loop through `total` real slides, not `total - perView`, so the
  // carousel returns to exactly the same visual position every loop.
  const realSlides = total;
  const cardWidthPercent = 100 / perView;
  const slideDistancePercent = cardWidthPercent;

  // We duplicate the entire list once so there's always content to slide into.
  const trackItems = [...opportunities, ...opportunities];

  // Animate the track to a target position (in %), then handle loop reset.
  const slideTo = useCallback(
    async (targetPos, withAnimation = true) => {
      if (animatingRef.current) return;
      animatingRef.current = true;

      const xPercent = -(targetPos * slideDistancePercent);

      if (withAnimation && !prefersReducedMotion) {
        await controls.start({
          x: `${xPercent}%`,
          transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
        });
      } else {
        controls.set({ x: `${xPercent}%` });
      }

      // If we've reached the end of the real slides, silently snap back
      // to the equivalent position at the start (duplicates make it invisible).
      if (targetPos >= realSlides) {
        const snapped = targetPos - realSlides;
        posRef.current = snapped;
        controls.set({ x: `${-(snapped * slideDistancePercent)}%` });
      } else {
        posRef.current = targetPos;
      }

      setDisplayIndex(posRef.current % realSlides);
      animatingRef.current = false;
    },
    [controls, realSlides, slideDistancePercent, prefersReducedMotion]
  );

  const next = useCallback(() => {
    const target = posRef.current + 1;
    slideTo(target, true);
  }, [slideTo]);

  const prev = useCallback(() => {
    // Going backward past 0: jump forward to the duplicate end, then slide back one.
    if (posRef.current <= 0) {
      const jumpPos = realSlides;
      posRef.current = jumpPos;
      controls.set({ x: `${-(jumpPos * slideDistancePercent)}%` });
      // next frame, animate back by 1
      requestAnimationFrame(() => slideTo(jumpPos - 1, true));
    } else {
      slideTo(posRef.current - 1, true);
    }
  }, [slideTo, realSlides, slideDistancePercent, controls]);

  const goTo = useCallback(
    (i) => {
      slideTo(i, true);
    },
    [slideTo]
  );

  // Autoplay — pause on hover/touch
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [next, isPaused, prefersReducedMotion]);

  return (
    <section className="relative bg-[var(--color-navy)] py-16 lg:py-24 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 15% 10%, rgba(255,210,31,0.10) 0%, transparent 60%), radial-gradient(55% 50% at 90% 90%, rgba(200,16,30,0.18) 0%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
            Investment Opportunities
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Explore Property{" "}
            <span className="text-[var(--color-secondary)]">
              Investment Opportunities
            </span>
          </h2>

          <p className="mt-4 text-base text-white/70 leading-relaxed">
            Discover properties with potential for long-term ownership and
            investment.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative mt-12 lg:mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="hidden md:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-secondary-dark)] hover:-translate-x-1 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="hidden md:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-secondary-dark)] hover:translate-x-1 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Viewport */}
          <div className="overflow-hidden">
            {/* Track — driven by `controls`, never re-renders on slide */}
            <motion.div
              className="flex"
              animate={controls}
              initial={{ x: "0%" }}
              style={{ willChange: "transform" }}
            >
              {trackItems.map((opp, i) => {
                const {
                  id,
                  category,
                  title,
                  location,
                  price,
                  area,
                  image,
                  icon: Icon,
                  color,
                  path,
                  yield: yieldText,
                } = opp;

                return (
                  <div
                    key={`${id}-${i}`}
                    className="shrink-0 px-3"
                    style={{ width: `${cardWidthPercent}%` }}
                  >
                    <Link
                      to={path}
                      className="group relative flex flex-col h-full bg-white/[0.04] backdrop-blur-sm rounded-[var(--radius-xl)] border border-white/10 hover:border-[var(--color-secondary)]/40 hover:bg-white/[0.07] shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] transition-all duration-300 overflow-hidden"
                    >
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <span
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(7,29,73,0.10) 0%, rgba(7,29,73,0.60) 70%, rgba(7,29,73,0.95) 100%)",
                          }}
                        />
                        <span
                          className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white rounded-full shadow-[var(--shadow-sm)]"
                          style={{ backgroundColor: color }}
                        >
                          <Icon className="w-3 h-3" />
                          {category}
                        </span>
                        <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[var(--color-navy)] bg-[var(--color-secondary)] rounded-full shadow-[var(--shadow-sm)]">
                          <BadgeCheck className="w-3 h-3" />
                          {yieldText}
                        </span>
                      </div>

                      <div className="relative flex flex-col flex-1 p-5">
                        <h3 className="text-base font-bold text-white group-hover:text-[var(--color-secondary)] transition-colors duration-200 leading-snug">
                          {title}
                        </h3>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-white/60">
                          <MapPin className="w-3.5 h-3.5 text-[var(--color-secondary)] shrink-0" />
                          {location}
                        </p>
                        <span className="my-4 block h-px w-full bg-white/10" />
                        <div className="flex items-end justify-between gap-2">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                              Price
                            </p>
                            <p className="mt-0.5 text-xl font-extrabold text-[var(--color-secondary)]">
                              {price}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                              Area
                            </p>
                            <p className="mt-0.5 flex items-center justify-end gap-1 text-sm font-semibold text-white/85">
                              <Maximize className="w-3.5 h-3.5 text-white/50" />
                              {area}
                            </p>
                          </div>
                        </div>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-[var(--color-secondary)] transition-colors duration-200">
                          View Opportunity
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </div>

                      <span
                        className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
                        style={{ backgroundColor: color }}
                      />
                    </Link>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Dots + mobile controls */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-secondary-dark)] transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: realSlides }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === displayIndex
                      ? "w-7 bg-[var(--color-secondary)]"
                      : "w-2 bg-white/25 hover:bg-[var(--color-secondary)]/60"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white text-[var(--color-navy)] shadow-[var(--shadow-md)] hover:text-[var(--color-secondary-dark)] transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom note / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mt-12 lg:mt-14 flex flex-col sm:flex-row items-center justify-center gap-5 text-center sm:text-left"
        >
          <p className="text-sm text-white/60 max-w-md">
            Looking for a tailored investment strategy? Talk to our advisory
            team for curated opportunities.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] bg-[var(--color-secondary)] shadow-[var(--shadow-gold)] hover:bg-[var(--color-secondary-hover)] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            Talk to an Advisor
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageInvestmentSection;