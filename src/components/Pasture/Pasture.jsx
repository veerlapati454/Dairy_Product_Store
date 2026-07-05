import React from "react";

import "./Pasture.css";
import Reveal from "../Reveal";
import PourDivider from "../Pourdivider";
import f1 from "../../assets/f1.webp"
import f2 from "../../assets/f2.webp"
import f3 from "../../assets/f3.webp"
import f4 from "../../assets/f4.webp"

/* ---------------------------------------------------------
   Pasture — section id="pasture"
   Four alternating story blocks, each with an image and copy.
   Data-driven so adding/removing a block means editing the
   array below, not duplicating markup.
--------------------------------------------------------- */
const storyBlocks = [
  {
    eyebrow: "Our Pastures",
    title: "Four Farms, ",
    emphasis: "One Herd of Trust",
    body:
      "Clover & Churn began as a milk-share between four neighboring families who refused to send their herds to a co-op that never told them where the milk actually went. Two decades later, we still know every cow's name, and so does our creamery.",
    stats: [
      { value: "4", label: "Family Farms" },
      { value: "36 hrs", label: "Pasture to Bottle" },
      { value: "0", label: "Added Hormones" },
    ],
    image: f1,
    alt: "Dairy herd grazing in a green pasture",
    reverse: false,
  },
  {
    eyebrow: "Sustainable Practices",
    title: "Regenerative ",
    emphasis: "Farming for Tomorrow",
    body:
      "Our rotational grazing system mimics nature's own rhythms. By moving herds across diverse pastures, we build soil health, sequester carbon, and produce milk with deeper flavor and higher nutritional value.",
    stats: [
      { value: "150+", label: "Acres of Pasture" },
      { value: "100%", label: "Grass-Fed" },
      { value: "2x", label: "Biodiversity" },
    ],
    image:f2,
        alt: "Cows grazing in lush pasture with mountains",
    reverse: true,
  },
  {
    eyebrow: "Heritage Breeds",
    title: "Cows with ",
    emphasis: "Character and Care",
    body:
      "Our Jersey, Guernsey, and Brown Swiss herds are chosen not just for their rich, golden milk, but for their gentle temperaments and adaptability to our regenerative system. Each breed contributes unique flavor notes to our cheeses.",
    stats: [
      { value: "3", label: "Heritage Breeds" },
      { value: "120+", label: "Happy Cows" },
      { value: "12 mo", label: "Year-Round Grazing" },
    ],
    image:f3,
    alt: "Heritage breed cattle in the meadow",
    reverse: false,
  },
  {
    eyebrow: "Community Impact",
    title: "Sourcing ",
    emphasis: "with Purpose",
    body:
      "Beyond our pastures, we're building a local food economy that supports small-scale dairies, creates jobs, and brings fresh, transparent dairy to our neighbors. From farm to table, every step is community-owned and accountable.",
    stats: [
      { value: "50+", label: "Local Jobs" },
      { value: "85%", label: "Local Sourcing" },
      { value: "10+", label: "Partner Farms" },
    ],
    image:f4,
    alt: "Local community at the dairy farm",
    reverse: true,
  },
];

function StoryBlock({ block }) {
  return (
    <div className={`story-grid ${block.reverse ? "story-grid-reverse" : ""}`}>
      <Reveal className="story-image">
        <img src={block.image} alt={block.alt} loading="lazy" />
      </Reveal>

      <Reveal delay={0.15} className="story-copy">
        <span className="eyebrow">{block.eyebrow}</span>
        <h2 className="font-display">
          {block.title}
          <em>{block.emphasis}</em>
        </h2>
        <p>{block.body}</p>
        <div className="stat-row">
          {block.stats.map((s) => (
            <div className="stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

export default function Pasture() {
  return (
    <>
      <section id="pasture" className="story">
        {storyBlocks.map((block) => (
          <StoryBlock block={block} key={block.eyebrow} />
        ))}
      </section>

      <PourDivider to="#FFFBF2" />
    </>
  );
}