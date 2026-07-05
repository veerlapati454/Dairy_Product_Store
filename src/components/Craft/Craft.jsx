import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Reveal from "../Reveal";
import PourDivider from "../PourDivider";
import "./Craft.css";
import f20 from "../../assets/f20.webp"
import f21 from "../../assets/f21.webp"
import f22 from "../../assets/f22.webp"
import f23 from "../../assets/f23.webp"
import f24 from "../../assets/f24.webp"
import f25 from "../../assets/f25.webp"
import f30 from "../../assets/f30.webp"
import f31 from "../../assets/f31.webp"
import f32 from "../../assets/f32.webp"
import f33 from "../../assets/f33.webp"

const steps = [
  {
    n: "01",
    title: "Graze",
    body: "Our herds move between clover pastures every morning, never fed grain fillers or held in stalls. They roam freely across 150+ acres of diverse, organic pasture.",
    image: f20,
    details: "7 AM • Daily rotation • 100% grass-fed"
  },
  {
    n: "02",
    title: "Milk",
    body: "Milking happens twice daily, by hand-guided machine, and is chilled within minutes of leaving the cow to preserve the natural enzymes and flavors.",
    image: f21,
    details: "6 AM & 6 PM • 36°F chilled • A2 protein"
  },
  {
    n: "03",
    title: "Chill & Culture",
    body: "Milk rests at 36°F while our creamer culture, churn, and press each morning's small batch. Traditional methods meet modern food safety standards.",
    image: f22,
    details: "24 hrs • Small batch • Hand-crafted"
  },
  {
    n: "04",
    title: "Bottle & Deliver",
    body: "Everything is bottled in returnable glass and on a cold truck within a day of milking. From our farm to your table in under 36 hours.",
    image: f23,
    details: "36 hrs total • Glass bottles • Cold chain"
  },
  {
    n: "05",
    title: "Aging",
    body: "Our aged cheeses and cultured products rest in our humidity-controlled caves, developing complex flavors over months of careful attention.",
    image:f24,
    details: "4-24 months • Humidity controlled • Traditional"
  },
  {
    n: "06",
    title: "Taste",
    body: "The final step is the most important — enjoying the fruits of our labor. Every batch is taste-tested to ensure the highest quality and flavor.",
    image: f25,
    details: "Quality tested • Community approved • Fresh daily"
  }
];

const certifications = [
  { label: "Certified Organic", note: "USDA verified since 2011" },
  { label: "Animal Welfare Approved", note: "Pasture-based, third-party audited" },
  { label: "Non-GMO Project", note: "Verified feed & inputs" },
  { label: "Regenerative Farming", note: "Soil health monitored yearly" }
];

const herdGallery = [
  {
    image: f30,
    caption: "Our Jersey herd on morning pasture"
  },
  {
    image: f31,
    caption: "150+ acres of rotational grazing land"
  },
  {
    image:f32,
    caption: "Calves raised alongside their mothers"
  }
];

/* ---------------------------------------------------------
   Process — section id="craft"
--------------------------------------------------------- */
export default function Craft() {
  const navigate = useNavigate();
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (index) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <section id="craft" className="process">
        <Reveal className="section-head light">
          <span className="eyebrow light">Our Craft</span>
          <h2 className="font-display light">From Pasture to Pantry</h2>
          <p className="section-subtitle light">
            Every step of our process is intentional, sustainable, and transparent.
            We believe great dairy starts with great care.
          </p>
        </Reveal>

        {/* Visual Timeline */}
        <div className="timeline-bar">
          {steps.map((step, index) => (
            <div
              key={step.n}
              className={`timeline-dot ${index <= expandedStep ? 'active' : ''}`}
              onClick={() => toggleStep(index)}
            >
              <span>{step.n}</span>
            </div>
          ))}
        </div>

        <div className="steps-grid">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="step">
              <div className="step-image" onClick={() => handleNavigate("/404")}>
                <img src={s.image} alt={s.title} loading="lazy" />
                <span className="step-number">{s.n}</span>
              </div>
              <div className="step-content">
                <div className="step-header" onClick={() => toggleStep(i)}>
                  <h3>{s.title}</h3>
                  <span className="step-expand">{expandedStep === i ? '−' : '+'}</span>
                </div>
                <p className={`step-body ${expandedStep === i ? 'expanded' : ''}`}>
                  {s.body}
                </p>
                <div className="step-details">
                  <span className="detail-item">{s.details}</span>
                </div>
                <div className="step-progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${((i + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Craft Philosophy */}
        <Reveal className="craft-philosophy">
          <div className="philosophy-content">
            <span className="eyebrow light">Our Philosophy</span>
            <h3 className="font-display light">Where Tradition Meets Innovation</h3>
            <p>
              We honor centuries-old dairy traditions while embracing sustainable
              innovations. Our craft is a living practice — passed down through
              generations and constantly refined.
            </p>
            <div className="philosophy-stats">
              <div className="stat">
                <strong onClick={() => handleNavigate("/404")} style={{ cursor: 'pointer' }}>100+</strong>
                <span>Years of Heritage</span>
              </div>
              <div className="stat">
                <strong onClick={() => handleNavigate("/404")} style={{ cursor: 'pointer' }}>24/7</strong>
                <span>Care & Attention</span>
              </div>
              <div className="stat">
                <strong onClick={() => handleNavigate("/404")} style={{ cursor: 'pointer' }}>0</strong>
                <span>Compromises</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Certifications & Standards */}
        <Reveal className="cert-strip">
          <span className="eyebrow light cert-eyebrow">Held to a Higher Standard</span>
          <div className="cert-grid">
            {certifications.map((c) => (
              <div className="cert-card" key={c.label} onClick={() => handleNavigate("/404")}>
                <span className="cert-mark" aria-hidden="true">✓</span>
                <h4>{c.label}</h4>
                <p>{c.note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Meet The Herd gallery */}
        <Reveal className="herd-section">
          <div className="herd-head">
            <span className="eyebrow light">Meet the Herd</span>
            <h3 className="font-display light">The Animals Behind Every Bottle</h3>
            <p>
              Happy, healthy cows make better milk. We know every animal in our
              herd by name, and our vet checks in monthly to make sure they stay
              that way.
            </p>
          </div>
          <div className="herd-gallery">
            {herdGallery.map((h) => (
              <figure className="herd-photo" key={h.caption} onClick={() => handleNavigate("/404")}>
                <img src={h.image} alt={h.caption} loading="lazy" />
                <figcaption>{h.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        {/* Farmer Quote */}
        <Reveal className="farmer-quote">
          <blockquote>
            "We don't rush the cows, and we don't rush the cheese. Everything
            here moves at the pace nature intended — that's the whole secret."
          </blockquote>
          <div className="farmer-attribution" onClick={() => handleNavigate("/404")}>
            <img
              src={f33}
              alt="Portrait of the farm owner"
              className="farmer-avatar"
            />
            <div>
              <strong>Maren Holt</strong>
              <span>Third-generation farmer & owner</span>
            </div>
          </div>
        </Reveal>
      </section>

      <PourDivider from="#1F3A2E" to="#142A20" />
    </>
  );
}