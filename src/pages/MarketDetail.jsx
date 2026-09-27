import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaHeart,
  FaShareAlt,
  FaArrowLeft,
} from "react-icons/fa";
import data from "../data/freshfindData.json";
import { useBookmarks } from "../context/useBookmarks";
import "./MarketDetail.css";

const MarketDetail = () => {
  const { id } = useParams();
  const market = data.markets.find((item) => item.id === Number(id));
  const { bookmarkedIds, toggleBookmark } = useBookmarks();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on load
  }, [id]);

  if (!market) {
    return (
      <div className="container section">
        <h2>Market not found</h2>
        <Link to="/markets" className="btn btn-primary">
          Back to Directory
        </Link>
      </div>
    );
  }

  const isBookmarked = bookmarkedIds.includes(market.id);
  const locationParts = market.location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const neighborhood = locationParts[0] || market.location;
  const area = locationParts.slice(1).join(", ") || "Area not specified";
  const mapQuery = encodeURIComponent(`${market.name}, ${market.location}`);

  return (
    <div className="market-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="container">
          <Link to="/markets" className="back-link">
            <FaArrowLeft /> Back to Markets
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="detail-hero">
        <div className="container detail-hero-container">
          <div className="detail-image animate-fade-up">
            <img src={market.image} alt={market.name} fetchPriority="high" />
          </div>
          <div className="detail-info animate-fade-up delay-1">
            <h1>{market.name}</h1>
            <p className="detail-location">
              <FaMapMarkerAlt /> {market.location}
            </p>
            <dl className="detail-location-facts">
              <div>
                <dt>Address</dt>
                <dd>{market.location}</dd>
              </div>
              <div>
                <dt>Neighborhood</dt>
                <dd>{neighborhood}</dd>
              </div>
              <div>
                <dt>Area</dt>
                <dd>{area}</dd>
              </div>
            </dl>
            <div className="detail-actions">
              <button
                className="btn btn-secondary"
                type="button"
                aria-pressed={isBookmarked}
                onClick={() => toggleBookmark(market)}
              >
                <FaHeart /> {isBookmarked ? "Saved Market" : "Save Market"}
              </button>
              <button className="btn btn-secondary">
                <FaShareAlt /> Share
              </button>
            </div>
            <p className="detail-desc">{market.description}</p>
          </div>
        </div>
      </div>

      <section
        className="container section detail-map-section"
        aria-labelledby="market-map-title"
      >
        <div className="detail-map-heading">
          <div>
            <h2 id="market-map-title">Find {market.name}</h2>
            <p>
              {neighborhood}, {area}
            </p>
          </div>
          <a
            className="detail-map-link"
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
        <iframe
          className="detail-map"
          title={`Map showing ${market.name} in ${market.location}`}
          src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>

      <div className="container section detail-grid">
        {/* Schedule Section */}
        <div className="schedule-section animate-fade-up delay-2">
          <h2>Market Hours</h2>
          <div className="schedule-table">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => {
              const isOpen = market.days.includes(day);
              const isToday =
                new Date().toLocaleDateString("en-US", { weekday: "long" }) ===
                day;

              return (
                <div
                  className={`schedule-row ${isToday ? "today" : ""}`}
                  key={day}
                >
                  <span className="day">{day}</span>
                  <span className="hours">
                    {isOpen ? market.hours : "Closed"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Produce Section */}
        <div className="produce-section animate-fade-up delay-3">
          <h2>What You Can Find Here</h2>
          <p>The following produce is typically available at this market.</p>
          <div className="produce-grid">
            {market.availableProduce.map((item, index) => (
              <div className="produce-item" key={index}>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <Link
            to="/produce"
            className="btn btn-primary"
            style={{ marginTop: "2rem" }}
          >
            Explore Produce Guide →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;
