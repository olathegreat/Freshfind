import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiHeart,
  FiMapPin,
  FiSearch,
  FiSliders,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";

import "./MarketDirectory.css";

// You can replace this with:
// import freshfindData from "../data/freshfindData.json";

const products = [
  {
    id: 1,
    name: "Fruits",
    category: "Fresh Fruit",
    image:
      "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80",
    description:
      "A crisp, slightly bitter favourite. Enjoy fresh with groundnut, or add to a colourful stew.",
    markets: ["Mile 12", "Oyingbo Market", "Oja Oba"],
  },
  {
    id: 2,
    name: "Yam",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1603048719539-9ecb4d8f3c1e?auto=format&fit=crop&w=700&q=80",
    description:
      "A crisp, slightly bitter favourite. Enjoy fresh with groundnut, or add to a colourful stew.",
    markets: ["Mile 12", "Ogbete Market", "Oja Oba"],
  },
  {
    id: 3,
    name: "Pepper",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=700&q=80",
    description:
      "A crisp, slightly bitter favourite. Enjoy fresh with groundnut, or add to a colourful stew.",
    markets: ["Mile 12", "Oyingbo Market", "Oja Oba"],
  },
  {
    id: 4,
    name: "Yam flour (elubo)",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80",
    description:
      "A crisp, slightly bitter favourite. Enjoy fresh with groundnut, or add to a colourful stew.",
    markets: ["Mile 12", "Ogbete Market", "Oja Oba"],
  },
  {
    id: 5,
    name: "Fresh fish",
    category: "Fresh Fish",
    image:
      "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?auto=format&fit=crop&w=700&q=80",
    description:
      "A crisp, slightly bitter favourite. Enjoy fresh with groundnut, or add to a colourful stew.",
    markets: ["Mile 12", "Ogbete Market", "Oja Oba"],
  },
  {
    id: 6,
    name: "Seasonings",
    category: "Seasonings",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80",
    description:
      "A crisp, slightly bitter favourite. Enjoy fresh with groundnut, or add to a colourful stew.",
    markets: ["Mile 12", "Ogbete Market", "Oja Oba"],
  },
  {
    id: 7,
    name: "Onions",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=700&q=80",
    description:
      "A crisp, slightly bitter favourite. Enjoy fresh with groundnut, or add to a colourful stew.",
    markets: ["Mile 12", "Ogbete Market", "Oja Oba"],
  },
  {
    id: 8,
    name: "Palm oil",
    category: "Cooking",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
    description:
      "A crisp, slightly bitter favourite. Enjoy fresh with groundnut, or add to a colourful stew.",
    markets: ["Mile 12", "Ogbete Market", "Oja Oba"],
  },
  {
    id: 9,
    name: "Vegetable oil",
    category: "Cooking",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
    description:
      "A crisp, slightly bitter favourite. Enjoy fresh with groundnut, or add to a colourful stew.",
    markets: ["Mile 12", "Ogbete Market", "Oja Oba"],
  },
  {
    id: 10,
    name: "Maize",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=700&q=80",
    description:
      "A crisp, slightly bitter favourite. Enjoy fresh with groundnut, or add to a colourful stew.",
    markets: ["Mile 12", "Ogbete Market", "Oja Oba"],
  },
  {
    id: 11,
    name: "Okro",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1425543103986-22abb7d7ea72?auto=format&fit=crop&w=700&q=80",
    description:
      "A crisp, slightly bitter favourite. Enjoy fresh with groundnut, or add to a colourful stew.",
    markets: ["Mile 12", "Ogbete Market", "Oja Oba"],
  },
  {
    id: 12,
    name: "Sugarcane",
    category: "Fresh Fruit",
    image:
      "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=700&q=80",
    description:
      "A crisp, slightly bitter favourite. Enjoy fresh with groundnut, or add to a colourful stew.",
    markets: ["Mile 12", "Ogbete Market", "Oja Oba"],
  },
];

const categories = [
  { name: "Fresh Fruit", count: 25 },
  { name: "Vegetables", count: 50 },
  { name: "Cooking", count: 54 },
  { name: "Legumes", count: 47 },
  { name: "Herbs", count: 43 },
  { name: "Poultry", count: 38 },
  { name: "Honey", count: 15 },
];

const popularMarkets = [
  "Oyingbo",
  "Mile 12",
  "Oja Oba",
  "Wuse",
  "Calabar",
];

