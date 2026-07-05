import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ---------------------------------------------------------
   Reveal — generic scroll-in wrapper, shared across every
   section component.
--------------------------------------------------------- */
export default function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}