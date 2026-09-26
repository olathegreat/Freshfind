import { useEffect, useState } from 'react';
import { FaComments, FaBars, FaTimes } from 'react-icons/fa';
import Chatbot from './Chatbot';
import './Navbar.css';
import logo from "../assets/freshfind-logo.png";
import countsIcon from "../assets/counts-icon.png"
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LuPhoneCall } from 'react-icons/lu';


const navItems = [
  {name:"Home", link:"/"},
  {name:"About Us", link:"/about"},
  {name:"Find a Market", link:"/markets"},
  {name:"Produce Guide", link:"/produce"},
  {name:"Seasonal Picks", link:"/seasonal"},
  {name:"Contact Us", link:"/contact"}
];

const BASE_VISITOR_COUNT = 1286;

// Formats the live clock, e.g. "Fri, 26 Sep 2026 · 14:05"
function formatNow(date) {
  const datePart = date.toLocaleDateString(undefined, {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const timePart = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${datePart} · ${timePart}`;
}

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(BASE_VISITOR_COUNT);
  const [now, setNow] = useState(() => new Date());
  const [locationLabel, setLocationLabel] = useState('Locating you…');
  const location = useLocation();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock page scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Live clock — ticks every second.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Simulates a live visitor counter — ticks up by a small random
  // amount on a random interval, purely for visual effect.
  useEffect(() => {
    let timeoutId;

    const scheduleNextTick = () => {
      const delay = 3000 + Math.random() * 5000; // 3–8s
      timeoutId = setTimeout(() => {
        setVisitorCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
        scheduleNextTick();
      }, delay);
    };

    scheduleNextTick();
    return () => clearTimeout(timeoutId);
  }, []);

  // Browser geolocation — asks for the visitor's position, then
  // reverse-geocodes it into a readable "City, State, Country" label.
  // Falls back gracefully if permission is denied or the lookup fails,
  // since the SRS forbids relying on any always-on backend service.
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setLocationLabel('Location unavailable');
      return;
    }

    let cancelled = false;

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
          );
          const data = await res.json();
          if (cancelled) return;

          const a = data.address || {};
          const city = a.city || a.town || a.village || a.suburb || a.county;
          const parts = [city, a.state, a.country].filter(Boolean);

          setLocationLabel(parts.length ? parts.join(', ') : 'Your location');
        } catch {
          if (!cancelled) setLocationLabel('Your location');
        }
      },
      () => {
        if (!cancelled) setLocationLabel('Enable location for markets near you');
      },
      { timeout: 8000 }
    );

    return () => { cancelled = true; };
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
              <img src={logo} alt="FreshFind" />
            </Link>

            <form className="search-form" role="search">
              <span aria-hidden="true">⌕</span>
              <input type="search" placeholder="Search" aria-label="Search" />
              <button type="submit">Search</button>
            </form>

            <div className="header-actions">
              <Link to="/bookmarks" className='heart'>♡</Link>
              {/* <a className="heart" href="#" aria-label="Wishlist">♡</a> */}
              <div className="visitor" aria-label="Visitor count">
                <span className="visitor-icon">
                  <img src={countsIcon} alt=''/>
                </span>
                <span>
                  <small>Visitor Count</small>
                  <strong>{visitorCount.toLocaleString()}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        <form className="search-form-mobile" role="search">
          <span aria-hidden="true">⌕</span>
          <input type="search" placeholder="Search" aria-label="Search" />
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
              <span aria-hidden="true"><LuPhoneCall/></span> 234 8796 1234
            </a>
            <button
              className="nav-toggle"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <div
        className={`nav-drawer-backdrop${isMenuOpen ? ' show' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      <aside className={`nav-drawer${isMenuOpen ? ' open' : ''}`} aria-hidden={!isMenuOpen}>
        <div className="nav-drawer-head">
          <span className="nav-drawer-brand">
            <Link className="brand" to="/" aria-label="FreshFind home">
              <img src={logo} alt="FreshFind" />
            </Link>

          </span>
          <button className="nav-drawer-close" aria-label="Close menu" onClick={() => setIsMenuOpen(false)}>
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
          <span aria-hidden="true"><LuPhoneCall/></span> 234 8796 1234
        </a>
      </aside>

      {/* Floating Chatbot Launcher */}
      <button className="chatbot-launcher" onClick={() => setIsChatOpen(!isChatOpen)}>
        <FaComments size={24} />
      </button>

      {/* Chatbot Component */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default Navbar;