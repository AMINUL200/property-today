import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Power,
  PowerOff,
  ChevronDown,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Layers,
  Eye,
  EyeOff,
  Menu as MenuIcon,
  ShoppingCart,
  KeyRound,
  Map,
  Building2,
  ArrowUpDown,
} from "lucide-react";
import { api } from "../../../service/api";

/* =========================================================
   API ENDPOINTS (Property Category Menus)
   GET    /api/v1/admin/property-category-menus           → list
   POST   /api/v1/admin/property-category-menus           → create
   PUT    /api/v1/admin/property-category-menus/:id       → update
   DELETE /api/v1/admin/property-category-menus/:id       → delete
   PATCH  /api/v1/admin/property-category-menus/:id/status → toggle active
   ========================================================= */

/* ---------- Menu type config ---------- */
const MENU_TYPES = [
  { value: "buy", label: "Buy", icon: ShoppingCart, tone: "primary" },
  { value: "rent", label: "Rent", icon: KeyRound, tone: "gold" },
  { value: "land", label: "Land & Plots", icon: Map, tone: "success" },
  { value: "sell", label: "Sell", icon: Building2, tone: "primary" },
  { value: "new_projects", label: "New Projects", icon: Layers, tone: "gold" },
  { value: "services", label: "Services", icon: MenuIcon, tone: "success" },
];

const MENU_TYPE_MAP = MENU_TYPES.reduce((acc, t) => {
  acc[t.value] = t;
  return acc;
}, {});

const EMPTY_FORM = {
  property_category_id: "",
  menu_type: "buy",
  menu_label: "",
  sort_order: 0,
  is_active: true,
};

