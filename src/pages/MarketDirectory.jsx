import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BiSearch } from "react-icons/bi";
import data from "../data/freshfindData.json";
import "./MarketDirectory.css";

const PAGE_SIZE = 12;

const DAY_ABBR = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
};
const ALL_DAYS = Object.keys(DAY_ABBR);

// Normalizes messy "location" strings ("Bodija, Ibadan", "Onitsha, Anambra State")
// down to a single Area label we can filter/group by.
const AREA_ALIASES = {
  "anambra state": "Anambra",
  "anambra": "Anambra",
  "rivers state": "Rivers",
  "rivers": "Rivers",
  "lagos state": "Lagos",
  "lagos": "Lagos",
  "ibadan": "Ibadan",
  "abuja": "Abuja",
  "kano": "Kano",
};

function getArea(location = "") {
  const parts = location.split(",").map((p) => p.trim());
  const last = (parts[parts.length - 1] || "").toLowerCase();
  return AREA_ALIASES[last] || parts[parts.length - 1] || "Other";
}

// Builds a produceName -> category lookup from the produce list so we can
// tell what a market is "good for" just from its availableProduce array.
function buildProduceCategoryMap(produce = []) {
  const map = {};
  produce.forEach((item) => {
    map[item.name.toLowerCase()] = item.category;
  });
  return map;
}

function getMarketCategories(market, produceCategoryMap) {
  const fromExplicit = market.categories || [];
  const fromProduce = (market.availableProduce || [])
    .map((p) => produceCategoryMap[p.toLowerCase()])
    .filter(Boolean);
  return [...new Set([...fromExplicit, ...fromProduce])];
}

// Approximate city-centre coordinates per Area, used for "Market Near you".
// We don't have per-market lat/lng in the data, so distance is city-level,
// not pin-precise — good enough to rank areas by proximity to the user.
const AREA_COORDS = {
  Lagos: { lat: 6.5244, lng: 3.3792 },
  Ibadan: { lat: 7.3775, lng: 3.947 },
  Abuja: { lat: 9.0765, lng: 7.3986 },
  Kano: { lat: 12.0022, lng: 8.592 },
  Anambra: { lat: 6.1667, lng: 6.7833 }, // Onitsha
  Rivers: { lat: 4.8156, lng: 7.0498 }, // Port Harcourt
  Other: { lat: 9.082, lng: 8.6753 }, // Nigeria centroid fallback
};

function haversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Circular distance (in days) from today to a market's soonest open day.
// 0 = open today, 1 = open tomorrow, etc.
function daysUntilNextOpen(days = [], todayIndex) {
  if (!days.length) return Infinity;
  const diffs = days.map((d) => {
    const idx = ALL_DAYS.indexOf(d);
    if (idx === -1) return Infinity;
    return (idx - todayIndex + 7) % 7;
  });
  return Math.min(...diffs);
}

// Update this to match whatever path you register for MarketDetail.jsx
// in App.jsx, e.g. <Route path="/market/:id" element={<MarketDetail />} />
const MARKET_DETAIL_BASE_PATH = "/market";

const SORT_OPTIONS = [
  { value: "az", label: "Alphabetical" },
  { value: "nextOpen", label: "Next Open day" },
  { value: "nearMe", label: "Market Near you" },
];

function formatDayRange(days = []) {
  if (days.length === 7) return "Everyday";
  if (
    days.length === 6 &&
    ALL_DAYS.slice(1).every((d) => days.includes(d))
  ) {
    return "Mon–Sat";
  }
  return days.map((d) => DAY_ABBR[d] || d).join(", ");
}

