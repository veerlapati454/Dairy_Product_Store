import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DairyCase.css";
import Reveal from "../Reveal";
import PourDivider from "../PourDivider";
import f6 from "../../assets/f6.webp"
import f7 from "../../assets/f7.webp"
import f8 from "../../assets/f8.webp"
import f9 from "../../assets/f9.webp"
import f10 from "../../assets/f10.webp"
import f11 from "../../assets/f11.webp"
import f12 from "../../assets/f12.webp"
import f13 from "../../assets/f13.webp"
import f14 from "../../assets/f14.webp"

const products = [
  {
    name: "Whole Milk",
    note: "Non-homogenized, cream on top",
    price: "$5.50 / half-gal",
    category: "Milk",
    badge: "Bestseller",
    img: f6,
  },
  {
    name: "Aged Cheddar",
    note: "Clothbound, 14-month wheel",
    price: "$11.00 / lb",
    category: "Cheese",
    badge: "Aged",
    img: f7,
  },
  {
    name: "Farmhouse Yogurt",
    note: "Cultured 12 hours, unstrained",
    price: "$4.25 / pint",
    category: "Yogurt",
    badge: "Probiotic",
    img: f8,
  },
  {
    name: "Cultured Butter",
    note: "Hand-churned, sea salt",
    price: "$7.75 / block",
    category: "Butter",
    badge: "Artisanal",
    img: f9,
  },
  {
    name: "Grass-Fed Ghee",
    note: "Simmered small-batch",
    price: "$9.50 / jar",
    category: "Ghee",
    badge: "Keto-Friendly",
    img: f10,
  },
  {
    name: "Fresh Paneer",
    note: "Pressed same-day",
    price: "$6.00 / block",
    category: "Cheese",
    badge: "Fresh",
    img: f11,
  },
  {
    name: "Goat Milk",
    note: "Easy to digest, creamy",
    price: "$6.25 / half-gal",
    category: "Milk",
    badge: "New",
    img: f12,
  },
  {
    name: "Smoked Gouda",
    note: "Oak-smoked, creamy texture",
    price: "$12.50 / lb",
    category: "Cheese",
    badge: "Limited",
    img: f13,
  },
  {
    name: "Kefir",
    note: "Fermented 24 hours, tangy",
    price: "$5.00 / pint",
    category: "Fermented",
    badge: "Probiotic",
    img: f14,
  },
];

/* ---------------------------------------------------------
   DairyCase — section id="dairy-case"
--------------------------------------------------------- */
export default function DairyCase() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);

  const categories = ["All", "Milk", "Cheese", "Yogurt", "Butter", "Ghee", "Fermented"];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    // Navigate to 404 when adding to cart
    handleNavigate("/404");
  };

  return (
    <>
      <section id="dairy-case" className="dairy-case">
        <Reveal className="section-head">
          <span className="eyebrow">The Dairy Case</span>
          <h2 className="font-display">What's Chilling This Week</h2>
          <p className="section-subtitle">
            Fresh from our creamery to your table — every product crafted with care
          </p>
        </Reveal>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Count */}
        <div className="product-count">
          <span>{filteredProducts.length} products available</span>
        </div>

        <div className="product-grid">
          {filteredProducts.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} className="product-card">
              <div className="product-image" onClick={() => handleNavigate("/404")}>
                <img src={p.img} alt={p.name} loading="lazy" />
                <span className="grade-stamp">GRADE A</span>
                {p.badge && <span className="product-badge">{p.badge}</span>}
              </div>
              <div className="product-body">
                <div className="product-header">
                  <h3>{p.name}</h3>
                  <span className="product-category">{p.category}</span>
                </div>
                <p>{p.note}</p>
                <div className="product-foot">
                  <span className="price">{p.price}</span>
                  <button
                    className="liquid-glass mini-cta"
                    onClick={() => handleAddToCart(p)}
                  >
                    Add to Crate
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <span>{cartItems.length} items in your crate</span>
            <button 
              className="liquid-glass"
              onClick={() => handleNavigate("/404")}
            >
              View Crate
            </button>
          </div>
        )}
      </section>

      <PourDivider to="#1F3A2E" />
    </>
  );
}