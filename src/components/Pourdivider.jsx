import React from "react";

/* ---------------------------------------------------------
   PourDivider — a wavy SVG seam between sections, standing
   in for milk settling into the next vessel.
--------------------------------------------------------- */
export default function PourDivider({ from = "#F6F1E4", to = "#1F3A2E", flip = false }) {
  return (
    <div className={`pour-divider ${flip ? "flip" : ""}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,64 C240,120 480,0 720,32 C960,64 1200,112 1440,48 L1440,120 L0,120 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}