import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, User, ShieldCheck } from "lucide-react";
import "./Login.css";

const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user"); // "user" | "admin"
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setFormMessage("");
  };

  const validate = () => {
    const nextErrors = {};

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

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      setFormMessage("Please fix the highlighted fields before continuing.");
      return;
    }

    if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  const goHome = () => navigate("/");
  const goToSignup = () => navigate("/signup");

  return (
    <div className="login-page">
      <button type="button" className="login-back-btn" onClick={goHome}>
        <ArrowLeft size={18} strokeWidth={2} />
        Back to Home
      </button>

      <div className="login-card">
        <div className="login-head">
          <span className="eyebrow">Welcome Back</span>
          <h1 className="font-display">Sign In to Stackly</h1>
          <p>Pick your role and log in to continue.</p>
        </div>

        {/* Role selector */}
        <div className="role-toggle" role="tablist" aria-label="Select account type">
          <button
            type="button"
            role="tab"
            aria-selected={role === "user"}
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            <User size={16} strokeWidth={2} />
            User
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={role === "admin"}
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            <ShieldCheck size={16} strokeWidth={2} />
            Admin
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
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

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange("password")}
                className={errors.password ? "has-error" : ""}
                autoComplete="current-password"
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

          {formMessage && <p className="login-form-message">{formMessage}</p>}

          <button type="submit" className="login-submit">
            Sign In as {role === "admin" ? "Admin" : "User"}
          </button>
        </form>

        <p className="login-signup">
          Don't have an account?{" "}
          <button type="button" onClick={goToSignup}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}