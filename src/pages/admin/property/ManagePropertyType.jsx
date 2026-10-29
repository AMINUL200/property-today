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
  Building2,
  Home,
  Store,
  Map,
  Bed,
  Layers,
  Tag,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";
import { api } from "../../../service/api";

/* =========================================================
   API ENDPOINTS
   GET    /api/v1/admin/property-types         → list
   POST   /api/v1/admin/property-types         → create
   PUT    /api/v1/admin/property-types/:id     → update
   PATCH  /api/v1/admin/property-types/:id     → partial update (activate/deactivate)
   DELETE /api/v1/admin/property-types/:id     → delete
   ========================================================= */

/* ---------- Icon name → component map (matches API `icon` field) ---------- */
const ICON_MAP = {
  house: Home,
  "building-2": Building2,
  store: Store,
  map: Map,
  bed: Bed,
};

/* ---------- Empty form state ---------- */
const EMPTY_FORM = {
  name: "",
  code: "",
  description: "",
  supports_sale: false,
  supports_rent: false,
  supports_lease: false,
  supports_area: false,
  is_active: true,
  is_featured: false,
};

const ManagePropertyType = () => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | active | inactive
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const statusRef = useRef(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create | edit
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [formSaving, setFormSaving] = useState(false);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  /* =========================================================
     FETCH LIST
     ========================================================= */
  const fetchTypes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/admin/property-types");
      const list = res?.data?.data?.property_types || [];
      setPropertyTypes(list);
    } catch (err) {
      setError(
        err?.message || "Failed to load property types. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  /* ---------- Close status dropdown outside click ---------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setStatusDropdownOpen(false);
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

  const autoCode = (name) =>
    name
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

  const setField = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // Auto-generate code from name in create mode only when user hasn't touched code
      if (key === "name" && modalMode === "create" && !prev.code) {
        next.code = autoCode(value);
      }
      return next;
    });
    if (formError) setFormError("");
  };

  /* =========================================================
     OPEN MODALS
     ========================================================= */
  const openCreateModal = () => {
    setModalMode("create");
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
    clearBanners();
  };

  const openEditModal = (type) => {
    setModalMode("edit");
    setEditingId(type.id);
    setForm({
      name: type.name || "",
      code: type.code || "",
      description: type.description || "",
      supports_sale: !!type.features?.sale,
      supports_rent: !!type.features?.rent,
      supports_lease: !!type.features?.lease,
      supports_area: !!type.features?.area,
      is_active: !!type.is_active,
      is_featured: !!type.is_featured,
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

    // Basic client-side validation
    if (!form.name.trim()) {
      setFormError("Property type name is required.");
      return;
    }
    if (!form.code.trim()) {
      setFormError("Code is required.");
      return;
    }

    setFormSaving(true);

    try {
      if (modalMode === "create") {
        const res = await api.post("/admin/property-types", form);
        const created = res?.data?.data?.property_type;
        if (created) {
          setPropertyTypes((prev) => [created, ...prev]);
        } else {
          await fetchTypes();
        }
        setSuccess(res?.data?.message || "Property type created successfully.");
      } else {
        const res = await api.put(`/admin/property-types/${editingId}`, form);
        const updated = res?.data?.data?.property_type;
        if (updated) {
          setPropertyTypes((prev) =>
            prev.map((t) => (t.id === editingId ? updated : t))
          );
        } else {
          await fetchTypes();
        }
        setSuccess(res?.data?.message || "Property type updated successfully.");
      }

      closeModal();
    } catch (err) {
      let message =
        err?.message ||
        err?.data?.message ||
        "Failed to save property type. Please try again.";

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
     TOGGLE ACTIVE (PATCH)
     ========================================================= */
  const handleToggleActive = async (type) => {
    setActionLoadingId(type.id);
    clearBanners();

    try {
      const res = await api.put(`/admin/property-types/${type.id}`, {
        is_active: !type.is_active,
      });

      const updated = res?.data?.data?.property_type;

      setPropertyTypes((prev) =>
        prev.map((t) =>
          t.id === type.id
            ? updated || { ...t, is_active: !t.is_active }
            : t
        )
      );

      setSuccess(
        res?.data?.message ||
          `Property type ${!type.is_active ? "activated" : "deactivated"}.`
      );
    } catch (err) {
      setError(
        err?.message || "Failed to update status. Please try again."
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  /* =========================================================
     DELETE
     ========================================================= */
  const handleDelete = async () => {
    if (!deleteConfirmId) return;

    setDeleting(true);
    clearBanners();

    try {
      const res = await api.delete(`/admin/property-types/${deleteConfirmId}`);
      setPropertyTypes((prev) =>
        prev.filter((t) => t.id !== deleteConfirmId)
      );
      setSuccess(res?.data?.message || "Property type deleted successfully.");
      setDeleteConfirmId(null);
    } catch (err) {
      setError(err?.message || "Failed to delete. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  /* =========================================================
     FILTERED LIST
     ========================================================= */
  const filteredTypes = propertyTypes.filter((type) => {
    const matchesSearch =
      !searchQuery.trim() ||
      type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      type.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (type.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && type.is_active) ||
      (statusFilter === "inactive" && !type.is_active);

    return matchesSearch && matchesStatus;
  });

  /* ---------- Stats ---------- */
  const totalCount = propertyTypes.length;
  const activeCount = propertyTypes.filter((t) => t.is_active).length;
  const featuredCount = propertyTypes.filter((t) => t.is_featured).length;

  /* =========================================================
     UI
     ========================================================= */
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-navy)]">
            Property Types
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Manage the property categories available on the platform.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Property Type
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Total Types",
            value: totalCount,
            icon: Layers,
            accent: "primary",
          },
          {
            label: "Active",
            value: activeCount,
            icon: CheckCircle2,
            accent: "success",
          },
          {
            label: "Featured",
            value: featuredCount,
            icon: Star,
            accent: "gold",
          },
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
          <p className="text-sm text-[var(--color-danger)] font-medium">
            {error}
          </p>
        </div>
      )}
      {success && (
        <div className="mb-5 flex items-start gap-3 p-4 rounded-[var(--radius-md)] bg-[var(--color-success-light)] border border-[var(--color-success)]/30">
          <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--color-success)] font-medium">
            {success}
          </p>
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-4 mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, code, or description…"
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
          />
        </div>

        {/* Status filter */}
        <div className="relative" ref={statusRef}>
          <button
            type="button"
            onClick={() => setStatusDropdownOpen((o) => !o)}
            className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-[var(--radius-md)] bg-white border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
          >
            <Filter className="w-4 h-4" />
            {statusFilter === "all"
              ? "All Status"
              : statusFilter === "active"
                ? "Active Only"
                : "Inactive Only"}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                statusDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {statusDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-44 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] z-30 overflow-hidden">
              {[
                { value: "all", label: "All Status" },
                { value: "active", label: "Active Only" },
                { value: "inactive", label: "Inactive Only" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setStatusFilter(opt.value);
                    setStatusDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    statusFilter === opt.value
                      ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-soft)]"
                  }`}
                >
                  {opt.label}
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
              Loading property types…
            </p>
          </div>
        ) : filteredTypes.length === 0 ? (
          <div className="p-12 text-center">
            <span className="w-16 h-16 mx-auto rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
              <Layers className="w-8 h-8 text-[var(--color-primary)]" />
            </span>
            <h3 className="mt-4 text-base font-bold text-[var(--color-navy)]">
              {searchQuery || statusFilter !== "all"
                ? "No matching property types"
                : "No property types yet"}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filter."
                : "Create your first property type to get started."}
            </p>
            {!searchQuery && statusFilter === "all" && (
              <button
                type="button"
                onClick={openCreateModal}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Property Type
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--color-background-soft)] border-b border-[var(--color-border-light)]">
                  <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Property Type
                  </th>
                  <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Code
                  </th>
                  <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Features
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
                {filteredTypes.map((type) => {
                  const IconComp = ICON_MAP[type.icon] || Layers;
                  const isRowLoading = actionLoadingId === type.id;

                  const featureChips = [
                    type.features?.sale && "Sale",
                    type.features?.rent && "Rent",
                    type.features?.lease && "Lease",
                    type.features?.area && "Area",
                    type.features?.bedrooms && "Beds",
                    type.features?.bathrooms && "Baths",
                    type.features?.furnishing && "Furnishing",
                    type.features?.parking && "Parking",
                  ].filter(Boolean);

                  return (
                    <tr
                      key={type.id}
                      className="hover:bg-[var(--color-background-soft)]/50 transition-colors"
                    >
                      {/* Type cell */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center">
                            <IconComp className="w-5 h-5 text-[var(--color-primary)]" />
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-[var(--color-navy)]">
                                {type.name}
                              </p>
                              {type.is_featured && (
                                <Star className="w-3.5 h-3.5 fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                              )}
                            </div>
                            {type.description && (
                              <p className="text-xs text-[var(--color-text-muted)] line-clamp-1 max-w-xs">
                                {type.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Code cell */}
                      <td className="px-5 py-4">
                        <code className="px-2 py-1 rounded bg-[var(--color-background-muted)] text-[11px] font-mono text-[var(--color-text-secondary)]">
                          {type.code}
                        </code>
                      </td>

                      {/* Features cell */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[260px]">
                          {featureChips.length > 0 ? (
                            featureChips.slice(0, 4).map((chip) => (
                              <span
                                key={chip}
                                className="px-2 py-0.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-[10px] font-bold"
                              >
                                {chip}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-[var(--color-text-light)]">
                              —
                            </span>
                          )}
                          {featureChips.length > 4 && (
                            <span className="px-2 py-0.5 rounded-full bg-[var(--color-background-muted)] text-[var(--color-text-muted)] text-[10px] font-bold">
                              +{featureChips.length - 4}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status cell */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            type.is_active
                              ? "bg-[var(--color-success-light)] text-[var(--color-success)]"
                              : "bg-[var(--color-background-muted)] text-[var(--color-text-muted)]"
                          }`}
                        >
                          {type.is_active ? (
                            <Eye className="w-3 h-3" />
                          ) : (
                            <EyeOff className="w-3 h-3" />
                          )}
                          {type.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {/* Toggle active */}
                          <button
                            type="button"
                            onClick={() => handleToggleActive(type)}
                            disabled={isRowLoading}
                            title={
                              type.is_active
                                ? "Deactivate"
                                : "Activate"
                            }
                            className={`w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] transition-colors ${
                              type.is_active
                                ? "text-[var(--color-warning)] hover:bg-[var(--color-warning-light)]"
                                : "text-[var(--color-success)] hover:bg-[var(--color-success-light)]"
                            } disabled:opacity-50`}
                          >
                            {isRowLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : type.is_active ? (
                              <PowerOff className="w-4 h-4" />
                            ) : (
                              <Power className="w-4 h-4" />
                            )}
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => openEditModal(type)}
                            title="Edit"
                            className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(type.id)}
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
      </div>

      {/* =========================================================
          CREATE / EDIT MODAL
          ========================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[var(--color-navy-dark)]/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal panel */}
          <div className="relative w-full max-w-lg bg-white rounded-[var(--radius-2xl)] shadow-[var(--shadow-xl)] overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-light)] shrink-0">
              <div>
                <h2 className="text-lg font-bold text-[var(--color-navy)]">
                  {modalMode === "create"
                    ? "Add Property Type"
                    : "Edit Property Type"}
                </h2>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {modalMode === "create"
                    ? "Create a new category for listings."
                    : "Update the details of this property type."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={formSaving}
                className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-background-soft)] hover:text-[var(--color-navy)] transition-colors disabled:opacity-50"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
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

              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Name <span className="text-[var(--color-danger)]">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="e.g. Office Space"
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                />
              </div>

              {/* Code */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Code <span className="text-[var(--color-danger)]">*</span>
                </label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) =>
                    setField("code", e.target.value.toUpperCase())
                  }
                  placeholder="OFFICE_SPACE"
                  className="w-full px-4 py-3 text-sm font-mono rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                />
                <p className="mt-1 text-[11px] text-[var(--color-text-light)]">
                  Unique identifier — uppercase letters and underscores only.
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="Short description of this property type…"
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors resize-none outline-none"
                />
              </div>

              {/* Feature toggles */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                  Supported Listing Types
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "supports_sale", label: "Sale" },
                    { key: "supports_rent", label: "Rent" },
                    { key: "supports_lease", label: "Lease" },
                    { key: "supports_area", label: "Area" },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center gap-2.5 p-3 rounded-[var(--radius-md)] border border-[var(--color-border-light)] bg-[var(--color-background-soft)] hover:border-[var(--color-primary)]/40 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={form[key]}
                        onChange={(e) => setField(key, e.target.checked)}
                        className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-[var(--color-text)]">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status toggles */}
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2.5 p-3 rounded-[var(--radius-md)] border border-[var(--color-border-light)] bg-[var(--color-background-soft)] hover:border-[var(--color-primary)]/40 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => setField("is_active", e.target.checked)}
                    className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-[var(--color-text)]">
                    Active
                  </span>
                </label>
                <label className="flex items-center gap-2.5 p-3 rounded-[var(--radius-md)] border border-[var(--color-border-light)] bg-[var(--color-background-soft)] hover:border-[var(--color-primary)]/40 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) =>
                      setField("is_featured", e.target.checked)
                    }
                    className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-[var(--color-text)]">
                    Featured
                  </span>
                </label>
              </div>

              {/* Footer buttons */}
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
          DELETE CONFIRMATION MODAL
          ========================================================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[var(--color-navy-dark)]/60 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteConfirmId(null)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] p-6">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-danger-light)] flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-[var(--color-danger)]" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-navy)]">
                  Delete Property Type?
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  This action cannot be undone. Any listings attached to this
                  type may be affected.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
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

export default ManagePropertyType;