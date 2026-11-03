import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Building2,
  Home,
  MapPin,
  IndianRupee,
  Bed,
  Bath,
  Maximize,
  Layers,
  Image as ImageIcon,
  Upload,
  Star,
  Camera,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { api } from "../../../service/api";

/* =========================================================
   API ENDPOINTS
   GET    /api/v1/my-properties
   POST   /api/v1/my-properties
   PUT    /api/v1/my-properties/:id
   DELETE /api/v1/my-properties/:id
   GET    /api/v1/property-categories
   ========================================================= */

const LISTING_TYPES = [
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
  { value: "lease", label: "For Lease" },
];

const FURNISHING_OPTIONS = [
  { value: "unfurnished", label: "Unfurnished" },
  { value: "semi_furnished", label: "Semi-Furnished" },
  { value: "furnished", label: "Fully Furnished" },
];

const POSSESSION_OPTIONS = [
  { value: "ready_to_move", label: "Ready to Move" },
  { value: "under_construction", label: "Under Construction" },
  { value: "new_launch", label: "New Launch" },
];

const AREA_UNITS = ["sqft", "sqm", "sqyd", "acres", "hectares"];

const EMPTY_FORM = {
  property_category_id: "",
  listing_type: "sale",
  title: "",
  description: "",
  price: "",
  price_negotiable: false,
  maintenance_charge: "",
  security_deposit: "",
  built_up_area: "",
  carpet_area: "",
  plot_area: "",
  area_unit: "sqft",
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  furnishing_status: "",
  floor_number: "",
  total_floors: "",
  property_age: "",
  possession_status: "",
  available_from: "",
  meta_title: "",
  meta_description: "",
  location: {
    country: "India",
    state: "",
    city: "",
    locality: "",
    pincode: "",
    address: "",
    landmark: "",
    latitude: "",
    longitude: "",
  },
  amenity_ids: [],
  details: {
    facing: "",
    road_width: "",
  },
};