const ManagePropertyMenu = () => {
  // ---------- Data ----------
  const [menus, setMenus] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [allCategories, setAllCategories] = useState([]);

  // ---------- State ----------
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const typeRef = useRef(null);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [formSaving, setFormSaving] = useState(false);

  // Delete
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  /* =========================================================
     FETCH MENUS
     ========================================================= */
  const fetchMenus = async (targetPage = page) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/admin/property-category-menus", {
        params: { page: targetPage },
      });

      const body = res?.data;
      const list = Array.isArray(body?.data) ? body.data : [];
      const pag = body?.pagination || null;

      setMenus(list);
      setPagination(pag);
    } catch (err) {
      setError(
        err?.message ||
          "Failed to load property menus. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FETCH ALL CATEGORIES (for the dropdown in the modal)
     ========================================================= */
  const fetchCategories = async () => {
    try {
      // Fetch enough pages to collect all categories
      const firstRes = await api.get("/admin/property-categories", {
        params: { page: 1, per_page: 100 },
      });
      const firstBody = firstRes?.data;
      const firstList = Array.isArray(firstBody?.data)
        ? firstBody.data
        : firstBody?.data?.property_categories || [];
      const lastPage = firstBody?.pagination?.last_page || 1;

      let allItems = [...firstList];

      if (lastPage > 1) {
        const promises = [];
        for (let p = 2; p <= lastPage; p++) {
          promises.push(
            api.get("/admin/property-categories", {
              params: { page: p, per_page: 100 },
            })
          );
        }
        const results = await Promise.all(promises);
        results.forEach((r) => {
          const body = r?.data;
          const list = Array.isArray(body?.data)
            ? body.data
            : body?.data?.property_categories || [];
          allItems = [...allItems, ...list];
        });
      }

      // Dedupe
      const seen = new Set();
      const deduped = allItems.filter((c) => {
        if (seen.has(c.id)) return false;
        seen.add(c.id);
        return true;
      });

      setAllCategories(deduped);
    } catch {
      // Silent — the modal will just show an empty dropdown
    }
  };

  useEffect(() => {
    fetchMenus(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ---------- Outside click for filter dropdown ---------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (typeRef.current && !typeRef.current.contains(event.target)) {
        setTypeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =========================================================
     HELPERS
     ========================================================= */
  const clearBanners = () => {
    if (error) setError("");
    if (success) setSuccess("");
  };

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (formError) setFormError("");
  };

  /* ---------- Category dropdown options ---------- */
  const categoryOptions = allCategories.map((c) => {
    const label = c.parent ? `${c.parent.name} → ${c.name}` : c.name;
    return { value: String(c.id), label };
  });

  /* =========================================================
     OPEN MODALS
     ========================================================= */
  const openCreateModal = () => {
    setModalMode("create");
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setFormError("");
    setModalOpen(true);
    clearBanners();
  };

  const openEditModal = (menu) => {
    setModalMode("edit");
    setEditingId(menu.id);
    setForm({
      property_category_id: String(menu.category?.id || ""),
      menu_type: menu.menu_type || "buy",
      menu_label: menu.menu_label || "",
      sort_order: menu.sort_order ?? 0,
      is_active: !!menu.is_active,
    });
    setFormError("");
    setModalOpen(true);
    clearBanners();
  };

  const closeModal = () => {
    if (formSaving) return;
    setModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
  };

  /* =========================================================
     CREATE / UPDATE
     ========================================================= */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.property_category_id) {
      setFormError("Please select a category.");
      return;
    }
    if (!form.menu_type) {
      setFormError("Please select a menu type.");
      return;
    }
    if (!form.menu_label.trim()) {
      setFormError("Menu label is required.");
      return;
    }

    const payload = {
      property_category_id: Number(form.property_category_id),
      menu_type: form.menu_type,
      menu_label: form.menu_label.trim(),
      sort_order: Number(form.sort_order) || 0,
      is_active: !!form.is_active,
    };

    setFormSaving(true);

    try {
      if (modalMode === "create") {
        const res = await api.post("/admin/property-category-menus", payload);
        setSuccess(res?.data?.message || "Menu created successfully.");
      } else {
        const res = await api.put(
          `/admin/property-category-menus/${editingId}`,
          payload
        );
        setSuccess(res?.data?.message || "Menu updated successfully.");
      }
      closeModal();
      await fetchMenus(page);
    } catch (err) {
      let message =
        err?.message ||
        err?.data?.message ||
        "Failed to save menu. Please try again.";

      if (err?.data?.errors) {
        const firstKey = Object.keys(err.data.errors)[0];
        if (firstKey && Array.isArray(err.data.errors[firstKey])) {
          message = err.data.errors[firstKey][0];
        }
      }

      setFormError(message);
    } finally {
      setFormSaving(false);
    }
  };

  /* =========================================================
     TOGGLE ACTIVE — dedicated PATCH endpoint
     PATCH /admin/property-category-menus/:id/status
     ========================================================= */
  const handleToggleActive = async (menu) => {
    setActionLoadingId(menu.id);
    clearBanners();

    try {
      const res = await api.patch(
        `/admin/property-category-menus/${menu.id}/status`,
        { is_active: !menu.is_active }
      );

      const updated =
        res?.data?.data?.property_category_menu ||
        res?.data?.data ||
        null;

      setMenus((prev) =>
        prev.map((m) =>
          m.id === menu.id
            ? updated || { ...m, is_active: !m.is_active }
            : m
        )
      );

      setSuccess(
        res?.data?.message ||
          `Menu ${!menu.is_active ? "activated" : "deactivated"}.`
      );
    } catch (err) {
      setError(err?.message || "Failed to update status. Please try again.");
    } finally {
      setActionLoadingId(null);
    }
  };

  /* =========================================================
     DELETE
     ========================================================= */
  const handleDelete = async () => {
    if (!deleteConfirm) return;

    setDeleting(true);
    clearBanners();

    try {
      const res = await api.delete(
        `/admin/property-category-menus/${deleteConfirm.id}`
      );
      setMenus((prev) => prev.filter((m) => m.id !== deleteConfirm.id));
      setSuccess(res?.data?.message || "Menu deleted successfully.");
      setDeleteConfirm(null);
      await fetchMenus(page);
    } catch (err) {
      setError(err?.message || "Failed to delete menu.");
    } finally {
      setDeleting(false);
    }
  };

  /* =========================================================
     FILTER
     ========================================================= */
  const filtered = menus.filter((m) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      m.menu_label.toLowerCase().includes(q) ||
      (m.category?.name || "").toLowerCase().includes(q) ||
      (m.category?.parent?.name || "").toLowerCase().includes(q) ||
      (m.menu_type || "").toLowerCase().includes(q);

    const matchesType =
      typeFilter === "all" || m.menu_type === typeFilter;

    return matchesSearch && matchesType;
  });

  /* ---------- Stats ---------- */
  const totalCount = menus.length;
  const activeCount = menus.filter((m) => m.is_active).length;
  const buyCount = menus.filter((m) => m.menu_type === "buy").length;
  const rentCount = menus.filter((m) => m.menu_type === "rent").length;

  /* =========================================================
     UI
     ========================================================= */
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-navy)]">
            Property Menu
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Manage which categories appear in each navbar dropdown (Buy, Rent,
            Land & Plots, etc.).
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Menu Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: totalCount, icon: Layers, accent: "primary" },
          { label: "Active", value: activeCount, icon: CheckCircle2, accent: "success" },
          { label: "Buy", value: buyCount, icon: ShoppingCart, accent: "primary" },
          { label: "Rent", value: rentCount, icon: KeyRound, accent: "gold" },
        ].map((stat) => {
          const Icon = stat.icon;
          const accentMap = {
            primary: {
              bg: "bg-[var(--color-primary-light)]",
              text: "text-[var(--color-primary)]",
            },
            success: {
              bg: "bg-[var(--color-success-light)]",
              text: "text-[var(--color-success)]",
            },
            gold: {
              bg: "bg-[var(--color-secondary-light)]",
              text: "text-[var(--color-secondary-dark)]",
            },
          };
          const accent = accentMap[stat.accent];

          return (
            <div
              key={stat.label}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-5 flex items-center gap-4"
            >
              <span
                className={`w-12 h-12 shrink-0 rounded-[var(--radius-md)] flex items-center justify-center ${accent.bg}`}
              >
                <Icon className={`w-5 h-5 ${accent.text}`} />
              </span>
              <div>
                <p className="text-2xl font-black text-[var(--color-navy)]">
                  {stat.value}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Banners */}
      {error && (
        <div className="mb-5 flex items-start gap-3 p-4 rounded-[var(--radius-md)] bg-[var(--color-danger-light)] border border-[var(--color-danger)]/30">
          <AlertCircle className="w-5 h-5 text-[var(--color-danger)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--color-danger)] font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-5 flex items-start gap-3 p-4 rounded-[var(--radius-md)] bg-[var(--color-success-light)] border border-[var(--color-success)]/30">
          <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--color-success)] font-medium">{success}</p>
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-4 mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by label, category, or menu type…"
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
          />
        </div>

        <div className="relative" ref={typeRef}>
          <button
            type="button"
            onClick={() => setTypeDropdownOpen((o) => !o)}
            className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-[var(--radius-md)] bg-white border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
          >
            <Filter className="w-4 h-4" />
            {typeFilter === "all"
              ? "All Menus"
              : MENU_TYPE_MAP[typeFilter]?.label || typeFilter}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                typeDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {typeDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-52 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] z-30 overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  setTypeFilter("all");
                  setTypeDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  typeFilter === "all"
                    ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-soft)]"
                }`}
              >
                All Menus
              </button>
              {MENU_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => {
                    setTypeFilter(t.value);
                    setTypeDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    typeFilter === t.value
                      ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-soft)]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
            <p className="text-sm text-[var(--color-text-muted)]">
              Loading menu items…
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <span className="w-16 h-16 mx-auto rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
              <MenuIcon className="w-8 h-8 text-[var(--color-primary)]" />
            </span>
            <h3 className="mt-4 text-base font-bold text-[var(--color-navy)]">
              {searchQuery || typeFilter !== "all"
                ? "No matching menu items"
                : "No menu items yet"}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {searchQuery || typeFilter !== "all"
                ? "Try adjusting your search or filter."
                : "Add your first menu item to control what appears in the navbar dropdowns."}
            </p>
            {!searchQuery && typeFilter === "all" && (
              <button
                type="button"
                onClick={openCreateModal}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Menu Item
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--color-background-soft)] border-b border-[var(--color-border-light)]">
                  <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Menu Label
                  </th>
                  <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Category
                  </th>
                  <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Menu Type
                  </th>
                  <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Order
                  </th>
                  <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Status
                  </th>
                  <th className="text-right px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-light)]">
                {filtered.map((menu) => {
                  const menuType = MENU_TYPE_MAP[menu.menu_type] || {
                    label: menu.menu_type,
                    icon: MenuIcon,
                    tone: "primary",
                  };
                  const TypeIcon = menuType.icon;
                  const isRowLoading = actionLoadingId === menu.id;

                  const typeToneStyles = {
                    primary: "bg-[var(--color-primary-light)] text-[var(--color-primary)]",
                    gold: "bg-[var(--color-secondary-light)] text-[var(--color-secondary-dark)]",
                    success: "bg-[var(--color-success-light)] text-[var(--color-success)]",
                  };
                  const typeTone =
                    typeToneStyles[menuType.tone] || typeToneStyles.primary;

                  // Full category name (with parent path)
                  const categoryLabel = menu.category
                    ? menu.category.parent
                      ? `${menu.category.parent.name} → ${menu.category.name}`
                      : menu.category.name
                    : "—";

                  return (
                    <tr
                      key={menu.id}
                      className="hover:bg-[var(--color-background-soft)]/50 transition-colors"
                    >
                      {/* Menu label */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-9 h-9 shrink-0 rounded-[var(--radius-md)] flex items-center justify-center ${typeTone}`}
                          >
                            <TypeIcon className="w-4 h-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[var(--color-navy)]">
                              {menu.menu_label}
                            </p>
                            <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
                              #{menu.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-[var(--color-text)]">
                          {categoryLabel}
                        </p>
                        {menu.category?.slug && (
                          <p className="text-[11px] text-[var(--color-text-muted)] font-mono mt-0.5">
                            {menu.category.slug}
                          </p>
                        )}
                      </td>

                      {/* Menu type */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${typeTone}`}
                        >
                          {menuType.label}
                        </span>
                      </td>

                      {/* Sort order */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-text-secondary)]">
                          <ArrowUpDown className="w-3 h-3 text-[var(--color-text-muted)]" />
                          {menu.sort_order ?? 0}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            menu.is_active
                              ? "bg-[var(--color-success-light)] text-[var(--color-success)]"
                              : "bg-[var(--color-background-muted)] text-[var(--color-text-muted)]"
                          }`}
                        >
                          {menu.is_active ? (
                            <Eye className="w-3 h-3" />
                          ) : (
                            <EyeOff className="w-3 h-3" />
                          )}
                          {menu.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleToggleActive(menu)}
                            disabled={isRowLoading}
                            title={menu.is_active ? "Deactivate" : "Activate"}
                            className={`w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] transition-colors ${
                              menu.is_active
                                ? "text-[var(--color-warning)] hover:bg-[var(--color-warning-light)]"
                                : "text-[var(--color-success)] hover:bg-[var(--color-success-light)]"
                            } disabled:opacity-50`}
                          >
                            {isRowLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : menu.is_active ? (
                              <PowerOff className="w-4 h-4" />
                            ) : (
                              <Power className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => openEditModal(menu)}
                            title="Edit"
                            className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteConfirm({
                                id: menu.id,
                                name: menu.menu_label,
                              })
                            }
                            title="Delete"
                            className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-danger)] hover:bg-[var(--color-danger-light)] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-[var(--color-border-light)] bg-[var(--color-background-soft)]/40">
            <p className="text-xs text-[var(--color-text-muted)]">
              Showing {pagination.from}–{pagination.to} of {pagination.total}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1 || loading}
                className="px-3 py-1.5 text-xs font-bold rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-navy)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                Page {pagination.current_page} of {pagination.last_page}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPage((p) => Math.min(pagination.last_page, p + 1))
                }
                disabled={page >= pagination.last_page || loading}
                className="px-3 py-1.5 text-xs font-bold rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-navy)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================
          CREATE / EDIT MODAL
          ========================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[var(--color-navy-dark)]/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-lg bg-white rounded-[var(--radius-2xl)] shadow-[var(--shadow-xl)] overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-light)] shrink-0">
              <div>
                <h2 className="text-lg font-bold text-[var(--color-navy)]">
                  {modalMode === "create" ? "Add Menu Item" : "Edit Menu Item"}
                </h2>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {modalMode === "create"
                    ? "Add a category to a navbar dropdown."
                    : "Update this menu item."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={formSaving}
                className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-background-soft)] hover:text-[var(--color-navy)] transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4"
            >
              {formError && (
                <div className="flex items-start gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--color-danger-light)] border border-[var(--color-danger)]/30">
                  <AlertCircle className="w-4 h-4 text-[var(--color-danger)] shrink-0 mt-0.5" />
                  <p className="text-xs text-[var(--color-danger)] font-medium">
                    {formError}
                  </p>
                </div>
              )}

              {/* Menu type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Menu Type <span className="text-[var(--color-danger)]">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {MENU_TYPES.map((t) => {
                    const TIcon = t.icon;
                    const isActive = form.menu_type === t.value;
                    return (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setField("menu_type", t.value)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-[var(--radius-md)] border-2 transition-all text-xs font-bold ${
                          isActive
                            ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]/40 text-[var(--color-primary)]"
                            : "border-[var(--color-border-light)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-primary)]/40"
                        }`}
                      >
                        <TIcon className="w-4 h-4" />
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Property Category{" "}
                  <span className="text-[var(--color-danger)]">*</span>
                </label>
                <select
                  value={form.property_category_id}
                  onChange={(e) =>
                    setField("property_category_id", e.target.value)
                  }
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none appearance-none cursor-pointer"
                >
                  <option value="">— Select category —</option>
                  {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {categoryOptions.length === 0 && (
                  <p className="mt-1 text-[11px] text-[var(--color-warning)]">
                    No categories loaded. Create one first in Property
                    Categories.
                  </p>
                )}
              </div>

              {/* Menu label */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Menu Label <span className="text-[var(--color-danger)]">*</span>
                </label>
                <input
                  type="text"
                  value={form.menu_label}
                  onChange={(e) => setField("menu_label", e.target.value)}
                  placeholder="e.g. Residential Properties"
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                />
                <p className="mt-1 text-[11px] text-[var(--color-text-light)]">
                  This is the text shown in the navbar dropdown.
                </p>
              </div>

              {/* Sort order */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Sort Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.sort_order}
                  onChange={(e) => setField("sort_order", e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                />
                <p className="mt-1 text-[11px] text-[var(--color-text-light)]">
                  Lower numbers appear first in the dropdown.
                </p>
              </div>

              {/* Active */}
              <label className="flex items-center gap-2.5 p-3 rounded-[var(--radius-md)] border border-[var(--color-border-light)] bg-[var(--color-background-soft)] hover:border-[var(--color-primary)]/40 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setField("is_active", e.target.checked)}
                  className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
                />
                <span className="text-sm font-semibold text-[var(--color-text)]">
                  Active (visible in navbar)
                </span>
              </label>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--color-border-light)]">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={formSaving}
                  className="px-5 py-2.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-60"
                >
                  {formSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      {modalMode === "create" ? "Create" : "Update"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          DELETE CONFIRMATION
          ========================================================= */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[var(--color-navy-dark)]/60 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteConfirm(null)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] p-6">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-danger-light)] flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-[var(--color-danger)]" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-navy)]">
                  Delete Menu Item?
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  You're about to delete{" "}
                  <span className="font-semibold text-[var(--color-navy)]">
                    "{deleteConfirm.name}"
                  </span>
                  . It will no longer appear in the navbar dropdown. This action
                  cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
                className="px-5 py-2.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] border border-[var(--color-border)] hover:border-[var(--color-navy)] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-danger)] hover:bg-[var(--color-danger)]/90 transition-colors disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePropertyMenu;