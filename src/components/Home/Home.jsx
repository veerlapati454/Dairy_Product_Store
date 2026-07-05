import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Leaf,
  ShieldCheck,
  RefreshCw,
  Truck,
  ArrowRight,
  Star,
  Milk,
} from "lucide-react";
import "./Home.css";
import iimg1 from "../../assets/iimg1.webp"
import iimg2 from "../../assets/iimg2.webp"
import bottles from "../../assets/bottles.webp"
import ghee from "../../assets/ghee.webp"
import paneer from "../../assets/paneer.webp"
import yougurt from "../../assets/yougurt.webp"
import butter from "../../assets/butter.webp"
import cheese from "../../assets/cheese.webp"

/* ---------------------------------------------------------
   IMAGE SOURCES (Unsplash, free license)
--------------------------------------------------------- */
const IMG = {
  hero: iimg1,
  pasture: iimg2,
  bottles: bottles,
  cheese: cheese,
  yogurt: yougurt,
  paneer: paneer,
  butter: butter,
  ghee: ghee,
};

/* ---------------------------------------------------------
   StaggeredFade — splits text into characters and fades
   them in one at a time when scrolled into view
--------------------------------------------------------- */
function StaggeredFade({ text, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const chars = text.split("");

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0 } },
  };

  return (
    <span ref={ref} className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: i * 0.045, ease: "easeOut" },
            },
          }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------------------------------------------------------
   CreameryStamp — signature rotating seal, echoes the
   embossed stamp pressed into a wax-sealed milk bottle cap
