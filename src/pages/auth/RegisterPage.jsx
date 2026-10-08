import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  UserPlus,
  ArrowLeft,
  Check,
  User,
  Briefcase,
  ShieldCheck,
  Phone,
  MapPin,
} from "lucide-react";
import CustomInput from "../../component/form/CustomInput";

const RegisterPage = () => {
  // ---------- Role selection ----------
  // Admin accounts are NOT registrable through the public form.
  const ACCOUNT_TYPES = [
    {
      id: "user",
      label: "User",
      desc: "Buy, sell, rent or invest in properties.",
      icon: User,
    },
    {
      id: "agent",
      label: "Agent",
      desc: "List and manage properties for clients.",
      icon: Briefcase,
    },
  ];

  const [accountType, setAccountType] = useState("user");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    // agent-only fields
    agencyName: "",
    city: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Agent-specific validation
    if (accountType === "agent") {
      if (!formData.agencyName.trim()) {
        newErrors.agencyName = "Agency / firm name is required";
      }
      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Password strength
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: "", color: "" },
      { strength: 1, label: "Weak", color: "bg-[var(--color-danger)]" },
      { strength: 2, label: "Fair", color: "bg-[var(--color-warning)]" },
      { strength: 3, label: "Good", color: "bg-[var(--color-secondary-dark)]" },
      { strength: 4, label: "Strong", color: "bg-[var(--color-success)]" },
      { strength: 5, label: "Very Strong", color: "bg-[var(--color-success)]" },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Register data:", {
          ...formData,
          accountType,
        });
        // Add your registration API call here
        setIsLoading(false);
        // navigate("/login");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-soft)] py-12 px-4 sm:px-6 lg:px-8">
      {/* Brand glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-primary)]/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-secondary)]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-lg w-full relative z-10">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center space-x-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Register Card */}
        <div className="bg-white rounded-[var(--radius-2xl)] shadow-[var(--shadow-xl)] p-8 border border-[var(--color-border-light)]">
          {/* Logo + Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--color-primary)] flex items-center justify-center shadow-[var(--shadow-primary)]">
                <svg
                  width="32"
                  height="32"
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
            </div>
            <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-2">
              Create Account
            </h2>
            <p className="text-[var(--color-text-muted)]">
              Join{" "}
              <span className="font-bold text-[var(--color-navy)]">
                Property<span className="text-[var(--color-primary)]">today</span>
              </span>{" "}
              and get started
            </p>
          </div>

          {/* ---------- Account Type Selector ---------- */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
              I am registering as
            </p>
            <div className="grid grid-cols-2 gap-3">
              {ACCOUNT_TYPES.map((type) => {
                const TypeIcon = type.icon;
                const isActive = accountType === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setAccountType(type.id)}
                    className={`group flex flex-col items-start text-left p-4 rounded-[var(--radius-lg)] border-2 transition-all duration-200 ${
                      isActive
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]/40 shadow-[var(--shadow-sm)]"
                        : "border-[var(--color-border-light)] bg-white hover:border-[var(--color-primary)]/40"
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center mb-2 transition-colors duration-200 ${
                        isActive
                          ? "bg-[var(--color-primary)] text-white"
                          : "bg-[var(--color-background-muted)] text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]"
                      }`}
                    >
                      <TypeIcon className="w-5 h-5" />
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        isActive
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-navy)]"
                      }`}
                    >
                      {type.label}
                    </span>
                    <span className="mt-0.5 text-[11px] text-[var(--color-text-muted)] leading-snug">
                      {type.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Admin note */}
            <p className="mt-3 text-[11px] text-[var(--color-text-light)] text-center">
              Admin accounts are created internally and cannot be registered
              here.
            </p>
          </div>

          {/* ---------- Register Form ---------- */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <CustomInput
                label="Full Name"
                name="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder=""
                className={
                  errors.fullName
                    ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20 focus:border-[var(--color-danger)]"
                    : ""
                }
              />
              {errors.fullName && (
                <p className="mt-2 text-sm text-[var(--color-danger)] flex items-center">
                  <span className="inline-block w-1 h-1 bg-[var(--color-danger)] rounded-full mr-2" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <CustomInput
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=""
                className={
                  errors.email
                    ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20 focus:border-[var(--color-danger)]"
                    : ""
                }
              />
              {errors.email && (
                <p className="mt-2 text-sm text-[var(--color-danger)] flex items-center">
                  <span className="inline-block w-1 h-1 bg-[var(--color-danger)] rounded-full mr-2" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <CustomInput
                label="Phone Number"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder=""
                className={
                  errors.phone
                    ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20 focus:border-[var(--color-danger)]"
                    : ""
                }
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-[var(--color-danger)] flex items-center">
                  <span className="inline-block w-1 h-1 bg-[var(--color-danger)] rounded-full mr-2" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* ---------- AGENT-ONLY FIELDS ---------- */}
            {accountType === "agent" && (
              <div className="space-y-5 pt-2 pb-1 px-4 rounded-[var(--radius-lg)] bg-[var(--color-primary-light)]/30 border border-[var(--color-primary)]/15">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-primary)] pt-2">
                  Agent Details
                </p>

                {/* Agency Name */}
                <div>
                  <CustomInput
                    label="Agency / Firm Name"
                    name="agencyName"
                    type="text"
                    autoComplete="organization"
                    value={formData.agencyName}
                    onChange={handleChange}
                    placeholder=""
                    className={
                      errors.agencyName
                        ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20 focus:border-[var(--color-danger)]"
                        : ""
                    }
                  />
                  {errors.agencyName && (
                    <p className="mt-2 text-sm text-[var(--color-danger)] flex items-center">
                      <span className="inline-block w-1 h-1 bg-[var(--color-danger)] rounded-full mr-2" />
                      {errors.agencyName}
                    </p>
                  )}
                </div>

                {/* City + Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                  <div>
                    <CustomInput
                      label="City"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder=""
                      className={
                        errors.city
                          ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20 focus:border-[var(--color-danger)]"
                          : ""
                      }
                    />
                    {errors.city && (
                      <p className="mt-2 text-sm text-[var(--color-danger)] flex items-center">
                        <span className="inline-block w-1 h-1 bg-[var(--color-danger)] rounded-full mr-2" />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <CustomInput
                      label="Years of Experience"
                      name="experience"
                      type="text"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <CustomInput
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                placeholder=""
                className={
                  errors.password
                    ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20 focus:border-[var(--color-danger)]"
                    : ""
                }
              />

              {/* Strength bar */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-[var(--color-background-muted)] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                      {passwordStrength.label}
                    </span>
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="mt-2 text-sm text-[var(--color-danger)] flex items-center">
                  <span className="inline-block w-1 h-1 bg-[var(--color-danger)] rounded-full mr-2" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <CustomInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder=""
                className={
                  errors.confirmPassword
                    ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20 focus:border-[var(--color-danger)]"
                    : ""
                }
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-[var(--color-danger)] flex items-center">
                  <span className="inline-block w-1 h-1 bg-[var(--color-danger)] rounded-full mr-2" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* ---------- Terms & Conditions ---------- */}
            <div className="flex items-start gap-3 pt-1">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (errors.terms) {
                    setErrors((prev) => ({ ...prev, terms: "" }));
                  }
                }}
                className="mt-1 h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-[var(--color-border)] rounded cursor-pointer accent-[var(--color-primary)]"
              />
              <label
                htmlFor="terms"
                className="text-sm text-[var(--color-text-secondary)] cursor-pointer leading-relaxed"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-[var(--color-danger)] flex items-center">
                <span className="inline-block w-1 h-1 bg-[var(--color-danger)] rounded-full mr-2" />
                {errors.terms}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] transition-all duration-200 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/40 border-t-white" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>
                    Create {accountType === "agent" ? "Agent" : "User"} Account
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;