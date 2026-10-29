import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  UserCircle,
  Mail,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = ({ setSidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  // ---------- Auth from AuthContext ----------
  const { user, logout } = useAuth();

  // ---------- User data derived from auth ----------
  const userData = {
    name: user?.name || "Admin User",
    email: user?.email || "admin@propertytoday.com",
    role: user?.role
      ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
      : "Administrator",
    phone: user?.phone || "",
    avatar: null,
    initials: (user?.name || "A")
      .split(" ")
      .map((w) => w.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase(),
  };

  // ---------- Dummy notifications ----------
  const notifications = [
    {
      id: 1,
      title: "New property listed",
      message: "A new property was listed in New Town, Kolkata",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "New agent registered",
      message: "Rahul Sharma registered as an agent",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Site update",
      message: "Propertytoday system updated successfully",
      time: "2 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  // ---------- Close dropdowns on outside click ----------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------- Logout ----------
  const handleLogout = () => {
    setShowProfileMenu(false);
    logout(); // clears token + user from localStorage and AuthContext
    navigate("/login", { replace: true });
  };

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate("/admin/profile");
  };

  const handleSettingsClick = () => {
    setShowProfileMenu(false);
    navigate("/admin/site-settings");
  };

  return (
    <header className="bg-white shadow-[var(--shadow-sm)] border-b border-[var(--color-border-light)] sticky top-0 z-30">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]" />
              <input
                type="text"
                placeholder="Search properties, users, agents..."
                className="pl-10 pr-4 py-2.5 w-72 border border-[var(--color-border)] bg-[var(--color-background-soft)] rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-[var(--shadow-primary)]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)] border border-[var(--color-border-light)] overflow-hidden z-50 animate-fadeIn">
                  <div className="bg-[var(--gradient-navy)] px-4 py-3">
                    <h3 className="text-white font-bold text-sm">
                      Notifications
                    </h3>
                    <p className="text-white/70 text-xs mt-0.5">
                      {unreadCount} unread messages
                    </p>
                  </div>

                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-b border-[var(--color-border-light)] last:border-0 hover:bg-[var(--color-background-soft)] cursor-pointer transition-colors ${
                          notification.unread
                            ? "bg-[var(--color-primary-light)]/30"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-2 shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[var(--color-navy)]">
                              {notification.title}
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-[var(--color-text-light)] mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-3 bg-[var(--color-background-soft)] text-center border-t border-[var(--color-border-light)]">
                    <button className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-bold transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-[var(--radius-md)] hover:bg-[var(--color-background-soft)] transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-[var(--shadow-primary)] overflow-hidden">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-xs font-bold">
                      {userData.initials}
                    </span>
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-bold text-[var(--color-navy)] leading-tight">
                    {userData.name}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted)] leading-tight">
                    {userData.role}
                  </p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--color-text-muted)] transition-transform hidden sm:block ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)] border border-[var(--color-border-light)] overflow-hidden z-50 animate-fadeIn">
                  <div className="bg-navy-gradient px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center overflow-hidden shrink-0">
                        {userData.avatar ? (
                          <img
                            src={userData.avatar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-sm font-bold">
                            {userData.initials}
                          </span>
                        )}
                      </div>
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

                  <div className="py-2">
                    <button
                      onClick={handleProfileClick}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[var(--color-background-soft)] transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center shrink-0">
                        <UserCircle className="w-4 h-4 text-[var(--color-primary)]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--color-navy)]">
                          My Profile
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          View and edit profile
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={handleSettingsClick}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[var(--color-background-soft)] transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-secondary-light)] flex items-center justify-center shrink-0">
                        <Settings className="w-4 h-4 text-[var(--color-secondary-dark)]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--color-navy)]">
                          Settings
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          Manage site preferences
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate("/admin/enquiries");
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[var(--color-background-soft)] transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-success-light)] flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-[var(--color-success)]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--color-navy)]">
                          Messages
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          View enquiries and messages
                        </p>
                      </div>
                    </button>
                  </div>

                  <div className="border-t border-[var(--color-border-light)] p-2">
                    <button
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
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.18s ease-out;
        }
      `}</style>
    </header>
  );
};

export default AdminNavbar;