function MarketDirectory() {
  const { markets, produce } = data;

  const produceCategoryMap = useMemo(
    () => buildProduceCategoryMap(produce),
    [produce]
  );

  const todayIndex = new Date().getDay();

  const enrichedMarkets = useMemo(() => {
    return markets.map((m) => {
      const area = getArea(m.location);
      return {
        ...m,
        area,
        coords: AREA_COORDS[area] || AREA_COORDS.Other,
        derivedCategories: getMarketCategories(m, produceCategoryMap),
        openInDays: daysUntilNextOpen(m.days, todayIndex),
      };
    });
  }, [markets, produceCategoryMap, todayIndex]);

  const areaOptions = useMemo(() => {
    const counts = {};
    enrichedMarkets.forEach((m) => {
      counts[m.area] = (counts[m.area] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [enrichedMarkets]);

  const dayOptions = useMemo(() => {
    return ALL_DAYS.map((day) => ({
      name: day,
      count: enrichedMarkets.filter((m) => (m.days || []).includes(day))
        .length,
    })).filter((d) => d.count > 0);
  }, [enrichedMarkets]);

  const produceTypeOptions = useMemo(() => {
    const counts = {};
    enrichedMarkets.forEach((m) => {
      m.derivedCategories.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [enrichedMarkets]);

  const [activeArea, setActiveArea] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [activeProduceType, setActiveProduceType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("az");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const sortRef = useRef(null);

  // Close the custom sort dropdown on outside click.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const requestLocation = () => {
    if (userCoords || locating) return;
    if (!navigator.geolocation) {
      setLocationError("Location isn't supported on this device.");
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocating(false);
      },
      () => {
        setLocationError("Location unavailable — showing alphabetical order.");
        setLocating(false);
      },
      { timeout: 8000 }
    );
  };

  const handleSelectSort = (value) => {
    setSortBy(value);
    setSortMenuOpen(false);
    resetPage();
    if (value === "nearMe") requestLocation();
  };

  const filtered = useMemo(() => {
    let items = [...enrichedMarkets];

    if (activeArea) {
      items = items.filter((m) => m.area === activeArea);
    }
    if (activeDay) {
      items = items.filter((m) => (m.days || []).includes(activeDay));
    }
    if (activeProduceType) {
      items = items.filter((m) =>
        m.derivedCategories.includes(activeProduceType)
      );
    }
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      items = items.filter(
        (m) =>
          m.name.toLowerCase().includes(term) ||
          m.location.toLowerCase().includes(term)
      );
    }

    if (sortBy === "nextOpen") {
      items.sort((a, b) => {
        if (a.openInDays !== b.openInDays) return a.openInDays - b.openInDays;
        return a.name.localeCompare(b.name);
      });
    } else if (sortBy === "nearMe" && userCoords) {
      items = items.map((m) => ({
        ...m,
        distanceKm: haversineKm(userCoords, m.coords),
      }));
      items.sort((a, b) => a.distanceKm - b.distanceKm);
    } else {
      // Default / fallback (also covers "nearMe" while locating or on error)
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }, [
    enrichedMarkets,
    activeArea,
    activeDay,
    activeProduceType,
    searchTerm,
    sortBy,
    userCoords,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const resetPage = () => setPage(1);

  const toggleArea = (name) => {
    setActiveArea((prev) => (prev === name ? null : name));
    resetPage();
  };
  const toggleDay = (name) => {
    setActiveDay((prev) => (prev === name ? null : name));
    resetPage();
  };
  const toggleProduceType = (name) => {
    setActiveProduceType((prev) => (prev === name ? null : name));
    resetPage();
  };

  const clearAllFilters = () => {
    setActiveArea(null);
    setActiveDay(null);
    setActiveProduceType(null);
    setSearchTerm("");
    resetPage();
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
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const hasActiveFilters =
    activeArea || activeDay || activeProduceType || searchTerm.trim();

  return (
    <>
      

      <section className="md-hero">
        <div className="md-hero-overlay" />
        <div className="md-breadcrumb">
          <span>Home</span>
          <span className="md-crumb-sep">›</span>
          <span>Find a Market</span>
          <span className="md-crumb-sep">›</span>
          <span className="md-crumb-active">
            {activeArea || "All Markets"}
          </span>
        </div>
      </section>

      <div className="md-page">
        <div className="md-content-row">
          <aside className={`md-sidebar ${mobileFiltersOpen ? "md-sidebar-open" : ""}`}>
            <button
              className="md-filter-btn"
              onClick={() => setMobileFiltersOpen((v) => !v)}
            >
              Filter <span className="md-filter-icon">⚙</span>
            </button>

            <div className="md-sidebar-block">
              <h4>Area</h4>
              <ul className="md-filter-list">
                <li
                  className={!activeArea ? "md-opt-active" : ""}
                  onClick={() => toggleArea(null)}
                >
                  <span className="md-radio" />
                  All <span className="md-count">({enrichedMarkets.length})</span>
                </li>
                {areaOptions.map((opt) => (
                  <li
                    key={opt.name}
                    className={activeArea === opt.name ? "md-opt-active" : ""}
                    onClick={() => toggleArea(opt.name)}
                  >
                    <span className="md-radio" />
                    {opt.name} <span className="md-count">({opt.count})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md-sidebar-block">
              <h4>Open Day</h4>
              <ul className="md-filter-list">
                <li
                  className={!activeDay ? "md-opt-active" : ""}
                  onClick={() => toggleDay(null)}
                >
                  <span className="md-radio" />
                  Any day
                </li>
                {dayOptions.map((opt) => (
                  <li
                    key={opt.name}
                    className={activeDay === opt.name ? "md-opt-active" : ""}
                    onClick={() => toggleDay(opt.name)}
                  >
                    <span className="md-radio" />
                    {opt.name} <span className="md-count">({opt.count})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md-sidebar-block">
              <h4>Produce Type</h4>
              <ul className="md-filter-list">
                <li
                  className={!activeProduceType ? "md-opt-active" : ""}
                  onClick={() => toggleProduceType(null)}
                >
                  <span className="md-radio" />
                  All
                </li>
                {produceTypeOptions.map((opt) => (
                  <li
                    key={opt.name}
                    className={
                      activeProduceType === opt.name ? "md-opt-active" : ""
                    }
                    onClick={() => toggleProduceType(opt.name)}
                  >
                    <span className="md-radio" />
                    {opt.name} <span className="md-count">({opt.count})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="md-promo">
              <h3>
                Know your
                <br />
                produce?
              </h3>
              <a href="/produce-guide" className="md-promo-btn">
                Browse Produce Guide <span>→</span>
              </a>
            </div> */}
          </aside>

          <main className="md-main">
            <div className="md-search-row">
              <div className="md-search-box">
                  <BiSearch className="md-search-icon"/>
                <input
                  type="text"
                  placeholder="Search market by name or location"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    resetPage();
                  }}
                />
              </div>
              <button className="md-search-btn">Search</button>
            </div>

            <div className="md-results-row">
              <div className="md-sort">
                <span>Sort by:</span>
                <div className="md-sort-control" ref={sortRef}>
                  <button
                    type="button"
                    className="md-sort-trigger"
                    onClick={() => setSortMenuOpen((v) => !v)}
                    aria-haspopup="listbox"
                    aria-expanded={sortMenuOpen}
                  >
                    {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                    <svg
                      className={`md-sort-chevron ${
                        sortMenuOpen ? "md-sort-chevron-open" : ""
                      }`}
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {sortMenuOpen && (
                    <ul className="md-sort-menu" role="listbox">
                      {SORT_OPTIONS.map((opt) => (
                        <li
                          key={opt.value}
                          role="option"
                          aria-selected={sortBy === opt.value}
                          className={
                            sortBy === opt.value ? "md-sort-option-active" : ""
                          }
                          onClick={() => handleSelectSort(opt.value)}
                        >
                          {opt.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {sortBy === "nearMe" && locating && (
                  <span className="md-sort-status">Locating you…</span>
                )}
                {sortBy === "nearMe" && locationError && (
                  <span className="md-sort-status md-sort-status-error">
                    {locationError}
                  </span>
                )}
              </div>
              <div className="md-results-count">
                <strong>{filtered.length}</strong> Results Found
                {hasActiveFilters && (
                  <button className="md-clear-btn" onClick={clearAllFilters}>
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            <div className="md-grid">
              {pageItems.map((market) => (
                <div className="md-card" key={market.id}>
                  <div className="md-card-image">
                    <span className="md-badge">WHOLESALE &amp; FRESH</span>
                    <img src={market.image} alt={market.name} loading="lazy" />
                  </div>
                  <div className="md-card-body">
                    <div className="md-card-top">
                      <h3>{market.name}</h3>
                      {sortBy === "nextOpen" && (
                        <span className="md-status-tag">
                          {market.openInDays === 0
                            ? "Open today"
                            : market.openInDays === 1
                            ? "Opens tomorrow"
                            : market.openInDays === Infinity
                            ? "Hours vary"
                            : `Opens in ${market.openInDays}d`}
                        </span>
                      )}
                      {sortBy === "nearMe" &&
                        typeof market.distanceKm === "number" && (
                          <span className="md-status-tag">
                            ~{Math.round(market.distanceKm)} km away
                          </span>
                        )}
                      {sortBy === "az" && (
                        <span className="md-area-tag">{market.area}</span>
                      )}
                    </div>
                    <p className="md-card-location">{market.location}</p>

                    <div className="md-card-meta">
                      <div>
                        <span className="md-meta-label">When to go</span>
                        <span className="md-meta-value">
                          {formatDayRange(market.days)} · {market.hours}
                        </span>
                      </div>
                      <div>
                        <span className="md-meta-label">Good for</span>
                        <span className="md-meta-value">
                          {market.derivedCategories.length
                            ? market.derivedCategories.slice(0, 2).join(", ")
                            : (market.availableProduce || [])
                                .slice(0, 2)
                                .join(", ")}
                        </span>
                      </div>
                    </div>

                    <p className="md-card-tip">{market.description}</p>

                    <Link
                      to={`${MARKET_DETAIL_BASE_PATH}/${market.id}`}
                      className="md-view-link"
                    >
                      View market <span>↗</span>
                    </Link>
                  </div>
                </div>
              ))}
              {pageItems.length === 0 && (
                <div className="md-empty">
                  No markets match your search. Try a different name, area,
                  or day.
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="md-pagination">
                <button
                  className="md-page-arrow"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>
                {renderPageNumbers()[0] > 1 && (
                  <span className="md-page-dots">…</span>
                )}
                {renderPageNumbers().map((n) => (
                  <button
                    key={n}
                    className={
                      n === currentPage
                        ? "md-page-num md-page-active"
                        : "md-page-num"
                    }
                    onClick={() => goToPage(n)}
                  >
                    {n}
                  </button>
                ))}
                {renderPageNumbers().slice(-1)[0] < totalPages && (
                  <span className="md-page-dots">…</span>
                )}
                <button
                  className="md-page-arrow"
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

export default MarketDirectory;