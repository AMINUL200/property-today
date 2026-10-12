import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  MessageSquare,
  Calendar,
  Wallet,
  Star,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  Eye,
  Heart,
  BadgeCheck,
  Clock,
  MapPin,
  HandCoins,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

const AgentDashboard = () => {
  /* =========================================================
     DUMMY AGENT DATA
     Swap with real data from your API / admin panel.
     ========================================================= */
  const agent = {
    name: "Ankit Sengupta",
    role: "Senior Property Agent",
    city: "Kolkata",
  };

  /* ---------- Top KPI stats ---------- */
  const stats = [
    {
      id: "listings",
      label: "Active Listings",
      value: "24",
      change: "+3 this week",
      trend: "up",
      icon: Building2,
      accent: "primary",
    },
    {
      id: "leads",
      label: "Total Leads",
      value: "148",
      change: "+12 this week",
      trend: "up",
      icon: Users,
      accent: "navy",
    },
    {
      id: "visits",
      label: "Site Visits",
      value: "32",
      change: "8 scheduled",
      trend: "neutral",
      icon: Calendar,
      accent: "gold",
    },
    {
      id: "earnings",
      label: "This Month",
      value: "₹4.8L",
      change: "+18% vs last",
      trend: "up",
      icon: Wallet,
      accent: "success",
    },
  ];

  /* ---------- Recent leads ---------- */
  const recentLeads = [
    {
      id: 1,
      name: "Priya Nair",
      property: "3 BHK Premium Apartment",
      location: "New Town, Kolkata",
      intent: "Buy",
      status: "New",
      time: "5 min ago",
      phone: "+91 98300 12345",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      property: "2 BHK Furnished Flat",
      location: "Salt Lake, Kolkata",
      intent: "Rent",
      status: "Contacted",
      time: "1 hour ago",
      phone: "+91 98300 23456",
    },
    {
      id: 3,
      name: "Meera Joshi",
      property: "4 BHK Luxury Villa",
      location: "Whitefield, Bangalore",
      intent: "Buy",
      status: "Site Visit",
      time: "3 hours ago",
      phone: "+91 98300 34567",
    },
    {
      id: 4,
      name: "Karthik Reddy",
      property: "Residential Plot",
      location: "Sarjapur Road, Bangalore",
      intent: "Invest",
      status: "New",
      time: "Yesterday",
      phone: "+91 98300 45678",
    },
  ];

  /* ---------- Upcoming site visits ---------- */
  const upcomingVisits = [
    {
      id: 1,
      client: "Priya Nair",
      property: "3 BHK Premium Apartment",
      date: "Today",
      time: "4:00 PM",
      location: "New Town, Kolkata",
    },
    {
      id: 2,
      client: "Amit Verma",
      property: "Office Space in Sector V",
      date: "Tomorrow",
      time: "11:00 AM",
      location: "Sector V, Kolkata",
    },
    {
      id: 3,
      client: "Sneha Iyer",
      property: "2 BHK Furnished Flat",
      date: "Sat, 15 Feb",
      time: "3:30 PM",
      location: "Salt Lake, Kolkata",
    },
  ];

  /* ---------- Recent enquiries / messages ---------- */
  const messages = [
    {
      id: 1,
      from: "Priya Nair",
      preview: "Is the apartment still available? I'd like to schedule a visit.",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      from: "Amit Verma",
      preview: "What's the maintenance cost for the office space?",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      from: "Karthik Reddy",
      preview: "Thanks, I'll review the plot documents and get back.",
      time: "3 hours ago",
      unread: false,
    },
  ];

  /* ---------- Performance snapshot ---------- */
  const performance = [
    { label: "Listing Views", value: "2,847", change: "+22%", icon: Eye },
    { label: "Saved by Users", value: "312", change: "+14%", icon: Heart },
    { label: "Conversion Rate", value: "8.4%", change: "+1.2%", icon: TrendingUp },
    { label: "Avg. Rating", value: "4.9", change: "142 reviews", icon: Star },
  ];

  /* ---------- Accent mapping helper ---------- */
  const accentClass = {
    primary: {
      bg: "bg-primary",
      text: "text-primary",
      light: "bg-[var(--color-primary-light)]",
    },
    navy: {
      bg: "bg-navy",
      text: "text-navy",
      light: "bg-[var(--color-navy)]/10",
    },
    gold: {
      bg: "bg-[var(--color-secondary)]",
      text: "text-[var(--color-secondary-dark)]",
      light: "bg-[var(--color-secondary-light)]",
    },
    success: {
      bg: "bg-[var(--color-success)]",
      text: "text-[var(--color-success)]",
      light: "bg-[var(--color-success-light)]",
    },
  };

  /* ---------- Status pill colors for leads ---------- */
  const statusStyle = {
    New: "bg-[var(--color-primary-light)] text-primary",
    Contacted: "bg-[var(--color-info-light)] text-[var(--color-info)]",
    "Site Visit": "bg-[var(--color-secondary-light)] text-[var(--color-secondary-dark)]",
  };

  /* ---------- Intent pill colors ---------- */
  const intentStyle = {
    Buy: "bg-[var(--color-primary-light)] text-primary",
    Rent: "bg-[var(--color-info-light)] text-[var(--color-info)]",
    Invest: "bg-[#f3e8ff] text-[var(--color-investment)]",
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <div className="space-y-6">
      {/* =========================================================
          WELCOME HEADER
          ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="section-navy relative rounded-[var(--radius-2xl)] overflow-hidden p-6 sm:p-8"
      >
        {/* Ambient glows */}
        <span className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[var(--color-primary)]/25 blur-3xl" />

        {/* Dot texture */}
        <span
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-[var(--color-secondary)] text-[10px] font-bold tracking-widest uppercase">
              <BadgeCheck className="w-3 h-3" />
              Agent Portal
            </span>

            <h1 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Welcome back,{" "}
              <span className="text-[var(--color-secondary)]">
                {agent.name.split(" ")[0]}
              </span>
            </h1>

            <p className="mt-2 text-sm text-white/70 max-w-xl">
              Here's a quick snapshot of your listings, leads, and upcoming
              site visits today.
            </p>
          </div>

          {/* Quick action */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/agent/listings/add/sale"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4" />
              Add Listing
            </Link>

            <Link
              to="/agent/leads/all"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] bg-[var(--color-secondary)] shadow-[var(--shadow-gold)] hover:bg-[var(--color-secondary-hover)] hover:-translate-y-0.5 transition-all duration-200"
            >
              View Leads
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* =========================================================
          KPI STATS GRID
          ========================================================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          const accent = accentClass[stat.accent];

          return (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="property-card p-5 flex flex-col"
            >
              <div className="flex items-start justify-between">
                <span
                  className={`w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center ${accent.light}`}
                >
                  <Icon className={`w-5 h-5 ${accent.text}`} />
                </span>

                {stat.trend === "up" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-success-light)] text-[var(--color-success)] text-[10px] font-bold">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </span>
                )}
                {stat.trend === "neutral" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-background-muted)] text-[var(--color-text-muted)] text-[10px] font-bold">
                    {stat.change}
                  </span>
                )}
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-muted">
                {stat.label}
              </p>
              <p className="mt-1 text-3xl font-black text-navy leading-tight">
                {stat.value}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* =========================================================
          TWO-COLUMN: Recent Leads + Upcoming Visits
          ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ---------- Recent Leads (2/3) ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[var(--color-border-light)]">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-[var(--radius-md)] bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </span>
              <div>
                <h2 className="text-base font-bold text-navy">Recent Leads</h2>
                <p className="text-xs text-muted">Latest enquiries from users</p>
              </div>
            </div>

            <Link
              to="/agent/leads/all"
              className="text-xs font-bold text-primary hover:text-[var(--color-primary-hover)] transition-colors inline-flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* List */}
          <div className="divide-y divide-[var(--color-border-light)]">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center gap-4 p-4 hover:bg-[var(--color-background-soft)] transition-colors"
              >
                {/* Avatar */}
                <span className="w-10 h-10 shrink-0 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center text-primary text-sm font-bold">
                  {lead.name.charAt(0)}
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-navy truncate">
                      {lead.name}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${intentStyle[lead.intent]}`}
                    >
                      {lead.intent}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyle[lead.status]}`}
                    >
                      {lead.status}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-text-secondary truncate">
                    {lead.property}
                  </p>

                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span className="truncate">{lead.location}</span>
                    <span className="mx-1">·</span>
                    <Clock className="w-3 h-3" />
                    {lead.time}
                  </p>
                </div>

                {/* Action */}
                <Link
                  to={`/agent/leads/all`}
                  className="shrink-0 hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-[var(--radius-md)] text-primary border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary-light)] transition-colors"
                >
                  View
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ---------- Upcoming Site Visits (1/3) ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[var(--color-border-light)]">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-secondary-light)] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[var(--color-secondary-dark)]" />
              </span>
              <div>
                <h2 className="text-base font-bold text-navy">Upcoming Visits</h2>
                <p className="text-xs text-muted">Scheduled site visits</p>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="divide-y divide-[var(--color-border-light)]">
            {upcomingVisits.map((visit) => (
              <div
                key={visit.id}
                className="p-4 hover:bg-[var(--color-background-soft)] transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-navy truncate">
                      {visit.client}
                    </p>
                    <p className="mt-0.5 text-xs text-text-secondary truncate">
                      {visit.property}
                    </p>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                    {visit.date}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-primary" />
                    {visit.time}
                  </span>
                  <span className="inline-flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-primary shrink-0" />
                    <span className="truncate">{visit.location}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 bg-[var(--color-background-soft)] border-t border-[var(--color-border-light)]">
            <Link
              to="/agent/site-visits"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-[var(--radius-md)] text-navy border border-[var(--color-border)] hover:border-primary hover:text-primary transition-colors"
            >
              Manage Site Visits
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          MESSAGES + PERFORMANCE SNAPSHOT
          ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ---------- Recent Messages ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-[var(--color-border-light)]">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-success-light)] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[var(--color-success)]" />
              </span>
              <div>
                <h2 className="text-base font-bold text-navy">Messages</h2>
                <p className="text-xs text-muted">Client conversations</p>
              </div>
            </div>

            <Link
              to="/agent/messages"
              className="text-xs font-bold text-primary hover:text-[var(--color-primary-hover)] transition-colors inline-flex items-center gap-1"
            >
              Open Inbox
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-[var(--color-border-light)]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 hover:bg-[var(--color-background-soft)] transition-colors cursor-pointer ${
                  msg.unread ? "bg-[var(--color-primary-light)]/30" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {msg.unread && (
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-navy truncate">
                        {msg.from}
                      </p>
                      <span className="text-[10px] text-muted whitespace-nowrap">
                        {msg.time}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-text-secondary line-clamp-2">
                      {msg.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ---------- Performance Snapshot ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-[var(--color-border-light)]">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-secondary-light)] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[var(--color-secondary-dark)]" />
              </span>
              <div>
                <h2 className="text-base font-bold text-navy">
                  Performance
                </h2>
                <p className="text-xs text-muted">Last 30 days</p>
              </div>
            </div>

            <Link
              to="/agent/analytics/listings"
              className="text-xs font-bold text-primary hover:text-[var(--color-primary-hover)] transition-colors inline-flex items-center gap-1"
            >
              Full Report
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--color-border-light)]">
            {performance.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="p-5">
                  <span className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-background-soft)] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </span>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-muted">
                    {item.label}
                  </p>
                  <p className="mt-1 text-2xl font-black text-navy">
                    {item.value}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-[var(--color-success)]">
                    {item.change}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          QUICK ACTION TILES
          ========================================================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {[
          {
            label: "Add Listing",
            desc: "List a new property",
            icon: PlusCircle,
            to: "/agent/listings/add/sale",
            accent: "primary",
          },
          {
            label: "View Leads",
            desc: "Manage enquiries",
            icon: Users,
            to: "/agent/leads/all",
            accent: "navy",
          },
          {
            label: "Site Visits",
            desc: "Scheduled visits",
            icon: Calendar,
            to: "/agent/site-visits",
            accent: "gold",
          },
          {
            label: "Earnings",
            desc: "View payout history",
            icon: Wallet,
            to: "/agent/earnings",
            accent: "success",
          },
        ].map((action) => {
          const Icon = action.icon;
          const accent = accentClass[action.accent];

          return (
            <motion.div key={action.label} variants={itemVariants}>
              <Link
                to={action.to}
                className="group block bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300 p-5"
              >
                <span
                  className={`w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center ${accent.light} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-5 h-5 ${accent.text}`} />
                </span>

                <p className="mt-4 text-sm font-bold text-navy group-hover:text-primary transition-colors">
                  {action.label}
                </p>
                <p className="mt-0.5 text-xs text-muted">{action.desc}</p>

                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Open
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* =========================================================
          RECENT LISTINGS PERFORMANCE STRIP
          ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6"
      >
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </span>
            <div>
              <h2 className="text-base font-bold text-navy">
                Top Performing Listings
              </h2>
              <p className="text-xs text-muted">
                Your most-viewed properties this month
              </p>
            </div>
          </div>

          <Link
            to="/agent/listings/all"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-[var(--color-primary-hover)] transition-colors"
          >
            All Listings
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: "3 BHK Premium Apartment",
              location: "New Town, Kolkata",
              views: 842,
              leads: 24,
              status: "Active",
            },
            {
              title: "2 BHK Furnished Flat",
              location: "Salt Lake, Kolkata",
              views: 615,
              leads: 18,
              status: "Active",
            },
            {
              title: "4 BHK Luxury Villa",
              location: "Whitefield, Bangalore",
              views: 428,
              leads: 12,
              status: "Pending",
            },
          ].map((listing) => (
            <div
              key={listing.title}
              className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-background-soft)] border border-[var(--color-border-light)] hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    listing.status === "Active"
                      ? "bg-[var(--color-success-light)] text-[var(--color-success)]"
                      : "bg-[var(--color-warning-light)] text-[var(--color-warning)]"
                  }`}
                >
                  {listing.status === "Active" && (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  )}
                  {listing.status}
                </span>
              </div>

              <p className="text-sm font-bold text-navy truncate">
                {listing.title}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted truncate">
                <MapPin className="w-3 h-3 text-primary shrink-0" />
                {listing.location}
              </p>

              <div className="mt-3 flex items-center gap-4 text-xs">
                <span className="inline-flex items-center gap-1 text-text-secondary font-semibold">
                  <Eye className="w-3.5 h-3.5 text-muted" />
                  {listing.views}
                </span>
                <span className="inline-flex items-center gap-1 text-text-secondary font-semibold">
                  <Users className="w-3.5 h-3.5 text-muted" />
                  {listing.leads} leads
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AgentDashboard;