import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import data from '../data/freshfindData.json';
import './Home.css';

const Home = () => {
  const featuredMarkets = data.markets.slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero section">
        <div className="container hero-container">
          <div className="hero-content animate-fade-up">
            <span className="badge">Fresh. Local. Nearby.</span>
            <h1>Find Fresh Markets Near You</h1>
            <p>Discover local farmers’ markets, explore fresh seasonal produce, and find the best time to visit—all in one place.</p>
            
            <div className="hero-buttons">
              <Link to="/markets" className="btn btn-primary">Find a Market</Link>
              <Link to="/produce" className="btn btn-secondary">Explore Produce</Link>
            </div>

            <div className="search-box animate-fade-up delay-1">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search by market, location or produce..." />
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
          
          <div className="hero-image animate-fade-up delay-2">
            {/* Placeholder for Hero Image */}
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" alt="Fresh Produce" />
          </div>
        </div>
      </section>

      {/* Featured Markets */}
      <section className="featured-markets section">
        <div className="container">
          <div className="section-header animate-fade-up">
            <h2>Markets Worth Discovering</h2>
            <p>Explore farmers’ markets in your community and see what's available before you make the trip.</p>
          </div>

          <div className="markets-grid">
            {featuredMarkets.map((market, index) => (
              <div className={`market-card animate-fade-up delay-${index + 1}`} key={market.id}>
                <div className="market-image">
                  <img src={market.image} alt={market.name} />
                  <span className="status-badge">Open Today</span>
                </div>
                <div className="market-info">
                  <h3>{market.name}</h3>
                  <p className="market-location"><FaMapMarkerAlt /> {market.location}</p>
                  <p className="market-hours"><FaClock /> {market.hours}</p>
                  <p className="market-desc">{market.description}</p>
                  <Link to={`/market/${market.id}`} className="btn btn-secondary">View Market</Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="section-cta">
            <Link to="/markets" className="btn btn-primary">View All Markets →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;