const ManageMyProperty = () => {
    const storageUrl = import.meta.env.VITE_API_STORAGE_URL || "";
  // ---------- Data ----------
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [amenities, setAmenities] = useState([]);

  // ---------- State ----------
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [typeFilterOpen, setTypeFilterOpen] = useState(false);
  const typeFilterRef = useRef(null);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [formStep, setFormStep] = useState(1);
  const [form, setForm] = useState(EMPTY_FORM);
  const [images, setImages] = useState([]); // { file, preview, alt }
  const [existingMedia, setExistingMedia] = useState([]);
  const [formError, setFormError] = useState("");
  const [formSaving, setFormSaving] = useState(false);

  // Delete
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const TOTAL_STEPS = 5;

  /* =========================================================
     FETCH PROPERTIES
     ========================================================= */
  const fetchProperties = async (targetPage = page) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/my-properties", {
        params: { page: targetPage },
      });
      const body = res?.data;
      const list = Array.isArray(body?.data) ? body.data : [];
      setProperties(list);
      setPagination(body?.pagination || null);
    } catch (err) {
      setError(
        err?.message || "Failed to load properties. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FETCH CATEGORIES
     ========================================================= */
  const fetchCategories = async () => {
    try {
      const res = await api.get("/property-categories");
      const body = res?.data;
      const list = Array.isArray(body?.data)
        ? body.data
        : body?.data?.property_categories || [];
      setCategories(list);

      // Build amenity list from all properties (fallback if no dedicated endpoint)
      const amenityMap = {};
      properties.forEach((p) => {
        (p.amenities || []).forEach((a) => {
          amenityMap[a.id] = a;
        });
      });
      setAmenities(Object.values(amenityMap));
    } catch {
      // Silent
    }
  };

  useEffect(() => {
    fetchProperties(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ---------- Outside click for filter ---------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (typeFilterRef.current && !typeFilterRef.current.contains(event.target)) {
        setTypeFilterOpen(false);
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

  const setLocationField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      location: { ...prev.location, [key]: value },
    }));
    if (formError) setFormError("");
  };

  const setDetailField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      details: { ...prev.details, [key]: value },
    }));
  };

  const toggleAmenity = (id) => {
    setForm((prev) => ({
      ...prev,
      amenity_ids: prev.amenity_ids.includes(id)
        ? prev.amenity_ids.filter((a) => a !== id)
        : [...prev.amenity_ids, id],
    }));
  };

  /* ---------- Category dropdown (flat with parent path) ---------- */
  const categoryOptions = [];
  categories.forEach((parent) => {
    categoryOptions.push({ value: String(parent.id), label: parent.name });
    (parent.children || []).forEach((child) => {
      categoryOptions.push({
        value: String(child.id),
        label: `  ↳ ${parent.name} → ${child.name}`,
      });
    });
  });

  /* ---------- Image handling ---------- */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      alt: "",
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[index].preview);
      copy.splice(index, 1);
      return copy;
    });
  };

  const setImageAlt = (index, alt) => {
    setImages((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], alt };
      return copy;
    });
  };

  const removeExistingMedia = (mediaId) => {
    setExistingMedia((prev) => prev.filter((m) => m.id !== mediaId));
  };

  /* =========================================================
     OPEN MODAL
     ========================================================= */
  const openCreateModal = () => {
    setModalMode("create");
    setEditingId(null);
    setFormStep(1);
    setForm({ ...EMPTY_FORM });
    setImages([]);
    setExistingMedia([]);
    setFormError("");
    setModalOpen(true);
    clearBanners();
  };

  const openEditModal = (property) => {
    setModalMode("edit");
    setEditingId(property.id);
    setFormStep(1);
    setForm({
      property_category_id: String(property.category?.id || ""),
      listing_type: property.listing_type || "sale",
      title: property.title || "",
      description: property.description || "",
      price: property.price || "",
      price_negotiable: !!property.price_negotiable,
      maintenance_charge: property.maintenance_charge || "",
      security_deposit: property.security_deposit || "",
      built_up_area: property.built_up_area || "",
      carpet_area: property.carpet_area || "",
      plot_area: property.plot_area || "",
      area_unit: property.area_unit || "sqft",
      bedrooms: property.bedrooms ?? "",
      bathrooms: property.bathrooms ?? "",
      balconies: property.balconies ?? "",
      furnishing_status: property.furnishing_status || "",
      floor_number: property.floor_number ?? "",
      total_floors: property.total_floors ?? "",
      property_age: property.property_age ?? "",
      possession_status: property.possession_status || "",
      available_from: property.available_from || "",
      meta_title: property.seo?.meta_title || "",
      meta_description: property.seo?.meta_description || "",
      location: {
        country: property.location?.country || "India",
        state: property.location?.state || "",
        city: property.location?.city || "",
        locality: property.location?.locality || "",
        pincode: property.location?.pincode || "",
        address: property.location?.address || "",
        landmark: property.location?.landmark || "",
        latitude: property.location?.latitude || "",
        longitude: property.location?.longitude || "",
      },
      amenity_ids: (property.amenities || []).map((a) => a.id),
      details: {
        facing: property.details?.facing || "",
        road_width: property.details?.road_width || "",
      },
    });
    setImages([]);
    setExistingMedia(property.media || []);
    setFormError("");
    setModalOpen(true);
    clearBanners();
  };

  const closeModal = () => {
    if (formSaving) return;
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImages([]);
    setExistingMedia([]);
    setFormError("");
    setFormStep(1);
  };

  /* =========================================================
     SUBMIT — FormData with nested keys
     ========================================================= */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Validate
    if (!form.property_category_id) {
      setFormStep(1);
      setFormError("Please select a property category.");
      return;
    }
    if (!form.title.trim()) {
      setFormStep(1);
      setFormError("Property title is required.");
      return;
    }
    if (!form.price) {
      setFormStep(2);
      setFormError("Price is required.");
      return;
    }

    setFormSaving(true);

    try {
      const fd = new FormData();

      // Basic fields
      fd.append("property_category_id", form.property_category_id);
      fd.append("listing_type", form.listing_type);
      fd.append("title", form.title.trim());
      fd.append("description", form.description || "");
      fd.append("price", form.price);
      fd.append("price_negotiable", form.price_negotiable ? "1" : "0");
      if (form.maintenance_charge) fd.append("maintenance_charge", form.maintenance_charge);
      if (form.security_deposit) fd.append("security_deposit", form.security_deposit);
      if (form.built_up_area) fd.append("built_up_area", form.built_up_area);
      if (form.carpet_area) fd.append("carpet_area", form.carpet_area);
      if (form.plot_area) fd.append("plot_area", form.plot_area);
      fd.append("area_unit", form.area_unit);
      if (form.bedrooms) fd.append("bedrooms", form.bedrooms);
      if (form.bathrooms) fd.append("bathrooms", form.bathrooms);
      if (form.balconies) fd.append("balconies", form.balconies);
      if (form.furnishing_status) fd.append("furnishing_status", form.furnishing_status);
      if (form.floor_number) fd.append("floor_number", form.floor_number);
      if (form.total_floors) fd.append("total_floors", form.total_floors);
      if (form.property_age) fd.append("property_age", form.property_age);
      if (form.possession_status) fd.append("possession_status", form.possession_status);
      if (form.available_from) fd.append("available_from", form.available_from);

      // SEO
      if (form.meta_title) fd.append("meta_title", form.meta_title);
      if (form.meta_description) fd.append("meta_description", form.meta_description);

      // Location (nested)
      Object.entries(form.location).forEach(([key, value]) => {
        if (value) fd.append(`location[${key}]`, value);
      });

      // Amenities
      form.amenity_ids.forEach((id, i) => {
        fd.append(`amenity_ids[${i}]`, id);
      });

      // Details (nested)
      if (form.details.facing) fd.append("details[facing]", form.details.facing);
      if (form.details.road_width) fd.append("details[road_width]", form.details.road_width);

      // New images
      images.forEach((img, i) => {
        fd.append(`images[${i}][image]`, img.file);
        if (img.alt) fd.append(`images[${i}][image_alt]`, img.alt);
      });

      if (modalMode === "create") {
        const res = await api.post("/my-properties", fd);
        setSuccess(res?.data?.message || "Property created successfully.");
      } else {
        // Method spoofing for PUT with FormData
        fd.append("_method", "PUT");
        const res = await api.post(`/my-properties/${editingId}`, fd);
        setSuccess(res?.data?.message || "Property updated successfully.");
      }

      closeModal();
      await fetchProperties(page);
    } catch (err) {
      let message =
        err?.message ||
        err?.data?.message ||
        "Failed to save property. Please try again.";

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
     DELETE
     ========================================================= */
  const handleDelete = async () => {
    if (!deleteConfirm) return;

    setDeleting(true);
    clearBanners();

    try {
      const res = await api.delete(`/my-properties/${deleteConfirm.id}`);
      setProperties((prev) => prev.filter((p) => p.id !== deleteConfirm.id));
      setSuccess(res?.data?.message || "Property deleted successfully.");
      setDeleteConfirm(null);
      await fetchProperties(page);
    } catch (err) {
      setError(err?.message || "Failed to delete property.");
    } finally {
      setDeleting(false);
    }
  };

  /* =========================================================
     FILTER
     ========================================================= */
  const filtered = properties.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q) ||
      (p.location?.city || "").toLowerCase().includes(q) ||
      (p.category?.name || "").toLowerCase().includes(q);

    const matchesType =
      typeFilter === "all" || p.listing_type === typeFilter;

    return matchesSearch && matchesType;
  });

  const formatPrice = (value) => {
    if (!value) return "—";
    const num = Number(value);
    if (isNaN(num)) return value;
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  /* =========================================================
     UI
     ========================================================= */
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-navy)]">
            My Properties
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Manage the properties you've listed for sale, rent, or lease.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </button>
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
            placeholder="Search by title, city, or category…"
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
          />
        </div>

        <div className="relative" ref={typeFilterRef}>
          <button
            type="button"
            onClick={() => setTypeFilterOpen((o) => !o)}
            className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-[var(--radius-md)] bg-white border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
          >
            <Filter className="w-4 h-4" />
            {typeFilter === "all"
              ? "All Types"
              : LISTING_TYPES.find((t) => t.value === typeFilter)?.label}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                typeFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {typeFilterOpen && (
            <div className="absolute top-full right-0 mt-1 w-44 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] z-30 overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  setTypeFilter("all");
                  setTypeFilterOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  typeFilter === "all"
                    ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-soft)]"
                }`}
              >
                All Types
              </button>
              {LISTING_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => {
                    setTypeFilter(t.value);
                    setTypeFilterOpen(false);
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

      {/* Grid of property cards */}
      <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-4">
        {loading ? (
          <div className="p-12 flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
            <p className="text-sm text-[var(--color-text-muted)]">
              Loading properties…
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <span className="w-16 h-16 mx-auto rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
              <Building2 className="w-8 h-8 text-[var(--color-primary)]" />
            </span>
            <h3 className="mt-4 text-base font-bold text-[var(--color-navy)]">
              {searchQuery || typeFilter !== "all"
                ? "No matching properties"
                : "No properties yet"}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {searchQuery || typeFilter !== "all"
                ? "Try adjusting your search or filter."
                : "List your first property to get started."}
            </p>
            {!searchQuery && typeFilter === "all" && (
              <button
                type="button"
                onClick={openCreateModal}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Property
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((property) => {
              const primaryImage =
                property.media?.find((m) => m.is_primary)?.file_path ||
                `${storageUrl}${property.media?.[0]?.file_path}`;
              const isRowLoading = actionLoadingId === property.id;

              return (
                <div
                  key={property.id}
                  className="group bg-white rounded-[var(--radius-lg)] border border-[var(--color-border-light)] overflow-hidden hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-background-muted)]">
                    {primaryImage ? (
                      <img
                        src={`${storageUrl}${primaryImage}`}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-[var(--color-text-light)]" />
                      </div>
                    )}

                    {/* Listing type badge */}
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-full shadow-sm ${
                        property.listing_type === "sale"
                          ? "bg-[var(--color-primary)] text-white"
                          : property.listing_type === "rent"
                            ? "bg-[var(--color-info)] text-white"
                            : "bg-[var(--color-navy)] text-white"
                      }`}
                    >
                      {LISTING_TYPES.find((t) => t.value === property.listing_type)
                        ?.label || property.listing_type}
                    </span>

                    {property.is_featured && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-secondary)] text-[var(--color-navy)] text-[10px] font-bold shadow-sm">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-[var(--color-navy)] leading-snug line-clamp-2">
                      {property.title}
                    </h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                      {[property.location?.locality, property.location?.city]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </p>

                    <p className="mt-3 text-xl font-black text-[var(--color-primary)]">
                      {formatPrice(property.price)}
                      {property.price_negotiable && (
                        <span className="ml-1 text-xs font-semibold text-[var(--color-text-muted)]">
                          Negotiable
                        </span>
                      )}
                    </p>

                    {/* Specs */}
                    <div className="mt-3 flex items-center gap-3 text-xs text-[var(--color-text-secondary)] flex-wrap">
                      {property.bedrooms && (
                        <span className="inline-flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                          {property.bedrooms}
                        </span>
                      )}
                      {property.bathrooms && (
                        <span className="inline-flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                          {property.bathrooms}
                        </span>
                      )}
                      {property.built_up_area && (
                        <span className="inline-flex items-center gap-1">
                          <Maximize className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                          {property.built_up_area} {property.area_unit}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t border-[var(--color-border-light)] flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-light)]">
                        #{property.id}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(property)}
                          disabled={isRowLoading}
                          title="Edit"
                          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors disabled:opacity-50"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteConfirm({
                              id: property.id,
                              name: property.title,
                            })
                          }
                          title="Delete"
                          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-danger)] hover:bg-[var(--color-danger-light)] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="flex items-center justify-between px-2 py-4 mt-4 border-t border-[var(--color-border-light)]">
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
          CREATE / EDIT MODAL (Multi-Step)
          ========================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[var(--color-navy-dark)]/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-[var(--radius-2xl)] shadow-[var(--shadow-xl)] overflow-hidden max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-light)] shrink-0">
              <div>
                <h2 className="text-lg font-bold text-[var(--color-navy)]">
                  {modalMode === "create" ? "Add Property" : "Edit Property"}
                </h2>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  Step {formStep} of {TOTAL_STEPS}
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

            {/* Step indicator */}
            <div className="px-6 pt-4 shrink-0">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 h-1.5 rounded-full transition-colors ${
                      s <= formStep
                        ? "bg-[var(--color-primary)]"
                        : "bg-[var(--color-background-muted)]"
                    }`}
                  />
                ))}
              </div>
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

              {/* STEP 1: Basic Info */}
              {formStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                      Property Category *
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
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                      Listing Type *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {LISTING_TYPES.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setField("listing_type", t.value)}
                          className={`p-3 rounded-[var(--radius-md)] border-2 text-sm font-bold transition-all ${
                            form.listing_type === t.value
                              ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]/40 text-[var(--color-primary)]"
                              : "border-[var(--color-border-light)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-primary)]/40"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <FormInput
                    label="Title *"
                    value={form.title}
                    onChange={(v) => setField("title", v)}
                    placeholder="e.g. 3 BHK Modern Apartment"
                  />

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={(e) => setField("description", e.target.value)}
                      placeholder="Describe the property…"
                      className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors resize-none outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Pricing & Area */}
              {formStep === 2 && (
                <div className="space-y-4">
                  <FormInput
                    label="Price *"
                    type="number"
                    value={form.price}
                    onChange={(v) => setField("price", v)}
                    placeholder="e.g. 5500000"
                    icon={IndianRupee}
                  />

                  <label className="flex items-center gap-2.5 p-3 rounded-[var(--radius-md)] border border-[var(--color-border-light)] bg-[var(--color-background-soft)] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.price_negotiable}
                      onChange={(e) =>
                        setField("price_negotiable", e.target.checked)
                      }
                      className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-[var(--color-text)]">
                      Price is negotiable
                    </span>
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <FormInput
                      label="Maintenance Charge"
                      type="number"
                      value={form.maintenance_charge}
                      onChange={(v) => setField("maintenance_charge", v)}
                      placeholder="e.g. 2500"
                    />
                    <FormInput
                      label="Security Deposit"
                      type="number"
                      value={form.security_deposit}
                      onChange={(v) => setField("security_deposit", v)}
                      placeholder="e.g. 0"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <FormInput
                      label="Built-up Area"
                      type="number"
                      value={form.built_up_area}
                      onChange={(v) => setField("built_up_area", v)}
                      placeholder="e.g. 1500"
                    />
                    <FormInput
                      label="Carpet Area"
                      type="number"
                      value={form.carpet_area}
                      onChange={(v) => setField("carpet_area", v)}
                      placeholder="e.g. 1200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <FormInput
                      label="Plot Area"
                      type="number"
                      value={form.plot_area}
                      onChange={(v) => setField("plot_area", v)}
                      placeholder="Optional"
                    />
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Area Unit
                      </label>
                      <select
                        value={form.area_unit}
                        onChange={(e) => setField("area_unit", e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none appearance-none cursor-pointer"
                      >
                        {AREA_UNITS.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Property Details */}
              {formStep === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <FormInput
                      label="Bedrooms"
                      type="number"
                      value={form.bedrooms}
                      onChange={(v) => setField("bedrooms", v)}
                      placeholder="3"
                    />
                    <FormInput
                      label="Bathrooms"
                      type="number"
                      value={form.bathrooms}
                      onChange={(v) => setField("bathrooms", v)}
                      placeholder="2"
                    />
                    <FormInput
                      label="Balconies"
                      type="number"
                      value={form.balconies}
                      onChange={(v) => setField("balconies", v)}
                      placeholder="2"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                      Furnishing
                    </label>
                    <select
                      value={form.furnishing_status}
                      onChange={(e) =>
                        setField("furnishing_status", e.target.value)
                      }
                      className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none appearance-none cursor-pointer"
                    >
                      <option value="">— Select —</option>
                      {FURNISHING_OPTIONS.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <FormInput
                      label="Floor Number"
                      type="number"
                      value={form.floor_number}
                      onChange={(v) => setField("floor_number", v)}
                      placeholder="3"
                    />
                    <FormInput
                      label="Total Floors"
                      type="number"
                      value={form.total_floors}
                      onChange={(v) => setField("total_floors", v)}
                      placeholder="10"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <FormInput
                      label="Property Age (years)"
                      type="number"
                      value={form.property_age}
                      onChange={(v) => setField("property_age", v)}
                      placeholder="2"
                    />
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Possession
                      </label>
                      <select
                        value={form.possession_status}
                        onChange={(e) =>
                          setField("possession_status", e.target.value)
                        }
                        className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none appearance-none cursor-pointer"
                      >
                        <option value="">— Select —</option>
                        {POSSESSION_OPTIONS.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <FormInput
                      label="Available From"
                      type="date"
                      value={form.available_from}
                      onChange={(v) => setField("available_from", v)}
                    />
                    <FormInput
                      label="Facing"
                      value={form.details.facing}
                      onChange={(v) => setDetailField("facing", v)}
                      placeholder="e.g. East"
                    />
                  </div>

                  <FormInput
                    label="Road Width (ft)"
                    type="number"
                    value={form.details.road_width}
                    onChange={(v) => setDetailField("road_width", v)}
                    placeholder="e.g. 30"
                  />
                </div>
              )}

              {/* STEP 4: Location & Amenities */}
              {formStep === 4 && (
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Location
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <FormInput
                      label="Country"
                      value={form.location.country}
                      onChange={(v) => setLocationField("country", v)}
                    />
                    <FormInput
                      label="State"
                      value={form.location.state}
                      onChange={(v) => setLocationField("state", v)}
                    />
                    <FormInput
                      label="City"
                      value={form.location.city}
                      onChange={(v) => setLocationField("city", v)}
                    />
                    <FormInput
                      label="Locality"
                      value={form.location.locality}
                      onChange={(v) => setLocationField("locality", v)}
                    />
                  </div>

                  <FormInput
                    label="Address"
                    value={form.location.address}
                    onChange={(v) => setLocationField("address", v)}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <FormInput
                      label="PIN Code"
                      value={form.location.pincode}
                      onChange={(v) => setLocationField("pincode", v)}
                    />
                    <FormInput
                      label="Landmark"
                      value={form.location.landmark}
                      onChange={(v) => setLocationField("landmark", v)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <FormInput
                      label="Latitude"
                      value={form.location.latitude}
                      onChange={(v) => setLocationField("latitude", v)}
                      placeholder="e.g. 23.5204"
                    />
                    <FormInput
                      label="Longitude"
                      value={form.location.longitude}
                      onChange={(v) => setLocationField("longitude", v)}
                      placeholder="e.g. 87.3119"
                    />
                  </div>

                  {amenities.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Amenities
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {amenities.map((amenity) => {
                          const isActive = form.amenity_ids.includes(amenity.id);
                          return (
                            <button
                              key={amenity.id}
                              type="button"
                              onClick={() => toggleAmenity(amenity.id)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                                isActive
                                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                                  : "bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)]"
                              }`}
                            >
                              {isActive && (
                                <CheckCircle2 className="w-3 h-3" />
                              )}
                              {amenity.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 5: Images & SEO */}
              {formStep === 5 && (
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Images
                  </p>

                  {/* Existing images (edit mode) */}
                  {existingMedia.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {existingMedia.map((m) => (
                        <div
                          key={m.id}
                          className="relative aspect-square rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border-light)]"
                        >
                          <img
                            src={`${storageUrl}${m.file_path}`}
                            alt={m.image_alt || ""}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingMedia(m.id)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/95 text-[var(--color-danger)] hover:bg-[var(--color-danger)] hover:text-white shadow-sm transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* New image uploads */}
                  <label className="flex flex-col items-center justify-center gap-2 p-6 rounded-[var(--radius-md)] border-2 border-dashed border-[var(--color-border)] bg-[var(--color-background-soft)] hover:border-[var(--color-primary)] transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-[var(--color-primary)]" />
                    <span className="text-sm font-semibold text-[var(--color-navy)]">
                      Click to upload images
                    </span>
                    <span className="text-[11px] text-[var(--color-text-light)]">
                      JPG, PNG · Multiple allowed
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>

                  {/* New image previews with alt text */}
                  {images.length > 0 && (
                    <div className="space-y-2">
                      {images.map((img, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 rounded-[var(--radius-md)] bg-[var(--color-background-soft)] border border-[var(--color-border-light)]"
                        >
                          <img
                            src={img.preview}
                            alt=""
                            className="w-12 h-12 rounded object-cover shrink-0"
                          />
                          <input
                            type="text"
                            value={img.alt}
                            onChange={(e) => setImageAlt(i, e.target.value)}
                            placeholder="Image alt text (for SEO)"
                            className="flex-1 px-3 py-1.5 text-xs rounded border border-[var(--color-border)] bg-white focus:border-[var(--color-primary)] outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="w-8 h-8 flex items-center justify-center rounded text-[var(--color-danger)] hover:bg-[var(--color-danger-light)] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SEO */}
                  <div className="pt-4 border-t border-[var(--color-border-light)] space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                      SEO (Optional)
                    </p>
                    <FormInput
                      label="Meta Title"
                      value={form.meta_title}
                      onChange={(v) => setField("meta_title", v)}
                      placeholder="e.g. 3 BHK Apartment for Sale"
                      maxLength={70}
                    />
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Meta Description
                      </label>
                      <textarea
                        rows={2}
                        value={form.meta_description}
                        onChange={(e) =>
                          setField("meta_description", e.target.value)
                        }
                        placeholder="Short description for search engines…"
                        maxLength={160}
                        className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors resize-none outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Footer navigation */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--color-border-light)] mt-6">
                {formStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setFormStep((s) => s - 1)}
                    disabled={formSaving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={formSaving}
                    className="px-5 py-2.5 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                )}

                {formStep < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={() => setFormStep((s) => s + 1)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] transition-colors"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
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
                        {modalMode === "create" ? "Create Property" : "Update Property"}
                      </>
                    )}
                  </button>
                )}
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
                  Delete Property?
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  You're about to delete{" "}
                  <span className="font-semibold text-[var(--color-navy)]">
                    "{deleteConfirm.name}"
                  </span>
                  . This action cannot be undone.
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

/* =========================================================
   SUB-COMPONENTS
   ========================================================= */
const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  maxLength,
}) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)] pointer-events-none" />
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full ${
          Icon ? "pl-10" : "pl-4"
        } pr-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none`}
      />
    </div>
  </div>
);

export default ManageMyProperty;