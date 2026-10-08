import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowLeft } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
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

    if (!formData.email) {
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Login data:", formData);
        // Add your login API call here
        setIsLoading(false);
        // navigate("/dashboard");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-soft)] py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration — brand glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-primary)]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--color-secondary)]/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center space-x-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-[var(--radius-2xl)] shadow-[var(--shadow-xl)] p-8 border border-[var(--color-border-light)]">
          {/* Logo and Title */}
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
              Welcome Back
            </h2>
            <p className="text-[var(--color-text-muted)]">
              Sign in to continue to{" "}
              <span className="font-bold text-[var(--color-navy)]">
                Property<span className="text-[var(--color-primary)]">today</span>
              </span>
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-[var(--color-border)] rounded cursor-pointer accent-[var(--color-primary)]"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-[var(--color-text-secondary)] cursor-pointer"
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

            {/* Submit Button */}
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

          {/* Sign Up Link */}
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