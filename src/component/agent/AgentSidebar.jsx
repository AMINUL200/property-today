import React, { useState } from "react";
import {
  X,
  LayoutDashboard,
  Building2,
  PlusCircle,
  Users,
  MessageSquare,
  BarChart,
  Settings,
  ChevronDown,
  Heart,
  User2,
  Home,
  HandCoins,
  MapPin,
  BadgeCheck,
  FileText,
  Wallet,
  Calendar,
  Star,
  Bell,
  Globe,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const AgentSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});

  // ---------- Agent menu — property-agent focused ----------
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/agent",
    },
    {
      id: "profile",
      label: "My Profile",
      icon: <User2 className="w-5 h-5" />,
      path: "/agent/profile",
    },
    {
      id: "listings",
      label: "My Listings",
      icon: <Building2 className="w-5 h-5" />,
      children: [
        {
          id: "all-listings",
          label: "All Listings",
          icon: <Building2 className="w-4 h-4" />,
          path: "/agent/listings/all",
        },
        {
          id: "active-listings",
          label: "Active",
          icon: <BadgeCheck className="w-4 h-4" />,
          path: "/agent/listings/active",
        },
        {
          id: "pending-listings",
          label: "Pending Review",
          icon: <FileText className="w-4 h-4" />,
          path: "/agent/listings/pending",
        },
        {
          id: "sold-listings",
          label: "Sold / Rented",
          icon: <HandCoins className="w-4 h-4" />,
          path: "/agent/listings/sold",
        },
      ],
    },
    {
      id: "add-listing",
      label: "Add New Listing",
      icon: <PlusCircle className="w-5 h-5" />,
      children: [
        {
          id: "add-sale",
          label: "List for Sale",
          icon: <Home className="w-4 h-4" />,
          path: "/agent/listings/add/sale",
        },
        {
          id: "add-rent",
          label: "List for Rent",
          icon: <HandCoins className="w-4 h-4" />,
          path: "/agent/listings/add/rent",
        },
        {
          id: "add-land",
          label: "List Land / Plot",
          icon: <MapPin className="w-4 h-4" />,
          path: "/agent/listings/add/land",
        },
      ],
    },
    {
      id: "leads",
      label: "Leads & Enquiries",
      icon: <Users className="w-5 h-5" />,
      children: [
        {
          id: "all-leads",
          label: "All Leads",
          icon: <Users className="w-4 h-4" />,
          path: "/agent/leads/all",
        },
        {
          id: "new-leads",
          label: "New Enquiries",
          icon: <MessageSquare className="w-4 h-4" />,
          path: "/agent/leads/new",
        },
        {
          id: "follow-ups",
          label: "Follow-ups",
          icon: <Calendar className="w-4 h-4" />,
          path: "/agent/leads/follow-ups",
        },
      ],
    },
    {
      id: "site-visits",
      label: "Site Visits",
      icon: <Calendar className="w-5 h-5" />,
      path: "/agent/site-visits",
    },
    {
      id: "messages",
      label: "Messages",
      icon: <MessageSquare className="w-5 h-5" />,
      path: "/agent/messages",
    },
    {
      id: "saved",
      label: "Saved Properties",
      icon: <Heart className="w-5 h-5" />,
      path: "/agent/saved",
    },
    {
      id: "earnings",
      label: "Earnings",
      icon: <Wallet className="w-5 h-5" />,
      path: "/agent/earnings",
    },
    {
      id: "reviews",
      label: "Reviews & Ratings",
      icon: <Star className="w-5 h-5" />,
      path: "/agent/reviews",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart className="w-5 h-5" />,
      children: [
        {
          id: "listing-performance",
          label: "Listing Performance",
          icon: <Building2 className="w-4 h-4" />,
          path: "/agent/analytics/listings",
        },
        {
          id: "lead-performance",
          label: "Lead Performance",
          icon: <Users className="w-4 h-4" />,
          path: "/agent/analytics/leads",
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      children: [
        {
          id: "account",
          label: "Account Settings",
          icon: <Settings className="w-4 h-4" />,
          path: "/agent/settings/account",
        },
        {
          id: "notifications",
          label: "Notifications",
          icon: <Bell className="w-4 h-4" />,
          path: "/agent/settings/notifications",
        },
        {
          id: "visibility",
          label: "Public Profile",
          icon: <Globe className="w-4 h-4" />,
          path: "/agent/settings/profile",
        },
      ],
    },
  ];

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isActive = (path) => location.pathname === path;

  const isParentActive = (children) =>
    children?.some((child) => location.pathname === child.path);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[var(--color-navy-dark)]/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[var(--color-navy)] shadow-[var(--shadow-xl)] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-50 bg-[var(--color-navy)] flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary)] flex items-center justify-center shadow-[var(--shadow-primary)]">
              <svg
                width="20"
                height="20"
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
              <h2 className="text-base font-extrabold tracking-tight text-white">
                Property<span className="text-[var(--color-secondary)]">today</span>
              </h2>
              <p className="text-[10px] font-medium text-white/60 tracking-widest uppercase">
                Agent Portal
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-[var(--radius-md)] hover:bg-white/10 transition-colors lg:hidden text-white/70 hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
          {menuItems.map((item) => (
            <div key={item.id}>
              {/* Parent Item */}
              {item.children ? (
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-[var(--radius-md)] transition-all duration-200 group ${
                    isParentActive(item.children)
                      ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-primary)]"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`transition-colors ${
                        isParentActive(item.children)
                          ? "text-white"
                          : "text-white/50 group-hover:text-white"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span className="font-semibold text-sm">{item.label}</span>
                  </div>
                  <div
                    className={`transition-transform duration-200 ${
                      openDropdowns[item.id] ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] transition-all duration-200 group ${
                    isActive(item.path)
                      ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-primary)]"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div
                    className={`transition-colors ${
                      isActive(item.path)
                        ? "text-white"
                        : "text-white/50 group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-semibold text-sm">{item.label}</span>
                </button>
              )}

              {/* Dropdown Children */}
              {item.children && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openDropdowns[item.id]
                      ? "max-h-96 opacity-100 mt-1"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-4 pl-4 border-l-2 border-white/10 space-y-1 py-1">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => handleNavigation(child.path)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius-md)] transition-all duration-200 group ${
                          isActive(child.path)
                            ? "bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] border-l-2 border-[var(--color-secondary)]"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div
                          className={`transition-colors ${
                            isActive(child.path)
                              ? "text-[var(--color-secondary)]"
                              : "text-white/40 group-hover:text-white"
                          }`}
                        >
                          {child.icon}
                        </div>
                        <span className="font-medium text-sm">
                          {child.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AgentSidebar;