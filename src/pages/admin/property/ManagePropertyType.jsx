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
  ChevronRight,
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
  Eye,
  EyeOff,
  FolderTree,
  CornerDownRight,
} from "lucide-react";
import { api } from "../../../service/api";

/* =========================================================
   API ENDPOINTS (Property Categories)
   GET    /api/v1/admin/property-categories             → list (paginated)
   POST   /api/v1/admin/property-categories             → create
   PUT    /api/v1/admin/property-categories/:id         → update
   PATCH  /api/v1/admin/property-categories/:id         → partial (active toggle)
   DELETE /api/v1/admin/property-categories/:id         → delete
   ========================================================= */

/* ---------- Icon map ---------- */
const ICON_MAP = {
  house: Home,
  "building-2": Building2,
  building: Building2,
  store: Store,
  map: Map,
  bed: Bed,
};

/* ---------- Empty form ---------- */
const EMPTY_FORM = {
  name: "",
  description: "",
  icon: "",
  sort_order: 0,
  is_active: true,
  parent_id: null,
};

const ManagePropertyType = () => {
  // ---------- Raw data from ALL pages ----------
  const [categories, setCategories] = useState([]);
  // ---------- Purely for "showing X of Y" text ----------
  const [meta, setMeta] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const statusRef = useRef(null);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [formSaving, setFormSaving] = useState(false);
  const [isChildMode, setIsChildMode] = useState(false);

  // Delete
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Expanded parents
  const [expandedParents, setExpandedParents] = useState({});

  /* =========================================================
     FETCH ALL PAGES
     The API paginates children first (DESC by id), so the
     parent categories land on later pages. We MUST fetch every
     page and merge before building the tree, otherwise page 1
     only contains children and the tree renders blank.
     ========================================================= */
  const fetchAllCategories = async () => {
    setLoading(true);
    setError("");
    try {
      // First request — page 1
      const firstRes = await api.get("/admin/property-categories", {
        params: { page: 1 },
      });

      const firstBody = firstRes?.data;
      const firstList = Array.isArray(firstBody?.data)
        ? firstBody.data
        : firstBody?.data?.property_categories || [];
      const pag = firstBody?.pagination || null;

      const lastPage = pag?.last_page || 1;

      // Fetch remaining pages in parallel
      let allItems = [...firstList];

      if (lastPage > 1) {
        const pagePromises = [];
        for (let p = 2; p <= lastPage; p++) {
          pagePromises.push(
            api.get("/admin/property-categories", { params: { page: p } })
          );
        }

        const results = await Promise.all(pagePromises);

        results.forEach((r) => {
          const body = r?.data;
          const list = Array.isArray(body?.data)
            ? body.data
            : body?.data?.property_categories || [];
          allItems = [...allItems, ...list];
        });
      }

      // Dedupe by id (defensive, in case API overlaps)
      const seen = new Set();
      const deduped = allItems.filter((item) => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      });

      setCategories(deduped);
      setMeta({ total: pag?.total ?? deduped.length });

      // Auto-expand all parents that have children
      const parentIdsWithChildren = {};
      deduped.forEach((item) => {
        if (item.parent_id) parentIdsWithChildren[item.parent_id] = true;
      });
      setExpandedParents((prev) => ({ ...prev, ...parentIdsWithChildren }));
    } catch (err) {
      setError(
        err?.message ||
          "Failed to load property categories. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- Outside click for status filter ---------- */
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

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (formError) setFormError("");
  };

  const parentOptions = categories.filter((c) => !c.parent_id);

  /* =========================================================
     OPEN MODALS
     ========================================================= */
  const openCreateModal = (parentId = null) => {
    setModalMode("create");
    setEditingId(null);
    setIsChildMode(!!parentId);
    setForm({ ...EMPTY_FORM, parent_id: parentId });
    setFormError("");
    setModalOpen(true);
    clearBanners();
  };

  const openEditModal = (cat) => {
    setModalMode("edit");
    setEditingId(cat.id);
    setIsChildMode(!!cat.parent_id);
    setForm({
      name: cat.name || "",
      description: cat.description || "",
      icon: cat.icon || "",
      sort_order: cat.sort_order ?? 0,
      is_active: !!cat.is_active,
      parent_id: cat.parent_id ?? null,
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
    setIsChildMode(false);
  };

  /* =========================================================
     CREATE / UPDATE
     ========================================================= */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.name.trim()) {
      setFormError("Category name is required.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description || null,
      icon: form.icon || null,
      sort_order: Number(form.sort_order) || 0,
      is_active: !!form.is_active,
    };

    if (isChildMode) {
      if (!form.parent_id) {
        setFormError("Please select a parent category.");
        return;
      }
      payload.parent_id = Number(form.parent_id);
    } else {
      payload.parent_id = null;
    }

    setFormSaving(true);

    try {
      if (modalMode === "create") {
        const res = await api.post("/admin/property-categories", payload);
        setSuccess(
          res?.data?.message || "Property category created successfully."
        );
      } else {
        const res = await api.put(
          `/admin/property-categories/${editingId}`,
          payload
        );
        setSuccess(
          res?.data?.message || "Property category updated successfully."
        );
      }
      closeModal();
      await fetchAllCategories();
    } catch (err) {
      let message =
        err?.message ||
        err?.data?.message ||
        "Failed to save category. Please try again.";

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
     TOGGLE ACTIVE
     ========================================================= */
  const handleToggleActive = async (cat) => {
    setActionLoadingId(cat.id);
    clearBanners();

    try {
      const res = await api.patch(`/admin/property-categories/${cat.id}`, {
        is_active: !cat.is_active,
      });

      const updated =
        res?.data?.data?.property_category || res?.data?.data || null;

      setCategories((prev) =>
        prev.map((c) =>
          c.id === cat.id ? updated || { ...c, is_active: !c.is_active } : c
        )
      );

      setSuccess(
        res?.data?.message ||
          `Category ${!cat.is_active ? "activated" : "deactivated"}.`
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
        `/admin/property-categories/${deleteConfirm.id}`
      );
      setCategories((prev) =>
        prev.filter((c) => c.id !== deleteConfirm.id)
      );
      setSuccess(res?.data?.message || "Category deleted successfully.");
      setDeleteConfirm(null);
      await fetchAllCategories();
    } catch (err) {
      setError(err?.message || "Failed to delete category.");
    } finally {
      setDeleting(false);
    }
  };

  /* =========================================================
     TREE BUILDER — handles orphans gracefully
     ========================================================= */
  const buildTree = (list) => {
    const parents = [];
    const childrenMap = {};
    const orphans = []; // children whose parent isn't in the list

    const parentIds = new Set(
      list.filter((c) => !c.parent_id).map((c) => c.id)
    );

    list.forEach((item) => {
      if (!item.parent_id) {
        parents.push(item);
      } else {
        if (!childrenMap[item.parent_id]) childrenMap[item.parent_id] = [];
        childrenMap[item.parent_id].push(item);

        // If parent isn't in the list, it's an orphan
        if (!parentIds.has(item.parent_id)) {
          orphans.push(item);
        }
      }
    });

    return { parents, childrenMap, orphans };
  };

  /* ---------- Filter ---------- */
  const filtered = categories.filter((cat) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      cat.name.toLowerCase().includes(q) ||
      cat.slug.toLowerCase().includes(q) ||
      (cat.description || "").toLowerCase().includes(q) ||
      (cat.parent?.name || "").toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && cat.is_active) ||
      (statusFilter === "inactive" && !cat.is_active);

    return matchesSearch && matchesStatus;
  });

  const { parents, childrenMap, orphans } = buildTree(filtered);

  /* ---------- Stats ---------- */
  const totalCount = categories.length;
  const parentCount = categories.filter((c) => !c.parent_id).length;
  const childCount = categories.filter((c) => c.parent_id).length;
  const activeCount = categories.filter((c) => c.is_active).length;

  const toggleExpand = (id) =>
    setExpandedParents((prev) => ({ ...prev, [id]: !prev[id] }));

  /* =========================================================
     UI
     ========================================================= */
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-navy)]">
            Property Categories
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Manage parent and child categories for properties on the platform.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openCreateModal(null)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: totalCount, icon: Layers, accent: "primary" },
          { label: "Parents", value: parentCount, icon: FolderTree, accent: "gold" },
          { label: "Children", value: childCount, icon: CornerDownRight, accent: "primary" },
          { label: "Active", value: activeCount, icon: CheckCircle2, accent: "success" },
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
            placeholder="Search by name, slug, description, or parent…"
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
          />
        </div>

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

      {/* List */}
      <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
            <p className="text-sm text-[var(--color-text-muted)]">
              Loading categories…
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <span className="w-16 h-16 mx-auto rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
              <Layers className="w-8 h-8 text-[var(--color-primary)]" />
            </span>
            <h3 className="mt-4 text-base font-bold text-[var(--color-navy)]">
              {searchQuery || statusFilter !== "all"
                ? "No matching categories"
                : "No categories yet"}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filter."
                : "Create your first property category to get started."}
            </p>
            {!searchQuery && statusFilter === "all" && (
              <button
                type="button"
                onClick={() => openCreateModal(null)}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-border-light)]">
            {parents.map((parent) => {
              const children = childrenMap[parent.id] || [];
              const isExpanded = expandedParents[parent.id];
              const ParentIcon = ICON_MAP[parent.icon] || Layers;

              return (
                <div key={parent.id}>
                  {/* Parent row */}
                  <div className="flex items-center gap-3 px-5 py-4 hover:bg-[var(--color-background-soft)]/50 transition-colors">
                    <button
                      type="button"
                      onClick={() => toggleExpand(parent.id)}
                      className={`w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] transition-colors ${
                        children.length > 0
                          ? "text-[var(--color-text-muted)] hover:bg-[var(--color-background-muted)] hover:text-[var(--color-navy)]"
                          : "text-transparent cursor-default"
                      }`}
                      disabled={children.length === 0}
                    >
                      {children.length > 0 &&
                        (isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        ))}
                    </button>

                    <span className="w-10 h-10 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center">
                      <ParentIcon className="w-5 h-5 text-[var(--color-primary)]" />
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-[var(--color-navy)]">
                          {parent.name}
                        </p>
                        <span className="px-2 py-0.5 rounded-full bg-[var(--color-secondary-light)] text-[var(--color-secondary-dark)] text-[10px] font-bold">
                          Parent
                        </span>
                        {children.length > 0 && (
                          <span className="text-[10px] font-semibold text-[var(--color-text-muted)]">
                            {children.length} child
                            {children.length !== 1 ? "ren" : ""}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        {parent.slug}
                        {parent.description ? ` · ${parent.description}` : ""}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        parent.is_active
                          ? "bg-[var(--color-success-light)] text-[var(--color-success)]"
                          : "bg-[var(--color-background-muted)] text-[var(--color-text-muted)]"
                      }`}
                    >
                      {parent.is_active ? (
                        <Eye className="w-3 h-3" />
                      ) : (
                        <EyeOff className="w-3 h-3" />
                      )}
                      {parent.is_active ? "Active" : "Inactive"}
                    </span>

                    <div className="shrink-0 flex items-center gap-1">
                      {/* <button
                        type="button"
                        onClick={() => handleToggleActive(parent)}
                        disabled={actionLoadingId === parent.id}
                        title={parent.is_active ? "Deactivate" : "Activate"}
                        className={`w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] transition-colors ${
                          parent.is_active
                            ? "text-[var(--color-warning)] hover:bg-[var(--color-warning-light)]"
                            : "text-[var(--color-success)] hover:bg-[var(--color-success-light)]"
                        } disabled:opacity-50`}
                      >
                        {actionLoadingId === parent.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : parent.is_active ? (
                          <PowerOff className="w-4 h-4" />
                        ) : (
                          <Power className="w-4 h-4" />
                        )}
                      </button> */}

                      <button
                        type="button"
                        onClick={() => openCreateModal(parent.id)}
                        title="Add child category"
                        className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-navy)] hover:bg-[var(--color-background-muted)] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(parent)}
                        title="Edit"
                        className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirm({
                            id: parent.id,
                            name: parent.name,
                            isParent: true,
                          })
                        }
                        title="Delete"
                        className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-danger)] hover:bg-[var(--color-danger-light)] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  {isExpanded && children.length > 0 && (
                    <div className="bg-[var(--color-background-soft)]/50 border-t border-[var(--color-border-light)]">
                      {children.map((child) => {
                        const ChildIcon = ICON_MAP[child.icon] || Layers;
                        return (
                          <div
                            key={child.id}
                            className="flex items-center gap-3 pl-14 pr-5 py-3 border-b border-[var(--color-border-light)] last:border-0 hover:bg-[var(--color-background-soft)] transition-colors"
                          >
                            <CornerDownRight className="w-3.5 h-3.5 text-[var(--color-text-light)] shrink-0" />
                            <span className="w-8 h-8 shrink-0 rounded-[var(--radius-sm)] bg-white border border-[var(--color-border-light)] flex items-center justify-center">
                              <ChildIcon className="w-4 h-4 text-[var(--color-primary)]" />
                            </span>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-[var(--color-navy)]">
                                {child.name}
                              </p>
                              <p className="text-[11px] text-[var(--color-text-muted)]">
                                {child.slug}
                              </p>
                            </div>

                            <span
                              className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                child.is_active
                                  ? "bg-[var(--color-success-light)] text-[var(--color-success)]"
                                  : "bg-[var(--color-background-muted)] text-[var(--color-text-muted)]"
                              }`}
                            >
                              {child.is_active ? "Active" : "Inactive"}
                            </span>

                            <div className="shrink-0 flex items-center gap-1">
                              {/* <button
                                type="button"
                                onClick={() => handleToggleActive(child)}
                                disabled={actionLoadingId === child.id}
                                className={`w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] transition-colors ${
                                  child.is_active
                                    ? "text-[var(--color-warning)] hover:bg-[var(--color-warning-light)]"
                                    : "text-[var(--color-success)] hover:bg-[var(--color-success-light)]"
                                } disabled:opacity-50`}
                              >
                                {actionLoadingId === child.id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : child.is_active ? (
                                  <PowerOff className="w-3.5 h-3.5" />
                                ) : (
                                  <Power className="w-3.5 h-3.5" />
                                )}
                              </button> */}

                              <button
                                type="button"
                                onClick={() => openEditModal(child)}
                                className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  setDeleteConfirm({
                                    id: child.id,
                                    name: child.name,
                                    isParent: false,
                                  })
                                }
                                className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-danger)] hover:bg-[var(--color-danger-light)] transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* ---------- Orphan children (parent not in list) ---------- */}
            {orphans.length > 0 && (
              <div className="px-5 py-4 bg-[var(--color-warning-light)]/40 border-t border-[var(--color-warning)]/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-[var(--color-warning)]" />
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-warning)]">
                    {orphans.length} uncategorized sub-categories
                  </p>
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] mb-3">
                  These sub-categories exist but their parent category is not
                  loaded. This usually means the parent is on a different page
                  or was deleted.
                </p>
                {orphans.map((child) => (
                  <div
                    key={`orphan-${child.id}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-light)] mb-2 last:mb-0"
                  >
                    <CornerDownRight className="w-3.5 h-3.5 text-[var(--color-text-light)] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--color-navy)]">
                        {child.name}
                      </p>
                      <p className="text-[11px] text-[var(--color-text-muted)]">
                        parent_id: {child.parent_id}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openEditModal(child)}
                      className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer count */}
        {!loading && filtered.length > 0 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-[var(--color-border-light)] bg-[var(--color-background-soft)]/40">
            <p className="text-xs text-[var(--color-text-muted)]">
              Showing {filtered.length} of {meta.total} categories
            </p>
            <p className="text-[11px] text-[var(--color-text-light)]">
              {parents.length} parent{parents.length !== 1 ? "s" : ""} ·{" "}
              {childCount} child{childCount !== 1 ? "ren" : ""}
            </p>
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
                  {modalMode === "create"
                    ? isChildMode
                      ? "Add Child Category"
                      : "Add Parent Category"
                    : "Edit Category"}
                </h2>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {modalMode === "create"
                    ? isChildMode
                      ? "Create a subcategory under an existing parent."
                      : "Create a top-level property category."
                    : "Update the details of this category."}
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

              {modalMode === "create" && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsChildMode(false);
                      setField("parent_id", null);
                    }}
                    className={`flex items-center justify-center gap-2 p-3 rounded-[var(--radius-md)] border-2 transition-all text-sm font-bold ${
                      !isChildMode
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]/40 text-[var(--color-primary)]"
                        : "border-[var(--color-border-light)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-primary)]/40"
                    }`}
                  >
                    <FolderTree className="w-4 h-4" />
                    Parent
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsChildMode(true)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-[var(--radius-md)] border-2 transition-all text-sm font-bold ${
                      isChildMode
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]/40 text-[var(--color-primary)]"
                        : "border-[var(--color-border-light)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-primary)]/40"
                    }`}
                  >
                    <CornerDownRight className="w-4 h-4" />
                    Child
                  </button>
                </div>
              )}

              {isChildMode && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                    Parent Category{" "}
                    <span className="text-[var(--color-danger)]">*</span>
                  </label>
                  <select
                    value={form.parent_id || ""}
                    onChange={(e) =>
                      setField(
                        "parent_id",
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none appearance-none cursor-pointer"
                  >
                    <option value="">— Select parent —</option>
                    {parentOptions.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Name <span className="text-[var(--color-danger)]">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder={
                    isChildMode ? "e.g. Luxury Apartments" : "e.g. Commercial"
                  }
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="Short description of this category…"
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors resize-none outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                    Icon
                  </label>
                  <select
                    value={form.icon}
                    onChange={(e) => setField("icon", e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none appearance-none cursor-pointer"
                  >
                    <option value="">— None —</option>
                    <option value="house">House</option>
                    <option value="building-2">Building</option>
                    <option value="building">Building (alt)</option>
                    <option value="store">Store</option>
                    <option value="map">Map</option>
                    <option value="bed">Bed</option>
                  </select>
                </div>

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
                </div>
              </div>

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
                  Delete Category?
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  You're about to delete{" "}
                  <span className="font-semibold text-[var(--color-navy)]">
                    "{deleteConfirm.name}"
                  </span>
                  .{deleteConfirm.isParent && (
                    <> Any child categories under it may also be affected.</>
                  )}{" "}
                  This action cannot be undone.
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

export default ManagePropertyType;