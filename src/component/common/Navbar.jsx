import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Phone,
  PlusCircle,
  UserCircle,
  Settings,
  Heart,
  Home,
  Building2,
  Calendar,
  MessageSquare,
  Wallet,
  Users,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ toggleMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const dropdownRefs = useRef({});
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ---------- Auth ----------
  const { user, isAuthenticated, logout } = useAuth();

  const userRole = (user?.role || "user").toLowerCase();

  // ---------- Derived user data ----------
  const userData = {
    name: user?.name || "User",
    email: user?.email || "",
    role: user?.role
      ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
      : "User",
    initials: (user?.name || "U")
      .split(" ")
      .map((w) => w.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase(),
  };

  // ---------- Dashboard path by role ----------
  const getDashboardPath = (role) => {
    switch ((role || "").toLowerCase()) {
      case "admin":
        return "/admin";
      case "agent":
        return "/agent";
      default:
        return "/dashboard";
    }
  };

  // ---------- Profile dropdown links by role ----------
  const getProfileMenuLinks = (role) => {
    if (role === "admin") {
      return [
        {
          label: "Admin Dashboard",
          desc: "Manage the platform",
          icon: LayoutDashboard,
          tone: "primary",
          to: "/admin",
        },
        {
          label: "Manage Properties",
          desc: "All listings and types",
          icon: Building2,
          tone: "gold",
          to: "/admin/properties/all",
        },
        {
          label: "Users & Agents",
          desc: "Manage accounts",
          icon: Users,
          tone: "primary",
          to: "/admin/users/all",
        },
        {
          label: "Site Settings",
          desc: "Configure the site",
          icon: Settings,
          tone: "success",
          to: "/admin/site-settings",
        },
      ];
    }

    if (role === "agent") {
      return [
        {
          label: "Agent Dashboard",
          desc: "Your listings & leads",
          icon: LayoutDashboard,
          tone: "primary",
          to: "/agent",
        },
        {
          label: "My Listings",
          desc: "Manage your properties",
          icon: Building2,
          tone: "gold",
          to: "/agent/listings/all",
        },
        {
          label: "Add Listing",
          desc: "List a new property",
          icon: PlusCircle,
          tone: "primary",
          to: "/agent/listings/add/sale",
        },
        {
          label: "Leads & Enquiries",
          desc: "Client enquiries",
          icon: MessageSquare,
          tone: "success",
          to: "/agent/leads/all",
        },
        {
          label: "Site Visits",
          desc: "Scheduled visits",
          icon: Calendar,
          tone: "primary",
          to: "/agent/site-visits",
        },
        {
          label: "Earnings",
          desc: "Payouts & commission",
          icon: Wallet,
          tone: "gold",
          to: "/agent/earnings",
        },
        {
          label: "My Profile",
          desc: "View and edit profile",
          icon: UserCircle,
          tone: "success",
          to: "/agent/profile",
        },
      ];
    }

    // Default: normal user
    return [
      // {
      //   label: "My Dashboard",
      //   desc: "Overview of your activity",
      //   icon: LayoutDashboard,
      //   tone: "primary",
      //   to: "/dashboard",
      // },
      {
        label: "My Properties",
        desc: "View your listed properties",
        icon: Home,
        tone: "gold",
        to: "/my-properties",
      },
      {
        label: "Schedule a Visit",
        desc: "Book a property visit",
        icon: Calendar,
        tone: "primary",
        to: "/schedule-visit",
      },
      {
        label: "List Your Property",
        desc: "Sell or rent your property",
        icon: PlusCircle,
        tone: "success",
        to: "/list-property",
      },
      {
        label: "Saved Properties",
        desc: "Your bookmarked listings",
        icon: Heart,
        tone: "primary",
        to: "/saved",
      },
      {
        label: "My Profile",
        desc: "View and edit profile",
        icon: UserCircle,
        tone: "gold",
        to: "/profile",
      },
    ];
  };

  const toneStyles = {
    primary: {
      bg: "bg-[var(--color-primary-light)]",
      text: "text-[var(--color-primary)]",
    },
    gold: {
      bg: "bg-[var(--color-secondary-light)]",
      text: "text-[var(--color-secondary-dark)]",
    },
    success: {
      bg: "bg-[var(--color-success-light)]",
      text: "text-[var(--color-success)]",
    },
  };

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
     CLOSE DROPDOWNS ON ROUTE CHANGE
     ========================================================= */
  useEffect(() => {
    setOpenDropdowns({});
    setShowProfileMenu(false);
  }, [location.pathname]);

  /* =========================================================
     TOGGLE DROPDOWN
     ========================================================= */
  const toggleDropdown = (dropdownId) => {
    setOpenDropdowns((prev) => {
      if (prev[dropdownId]) return {};
      return { [dropdownId]: true };
    });
  };

  const closeDropdown = () => setOpenDropdowns({});

  /* =========================================================
     CLOSE DROPDOWNS ON OUTSIDE CLICK
     ========================================================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideNav = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target)
      );
      if (!clickedInsideNav) setOpenDropdowns({});

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =========================================================
     NAVIGATION
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
    setShowProfileMenu(false);
    logout();
    navigate("/login", { replace: true });
  };

  /* =========================================================
     RENDER NAV ITEM
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
  const profileLinks = getProfileMenuLinks(userRole);

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
          {/* ---------- LOGGED OUT: only Call Now + List Your Property ---------- */}
          {!isAuthenticated && (
            <>
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
            </>
          )}

          {/* ---------- LOGGED IN: profile dropdown only ---------- */}
          {isAuthenticated && (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setShowProfileMenu((o) => !o)}
                className="flex items-center gap-2.5 p-1 pr-3 rounded-[var(--radius-md)] hover:bg-[var(--color-background-soft)] transition-colors duration-200"
                aria-label="Profile menu"
              >
                <span className="relative w-9 h-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-[var(--shadow-primary)]">
                  <span className="text-white text-xs font-bold">
                    {userData.initials}
                  </span>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--color-success)] border-2 border-white" />
                </span>

                <span className="hidden 2xl:block text-left leading-tight">
                  <span className="block text-sm font-bold text-[var(--color-navy)] max-w-[120px] truncate">
                    {userData.name}
                  </span>
                  <span className="block text-[10px] text-[var(--color-text-muted)]">
                    {userData.role}
                  </span>
                </span>

                <ChevronDown
                  className={`w-4 h-4 text-[var(--color-text-muted)] transition-transform duration-200 ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* ---------- Profile Dropdown ---------- */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-72 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)] border border-[var(--color-border-light)] z-[999] animate-pt-fade-in">
                  {/* Header */}
                  <div className="bg-navy-gradient px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
                        <span className="text-white text-sm font-bold">
                          {userData.initials}
                        </span>
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">
                          {userData.name}
                        </p>
                        <p className="text-white/70 text-xs truncate">
                          {userData.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Role-specific menu items */}
                  <div className="py-2">
                    {profileLinks.map((link) => {
                      const Icon = link.icon;
                      const tone =
                        toneStyles[link.tone] || toneStyles.primary;

                      return (
                        <RouterLink
                          key={link.label}
                          to={link.to}
                          onClick={() => setShowProfileMenu(false)}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[var(--color-background-soft)] transition-colors text-left"
                        >
                          <div
                            className={`w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 ${tone.bg}`}
                          >
                            <Icon className={`w-4 h-4 ${tone.text}`} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[var(--color-navy)]">
                              {link.label}
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                              {link.desc}
                            </p>
                          </div>
                        </RouterLink>
                      );
                    })}
                  </div>

                  {/* Settings + Logout */}
                  <div className="border-t border-[var(--color-border-light)]">
                    <RouterLink
                      to={
                        userRole === "admin"
                          ? "/admin/site-settings"
                          : userRole === "agent"
                            ? "/agent/settings/account"
                            : "/settings"
                      }
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[var(--color-background-soft)] transition-colors text-left border-b border-[var(--color-border-light)]"
                    >
                      <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-background-muted)] flex items-center justify-center shrink-0">
                        <Settings className="w-4 h-4 text-[var(--color-text-muted)]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--color-navy)]">
                          Settings
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          Manage your preferences
                        </p>
                      </div>
                    </RouterLink>

                    <div className="p-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[var(--color-danger-light)] transition-colors rounded-[var(--radius-md)] text-left group"
                      >
                        <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-danger-light)] group-hover:bg-[var(--color-danger)]/20 flex items-center justify-center transition-colors shrink-0">
                          <LogOut className="w-4 h-4 text-[var(--color-danger)]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[var(--color-danger)]">
                            Logout
                          </p>
                          <p className="text-xs text-[var(--color-danger)]/70">
                            Sign out of your account
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= TABLET NAV ================= */}
        <nav className="hidden lg:flex xl:hidden items-center gap-0.5">
          {navLinks.slice(0, 6).map((item) => renderNavItem(item, "tablet"))}
        </nav>

        {/* ================= MOBILE ACTIONS ================= */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Call icon only when logged out */}
          {!isAuthenticated && (
            <a
              href="tel:+01234567890"
              aria-label="Call Now"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}

          {/* Profile avatar on mobile when logged in */}
          {isAuthenticated && (
            <RouterLink
              to={getDashboardPath(userRole)}
              className="w-9 h-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-[var(--shadow-primary)]"
              aria-label="Dashboard"
            >
              <span className="text-white text-xs font-bold">
                {userData.initials}
              </span>
            </RouterLink>
          )}

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

      <style>{`
        @keyframes pt-fade-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-pt-fade-in {
          animation: pt-fade-in 0.18s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Navbar;