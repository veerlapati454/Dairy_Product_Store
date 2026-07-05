import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/stackly_logo.webp";

/* ---------------------------------------------------------
   Header — fixed transparent nav bar that sits on top of
   the hero image. Manages its own mobile-menu state.
--------------------------------------------------------- */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pasture", path: "/pasture" },
    { name: "Dairy Case", path: "/dairy-case" },
    { name: "Craft", path: "/craft" },
    { name: "Standards", path: "/standards" },
    { name: "Join", path: "/login" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  // Check background color of the section under the header
  useEffect(() => {
    const checkBackground = () => {
      const header = document.querySelector('.site-header');
      if (!header) return;

      // Get the element right below the header
      const scrollY = window.scrollY;
      const headerHeight = header.offsetHeight;
      
      // Get the element at the top of the viewport (below header)
      const element = document.elementFromPoint(
        window.innerWidth / 2,
        headerHeight + 10
      );

      if (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        const rgb = bgColor.match(/\d+/g);
        
        if (rgb) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
          // If brightness is high (> 200), it's a light background
          setIsLightBackground(brightness > 200);
        }
      }
    };

    // Check on mount and scroll
    checkBackground();
    window.addEventListener('scroll', checkBackground);
    window.addEventListener('resize', checkBackground);

    return () => {
      window.removeEventListener('scroll', checkBackground);
      window.removeEventListener('resize', checkBackground);
    };
  }, [location.pathname]);

  return (
    <>
      <nav className={`site-header ${isLightBackground ? 'light-background' : ''}`}>
        <div 
          className="logo-slot" 
          onClick={() => handleNavigation("/")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="Logo placeholder — replace with your own"
          />
        </div>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button 
                className="nav-link-btn"
                onClick={() => handleNavigation(link.path)}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-glass"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                className="mobile-nav-btn"
                onClick={() => handleNavigation(link.path)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06 }}
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}