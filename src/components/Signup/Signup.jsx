import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import "./Signup.css";

/* ---------------------------------------------------------
   Local social icons (inline SVG)
   Avoids depending on lucide-react's brand icon set, which has
   been inconsistent across versions (Facebook/Instagram/etc.
   are sometimes excluded from the package export).
--------------------------------------------------------- */
const IconInstagram = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const IconFacebook = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M14 9h2.5V6H14c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h2.4l.6-3H14V9.5c0-.28.22-.5.5-.5H14z" />
  </svg>
);

const IconX = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="none" {...props}>
    <path d="M18.9 3H21l-6.6 7.6L22 21h-6.3l-4.9-6.4L5.2 21H3l7.1-8.2L2.5 3h6.4l4.4 5.9L18.9 3zm-1.1 16.1h1.2L7.2 4.8H5.9l11.9 14.3z" />
  </svg>
);

const IconYoutube = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="2.5" y="6" width="19" height="12" rx="3" />
    <path d="M11 9.5l4 2.5-4 2.5v-5z" fill="currentColor" stroke="none" />
  </svg>
);

const IconLinkedin = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <line x1="7.5" y1="10" x2="7.5" y2="17" />
    <circle cx="7.5" cy="6.8" r="1" fill="currentColor" stroke="none" />
    <path d="M11 17v-4.5c0-1.4 1-2.5 2.5-2.5s2.5 1.1 2.5 2.5V17" />
    <line x1="11" y1="10" x2="11" y2="17" />
  </svg>
);

const NAME_REGEX = /^[A-Za-z]+$/;
const USERNAME_REGEX = /^[A-Za-z]+$/;
const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState("");

  const handleChange = (field) => (e) => {
    let value = e.target.value;

    // Full name and username: strip anything that isn't a letter
    // as it's typed, not just on validation.
    if (field === "fullName" || field === "username") {
      value = value.replace(/[^A-Za-z]/g, "");
    }

    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setFormMessage("");
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    } else if (!NAME_REGEX.test(form.fullName.trim())) {
      nextErrors.fullName = "Full name can only contain letters, no spaces or numbers.";
    }

    if (!form.username.trim()) {
      nextErrors.username = "Username is required.";
    } else if (!USERNAME_REGEX.test(form.username.trim())) {
      nextErrors.username = "Username can only contain letters, no numbers or symbols.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!GMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = "Only Gmail addresses are accepted (e.g. name@gmail.com).";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();

    if (!agreed) {
      setFormMessage("You must agree to the Terms & Conditions to register.");
      return;
    }

    if (!isValid) {
      setFormMessage("Please fix the highlighted fields before continuing.");
      return;
    }

    navigate("/404");
  };

  const goHome = () => navigate("/");
  const goToSignIn = () => navigate("/login");
  const goToSocial = () => navigate("/404");

  return (
    <div className="signup-page">
      <button type="button" className="signup-back-btn" onClick={goHome}>
        <ArrowLeft size={18} strokeWidth={2} />
        Back to Home
      </button>

      <div className="signup-card">
        <div className="signup-head">
          <span className="eyebrow">Join Stackly</span>
          <h1 className="font-display">Create Your Account</h1>
          <p>Small-batch dairy, delivered fresh. Sign up to get started.</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="JaneMiller"
              value={form.fullName}
              onChange={handleChange("fullName")}
              className={errors.fullName ? "has-error" : ""}
              autoComplete="name"
            />
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>

          <div className="signup-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="janemiller"
              value={form.username}
              onChange={handleChange("username")}
              className={errors.username ? "has-error" : ""}
              autoComplete="username"
            />
            {errors.username && <span className="field-error">{errors.username}</span>}
          </div>

          <div className="signup-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="jane@gmail.com"
              value={form.email}
              onChange={handleChange("email")}
              className={errors.email ? "has-error" : ""}
              autoComplete="email"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="signup-field">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange("password")}
                className={errors.password ? "has-error" : ""}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="signup-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-wrapper">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                className={errors.confirmPassword ? "has-error" : ""}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="field-error">{errors.confirmPassword}</span>
            )}
          </div>

          <label className="signup-checkbox">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                setFormMessage("");
              }}
            />
            <span>
              I agree to the <a href="#terms">Terms &amp; Conditions</a> and{" "}
              <a href="#privacy">Privacy Policy</a>
            </span>
          </label>

          {formMessage && <p className="signup-form-message">{formMessage}</p>}

          <button type="submit" className="signup-submit">
            Register
          </button>
        </form>

        <div className="signup-divider">
          <span>or continue with</span>
        </div>

        <div className="signup-social">
          <button type="button" onClick={goToSocial} aria-label="Continue with Instagram">
            <IconInstagram />
          </button>
          <button type="button" onClick={goToSocial} aria-label="Continue with Facebook">
            <IconFacebook />
          </button>
          <button type="button" onClick={goToSocial} aria-label="Continue with X">
            <IconX />
          </button>
          <button type="button" onClick={goToSocial} aria-label="Continue with YouTube">
            <IconYoutube />
          </button>
          <button type="button" onClick={goToSocial} aria-label="Continue with LinkedIn">
            <IconLinkedin />
          </button>
        </div>

        <p className="signup-signin">
          Already have an account?{" "}
          <button type="button" onClick={goToSignIn}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}