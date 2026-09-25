import React, { useState } from "react";
import { Link } from "react-router-dom";
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

import "./Home.css";

/*
  Replace these image paths with the actual images
  you have inside src/assets.
*/

const openedMarkets = [
  {
    name: "Mile 12 Market",
    image: "/images/mile12-market.jpg",
    days: "00",
    hours: "02",
    minutes: "18",
    seconds: "46",
  },
  {
    name: "Wuse Market",
    image: "/images/wuse-market.jpg",
    days: "00",
    hours: "02",
    minutes: "18",
    seconds: "46",
  },
  {
    name: "Oyingbo",
    image: "/images/oyingbo-market.jpg",
    days: "00",
    hours: "02",
    minutes: "18",
    seconds: "46",
  },
];

const popularProduce = [
  {
    name: "Fruits",
    image: "/images/fruits.jpg",
    category: "FRUITS",
    description:
      "A crisp, slightly bitter favourite. Enjoy fresh with watermelon, pineapple and other seasonal fruits.",
  },
  {
    name: "Yam",
    image: "/images/yam.jpg",
    category: "ROOT CROPS",
    description:
      "A nutritious Nigerian staple. Find fresh yam from trusted farmers and local markets.",
  },
  {
    name: "Pepper",
    image: "/images/pepper.jpg",
    category: "VEGETABLES",
    description:
      "Fresh peppers for your everyday cooking, sourced from local farmers and trusted markets.",
  },
  {
    name: "Beans",
    image: "/images/beans.jpg",
    category: "GRAINS",
    description:
      "Quality beans sourced from trusted sellers and markets around your area.",
  },
];

const popularMarkets = [
  {
    name: "Mile 12 Market",
    image: "/images/mile12-market-small.jpg",
    location: "Ketu, Lagos",
    time: "Mon - Sat · 6am - 6pm",
    products: "Fresh produce, grains",
  },
  {
    name: "Oyingbo Market",
    image: "/images/oyingbo-market-small.jpg",
    location: "Ebute Metta, Lagos",
    time: "Mon - Sat · 6am - 4pm",
    products: "Fresh produce, grains",
  },
  {
    name: "Bodija Market",
    image: "/images/bodija-market.jpg",
    location: "Bodija, Ibadan",
    time: "Mon - Sat · 6am - 6pm",
    products: "Vegetables, fruits",
  },
  {
    name: "Dugbe Market",
    image: "/images/dugbe-market.jpg",
    location: "Dugbe, Ibadan",
    time: "Mon - Sat · 7am - 5pm",
    products: "Fresh produce, grains",
  },
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
  const [activeFaq, setActiveFaq] = useState(0);
  const [email, setEmail] = useState("");

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
      <Navbar />

      {/* ================= HERO ================= */}
      <main>
        <section className="hero-section">
          <div className="hero-container">

            {/* Main Hero */}
            <div className="hero-main">
              <img
                src="/images/hero-farmer.jpg"
                alt="Local farmer with fresh produce"
                className="hero-main-image"
              />

              <div className="hero-overlay" />

              <div className="hero-content">
                <span className="hero-small-text">
                  FRESH FROM YOUR LOCAL FARMERS
                </span>

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

                <img
                  src="/images/fresh-basket.jpg"
                  alt="Fresh vegetables"
                />
              </div>

              <div className="hero-small-card seasonal-card">
                <img
                  src="/images/seasonal-produce.jpg"
                  alt="Seasonal produce"
                />

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
              <div className="feature-icon">
                <FiMapPin />
              </div>

              <div>
                <h4>Find Nearby Markets</h4>
                <p>Discover farmers&apos; markets in your area</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FiShoppingBag />
              </div>

              <div>
                <h4>Explore Fresh Produce</h4>
                <p>See what produce is available at each market</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FiClock />
              </div>

              <div>
                <h4>Check market hours</h4>
                <p>Know when your favourite markets are open</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
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
            {openedMarkets.map((market) => (
              <article className="opened-card" key={market.name}>

                <img
                  src={market.image}
                  alt={market.name}
                />

                <div className="market-card-overlay" />

                <div className="opened-card-content">

                  <h3>{market.name}</h3>

                  <div className="countdown">

                    <div>
                      <strong>{market.days}</strong>
                      <span>DAYS</span>
                    </div>

                    <div>
                      <strong>{market.hours}</strong>
                      <span>HRS</span>
                    </div>

                    <div>
                      <strong>{market.minutes}</strong>
                      <span>MIN</span>
                    </div>

                    <div>
                      <strong>{market.seconds}</strong>
                      <span>SEC</span>
                    </div>

                  </div>

                  <Link
                    to={`/markets/${market.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                    className="market-btn"
                  >
                    View Market
                    <FiArrowRight />
                  </Link>

                </div>
              </article>
            ))}
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

              {popularProduce.map((produce) => (
                <article className="produce-card" key={produce.name}>

                  <div className="produce-image-wrapper">
                    <img
                      src={produce.image}
                      alt={produce.name}
                    />

                    <span className="produce-tag">
                      {produce.category}
                    </span>
                  </div>

                  <div className="produce-content">
                    <h3>{produce.name}</h3>

                    <p>{produce.description}</p>

                    <div className="produce-footer">
                      <span>Markets Nearby</span>

                      <Link to="/produce">
                        View
                        <FiArrowRight />
                      </Link>
                    </div>
                  </div>

                </article>
              ))}

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
              <article className="market-info-card" key={market.name}>

                <div className="market-image">
                  <img
                    src={market.image}
                    alt={market.name}
                  />
                </div>

                <div className="market-info">

                  <div className="market-title-row">
                    <h3>{market.name}</h3>
                    <span>OPEN</span>
                  </div>

                  <p className="market-location">
                    <FiMapPin />
                    {market.location}
                  </p>

                  <div className="market-meta">
                    <span>
                      <FiClock />
                      {market.time}
                    </span>

                    <span>
                      <FiCheckCircle />
                      {market.products}
                    </span>
                  </div>

                  <Link
                    to={`/markets/${market.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                    className="market-link"
                  >
                    View market
                    <FiArrowRight />
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

              <span className="section-label">
                NEED HELP?
              </span>

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

              <img
                src="/images/farmer-faq.png"
                alt="Farmer holding fresh vegetables"
              />

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

            <form
              className="newsletter-form"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button type="submit">
                Subscribe
              </button>
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

      <Footer />

      <Chatbot />
    </div>
  );
}

export default Home;