import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home, AlertCircle } from "lucide-react";
import "./NotFound.css";

/* ---------------------------------------------------------
   404 Not Found Page
   Features: Back button (go back one step) & Home button
--------------------------------------------------------- */
export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one step in history
  };

  const handleGoHome = () => {
    navigate("/"); // Navigate to home
  };

  return (
    <div className="not-found-container">
      <motion.div
        className="not-found-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Decorative elements */}
        <div className="not-found-decoration">
          <div className="float-element float-1">🥛</div>
          <div className="float-element float-2">🧀</div>
          <div className="float-element float-3">🐄</div>
        </div>

        {/* Main content */}
        <div className="not-found-main">
          <div className="error-icon">
            <AlertCircle size={60} strokeWidth={1.5} />
          </div>
          
          <motion.div
            className="error-code"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="code-4">4</span>
            <span className="code-0">0</span>
            <span className="code-4">4</span>
          </motion.div>

          <h1 className="not-found-title">Page Not Found</h1>
          
          <p className="not-found-message">
            Oops! The page you're looking for seems to have wandered off 
            to the pasture. Don't worry, we'll help you find your way back.
          </p>

          <div className="not-found-actions">
            <motion.button
              className="btn-back"
              onClick={handleGoBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              Go Back
            </motion.button>

            <motion.button
              className="btn-home"
              onClick={handleGoHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={18} />
              Back to Home
            </motion.button>
          </div>

          <div className="not-found-suggestions">
            <p>You might want to visit:</p>
            <div className="suggestion-links">
              <button onClick={() => navigate("/")}>Home</button>
              <button onClick={() => navigate("/pasture")}>Pasture</button>
              <button onClick={() => navigate("/dairy-case")}>Dairy Case</button>
              <button onClick={() => navigate("/craft")}>Craft</button>
              <button onClick={() => navigate("/standards")}>Standards</button>
              <button onClick={() => navigate("/join")}>Join</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="not-found-footer">
          <p>© 2024 Stackly. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
}