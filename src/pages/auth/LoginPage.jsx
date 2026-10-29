import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowLeft, AlertCircle } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";
import { api } from "../../service/api";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Where to redirect after successful login
  // - If user was redirected from a protected page, go back there
  // - Otherwise go to their role-specific dashboard
  const from = location.state?.from?.pathname || null;

  /* =========================================================
     INPUT CHANGE
     ========================================================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error while typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Clear API error once user edits anything
    if (apiError) setApiError("");
  };

  /* =========================================================
     VALIDATION
     ========================================================= */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     ROLE-BASED REDIRECT
     ========================================================= */
  const getRedirectPath = (role) => {
    switch ((role || "").toLowerCase()) {
      case "admin":
        return "/admin";
      case "agent":
        return "/agent";
      default:
        return "/";
    }
  };

  /* =========================================================
     SUBMIT
     ========================================================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await api.post("/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      // Backend returns:
      // {
      //   success: true,
      //   message: "Login successful.",
      //   data: { user, token, token_type }
      // }
      const payload = response?.data;

      if (!payload?.success || !payload?.data?.token) {
        throw {
          message:
            payload?.message ||
            "Login failed. Please check your credentials and try again.",
        };
      }

      // Persist token + user via AuthContext
      login(payload);

      // Optional: if user unchecked "Remember me",
      // clear token on browser close by using sessionStorage
      if (!rememberMe) {
        sessionStorage.setItem("pt_no_persist", "1");
      } else {
        sessionStorage.removeItem("pt_no_persist");
      }

      // Redirect based on role, or back to the page they came from
      const role = payload.data.user?.role;
      const redirectTo = from || getRedirectPath(role);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      // `api` interceptor rejects with { status, data, message }
      let message =
        err?.message ||
        err?.data?.message ||
        "Unable to sign in. Please try again.";

      // Laravel validation errors come as { errors: { email: [...] } }
      if (err?.data?.errors) {
        const firstKey = Object.keys(err.data.errors)[0];
        if (firstKey && Array.isArray(err.data.errors[firstKey])) {
          message = err.data.errors[firstKey][0];
        }
      }

      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================================================
     UI
     ========================================================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-soft)] py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Brand glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-primary)]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--color-secondary)]/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center space-x-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-[var(--radius-2xl)] shadow-[var(--shadow-xl)] p-8 border border-[var(--color-border-light)]">
          {/* Logo + Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src="/image/logo.jpeg" alt="PropertyToday Logo" className="h-12 w-auto" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-2">
              Welcome Back
            </h2>
            <p className="text-[var(--color-text-muted)]">
              Sign in to continue to{" "}
              <span className="font-bold text-[var(--color-navy)]">
                Property<span className="text-[var(--color-primary)]">today</span>
              </span>
            </p>
          </div>

          {/* API error banner */}
          {apiError && (
            <div className="mb-5 flex items-start gap-3 p-3.5 rounded-[var(--radius-md)] bg-[var(--color-danger-light)] border border-[var(--color-danger)]/30">
              <AlertCircle className="w-5 h-5 text-[var(--color-danger)] shrink-0 mt-0.5" />
              <p className="text-sm text-[var(--color-danger)] font-medium leading-relaxed">
                {apiError}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

            {/* Password */}
            <div>
              <CustomInput
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder=""
                className={
                  errors.password
                    ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20 focus:border-[var(--color-danger)]"
                    : ""
                }
              />
              {errors.password && (
                <p className="mt-2 text-sm text-[var(--color-danger)] flex items-center">
                  <span className="inline-block w-1 h-1 bg-[var(--color-danger)] rounded-full mr-2" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-[var(--color-border)] rounded cursor-pointer accent-[var(--color-primary)]"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-[var(--color-text-secondary)] cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-[var(--radius-md)] text-white bg-[var(--color-primary)] shadow-[var(--shadow-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] transition-all duration-200 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/40 border-t-white" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-border)]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[var(--color-text-muted)]">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          {/* Sign Up */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;