--------------------------------------------------------- */
function CreameryStamp({ size = 128, className = "" }) {
  const label =
    "CLOVER & CHURN • SMALL BATCH DAIRY • EST. 2003 • ";
  const charCount = label.length;
  return (
    <div className={`stamp ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="stamp-spin">
        <defs>
          <path
            id="stampCircle"
            d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
          />
        </defs>
        <text fontSize="10.6" letterSpacing="2.2" fill="currentColor">
          <textPath href="#stampCircle" startOffset="0%">
            {label.repeat(2).slice(0, charCount * 2)}
          </textPath>
        </text>
      </svg>
      <div className="stamp-core">
        <Milk size={size * 0.26} strokeWidth={1.4} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   PourDivider — a wavy SVG seam between sections,
   standing in for milk settling into the next vessel
--------------------------------------------------------- */
function PourDivider({ from = "#F6F1E4", to = "#1F3A2E", flip = false }) {
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

/* ---------------------------------------------------------
   Reveal — generic scroll-in wrapper
--------------------------------------------------------- */
function Reveal({ children, delay = 0, y = 24, className = "" }) {
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

/* =========================================================
   MAIN COMPONENT
========================================================= */
export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const products = [
    {
      name: "Whole Milk",
      note: "Non-homogenized, cream on top",
      price: "$5.50 / half-gal",
      img: IMG.bottles,
    },
    {
      name: "Aged Cheddar",
      note: "Clothbound, 14-month wheel",
      price: "$11.00 / lb",
      img: IMG.cheese,
    },
    {
      name: "Farmhouse Yogurt",
      note: "Cultured 12 hours, unstrained",
      price: "$4.25 / pint",
      img: IMG.yogurt,
    },
    {
      name: "Cultured Butter",
      note: "Hand-churned, sea salt",
      price: "$7.75 / block",
      img: IMG.butter,
    },
    {
      name: "Grass-Fed Ghee",
      note: "Simmered small-batch",
      price: "$9.50 / jar",
      img: IMG.ghee,
    },
    {
      name: "Fresh Paneer",
      note: "Pressed same-day",
      price: "$6.00 / block",
      img: IMG.paneer,
    },
  ];

  const steps = [
    {
      n: "01",
      title: "Graze",
      body:
        "Our herds move between clover pastures every morning, never fed grain fillers or held in stalls.",
    },
    {
      n: "02",
      title: "Milk",
      body:
        "Milking happens twice daily, by hand-guided machine, and is chilled within minutes of leaving the cow.",
    },
    {
      n: "03",
      title: "Chill & Culture",
      body:
        "Milk rests at 36°F while our creamer culture, churn, and press each morning's small batch.",
    },
    {
      n: "04",
      title: "Bottle & Deliver",
      body:
        "Everything is bottled in returnable glass and on a cold truck within a day of milking.",
    },
  ];

  const values = [
    { icon: Leaf, title: "Grass-Fed Herds", body: "Pasture-raised year round, rotated weekly." },
    { icon: ShieldCheck, title: "No Added Hormones", body: "Nothing but milk, culture, and salt." },
    { icon: RefreshCw, title: "Reusable Glass", body: "Bottles washed and refilled, not landfilled." },
    { icon: Truck, title: "Delivered Cold", body: "Farm to porch on the same day, always chilled." },
  ];

  const testimonials = [
    {
      quote:
        "The cream line on the milk tells you everything. My kids ask for it by name now, not just 'milk.'",
      name: "Priya Raman",
      role: "Subscriber since 2021",
    },
    {
      quote:
        "I stopped buying supermarket cheddar the week I tried theirs. It actually tastes like where it came from.",
      name: "Owen Marsh",
      role: "Local chef",
    },
    {
      quote:
        "Returning the glass bottles every week has become a strange little ritual I didn't know I needed.",
      name: "Dana Whitfield",
      role: "Subscriber since 2019",
    },
  ];

  return (
    <div className="dairy-page">
      {/* ============ SECTION 1 — HERO ============ */}
      <section className="hero" id="home" ref={heroRef}>
        <motion.div
          className="hero-media"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        >
          <img src={IMG.hero} alt="Fresh milk being poured into a glass" />
          <div className="hero-scrim" />
        </motion.div>

        <div className="hero-content">
          <h1 className="hero-heading">
            <StaggeredFade text="POURED FRESH" />
            <br />
            <StaggeredFade text="EVERY MORNING" />
          </h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Small-batch milk, butter, and cheese from four family pastures,
            <span className="hide-mobile"><br /></span>
            {" "}chilled and bottled within a day of milking.
          </motion.p>

          <motion.button
            className="liquid-glass cta"
            onClick={() => handleNavigate("/404")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
          >
            Shop the Dairy Case
          </motion.button>
        </div>

        <CreameryStamp className="hero-stamp" size={112} />
      </section>

      {/* ============ SECTION 2 — STORY / PASTURE ============ */}
      <section id="pasture" className="story">
        <div className="story-grid">
          <Reveal className="story-image">
            <img src={IMG.pasture} alt="Dairy herd grazing in a green pasture" />
          </Reveal>

          <Reveal delay={0.15} className="story-copy">
            <span className="eyebrow">Our Pastures</span>
            <h2 className="font-display">
              Four Farms, <em>One Herd of Trust</em>
            </h2>
            <p>
              Clover &amp; Churn began as a milk-share between four
              neighboring families who refused to send their herds to a
              co-op that never told them where the milk actually went. Two
              decades later, we still know every cow's name, and so does
              our creamery.
            </p>
            <div className="stat-row">
              <div className="stat">
                <strong>4</strong>
                <span>Family Farms</span>
              </div>
              <div className="stat">
                <strong>36 hrs</strong>
                <span>Pasture to Bottle</span>
              </div>
              <div className="stat">
                <strong>0</strong>
                <span>Added Hormones</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PourDivider to="#FFFBF2" />

      {/* ============ SECTION 3 — DAIRY CASE (PRODUCTS) ============ */}
      <section id="dairy-case" className="dairy-case">
        <Reveal className="section-head">
          <span className="eyebrow">The Dairy Case</span>
          <h2 className="font-display">What's Chilling This Week</h2>
        </Reveal>

        <div className="product-grid">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="product-card">
              <div className="product-image">
                <img src={p.img} alt={p.name} />
                <span className="grade-stamp">GRADE A</span>
              </div>
              <div className="product-body">
                <h3>{p.name}</h3>
                <p>{p.note}</p>
                <div className="product-foot">
                  <span className="price">{p.price}</span>
                  <button 
                    className="liquid-glass mini-cta"
                    onClick={() => handleNavigate("/404")}
                  >
                    Add to Crate
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <PourDivider to="#1F3A2E" />

      {/* ============ SECTION 4 — PROCESS / CRAFT ============ */}
      <section id="craft" className="process">
        <Reveal className="section-head light">
          <span className="eyebrow light">Our Craft</span>
          <h2 className="font-display light">From Pasture to Pantry</h2>
        </Reveal>

        <div className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className="step">
              <span className="step-number">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <PourDivider from="#1F3A2E" to="#142A20" />

      {/* ============ SECTION 5 — VALUES BAND ============ */}
      <section className="values" id="standards">
        <Reveal className="section-head light">
          <span className="eyebrow light">What We Won't Compromise</span>
          <h2 className="font-display light">Our Standards</h2>
        </Reveal>
        <div className="values-grid">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 0.1} className="value-card">
                <Icon size={26} strokeWidth={1.5} />
                <h4>{v.title}</h4>
                <p>{v.body}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <PourDivider from="#142A20" to="#F6F1E4" flip />

      {/* ============ SECTION 6 — TESTIMONIALS ============ */}
      <section id="reviews" className="testimonials">
        <Reveal className="section-head">
          <span className="eyebrow">From the Milk Route</span>
          <h2 className="font-display">Neighbors, Mostly</h2>
        </Reveal>

        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12} className="testimonial-card">
              <div className="stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="quote">"{t.quote}"</p>
              <div className="testimonial-name">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ SECTION 7 — JOIN THE MILK ROUTE ============ */}
      <section className="signup-band" id="join">
        <div className="signup-inner">
          <CreameryStamp className="signup-stamp" size={92} />

          <Reveal className="signup-copy">
            <span className="eyebrow light">Come Say Hello</span>
            <h2 className="font-display light">Join the Milk Route</h2>
            <p>
              One short email a week: what's fresh, what's seasonal, and
              first pick of limited cheese wheels.
            </p>

            <form className="signup" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
              />
              <button 
                type="submit" 
                className="liquid-glass mini-cta"
                onClick={() => handleNavigate("/404")}
              >
                Sign Up <ArrowRight size={15} />
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}