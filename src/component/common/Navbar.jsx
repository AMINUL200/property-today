import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  Search,
  User,
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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // PropertyToday navigation links:
  // Home | Buy | Sell | Rent | Land & Plots | New Projects | Services | Locations | About Us | Contact
  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    {
      id: "buy",
      label: "Buy",
      dropdown: [
        {
          id: "buy-residential",
          label: "Residential",
          path: "/buy/residential",
        },
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
        {
          id: "sell-property",
          label: "Sell Your Property",
          path: "/sell",
        },
        {
          id: "list-property",
          label: "List Your Property",
          path: "/list-property",
        },
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
        {
          id: "rent-residential",
          label: "Residential",
          path: "/rent/residential",
        },
        {
          id: "rent-commercial",
          label: "Commercial",
          path: "/rent/commercial",
        },
        { id: "rent-pg", label: "PG / Hostels", path: "/rent/pg" },
      ],
    },
    {
      id: "land",
      label: "Land & Plots",
      dropdown: [
        {
          id: "land-agricultural",
          label: "Agricultural",
          path: "/land/agricultural",
        },
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

  // Dummy auth state – swap with your real auth
  const isAuthenticated = false;
  const userData = { user_type: 2 };

  // ---------- Dropdown helpers ----------
  const toggleDropdown = (dropdownId) => {
    setOpenDropdowns((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (key !== dropdownId) newState[key] = false;
      });
      newState[dropdownId] = !prev[dropdownId];
      return newState;
    });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedOutside = true;
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) clickedOutside = false;
      });
      if (clickedOutside) setOpenDropdowns({});
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
    setOpenDropdowns({});
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  // ---------- Render one nav item ----------
  const renderNavItem = (item) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    const isOpen = openDropdowns[item.id];

    return (
      <div
        key={item.id}
        className="relative"
        ref={(el) => (dropdownRefs.current[item.id] = el)}
      >
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
          <button
            type="button"
            onClick={() => handleNavClick(item.path)}
            className="px-3 py-2 text-sm font-semibold whitespace-nowrap text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            {item.label}
          </button>
        )}

        {hasDropdown && isOpen && (
          <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] z-50 overflow-hidden">
            <div className="py-2">
              {item.dropdown.map((subItem) => (
                <RouterLink
                  key={subItem.id}
                  to={subItem.path}
                  onClick={() => setOpenDropdowns({})}
                  className="block px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors duration-150"
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

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 border-b border-[var(--color-border-light)] ${
        scrolled
          ? "bg-white shadow-[var(--shadow-md)] py-0"
          : "bg-white/95 backdrop-blur-sm py-1"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 flex justify-between items-center h-[70px]">
        {/* ---------- Logo ---------- */}
        <div
          className="flex items-center cursor-pointer select-none shrink-0"
          onClick={() => navigate("/")}
        >
          <img
            src="/image/Navbar_logo.png"
            alt="Propertytoday"
            className="h-16 w-auto object-contain"
          />
        </div>
        {/* ---------- Desktop Navigation ---------- */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((item) => renderNavItem(item))}
        </nav>

        {/* ---------- Right side: Search Property, Call Now, List Your Property, Login ---------- */}
        <div className="hidden xl:flex items-center gap-2 shrink-0">
          {/* Call Now – phone icon button */}
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
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-[1px] transition-all duration-200 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Your Property</span>
          </RouterLink>

          {isAuthenticated && userData?.user_type === 4 && (
            <button
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
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-[1px] transition-all duration-200 whitespace-nowrap"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </RouterLink>
          )}
        </div>

        {/* ---------- Tablet (lg): primary nav only, actions in sidebar ---------- */}
        <nav className="hidden lg:flex xl:hidden items-center gap-0.5">
          {navLinks.slice(0, 6).map((item) => renderNavItem(item))}
        </nav>

        {/* ---------- Mobile + tablet: quick actions + menu ---------- */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Call Now quick icon */}
          <a
            href="tel:+01234567890"
            aria-label="Call Now"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            <Phone className="w-4 h-4" />
          </a>

        

          {/* Menu button */}
          <button
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