function ProductCard({ product }) {
  return (
    <Link
      to={`/market/${product.id}`}
      className="market-product-card"
    >
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} />

        <span className="season-badge">IN SEASON</span>
      </div>

      <div className="product-card-body">
        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-markets">
          <span>Markets Available:</span>

          {product.markets.map((market, index) => (
            <React.Fragment key={market}>
              <span className="market-name">
                {market}
              </span>

              {index !== product.markets.length - 1 && (
                <span className="separator">,</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Link>
  );
}

function MarketDirectory() {
  const [selectedCategory, setSelectedCategory] =
    useState("Vegetables");

  const [searchTerm, setSearchTerm] = useState("");

  const [sortBy, setSortBy] = useState("Latest");

  const [currentPage, setCurrentPage] = useState(1);

  const [mobileFilterOpen, setMobileFilterOpen] =
    useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All Categories") {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
      );
    }

    if (sortBy === "A-Z") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortBy === "Z-A") {
      result.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    return result;
  }, [selectedCategory, searchTerm, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="market-directory-page">
      {/* =====================================
          TOP LOCATION BAR
      ====================================== */}
      <div className="top-location-bar">
        <div className="market-container">
          <p>
            Your Location: Aptech Ringroad, Ibadan,
            Oyo State, Nigeria.
          </p>

          <div className="account-links">
            <Link to="/login">Sign In</Link>
            <span>/</span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>

      {/* =====================================
          MAIN HEADER
      ====================================== */}
      <header className="main-header">
        <div className="market-container header-inner">
          <Link to="/" className="freshfind-logo">
            <div className="logo-icon">
              🌱
            </div>

            <div>
              <strong>FreshFind</strong>
              <small>Fresh From the Farm</small>
            </div>
          </Link>

          <div className="header-search">
            <FiSearch />

            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            <button>Search</button>
          </div>

          <div className="header-actions">
            <button className="heart-button">
              <FiHeart />
            </button>

            <div className="visitor-count">
              <span>👥</span>

              <div>
                <small>Visitor Count</small>
                <strong>1,286</strong>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================
          NAVIGATION
      ====================================== */}
      <nav className="main-navigation">
        <div className="market-container navigation-inner">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link
              to="/market"
              className="active"
            >
              Find a Market
            </Link>
            <Link to="/produce">Produce Guide</Link>
            <Link to="/seasonal-picks">
              Seasonal Picks
            </Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <a href="tel:+23487961234" className="phone">
            ☎ &nbsp;234 8796 1234
          </a>
        </div>
      </nav>

      {/* =====================================
          HERO / BREADCRUMB
      ====================================== */}
      <section className="directory-hero">
        <div className="hero-overlay">
          <div className="market-container breadcrumb">
            <Link to="/">
              <FiMapPin />
              Home
            </Link>

            <span>›</span>

            <span>Categories</span>

            <span>›</span>

            <strong>Vegetables</strong>
          </div>
        </div>
      </section>

      {/* =====================================
          MAIN CONTENT
      ====================================== */}
      <main className="directory-content">
        <div className="market-container directory-layout">
          {/* MOBILE FILTER BUTTON */}
          <button
            className="mobile-filter-button"
            onClick={() =>
              setMobileFilterOpen(!mobileFilterOpen)
            }
          >
            <FiFilter />
            Filter
          </button>

          {/* =====================================
              SIDEBAR
          ====================================== */}
          <aside
            className={`directory-sidebar ${
              mobileFilterOpen
                ? "sidebar-open"
                : ""
            }`}
          >
            <div className="sidebar-filter-button">
              <button
                onClick={() =>
                  setMobileFilterOpen(false)
                }
              >
                <FiFilter />
                Filter
              </button>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-title">
                <h3>All Categories</h3>
                <FiChevronDown />
              </div>

              <div className="category-list">
                <label>
                  <input
                    type="radio"
                    name="category"
                    checked={
                      selectedCategory ===
                      "All Categories"
                    }
                    onChange={() =>
                      handleCategoryChange(
                        "All Categories"
                      )
                    }
                  />

                  <span className="custom-radio" />

                  Fresh Fruit
                  <small>(25)</small>
                </label>

                {categories.map((category) => (
                  <label key={category.name}>
                    <input
                      type="radio"
                      name="category"
                      checked={
                        selectedCategory ===
                        category.name
                      }
                      onChange={() =>
                        handleCategoryChange(
                          category.name
                        )
                      }
                    />

                    <span className="custom-radio" />

                    {category.name}

                    <small>
                      ({category.count})
                    </small>
                  </label>
                ))}
              </div>
            </div>

            {/* POPULAR MARKETS */}
            <div className="sidebar-section popular-section">
              <div className="sidebar-title">
                <h3>Popular Markets</h3>
                <FiChevronDown />
              </div>

              <div className="market-tags">
                {popularMarkets.map(
                  (market, index) => (
                    <button
                      key={market}
                      className={
                        index === 1
                          ? "selected-market"
                          : ""
                      }
                    >
                      {market}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* PROMO CARD */}
            <div className="nearby-card">
              <div className="nearby-content">
                <h2>
                  Fresh. Local.
                  <br />
                  Nearby.
                </h2>

                <Link to="/market">
                  Markets Near You
                  <FiChevronRight />
                </Link>
              </div>
            </div>
          </aside>

          {/* =====================================
              PRODUCT AREA
          ====================================== */}
          <section className="directory-results">
            {/* Search */}
            <div className="directory-search">
              <FiSearch />

              <input
                type="text"
                placeholder="Search produce by product type or market"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />

              <button>Search</button>
            </div>

            {/* Sort */}
            <div className="results-toolbar">
              <div className="sort-control">
                <span>Sort by:</span>

                <div className="select-wrapper">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value)
                    }
                  >
                    <option value="Latest">
                      Latest
                    </option>
                    <option value="A-Z">
                      A-Z
                    </option>
                    <option value="Z-A">
                      Z-A
                    </option>
                  </select>

                  <FiChevronDown />
                </div>
              </div>

              <p className="results-count">
                {filteredProducts.length} Results Found
              </p>
            </div>

            {/* Products */}
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <div className="empty-state">
                <FiSearch />

                <h3>No produce found</h3>

                <p>
                  Try another product name or category.
                </p>
              </div>
            )}

            {/* Pagination */}
            <div className="pagination">
              <button
                onClick={() =>
                  setCurrentPage(
                    Math.max(1, currentPage - 1)
                  )
                }
                disabled={currentPage === 1}
              >
                <FiChevronLeft />
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={
                    currentPage === page
                      ? "current"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(page)
                  }
                >
                  {page}
                </button>
              ))}

              <span>...</span>

              <button
                onClick={() =>
                  setCurrentPage(21)
                }
              >
                21
              </button>

              <button
                onClick={() =>
                  setCurrentPage(
                    Math.min(21, currentPage + 1)
                  )
                }
              >
                <FiChevronRight />
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* =====================================
          NEWSLETTER
      ====================================== */}
      <section className="newsletter">
        <div className="market-container newsletter-inner">
          <div>
            <h2>Subscribe our Newsletter</h2>

            <p>
              Get latest of produce and market updates
              as they come directly to your email.
            </p>
          </div>

          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
            />

            <button>Subscribe</button>
          </div>

          <div className="social-links">
            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaPinterestP />
            </a>

            <a href="#">
              <FaInstagram />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================
          FOOTER
      ====================================== */}
      <footer className="market-footer">
        <div className="market-container footer-grid">
          <div className="footer-brand">
            <Link
              to="/"
              className="freshfind-logo footer-logo"
            >
              <div className="logo-icon">
                🌱
              </div>

              <div>
                <strong>FreshFind</strong>
                <small>Fresh From the Farm</small>
              </div>
            </Link>

            <p>
              Your local market companion. Find the best
              of produce directly from farmers with no
              hassle.
            </p>

            <div className="footer-contact">
              <a href="tel:+23482356789">
                (234) 823-56789
              </a>

              <a href="mailto:Freshfind@gmail.com">
                Freshfind@gmail.com
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Home page</h4>
            <Link to="/">Open Now</Link>
            <Link to="/market">Popular Market</Link>
            <Link to="/produce">Popular Produce</Link>
            <Link to="/market">Markets Near You</Link>
          </div>

          <div className="footer-column">
            <h4>About Us</h4>
            <Link to="/about">About</Link>
            <Link to="/about">Mission</Link>
            <Link to="/about">Vision</Link>
            <Link to="/about">Our Team</Link>
          </div>

          <div className="footer-column">
            <h4>Find a Market</h4>
            <Link to="/market">Markets</Link>
            <Link to="/market">Opened Now</Link>
            <Link to="/market">Market Nearby</Link>
          </div>

          <div className="footer-column">
            <h4>Produce</h4>
            <Link to="/produce">Fruit & Vegetables</Link>
            <Link to="/produce">Meat & Fish</Link>
            <Link to="/produce">Herbs</Link>
            <Link to="/produce">View produce</Link>
          </div>
        </div>

        <div className="footer-bottom">
          Freshfind 2026. All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

export default MarketDirectory;