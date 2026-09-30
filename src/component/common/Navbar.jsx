import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Phone,
  PlusCircle,
} from "lucide-react";

const Navbar = ({ toggleMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const dropdownRefs = useRef({});
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================================================
     SCROLL EFFECT
     ========================================================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =========================================================
     NAVIGATION LINKS
     ========================================================= */
  const navLinks = [
    { id: "home", label: "Home", path: "/" },

    {
      id: "buy",
      label: "Buy",
      dropdown: [
        { id: "buy-residential", label: "Residential", path: "/buy/residential" },
        { id: "buy-apartments", label: "Apartments", path: "/buy/apartments" },
        { id: "buy-villas", label: "Villas", path: "/buy/villas" },
        { id: "buy-plots", label: "Plots", path: "/buy/plots" },
        { id: "buy-commercial", label: "Commercial", path: "/buy/commercial" },
      ],
    },

    {
      id: "sell",
      label: "Sell",
      dropdown: [
        { id: "sell-property", label: "Sell Your Property", path: "/sell" },
        { id: "list-property", label: "List Your Property", path: "/list-property" },
        {
          id: "rent-property",
          label: "Rent / Lease Your Property",
          path: "/list-property/rent",
        },
      ],
    },

    {
      id: "rent",
      label: "Rent",
      dropdown: [
        { id: "rent-residential", label: "Residential", path: "/rent/residential" },
        { id: "rent-commercial", label: "Commercial", path: "/rent/commercial" },
        { id: "rent-pg", label: "PG / Hostels", path: "/rent/pg" },
      ],
    },

    {
      id: "land",
      label: "Land & Plots",
      dropdown: [
        { id: "land-agricultural", label: "Agricultural", path: "/land/agricultural" },
        {
          id: "land-residential",
          label: "Residential Plots",
          path: "/land/residential",
        },
        {
          id: "land-commercial",
          label: "Commercial Land",
          path: "/land/commercial",
        },
      ],
    },

    {
      id: "new-projects",
      label: "New Projects",
      dropdown: [
        {
          id: "np-ongoing",
          label: "Ongoing Projects",
          path: "/new-projects/ongoing",
        },
        {
          id: "np-upcoming",
          label: "Upcoming Projects",
          path: "/new-projects/upcoming",
        },
        {
          id: "np-completed",
          label: "Completed Projects",
          path: "/new-projects/completed",
        },
      ],
    },

    {
      id: "services",
      label: "Services",
      dropdown: [
        {
          id: "svc-buying",
          label: "Property Buying Assistance",
          path: "/services/property-buying",
        },
        {
          id: "svc-selling",
          label: "Property Selling",
          path: "/services/property-selling",
        },
        {
          id: "svc-rental",
          label: "Property Rental & Leasing",
          path: "/services/property-rental",
        },
        {
          id: "svc-land-plots",
          label: "Land & Plot Deals",
          path: "/services/land-plot-deals",
        },
        {
          id: "svc-verification",
          label: "Property Verification",
          path: "/services/property-verification",
        },
        {
          id: "svc-documentation",
          label: "Documentation Assistance",
          path: "/services/documentation",
        },
        {
          id: "svc-valuation",
          label: "Property Valuation",
          path: "/services/valuation",
        },
        {
          id: "svc-site-visit",
          label: "Site Visit Assistance",
          path: "/services/site-visit",
        },
        {
          id: "svc-management",
          label: "Property Management",
          path: "/services/property-management",
        },
        {
          id: "svc-investment",
          label: "Investment Assistance",
          path: "/services/investment",
        },
      ],
    },

    { id: "locations", label: "Locations", path: "/locations" },
    { id: "about", label: "About Us", path: "/about" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  /* =========================================================
     AUTH
     ========================================================= */
  const isAuthenticated = false;
  const userData = { user_type: 2 };

  /* =========================================================
     CLOSE DROPDOWNS ON ROUTE CHANGE
     ========================================================= */
  useEffect(() => {
    setOpenDropdowns({});
  }, [location.pathname]);

  /* =========================================================
     TOGGLE DROPDOWN — single-open behaviour
     ========================================================= */
  const toggleDropdown = (dropdownId) => {
    setOpenDropdowns((prev) => {
      // If this dropdown is already open → close everything
      if (prev[dropdownId]) return {};
      // Otherwise → open this one and close all others
      return { [dropdownId]: true };
    });
  };

  const closeDropdown = () => setOpenDropdowns({});

  /* =========================================================
     CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
     ========================================================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInside = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target)
      );
      if (!clickedInside) setOpenDropdowns({});
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =========================================================
     NORMAL NAVIGATION
     ========================================================= */
  const handleNavClick = (path) => {
    closeDropdown();
    navigate(path);
  };

  /* =========================================================
     LOGOUT
     ========================================================= */
  const handleLogout = () => {
    closeDropdown();
    navigate("/");
  };

  /* =========================================================
     RENDER NAV ITEM

     `variant` ("desktop" | "tablet") keeps each nav's DOM refs
     separate. Both navs render the same item ids, so sharing one
     ref key made the hidden tablet nav overwrite the visible
     desktop nav's ref for the first 6 items. The outside-click
     check then thought clicks inside the open dropdown were
     "outside", closed it on mousedown, and unmounted the link
     before its click could fire. (Services isn't in the tablet
     nav, which is why only it worked.)
     ========================================================= */
  const renderNavItem = (item, variant) => {
    const hasDropdown =
      Array.isArray(item.dropdown) && item.dropdown.length > 0;
    const isOpen = Boolean(openDropdowns[item.id]);

    return (
      <div
        key={item.id}
        className="relative"
        ref={(el) => {
          dropdownRefs.current[`${variant}-${item.id}`] = el;
        }}
      >
        {/* ---------- Parent button / link ---------- */}
        {hasDropdown ? (
          <button
            type="button"
            onClick={() => toggleDropdown(item.id)}
            className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
              isOpen
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-text)] hover:text-[var(--color-primary)]"
            }`}
          >
            <span>{item.label}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        ) : (
          <RouterLink
            to={item.path}
            onClick={closeDropdown}
            className="block px-3 py-2 text-sm font-semibold whitespace-nowrap text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            {item.label}
          </RouterLink>
        )}

        {/* ---------- Dropdown panel ---------- */}
        {hasDropdown && isOpen && (
          <div
            className="absolute top-full left-0 mt-1 w-72 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] z-[999] overflow-hidden"
            style={{ pointerEvents: "auto" }}
          >
            <div className="py-2">
              {item.dropdown.map((subItem) => (
                <RouterLink
                  key={subItem.id}
                  to={subItem.path}
                  onClick={closeDropdown}
                  className="relative z-10 block w-full px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors duration-150 cursor-pointer"
                >
                  {subItem.label}
                </RouterLink>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  /* =========================================================
     RENDER
     ========================================================= */
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-[var(--color-border-light)] ${
        scrolled
          ? "bg-white shadow-[var(--shadow-md)] py-0"
          : "bg-white/95 backdrop-blur-sm py-1"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 flex justify-between items-center h-[70px]">
        {/* ================= LOGO ================= */}
        <RouterLink
          to="/"
          onClick={closeDropdown}
          className="flex items-center cursor-pointer select-none shrink-0"
        >
          <img
            src="/image/Navbar_logo.png"
            alt="Propertytoday"
            className="h-16 w-auto object-contain"
          />
        </RouterLink>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((item) => renderNavItem(item, "desktop"))}
        </nav>

        {/* ================= RIGHT-SIDE ACTIONS ================= */}
        <div className="hidden xl:flex items-center gap-2 shrink-0">
          <a
            href="tel:+01234567890"
            aria-label="Call Now"
            className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-[var(--radius-md)] text-[var(--color-navy)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200 whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now</span>
          </a>

          <RouterLink
            to="/list-property"
            onClick={closeDropdown}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-[1px] transition-all duration-200 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Your Property</span>
          </RouterLink>

          {isAuthenticated && userData?.user_type === 4 && (
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-danger)] hover:bg-red-700 hover:-translate-y-[1px] transition-all duration-200 whitespace-nowrap"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          )}

          {isAuthenticated && userData?.user_type !== 4 && (
            <RouterLink
              to="/dashboard"
              onClick={closeDropdown}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-[1px] transition-all duration-200 whitespace-nowrap"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </RouterLink>
          )}
        </div>

        {/* ================= TABLET NAV ================= */}
        <nav className="hidden lg:flex xl:hidden items-center gap-0.5">
          {navLinks.slice(0, 6).map((item) => renderNavItem(item, "tablet"))}
        </nav>

        {/* ================= MOBILE ACTIONS ================= */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="tel:+01234567890"
            aria-label="Call Now"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={toggleMenu}
            className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;