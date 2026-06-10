import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function App() {
  const navigate = useNavigate();
const API_URL = import.meta.env.VITE_API_URL;
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password strength states
  const [pwdStrength, setPwdStrength] = useState(0);
  const [pwdFeedback, setPwdFeedback] = useState("");

  // Function to evaluate password strength
  const evaluatePassword = (password) => {
    let score = 0;
    if (!password) {
      setPwdStrength(0);
      setPwdFeedback("");
      return;
    }

    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    setPwdStrength(score);

    switch (score) {
      case 0:
      case 1:
        setPwdFeedback("Weak (Must be 8+ chars)");
        break;
      case 2:
        setPwdFeedback("Fair (Add uppercase/numbers)");
        break;
      case 3:
        setPwdFeedback("Good (Add special characters)");
        break;
      case 4:
        setPwdFeedback("Strong");
        break;
      default:
        setPwdFeedback("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      evaluatePassword(value);
    }

    // Clear errors when user types
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    // Basic Validations
    if (!form.name.trim()) {
      return setError("Please enter your full name.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return setError("Please enter a valid email address (e.g., name@gmail.com).");
    }

    if (pwdStrength < 3) {
      return setError("Please choose a stronger password before continuing.");
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Email might already be in use.");
      }

      setSuccess(true);

      // Simulate navigation delay for UX
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      // Handle network errors gracefully
      setError(err.message === "Failed to fetch" ? "Unable to connect to the server." : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4 font-sans text-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-200">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight uppercase">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Join Retail POS to manage your store
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="mb-2 block text-sm font-bold text-neutral-800" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-black placeholder-neutral-400 transition-colors focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>

          {}
          {/* Email Field */}
          <div>
            <label className="mb-2 block text-sm font-bold text-neutral-800" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="name@gmail.com"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-black placeholder-neutral-400 transition-colors focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>

          {/* Password Field with Strength Meter */}
          <div>
            <label className="mb-2 block text-sm font-bold text-neutral-800" htmlFor="password">
              Secure Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-black placeholder-neutral-400 transition-colors focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              required
            />

            {/* Monochrome Password Strength Indicator */}
            {form.password && (
              <div className="mt-2">
                <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
                  <div
                    className={`h-full transition-all duration-300 ease-out ${
                      pwdStrength === 1 ? "w-1/4 bg-neutral-400" :
                      pwdStrength === 2 ? "w-2/4 bg-neutral-600" :
                      pwdStrength === 3 ? "w-3/4 bg-neutral-800" :
                      pwdStrength === 4 ? "w-full bg-black" : "w-0"
                    }`}
                  ></div>
                </div>
                <p className={`mt-1.5 text-xs font-semibold ${pwdStrength >= 3 ? "text-black" : "text-neutral-500"}`}>
                  {pwdFeedback}
                </p>
              </div>
            )}
          </div>
          <button type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute cursor-pointer right-145 top-114 -translate-y-1/2 p-1 text-neutral-500 hover:text-black transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                  >
                                    {showPassword ? (
                                      /* Lucide-style Eye Off Icon */
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                        <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                        <line x1="2" y1="2" x2="22" y2="22" />
                                      </svg>
                                    ) : (
                                      /* Lucide-style Eye Icon */
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                      </svg>
                                    )}
                                  </button>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 rounded-lg border border-neutral-300 bg-neutral-100 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm font-semibold text-black leading-tight">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-3 rounded-lg border border-black bg-black p-4 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p className="text-sm font-bold">Registration successful! Redirecting...</p>
            </div>
          )}

          {}
          <button
            type="submit"
            disabled={loading || success}
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-black py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
          >
            {loading ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-black underline underline-offset-4 transition-colors hover:text-neutral-600"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}