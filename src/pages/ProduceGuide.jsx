import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import data from "../data/freshfindData.json";
import { LuSettings2 } from "react-icons/lu";
import { BiSearch } from "react-icons/bi";
import "./ProduceGuide.css";

const PAGE_SIZE = 12;
const POPULAR_MARKETS = ["Oyingbo", "Mile 12", "Oja Oba", "Wuse", "Calabar"];

function ProduceGuide() {
  const { produce, markets } = data;

  const categories = useMemo(() => {
    const counts = {};
    produce.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [produce]);

  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let items = [...produce];

    if (activeCategory) {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term)
      );
    }

    if (sortBy === "az") {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "za") {
      items.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      items.sort((a, b) => b.id - a.id);
    }

    return items;
  }, [produce, activeCategory, searchTerm, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleCategoryClick = (name) => {
    setActiveCategory((prev) => (prev === name ? null : name));
    setPage(1);
  };

  const handleMarketPillClick = (marketName) => {
    setSearchTerm("");
    setActiveCategory(null);
    setPage(1);
    const match = markets.find((m) =>
      m.name.toLowerCase().includes(marketName.toLowerCase())
    );
    if (match) {
      setSearchTerm("");
    }
  };

  const goToPage = (n) => {
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const windowSize = 5;
    let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
    let end = Math.min(totalPages, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
   

      <section className="pg-hero">
        <div className="pg-hero-overlay" />
        <div className="pg-breadcrumb">
          <span>Home</span>
          <span className="pg-crumb-sep">›</span>
          <span>Categories</span>
          <span className="pg-crumb-sep">›</span>
          <span className="pg-crumb-active">
            {activeCategory || "Produce Guide"}
          </span>
        </div>
      </section>

      <div className="pg-page">
       <div className="pg-content-row">
        <aside className="pg-sidebar">
          <button className="pg-filter-btn">
            Filter <LuSettings2 className="pg-filter-icon"/>
          </button>

          <div className="pg-sidebar-block">
            <h4>All Categories</h4>
            <ul className="pg-category-list">
              <li
                className={!activeCategory ? "pg-cat-active" : ""}
                onClick={() => handleCategoryClick(null)}
              >
                <span className="pg-radio" />
                All <span className="pg-count">({produce.length})</span>
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  className={activeCategory === cat.name ? "pg-cat-active" : ""}
                  onClick={() => handleCategoryClick(cat.name)}
                >
                  <span className="pg-radio" />
                  {cat.name} <span className="pg-count">({cat.count})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pg-sidebar-block">
            <h4>Popular Markets</h4>
            <div className="pg-market-pills">
              {POPULAR_MARKETS.map((m) => (
                <button
                  key={m}
                  className="pg-pill"
                  onClick={() => handleMarketPillClick(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="pg-promo">
            <h3>
              Fresh. Local.
              <br />
              Nearby.
            </h3>
            <a href="./Markets" className="pg-promo-btn">
              Markets Near You <span>→</span>
            </a>
          </div>
        </aside>

        <main className="pg-main">
          <div className="pg-search-row">
            <div className="pg-search-box">
              <BiSearch className="pg-search-icon"/>
              <input
                type="text"
                placeholder="Search produce by product type or market"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <button className="pg-search-btn">Search</button>
          </div>

          <div className="pg-results-row">
            <div className="pg-sort">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="az">Name (A–Z)</option>
                <option value="za">Name (Z–A)</option>
              </select>
            </div>
            <div className="pg-results-count">
              <strong>{filtered.length}</strong> Results Found
            </div>
          </div>

          <div className="pg-grid">
            {pageItems.map((item) => (
              <div className="pg-card" key={item.id}>
                <div className="pg-card-image">
                  <span className="pg-season-badge">{item.season} SEASON</span>
                  <img src={item.picture} alt={item.name} loading="lazy" />
                </div>
                <div className="pg-card-body">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="pg-card-markets">
                    Markets Available:{" "}
                    <span>{item.markets.join(", ")}</span>
                  </div>
                </div>
              </div>
            ))}
            {pageItems.length === 0 && (
              <div className="pg-empty">
                No produce matches your search. Try a different term or
                category.
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pg-pagination">
              <button
                className="pg-page-arrow"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              {renderPageNumbers()[0] > 1 && <span className="pg-page-dots">…</span>}
              {renderPageNumbers().map((n) => (
                <button
                  key={n}
                  className={
                    n === currentPage ? "pg-page-num pg-page-active" : "pg-page-num"
                  }
                  onClick={() => goToPage(n)}
                >
                  {n}
                </button>
              ))}
              {renderPageNumbers().slice(-1)[0] < totalPages && (
                <span className="pg-page-dots">…</span>
              )}
              <button
                className="pg-page-arrow"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </div>
          )}
        </main>
       </div>
      </div>

      
    </>
  );
}

export default ProduceGuide;