// Footer.jsx - Updated with useNavigate for navigation
import React from "react";
import { useNavigate } from "react-router-dom";
import { Milk } from "lucide-react";
import "./Footer.css";
import logo from "../../assets/stackly_logo.webp";

/* ---------------------------------------------------------
   Lucide dropped several brand/trademark icons across versions
   (Facebook, Twitter, Linkedin, Youtube), so social icons are
   defined here as small inline SVGs instead — no dependency risk.
--------------------------------------------------------- */
const IconInstagram = ({ size = 18, strokeWidth = 1.6, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    {...rest}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const IconFacebook = ({ size = 18, strokeWidth = 1.6, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    {...rest}
  >
    <path d="M14 9h3V5.6c-.6-.08-1.7-.2-2.9-.2C11.5 5.4 10 7 10 9.6V12H7v3.6h3V22h3.6v-6.4H16.5L17 12h-3.4V9.9C13.6 9.3 13.8 9 14 9z" />
  </svg>
);

const IconTwitter = ({ size = 18, strokeWidth = 1.6, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    {...rest}
  >
    <path d="M4 4l7.2 9.4L4.4 20H7l5-5.6 4 5.6h4l-7.5-9.9L19.7 4H17l-4.6 5.1L8.4 4H4z" />
  </svg>
);

const IconYoutube = ({ size = 18, strokeWidth = 1.6, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    {...rest}
  >
    <rect x="3" y="6" width="18" height="12" rx="3" />
    <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
  </svg>
);

const IconLinkedin = ({ size = 18, strokeWidth = 1.6, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    {...rest}
  >
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <line x1="7.5" y1="10" x2="7.5" y2="17" />
    <circle cx="7.5" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    <path d="M11.5 17v-4.2c0-1.5 1-2.4 2.3-2.4 1.2 0 2.2.8 2.2 2.4V17" />
    <line x1="11.5" y1="10" x2="11.5" y2="17" />
  </svg>
);

const LOGO_PLACEHOLDER = logo;

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSocialClick = (url) => {
    // For social links, open in new tab
    if (url && url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(url);
    }
  };

  const shopLinks = [
    { label: "Whole Milk", path: "/products" },
    { label: "Aged Cheddar", path: "/products" },
    { label: "Farmhouse Yogurt", path: "/products" },
    { label: "Cultured Butter", path: "/products" },
    { label: "Grass-Fed Ghee", path: "/products" },
    { label: "Fresh Paneer", path: "/products" },
  ];

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Pasture", path: "/Pasture" },
    { label: "Dairy Case", path: "/dairy-case" },
    { label: "Craft", path: "/Craft" },
    { label: "Standards", path: "/Standards" },
  ];

  const socialLinks = [
    { label: "Instagram", url: "https://instagram.com", Icon: IconInstagram },
    { label: "Facebook", url: "https://facebook.com", Icon: IconFacebook },
    { label: "Twitter", url: "https://twitter.com", Icon: IconTwitter },
    { label: "YouTube", url: "https://youtube.com", Icon: IconYoutube },
    { label: "LinkedIn", url: "https://linkedin.com", Icon: IconLinkedin },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* ===== Brand column ===== */}
        <div className="footer-brand">
          <a 
            href="/" 
            className="footer-logo-slot" 
            aria-label="Dairy Store home"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/");
            }}
          >
            <img
              src={LOGO_PLACEHOLDER}
              alt="Dairy Store logo"
              className="footer-logo"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "inline-flex";
              }}
            />
            <span className="footer-logo-fallback" style={{ display: "none" }}>
              <Milk size={28} strokeWidth={1.4} />
              <span>Clover &amp; Churn</span>
            </span>
          </a>
          <p className="footer-tagline">
            Small-batch milk, butter, and cheese from four family pastures,
            chilled and bottled within a day of milking.
          </p>

          <div className="footer-social">
            {socialLinks.map(({ label, url, Icon }) => (
              <a
                key={label}
                href={url}
                className="footer-social-icon"
                aria-label={label}
                onClick={(e) => {
                  e.preventDefault();
                  handleSocialClick(url);
                }}
              >
                <Icon size={18} strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>

        {/* ===== Link columns ===== */}
        <div className="footer-links">
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(link.path);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(link.path);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-address">
            <h4>Address</h4>
            <address>
              Financial District
              <br />
              Wipro Road
              <br />
              Hyderabad, 500070
              <br />
              <a 
                href="tel:09266826456"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "tel:09266826456";
                }}
              >
                9266826456
              </a>
              <br />
              <a 
                href="mailto:hello@thestackly.com"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:hello@thestackly.com";
                }}
              >
                hello@thestackly.com
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* ===== Bottom bar ===== */}
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Stackly All rights reserved.</span>
        <span className="footer-bottom-note">Poured fresh, every morning.</span>
      </div>
    </footer>
  );
}