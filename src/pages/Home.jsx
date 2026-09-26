import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import homeImage from "../assets/home1.png";
import homeImage2 from "../assets/home2.png";
import homeImage3 from "../assets/home3.png";
import FAQimage from "../assets/faqimage.png";
import { MdArrowOutward } from "react-icons/md";
import {
  FiSearch,
  FiHeart,
  FiArrowRight,
  FiMapPin,
  FiClock,
  FiShoppingBag,
  FiMessageCircle,
  FiChevronDown,
  FiPhone,
  FiCheckCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import data from "../data/freshfindData.json";

import "./Home.css";

// Update this to match whatever path you register for MarketDetail.jsx
// in App.jsx, e.g. <Route path="/market/:id" element={<MarketDetail />} />
// (Keep this in sync with the same constant in MarketDirectory.jsx.)
const MARKET_DETAIL_BASE_PATH = "/market";

const ALL_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const DAY_ABBR = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
};

// Same "Bodija, Ibadan" -> "Ibadan" normalization used in MarketDirectory.jsx
const AREA_ALIASES = {
  "anambra state": "Anambra",
  anambra: "Anambra",
  "rivers state": "Rivers",
  rivers: "Rivers",
  "lagos state": "Lagos",
  lagos: "Lagos",
  ibadan: "Ibadan",
  abuja: "Abuja",
  kano: "Kano",
};

function getArea(location = "") {
  const parts = location.split(",").map((p) => p.trim());
  const last = (parts[parts.length - 1] || "").toLowerCase();
  return AREA_ALIASES[last] || parts[parts.length - 1] || "Other";
}

function formatDayRange(days = []) {
  if (days.length === 7) return "Everyday";
  if (days.length === 6 && ALL_DAYS.slice(1).every((d) => days.includes(d))) {
    return "Mon–Sat";
  }
  return days.map((d) => DAY_ABBR[d] || d).join(", ");
}

// name -> category lookup built from produce[], so "Good for" on a market
// card can be derived from its availableProduce list instead of hardcoded.
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

// Parses "8:00 AM" against a given calendar day into a real Date.
function parseTimeOnDate(timeStr, baseDate) {
  const match = (timeStr || "").trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  let [, hh, mm, period] = match;
  hh = parseInt(hh, 10);
  mm = parseInt(mm, 10);
  if (period.toUpperCase() === "PM" && hh !== 12) hh += 12;
  if (period.toUpperCase() === "AM" && hh === 12) hh = 0;
  const d = new Date(baseDate);
  d.setHours(hh, mm, 0, 0);
  return d;
}

// Finds the market's next relevant open/close moment from `now`:
// today if it's open today and hasn't closed yet, otherwise the next
// day it's scheduled to open. Powers the "Opened Now" countdown cards.
function getMarketWindow(market, now) {
  const [openStr, closeStr] = (market.hours || "").split(/\s*[–-]\s*/);
  if (!openStr || !closeStr) return null;

  for (let offset = 0; offset <= 7; offset++) {
    const day = new Date(now);
    day.setDate(day.getDate() + offset);
    const dayName = ALL_DAYS[day.getDay()];
    if (!(market.days || []).includes(dayName)) continue;

    const openTime = parseTimeOnDate(openStr, day);
    const closeTime = parseTimeOnDate(closeStr, day);
    if (!openTime || !closeTime) continue;

    if (offset === 0 && now > closeTime) continue; // already closed today

    const isOpenNow = offset === 0 && now >= openTime && now <= closeTime;
    return { openTime, closeTime, isOpenNow };
  }
  return null;
}

