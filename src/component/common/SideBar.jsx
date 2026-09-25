import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  X,
  ChevronRight,
  Home,
  Search,
  Building2,
  Key,
  Tag,
  Store,
  LandPlot,
  Wrench,
  MapPin,
  Info,
  User,
  LogOut,
  LayoutDashboard,
  Heart,
  PlusCircle,
} from "lucide-react";

const SideBar = ({ toggleMenu, isOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // PropertyToday sidebar navigation links with icons
  const sidebarLinks = [
    {
      id: "buy",
      label: "Buy",
      icon: <Building2 className="w-5 h-5" />,
      dropdown: [
        { id: "buy-residential", label: "Residential", path: "/buy/residential" },
        { id: "buy-apartments", label: "Apartments", path: "/buy/apartments" },
        { id: "buy-villas", label: "Villas", path: "/buy/villas" },
        { id: "buy-plots", label: "Plots", path: "/buy/plots" },
      ],
    },
    {
      id: "rent",
      label: "Rent",
      icon: <Key className="w-5 h-5" />,
      dropdown: [
        { id: "rent-residential", label: "Residential", path: "/rent/residential" },
        { id: "rent-commercial", label: "Commercial", path: "/rent/commercial" },
        { id: "rent-pg", label: "PG / Hostels", path: "/rent/pg" },
      ],
    },
    {
      id: "sell",
      label: "Sell",
      path: "/sell",
      icon: <Tag className="w-5 h-5" />,
    },
    {
      id: "commercial",
      label: "Commercial",
      icon: <Store className="w-5 h-5" />,
      dropdown: [
        { id: "com-office", label: "Office Spaces", path: "/commercial/office" },
        { id: "com-shop", label: "Shops & Showrooms", path: "/commercial/shop" },
        { id: "com-warehouse", label: "Warehouses", path: "/commercial/warehouse" },
      ],
    },
    {
      id: "land",
      label: "Land",
      icon: <LandPlot className="w-5 h-5" />,
      dropdown: [
        { id: "land-agricultural", label: "Agricultural", path: "/land/agricultural" },
        { id: "land-residential", label: "Residential Plots", path: "/land/residential" },
        { id: "land-commercial", label: "Commercial Land", path: "/land/commercial" },
      ],
    },
    {
      id: "services",
      label: "Services",
      icon: <Wrench className="w-5 h-5" />,
      dropdown: [
        { id: "svc-valuation", label: "Property Valuation", path: "/services/valuation" },
        { id: "svc-legal", label: "Legal Assistance", path: "/services/legal" },
        { id: "svc-loans", label: "Home Loans", path: "/services/loans" },
        { id: "svc-interior", label: "Interior Design", path: "/services/interior" },
      ],
    },
    {
      id: "locations",
      label: "Locations",
      path: "/locations",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: "about",
      label: "About",
      path: "/about",
      icon: <Info className="w-5 h-5" />,
    },
  ];

  // Dummy auth state – swap with your real auth
  const isAuthenticated = false;
  const userData = { user_type: 2 };

  // Close sidebar when route changes
  useEffect(() => {
    if (isOpen) {
      toggleMenu();
    }
  }, [location.pathname]);

  // Toggle dropdown
  const toggleDropdown = (dropdownId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId],
    }));
  };

  // Handle navigation
  const handleNavClick = (path) => {
    if (path) {
      navigate(path);
      setOpenDropdowns({});
    }
  };

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
    toggleMenu();
  };

  // Check if current path matches
  const isActivePath = (path) => location.pathname === path;

  // Render dropdown items recursively
  const renderDropdownItem = (item, level = 1) => {
    const hasSubDropdown = item.dropdown && item.dropdown.length > 0;
    const dropdownKey = `${item.id}-sub-${level}`;
    const isOpen = openDropdowns[dropdownKey];
    const isActive = item.path && isActivePath(item.path);

    return (
      <div key={item.id} className="relative">
        {hasSubDropdown ? (
          <div
            className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-all duration-200 ${
              level > 1 ? "pl-10" : "pl-6"
            } ${
              isOpen
                ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)]/50 hover:text-[var(--color-primary)]"
            }`}
            onClick={() => toggleDropdown(dropdownKey)}
          >
            <span className="font-medium">{item.label}</span>
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        ) : (
          <div
            className={`flex items-center px-4 py-2.5 text-sm cursor-pointer transition-all duration-200 ${
              level > 1 ? "pl-10" : "pl-6"
            } ${
              isActive
                ? "bg-[var(--color-primary)] text-white font-semibold"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)]/50 hover:text-[var(--color-primary)]"
            }`}
            onClick={() => handleNavClick(item.path)}
          >
            <span className="font-medium">{item.label}</span>
          </div>
        )}

        {/* Nested dropdown */}
        {hasSubDropdown && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-[var(--color-background-soft)] border-l-2 border-[var(--color-primary)]/30 ml-4">
              {item.dropdown.map((subItem) =>
                renderDropdownItem(subItem, level + 1)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render top-level nav item
  const renderNavItem = (item) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    const isOpen = openDropdowns[item.id];
    const isActive = item.path && isActivePath(item.path);

    return (
      <div key={item.id} className="mb-1">
        {hasDropdown ? (
          <div
            className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-200 rounded-[var(--radius-md)] mx-2 ${
              isOpen
                ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                : "text-[var(--color-text)] hover:bg-[var(--color-primary-light)]/50 hover:text-[var(--color-primary)]"
            }`}
            onClick={() => toggleDropdown(item.id)}
          >
            <div className="flex items-center gap-3">
              <span className={isOpen ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"}>
                {item.icon}
              </span>
              <span className="font-semibold">{item.label}</span>
            </div>
            <ChevronRight
              className={`w-5 h-5 transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        ) : (
          <div
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 rounded-[var(--radius-md)] mx-2 ${
              isActive
                ? "bg-[var(--color-primary)] text-white font-semibold shadow-[var(--shadow-primary)]"
                : "text-[var(--color-text)] hover:bg-[var(--color-primary-light)]/50 hover:text-[var(--color-primary)]"
            }`}
            onClick={() => handleNavClick(item.path)}
          >
            <span className={isActive ? "text-white" : "text-[var(--color-text-muted)]"}>
              {item.icon}
            </span>
            <span className="font-semibold">{item.label}</span>
          </div>
        )}

        {/* Dropdown menu */}
        {hasDropdown && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-1">
              {item.dropdown.map((dropdownItem) => renderDropdownItem(dropdownItem))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[var(--color-navy-dark)]/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* Sidebar – slides in from the right */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-[var(--shadow-xl)] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)] bg-[var(--gradient-navy)]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-primary)] flex items-center justify-center shadow-[var(--shadow-primary)]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="leading-none">
              <h2 className="text-base font-extrabold tracking-tight text-[var(--color-primary)]">
                Property<span className="text-[var(--color-secondary)]">today</span>
              </h2>
              <p className="text-[10px] font-medium text-[var(--color-primary)] tracking-wide">
                REAL ESTATE
              </p>
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-[var(--radius-md)] hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 " />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 h-[calc(100vh-200px)] custom-scrollbar">
          {sidebarLinks.map((item) => renderNavItem(item))}
        </nav>

        {/* Auth Section */}
        <div className="border-t border-[var(--color-border)] p-4 bg-[var(--color-background-soft)] space-y-2">
          {!isAuthenticated && (
            <>
              {/* List Property CTA – gold gradient */}
              <button
                onClick={() => {
                  navigate("/list-property");
                  toggleMenu();
                }}
                className="w-full bg-[var(--gradient-gold)] text-[var(--color-navy)] px-6 py-3 rounded-[var(--radius-md)] shadow-[var(--shadow-gold)] hover:brightness-105 transition-all duration-300 flex items-center justify-center gap-2 font-bold"
              >
                <PlusCircle className="w-5 h-5" />
                <span>List Property</span>
              </button>

              {/* Login button – primary red */}
              <button
                onClick={() => {
                  navigate("/login");
                  toggleMenu();
                }}
                className="w-full bg-[var(--color-primary)] text-white px-6 py-3 rounded-[var(--radius-md)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] transition-all duration-300 flex items-center justify-center gap-2 font-bold"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
            </>
          )}

          {isAuthenticated && userData?.user_type === 4 && (
            <button
              onClick={handleLogout}
              className="w-full bg-[var(--color-danger)] text-white px-6 py-3 rounded-[var(--radius-md)] hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2 font-bold"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          )}

          {isAuthenticated && userData?.user_type !== 4 && (
            <button
              onClick={() => {
                navigate("/dashboard");
                toggleMenu();
              }}
              className="w-full bg-[var(--color-primary)] text-white px-6 py-3 rounded-[var(--radius-md)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] transition-all duration-300 flex items-center justify-center gap-2 font-bold"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default SideBar;