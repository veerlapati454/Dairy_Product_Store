import React from "react";
import {
  Leaf,
  ShieldCheck,
  RefreshCw,
  Truck,
  TestTube2,
  Users,
  MapPin,
  Recycle,
} from "lucide-react";
import Reveal from "../Reveal";
import PourDivider from "../PourDivider";
import './Standards.css'


const values = [
  { icon: Leaf, title: "Grass-Fed Herds", body: "Pasture-raised year round, rotated weekly." },
  { icon: ShieldCheck, title: "No Added Hormones", body: "Nothing but milk, culture, and salt." },
  { icon: RefreshCw, title: "Reusable Glass", body: "Bottles washed and refilled, not landfilled." },
  { icon: Truck, title: "Delivered Cold", body: "Farm to porch on the same day, always chilled." },
  { icon: TestTube2, title: "Batch Tested", body: "Every batch is screened for purity before it's bottled." },
  { icon: Users, title: "Fair Wages", body: "Every hand on our farm earns a living wage, guaranteed." },
  { icon: MapPin, title: "Locally Sourced", body: "Raised and processed within 40 miles of our creamery." },
  { icon: Recycle, title: "Zero-Waste Packaging", body: "Compostable labels and reusable delivery crates." },
];

const stats = [
  { number: "0%", label: "Antibiotics or Hormones" },
  { number: "48 hrs", label: "Farm to Fridge" },
  { number: "100%", label: "Recyclable Packaging" },
  { number: "12", label: "Partner Family Farms" },
];

/* ---------------------------------------------------------
   Values — section id="standards"
--------------------------------------------------------- */
export default function Values() {
  return (
    <>
      <section className="values" id="standards">
        <Reveal className="section-head light">
          
          <h2 className="font-display light">Our Standards</h2>
          <p className="section-subtitle light">
            Every promise below is checked, audited, or witnessed in person —
            not just printed on a label.
          </p>
        </Reveal>

        <div className="values-grid">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 0.08} className="value-card">
                <Icon size={26} strokeWidth={1.5} />
                <h4>{v.title}</h4>
                <p>{v.body}</p>
              </Reveal>
            );
          })}
        </div>

        {/* By the numbers — styled inline so it renders correctly
            even if the external stylesheet hasn't reloaded */}
        <Reveal>
          <div
            style={{
              maxWidth: 1100,
              margin: "3.5rem auto 0",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1.25rem",
              position: "relative",
              zIndex: 2,
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  background: "rgba(255, 253, 247, 0.06)",
                  border: "1px solid rgba(255, 253, 247, 0.1)",
                  borderRadius: "1rem",
                  padding: "1.5rem 1rem",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontFamily: "'Fraunces', serif",
                    color: "var(--butter)",
                    fontSize: "1.9rem",
                    lineHeight: 1.1,
                    margin: 0,
                  }}
                >
                  {s.number}
                </strong>
                <span
                  style={{
                    display: "block",
                    marginTop: "0.6rem",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "rgba(255, 253, 247, 0.6)",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Image banner — also inline-styled for the same reason */}
        <Reveal>
          <div
            style={{
              maxWidth: 1100,
              margin: "3.5rem auto 0",
              position: "relative",
              borderRadius: "1.25rem",
              overflow: "hidden",
              minHeight: 340,
              display: "flex",
              alignItems: "flex-end",
              isolation: "isolate",
              zIndex: 1,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1400&h=600&fit=crop&crop=center"
              alt="Milk being checked and bottled at the creamery"
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
                margin: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(10,20,15,0.92) 10%, rgba(10,20,15,0.35) 60%, rgba(10,20,15,0.05) 100%)",
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 2,
                padding: "2.5rem",
                maxWidth: 560,
              }}
            >
              <span
                style={{ color: "var(--butter)", display: "inline-block", marginBottom: "0.5rem" }}
                className="eyebrow light"
              >
                Verified In Person
              </span>
              <h3
                style={{ color: "#fffdf7", fontSize: "1.7rem", fontWeight: 500, margin: "0 0 0.75rem" }}
                className="font-display light"
              >
                Independently Inspected, Every Season
              </h3>
              <p style={{ color: "rgba(255, 253, 247, 0.8)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                Third-party auditors visit unannounced. If a standard slips,
                the batch doesn't ship — no exceptions, no quiet passes.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <PourDivider from="#142A20" to="#142A20" flip />
    </>
  );
}