import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import "./Navbar.css";
import logo from "../assets/freshfind-logo.png";
import logoWhite from "../assets/logowhite.png";
import countsIcon from "../assets/counts-icon.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { LuPhoneCall } from "react-icons/lu";
import { useBookmarks } from "../context/useBookmarks";

const navItems = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about" },
  { name: "Find a Market", link: "/markets" },
  { name: "Produce Guide", link: "/produce" },
  { name: "Seasonal Picks", link: "/seasonal" },
  { name: "Contact Us", link: "/contact" },
];

const BASE_VISITOR_COUNT = 1286;

// Formats the live clock, e.g. "Fri, 26 Sep 2026 · 14:05"
function formatNow(date) {
  const datePart = date.toLocaleDateString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart} · ${timePart}`;
}

const Navbar = () => {
  const [menuPath, setMenuPath] = useState(null);
  const [now, setNow] = useState(() => new Date());
  const [locationLabel, setLocationLabel] = useState(() =>
    navigator.geolocation ? "Locating you…" : "Location unavailable",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { bookmarkedIds, bookmarkedProduceIds } = useBookmarks();
  const bookmarkCount = bookmarkedIds.length + bookmarkedProduceIds.length;
  const isMenuOpen = menuPath === location.pathname;

  const submitSearch = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(
      query ? `/markets?search=${encodeURIComponent(query)}` : "/markets",
    );
  };

  // Lock page scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Live clock — ticks every second.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Browser geolocation — asks for the visitor's position, then
  // reverse-geocodes it into a readable "City, State, Country" label.
  // Falls back gracefully if permission is denied or the lookup fails,
  // since the SRS forbids relying on any always-on backend service.
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      return;
    }

    let cancelled = false;
    let idleCallbackId;
    let fallbackTimeoutId;

    const locateVisitor = () => {
      if (cancelled) return;
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`,
            );
            const data = await res.json();
            if (cancelled) return;

            const address = data.address || {};
            const city =
              address.city ||
              address.town ||
              address.village ||
              address.suburb ||
              address.county;
            const parts = [city, address.state, address.country].filter(
              Boolean,
            );
            setLocationLabel(parts.length ? parts.join(", ") : "Your location");
          } catch {
            if (!cancelled) setLocationLabel("Your location");
          }
        },
        () => {
          if (!cancelled)
            setLocationLabel("Enable location for markets near you");
        },
        { timeout: 8000 },
      );
    };

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(locateVisitor, {
        timeout: 5000,
      });
    } else {
      fallbackTimeoutId = window.setTimeout(locateVisitor, 2000);
    }

    return () => {
      cancelled = true;
      if (idleCallbackId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      window.clearTimeout(fallbackTimeoutId);
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="utility-bar">
          <div className="container utility-inner">
            <span>Your Location: {locationLabel}</span>
            <div className="utility-links">
              <span className="utility-clock">{formatNow(now)}</span>
              <a href="#">Sign In / Sign Up</a>
            </div>
          </div>
        </div>

        <div className="header-main">
          <div className="header-inner">
            <Link className="brand" to="/" aria-label="FreshFind home">
              <img src={logo} alt="FreshFind" fetchPriority="high" />
            </Link>

            <form className="search-form" role="search" onSubmit={submitSearch}>
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Search markets by name or produce"
                aria-label="Search markets by name or produce"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button type="submit">Search</button>
            </form>

            <div className="header-actions">
              <Link
                to="/bookmarks"
                className="bookmark-nav-link"
                aria-label={`Saved items: ${bookmarkCount}`}
                title={`${bookmarkCount} saved items`}
              >
                <FiBookmark aria-hidden="true" />
                <span className="bookmark-nav-count" aria-hidden="true">
                  {bookmarkCount > 99 ? "99+" : bookmarkCount}
                </span>
              </Link>
              <div className="visitor" aria-label="Visitor count">
                <span className="visitor-icon">
                  <img src={countsIcon} alt="" />
                </span>
                <span>
                  <small>Visitor Count</small>
                  <strong>{BASE_VISITOR_COUNT.toLocaleString()}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        <form
          className="search-form-mobile"
          role="search"
          onSubmit={submitSearch}
        >
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search markets by name or produce"
            aria-label="Search markets by name or produce"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="nav-bar">
          <div className="container nav-inner">
            <nav className="nav-links-desktop" aria-label="Main navigation">
              <ul>
                {navItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.link}
                      end={item.link === "/"}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <a className="phone-link" href="tel:+2348796001234">
              <span aria-hidden="true">
                <LuPhoneCall />
              </span>{" "}
              234 8796 1234
            </a>
            <button
              className="nav-toggle"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              onClick={() => setMenuPath(location.pathname)}
            >
              <FaBars size={20} />
            </button>
            <span className="nav-mobile-note">Find fresh markets</span>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <div
        className={`nav-drawer-backdrop${isMenuOpen ? " show" : ""}`}
        onClick={() => setMenuPath(null)}
        aria-hidden="true"
      />
      <aside
        className={`nav-drawer${isMenuOpen ? " open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="nav-drawer-head">
          <span className="nav-drawer-brand">
            <Link className="brand" to="/" aria-label="FreshFind home">
              <img src={logoWhite} alt="FreshFind" loading="lazy" />
            </Link>
          </span>
          <button
            className="nav-drawer-close"
            aria-label="Close menu"
            onClick={() => setMenuPath(null)}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <ul className="nav-drawer-links">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.link}
                end={item.link === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <a className="nav-drawer-phone" href="tel:+2348796001234">
          <span aria-hidden="true">
            <LuPhoneCall />
          </span>{" "}
          234 8796 1234
        </a>
      </aside>
    </>
  );
};

export default Navbar;
