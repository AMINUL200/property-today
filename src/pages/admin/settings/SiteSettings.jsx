import React, { useState, useEffect, useRef } from "react";
import {
  Building2,
  Globe,
  Palette,
  Search,
  Share2,
  Mail,
  Phone,
  MapPin,
  Upload,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { api } from "../../../service/api";
// import { api } from "../../service/api";

/* =========================================================
   SITE SETTINGS PAGE
   GET  /api/v1/website-settings
   PUT  /api/v1/admin/website-settings  (multipart/form-data)
   ========================================================= */

const SiteSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ---------- Form state, mirrors API structure ----------
  const [form, setForm] = useState({
    company: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    website: {
      name: "",
      url: "",
      tagline: "",
    },
    seo: {
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
    },
    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
      youtube: "",
    },
  });

  // ---------- File state (multipart upload) ----------
  const [files, setFiles] = useState({
    logo_web: null,
    logo_mobile: null,
    logo_alt: null,
    favicon: null,
    image_web: null,
    image_mobile: null,
    image_alt: null,
  });

  // ---------- Previews for each image slot ----------
  const [previews, setPreviews] = useState({
    logo_web: null,
    logo_mobile: null,
    logo_alt: null,
    favicon: null,
    image_web: null,
    image_mobile: null,
    image_alt: null,
  });

  // File input refs (so we can clear them)
  const inputRefs = useRef({});

  /* =========================================================
     FETCH SETTINGS ON MOUNT
     ========================================================= */
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/website-settings");
        const data = res?.data?.data;

        if (!data) {
          setError("Unexpected response from server.");
          return;
        }

        // Map response → form
        setForm({
          company: {
            name: data.company?.name || "",
            email: data.company?.email || "",
            phone: data.company?.phone || "",
            address: data.company?.address || "",
          },
          website: {
            name: data.website?.name || "",
            url: data.website?.url || "",
            tagline: data.website?.tagline || "",
          },
          seo: {
            meta_title: data.seo?.meta_title || "",
            meta_description: data.seo?.meta_description || "",
            meta_keywords: data.seo?.meta_keywords || "",
          },
          social: {
            facebook: data.social?.facebook || "",
            instagram: data.social?.instagram || "",
            linkedin: data.social?.linkedin || "",
            youtube: data.social?.youtube || "",
          },
        });

        // Existing image URLs → show as previews
        setPreviews({
          logo_web: data.branding?.logo_web || null,
          logo_mobile: data.branding?.logo_mobile || null,
          logo_alt: data.branding?.logo_alt || null,
          favicon: data.branding?.favicon || null,
          image_web: data.social_sharing?.image_web || null,
          image_mobile: data.social_sharing?.image_mobile || null,
          image_alt: data.social_sharing?.image_alt || null,
        });
      } catch (err) {
        setError(
          err?.message || "Failed to load website settings. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  /* =========================================================
     HELPERS
     ========================================================= */
  const setField = (section, key, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleFile = (field, file) => {
    if (!file) return;
    setFiles((prev) => ({ ...prev, [field]: file }));
    setPreviews((prev) => ({ ...prev, [field]: URL.createObjectURL(file) }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  const removeFile = (field) => {
    setFiles((prev) => ({ ...prev, [field]: null }));
    setPreviews((prev) => ({ ...prev, [field]: null }));
    if (inputRefs.current[field]) {
      inputRefs.current[field].value = "";
    }
  };

  /* =========================================================
     SUBMIT — PUT with multipart/form-data
     ========================================================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // Build FormData in the Laravel-friendly nested format
      const fd = new FormData();

      // Company
      fd.append("company[name]", form.company.name);
      fd.append("company[email]", form.company.email);
      fd.append("company[phone]", form.company.phone);
      fd.append("company[address]", form.company.address);

      // Website
      fd.append("website[name]", form.website.name);
      fd.append("website[url]", form.website.url);
      fd.append("website[tagline]", form.website.tagline);

      // SEO
      fd.append("seo[meta_title]", form.seo.meta_title);
      fd.append("seo[meta_description]", form.seo.meta_description);
      fd.append("seo[meta_keywords]", form.seo.meta_keywords);

      // Social
      fd.append("social[facebook]", form.social.facebook);
      fd.append("social[instagram]", form.social.instagram);
      fd.append("social[linkedin]", form.social.linkedin);
      fd.append("social[youtube]", form.social.youtube);

      // Files (only append if user picked a new file)
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          fd.append(key, file);
        }
      });

      // Laravel requires _method spoofing for PUT with multipart
      fd.append("_method", "PUT");

      const res = await api.post("/admin/website-settings", fd);

      const payload = res?.data;
      if (payload?.success === false) {
        throw { message: payload?.message || "Failed to update settings." };
      }

      setSuccess(
        payload?.message || "Website settings updated successfully."
      );

      // Refresh previews from updated response if provided
      if (payload?.data) {
        const d = payload.data;
        setPreviews({
          logo_web: d.branding?.logo_web || previews.logo_web,
          logo_mobile: d.branding?.logo_mobile || previews.logo_mobile,
          logo_alt: d.branding?.logo_alt || previews.logo_alt,
          favicon: d.branding?.favicon || previews.favicon,
          image_web: d.social_sharing?.image_web || previews.image_web,
          image_mobile:
            d.social_sharing?.image_mobile || previews.image_mobile,
          image_alt: d.social_sharing?.image_alt || previews.image_alt,
        });
        // Clear uploaded file references after successful save
        setFiles({
          logo_web: null,
          logo_mobile: null,
          logo_alt: null,
          favicon: null,
          image_web: null,
          image_mobile: null,
          image_alt: null,
        });
      }
    } catch (err) {
      let message =
        err?.message ||
        err?.data?.message ||
        "Failed to save settings. Please try again.";

      // Laravel validation errors: { errors: { "company.name": [...] } }
      if (err?.data?.errors) {
        const firstKey = Object.keys(err.data.errors)[0];
        if (firstKey && Array.isArray(err.data.errors[firstKey])) {
          message = err.data.errors[firstKey][0];
        }
      }

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     UI
     ========================================================= */

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
          <p className="text-sm text-[var(--color-text-muted)]">
            Loading settings…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-navy)]">
            Site Settings
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Manage your website's brand, contact details, SEO, and social
            links.
          </p>
        </div>
      </div>

      {/* Status banners */}
      {error && (
        <div className="mb-5 flex items-start gap-3 p-4 rounded-[var(--radius-md)] bg-[var(--color-danger-light)] border border-[var(--color-danger)]/30">
          <AlertCircle className="w-5 h-5 text-[var(--color-danger)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--color-danger)] font-medium leading-relaxed">
            {error}
          </p>
        </div>
      )}
      {success && (
        <div className="mb-5 flex items-start gap-3 p-4 rounded-[var(--radius-md)] bg-[var(--color-success-light)] border border-[var(--color-success)]/30">
          <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--color-success)] font-medium leading-relaxed">
            {success}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* =========================================================
            COMPANY INFO
            ========================================================= */}
        <Section
          icon={Building2}
          title="Company Information"
          subtitle="Business details that appear on invoices and contact pages."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label="Company Name"
              value={form.company.name}
              onChange={(v) => setField("company", "name", v)}
              placeholder="Propertytoday Pvt. Ltd."
            />
            <Field
              label="Support Email"
              type="email"
              value={form.company.email}
              onChange={(v) => setField("company", "email", v)}
              placeholder="contact@propertytoday.com"
              icon={Mail}
            />
            <Field
              label="Phone"
              value={form.company.phone}
              onChange={(v) => setField("company", "phone", v)}
              placeholder="+91 98300 12345"
              icon={Phone}
            />
            <Field
              label="Address"
              value={form.company.address}
              onChange={(v) => setField("company", "address", v)}
              placeholder="New Town, Kolkata, West Bengal"
              icon={MapPin}
            />
          </div>
        </Section>

        {/* =========================================================
            WEBSITE INFO
            ========================================================= */}
        <Section
          icon={Globe}
          title="Website Information"
          subtitle="Site name, URL, and tagline shown across the platform."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label="Website Name"
              value={form.website.name}
              onChange={(v) => setField("website", "name", v)}
              placeholder="Propertytoday"
            />
            <Field
              label="Website URL"
              value={form.website.url}
              onChange={(v) => setField("website", "url", v)}
              placeholder="https://propertytoday.com"
              icon={Globe}
            />
            <div className="sm:col-span-2">
              <Field
                label="Tagline"
                value={form.website.tagline}
                onChange={(v) => setField("website", "tagline", v)}
                placeholder="Your Next Move, Today"
              />
            </div>
          </div>
        </Section>

        {/* =========================================================
            BRANDING — LOGOS + FAVICON
            ========================================================= */}
        <Section
          icon={Palette}
          title="Branding"
          subtitle="Upload logos and favicon. Recommended: PNG with transparent background."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ImageUpload
              label="Website Logo"
              field="logo_web"
              preview={previews.logo_web}
              onUpload={handleFile}
              onRemove={removeFile}
              inputRefs={inputRefs}
              aspect="square"
              recommended="200×60 · PNG"
            />
            <ImageUpload
              label="Mobile Logo"
              field="logo_mobile"
              preview={previews.logo_mobile}
              onUpload={handleFile}
              onRemove={removeFile}
              inputRefs={inputRefs}
              aspect="square"
              recommended="80×80 · PNG"
            />
            <ImageUpload
              label="Logo Alt / Text"
              field="logo_alt"
              preview={previews.logo_alt}
              onUpload={handleFile}
              onRemove={removeFile}
              inputRefs={inputRefs}
              aspect="square"
              recommended="Small logo · PNG"
            />
            <ImageUpload
              label="Favicon"
              field="favicon"
              preview={previews.favicon}
              onUpload={handleFile}
              onRemove={removeFile}
              inputRefs={inputRefs}
              aspect="square"
              recommended="32×32 · PNG"
            />
          </div>
        </Section>

        {/* =========================================================
            SEO
            ========================================================= */}
        <Section
          icon={Search}
          title="SEO Settings"
          subtitle="Meta information used by search engines and social platforms."
        >
          <div className="space-y-5">
            <Field
              label="Meta Title"
              value={form.seo.meta_title}
              onChange={(v) => setField("seo", "meta_title", v)}
              placeholder="Propertytoday | Buy, Rent and Sell Properties"
              maxLength={70}
            />
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={form.seo.meta_description}
                onChange={(e) =>
                  setField("seo", "meta_description", e.target.value)
                }
                placeholder="Discover verified properties for sale and rent across India."
                maxLength={160}
                className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors resize-none outline-none"
              />
              <p className="mt-1 text-[11px] text-[var(--color-text-light)]">
                {form.seo.meta_description.length}/160 characters
              </p>
            </div>
            <Field
              label="Meta Keywords"
              value={form.seo.meta_keywords}
              onChange={(v) => setField("seo", "meta_keywords", v)}
              placeholder="property, apartment, villa, plot, rent, buy, sell"
            />
          </div>
        </Section>

        {/* =========================================================
            SOCIAL LINKS
            ========================================================= */}
        <Section
          icon={Share2}
          title="Social Media Links"
          subtitle="Links to your social profiles. Leave empty to hide."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SocialField
              icon={Facebook}
              label="Facebook URL"
              value={form.social.facebook}
              onChange={(v) => setField("social", "facebook", v)}
              placeholder="https://facebook.com/yourpage"
            />
            <SocialField
              icon={Instagram}
              label="Instagram URL"
              value={form.social.instagram}
              onChange={(v) => setField("social", "instagram", v)}
              placeholder="https://instagram.com/yourpage"
            />
            <SocialField
              icon={Linkedin}
              label="LinkedIn URL"
              value={form.social.linkedin}
              onChange={(v) => setField("social", "linkedin", v)}
              placeholder="https://linkedin.com/company/yourpage"
            />
            <SocialField
              icon={Youtube}
              label="YouTube URL"
              value={form.social.youtube}
              onChange={(v) => setField("social", "youtube", v)}
              placeholder="https://youtube.com/@yourchannel"
            />
          </div>
        </Section>

        {/* =========================================================
            SOCIAL SHARING IMAGES
            ========================================================= */}
        <Section
          icon={ImageIcon}
          title="Social Sharing Images"
          subtitle="Open Graph images shown when your site is shared on social platforms."
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <ImageUpload
              label="Desktop Image"
              field="image_web"
              preview={previews.image_web}
              onUpload={handleFile}
              onRemove={removeFile}
              inputRefs={inputRefs}
              aspect="wide"
              recommended="1200×630 · JPG"
            />
            <ImageUpload
              label="Mobile Image"
              field="image_mobile"
              preview={previews.image_mobile}
              onUpload={handleFile}
              onRemove={removeFile}
              inputRefs={inputRefs}
              aspect="wide"
              recommended="600×600 · JPG"
            />
            <ImageUpload
              label="Alt / Share Logo"
              field="image_alt"
              preview={previews.image_alt}
              onUpload={handleFile}
              onRemove={removeFile}
              inputRefs={inputRefs}
              aspect="wide"
              recommended="800×800 · JPG"
            />
          </div>
        </Section>

        {/* =========================================================
            SUBMIT
            ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-[var(--radius-md)] text-[var(--color-navy)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

/* =========================================================
   SUB-COMPONENTS
   ========================================================= */
const Section = ({ icon: Icon, title, subtitle, children }) => (
  <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 sm:p-7">
    <div className="flex items-start gap-3 mb-5">
      <span className="w-10 h-10 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center">
        <Icon className="w-5 h-5 text-[var(--color-primary)]" />
      </span>
      <div className="min-w-0">
        <h2 className="text-base font-bold text-[var(--color-navy)]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
    {children}
  </div>
);

const Field = ({
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
    {maxLength && (
      <p className="mt-1 text-[11px] text-[var(--color-text-light)]">
        {value.length}/{maxLength} characters
      </p>
    )}
  </div>
);

const SocialField = ({ icon: Icon, label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-primary)] pointer-events-none" />
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-soft)] focus:border-[var(--color-primary)] focus:bg-white transition-colors outline-none"
      />
    </div>
  </div>
);

const ImageUpload = ({
  label,
  field,
  preview,
  onUpload,
  onRemove,
  inputRefs,
  aspect = "square",
  recommended,
}) => {
  const aspectClass =
    aspect === "wide" ? "aspect-[4/3]" : "aspect-square";

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
        {label}
      </label>

      <div
        className={`relative ${aspectClass} rounded-[var(--radius-md)] border-2 border-dashed border-[var(--color-border)] bg-[var(--color-background-soft)] hover:border-[var(--color-primary)] transition-colors overflow-hidden group`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt={label}
              className="w-full h-full object-contain p-2"
            />
            <button
              type="button"
              onClick={() => onRemove(field)}
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/95 text-[var(--color-danger)] hover:bg-[var(--color-danger)] hover:text-white shadow-[var(--shadow-sm)] transition-colors"
              aria-label={`Remove ${label}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <label
              htmlFor={`upload-${field}`}
              className="absolute inset-0 flex items-center justify-center bg-[var(--color-navy)]/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[var(--color-navy)] text-xs font-bold">
                <Upload className="w-3 h-3" />
                Replace
              </span>
            </label>
          </>
        ) : (
          <label
            htmlFor={`upload-${field}`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <span className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
              <Upload className="w-4 h-4 text-[var(--color-primary)]" />
            </span>
            <span className="text-xs font-semibold text-[var(--color-text-muted)]">
              Click to upload
            </span>
            {recommended && (
              <span className="text-[10px] text-[var(--color-text-light)]">
                {recommended}
              </span>
            )}
          </label>
        )}

        <input
          id={`upload-${field}`}
          type="file"
          accept="image/*"
          className="hidden"
          ref={(el) => (inputRefs.current[field] = el)}
          onChange={(e) => onUpload(field, e.target.files?.[0])}
        />
      </div>
    </div>
  );
};

export default SiteSettings;