function formatCountdown(ms) {
  const clamped = Math.max(0, ms);
  const days = Math.floor(clamped / 86400000);
  const hours = Math.floor((clamped % 86400000) / 3600000);
  const minutes = Math.floor((clamped % 3600000) / 60000);
  const seconds = Math.floor((clamped % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

// Nigeria's two broad produce seasons, used to flag "IN SEASON" items.
function getCurrentSeason(now) {
  const RAINY_MONTHS = [3, 4, 5, 6, 7, 8, 9]; // Apr–Oct
  return RAINY_MONTHS.includes(now.getMonth()) ? "Rainy" : "Harmattan";
}

const POPULAR_PRODUCE_NAMES = ["Watermelon", "Yam", "Pepper", "Beans"];
const POPULAR_MARKET_NAMES = [
  "Mile 12 Market",
  "Oyingbo Market",
  "Bodija Market",
  "Dugbe Market",
];

const faqs = [
  {
    question: "What is FreshFind?",
    answer:
      "FreshFind is a platform that helps you discover nearby farmers' markets, check their operating hours, and explore the fresh produce available around you.",
  },
  {
    question: "How can I find a farmers' market near me?",
    answer:
      "Use the Find a Market page to explore markets around your location. You can browse markets by location, opening hours and available produce.",
  },
  {
    question: "How do I know what produce is available?",
    answer:
      "Visit a market's details page to see the types of fruits, vegetables, grains and other fresh produce commonly available there.",
  },
  {
    question: "Can I check when a market is open?",
    answer:
      "Yes. Each market profile includes its opening days and operating hours so you can plan your visit before heading out.",
  },
  {
    question: "What can the FreshFind Assistant help me with?",
    answer:
      "The FreshFind Assistant can help you quickly find information about markets, produce and other features available on FreshFind.",
  },
];

function Home() {
  const { markets, produce } = data;

  const [activeFaq, setActiveFaq] = useState(0);
  const [email, setEmail] = useState("");
  const [now, setNow] = useState(new Date());

  // Ticks every second so the "Opened Now" countdowns stay live.
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const produceCategoryMap = useMemo(
    () => buildProduceCategoryMap(produce),
    [produce]
  );

  const enrichedMarkets = useMemo(
    () =>
      markets.map((m) => ({
        ...m,
        area: getArea(m.location),
        derivedCategories: getMarketCategories(m, produceCategoryMap),
      })),
    [markets, produceCategoryMap]
  );

  // Picks the 3 markets with the soonest open/close event, so the
  // section is always meaningful regardless of what time it is.
  const openedMarkets = useMemo(() => {
    const withWindow = enrichedMarkets
      .map((m) => ({ ...m, window: getMarketWindow(m, now) }))
      .filter((m) => m.window);

    withWindow.sort((a, b) => {
      const aTarget = a.window.isOpenNow
        ? a.window.closeTime
        : a.window.openTime;
      const bTarget = b.window.isOpenNow
        ? b.window.closeTime
        : b.window.openTime;
      return aTarget - bTarget;
    });

    return withWindow.slice(0, 3);
  }, [enrichedMarkets, now]);

  const currentSeason = useMemo(() => getCurrentSeason(now), [now]);

  const popularProduce = useMemo(() => {
    const picked = POPULAR_PRODUCE_NAMES.map((name) =>
      produce.find((p) => p.name.toLowerCase() === name.toLowerCase())
    ).filter(Boolean);
    return picked.length === POPULAR_PRODUCE_NAMES.length
      ? picked
      : produce.slice(0, 4);
  }, [produce]);

  const popularMarkets = useMemo(() => {
    const picked = POPULAR_MARKET_NAMES.map((name) =>
      enrichedMarkets.find((m) => m.name.toLowerCase() === name.toLowerCase())
    ).filter(Boolean);
    return picked.length === POPULAR_MARKET_NAMES.length
      ? picked
      : enrichedMarkets.slice(0, 4);
  }, [enrichedMarkets]);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <div className="home-page">
      {/* ================= HERO ================= */}
      <main>
        <section className="hero-section">
          <div className="hero-container">
            {/* Main Hero */}
            <div className="hero-main">
              <img
                src={homeImage}
                alt="Local farmer with fresh produce"
                className="hero-main-image"
              />

              <div className="hero-overlay" />

              <div className="hero-content">
                <h1>
                  Find Fresh Markets
                  <br />
                  Near You
                </h1>

                <p>
                  Discover local farmers&apos; all in
                  <br />
                  one place.
                </p>

                <Link to="/markets" className="primary-btn">
                  Find market
                  <FiArrowRight />
                </Link>
              </div>
            </div>

            {/* Right Hero Cards */}
            <div className="hero-side">
              <div className="hero-small-card nearby-card">
                <div className="small-card-content">
                  <img src={homeImage2} alt="Fresh vegetables" />

                  <div className="overlay-div">
                    <h2>
                      Fresh.
                      <br />
                      Local.
                      <br />
                      Nearby.
                    </h2>

                    <Link to="/markets" className="small-green-btn">
                      Markets Near You
                      <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="hero-small-card sseasonal-card">
                <img src={homeImage3} alt="Seasonal produce" />

                <div className="seasonal-overlay" />

                <div className="seasonal-content">
                  <span>BEST OF DEAL</span>

                  <h2>
                    Explore fresh
                    <br />
                    seasonal produce
                  </h2>

                  <Link to="/produce">
                    Shop Now
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="feature-section">
          <div className="feature-container">
            <div className="feature-item">
              <div className="feature-react-icon">
                <FiMapPin />
              </div>

              <div>
                <h4>Find Nearby Markets</h4>
                <p>Discover farmers&apos; markets in your area</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-react-icon">
                <FiShoppingBag />
              </div>

              <div>
                <h4>Explore Fresh Produce</h4>
                <p>See what produce is available at each market</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-react-icon">
                <FiClock />
              </div>

              <div>
                <h4>Check market hours</h4>
                <p>Know when your favourite markets are open</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-react-icon">
                <FiMessageCircle />
              </div>

              <div>
                <h4>FreshFind Assistant</h4>
                <p>Get quick answers about markets and produce</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= OPENED NOW ================= */}
        <section className="opened-section section-container">
          <div className="section-heading">
            <h2>Opened Now</h2>

            <Link to="/markets" className="view-all">
              View All
              <FiArrowRight />
            </Link>
          </div>

          <div className="opened-grid">
            {openedMarkets.map((market) => {
              const target = market.window.isOpenNow
                ? market.window.closeTime
                : market.window.openTime;
              const countdown = formatCountdown(target - now);

              return (
                <article className="opened-card" key={market.id}>
                  <img src={market.image} alt={market.name} />

                  <div className="market-card-overlay" />

                  <div className="opened-card-content">
                    <h3>{market.name}</h3>
                    <h2 className="open-card-h2">
                      {market.window.isOpenNow ? "CLOSES IN" : "OPENS IN"}
                    </h2>
                    <div className="countdown">
                      <div>
                        <strong>{countdown.days}</strong>
                        <span>DAYS</span>
                      </div>

                      <div>
                        <strong>{countdown.hours}</strong>
                        <span>HRS</span>
                      </div>

                      <div>
                        <strong>{countdown.minutes}</strong>
                        <span>MIN</span>
                      </div>

                      <div>
                        <strong>{countdown.seconds}</strong>
                        <span>SEC</span>
                      </div>
                    </div>

                    <Link
                      to={`${MARKET_DETAIL_BASE_PATH}/${market.id}`}
                      className="market-btn"
                    >
                      View Market
                      <FiArrowRight />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ================= POPULAR PRODUCE ================= */}
        <section className="produce-section">
          <div className="section-container">
            <div className="section-heading">
              <h2>Popular Produces</h2>

              <Link to="/produce" className="view-all">
                View All
                <FiArrowRight />
              </Link>
            </div>

            <div className="produce-grid">
              {popularProduce.map((item) => {
                const inSeason = item.season === currentSeason;
                return (
                  <article className="produce-card" key={item.id}>
                    <div className="produce-image-wrapper">
                      <img src={item.picture} alt={item.name} />

                      <span
                        className={`produce-tag ${
                          inSeason ? "produce-tag-in" : "produce-tag-out"
                        }`}
                      >
                        {inSeason ? "IN SEASON" : "OUT OF SEASON"}
                      </span>
                    </div>

                    <div className="produce-content">
                      <h3>{item.name}</h3>

                      <p>{item.description}</p>

                      <div className="produce-footer">
                        <span>Markets Available:</span>

                        <p>{item.markets.join(", ")}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= POPULAR MARKETS ================= */}
        <section className="markets-section section-container">
          <div className="section-heading">
            <h2>Popular Markets</h2>

            <Link to="/markets" className="view-all">
              View All
              <FiArrowRight />
            </Link>
          </div>

          <div className="markets-grid">
            {popularMarkets.map((market) => (
              <article className="market-info-card" key={market.id}>
                <div className="market-image">
                  <img src={market.image} alt={market.name} />
                </div>

                <div className="market-info">
                  <div className="market-title-row">
                    <h3>{market.name}</h3>
                    <span>{market.area.toUpperCase()}</span>
                  </div>

                  <p className="market-location">
                    <FiMapPin />
                    {market.location}
                  </p>

                  <div className="market-meta">
                    <div className="market-meta-left">
                      <FiClock className="meta-icon" />
                      <div>
                        <h6>WHEN TO GO</h6>
                        <span>
                          {formatDayRange(market.days)} · {market.hours}
                        </span>
                      </div>
                    </div>

                    <div className="market-meta-right">
                      <FiCheckCircle className="meta-icon" />
                      <div>
                        <h6>GOOD FOR</h6>
                        <span>
                          {market.derivedCategories.length
                            ? market.derivedCategories.slice(0, 2).join(", ")
                            : (market.availableProduce || [])
                                .slice(0, 2)
                                .join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`${MARKET_DETAIL_BASE_PATH}/${market.id}`}
                    className="market-link"
                  >
                    View market
                    <MdArrowOutward />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="faq-section">
          <div className="faq-container">
            <div className="faq-content">
              <h2>Checkout our FAQs</h2>

              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div
                    className={`faq-item ${
                      activeFaq === index ? "active" : ""
                    }`}
                    key={faq.question}
                  >
                    <button
                      className="faq-question"
                      onClick={() => toggleFaq(index)}
                    >
                      <span>{faq.question}</span>

                      <FiChevronDown />
                    </button>

                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="faq-image">
              <img src={FAQimage} alt="Farmer holding fresh vegetables" />

              <div className="assistant-button">
                <FiMessageCircle />
              </div>
            </div>
          </div>
        </section>

        {/* ================= NEWSLETTER ================= */}
        <section className="newsletter-section">
          <div className="newsletter-container">
            <div className="newsletter-text">
              <h3>Subscribe our Newsletter</h3>

              <p>
                Get latest updates on fresh produce and market updates
                directly to your email.
              </p>
            </div>

            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button type="submit">Subscribe</button>
            </form>

            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                f
              </a>

              <a href="#" aria-label="Twitter">
                t
              </a>

              <a href="#" aria-label="Pinterest">
                p
              </a>

              <a href="#" aria-label="Instagram">
                ◎
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;