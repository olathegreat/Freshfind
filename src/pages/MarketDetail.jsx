import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaHeart, FaShareAlt, FaArrowLeft } from 'react-icons/fa';
import data from '../data/freshfindData.json';
import './MarketDetail.css';

const MarketDetail = () => {
  const { id } = useParams();
  const [market, setMarket] = useState(null);

  useEffect(() => {
    const foundMarket = data.markets.find(m => m.id === parseInt(id));
    setMarket(foundMarket);
    window.scrollTo(0, 0); // Scroll to top on load
  }, [id]);

  if (!market) {
    return <div className="container section"><h2>Market not found</h2><Link to="/markets" className="btn btn-primary">Back to Directory</Link></div>;
  }

  return (
    <div className="market-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="container">
          <Link to="/markets" className="back-link"><FaArrowLeft /> Back to Markets</Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="detail-hero">
        <div className="container detail-hero-container">
          <div className="detail-image animate-fade-up">
            <img src={market.image} alt={market.name} />
          </div>
          <div className="detail-info animate-fade-up delay-1">
            <h1>{market.name}</h1>
            <p className="detail-location"><FaMapMarkerAlt /> {market.location}</p>
            <div className="detail-actions">
              <button className="btn btn-secondary"><FaHeart /> Save Market</button>
              <button className="btn btn-secondary"><FaShareAlt /> Share</button>
            </div>
            <p className="detail-desc">{market.description}</p>
          </div>
        </div>
      </div>

      <div className="container section detail-grid">
        {/* Schedule Section */}
        <div className="schedule-section animate-fade-up delay-2">
          <h2>Market Hours</h2>
          <div className="schedule-table">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
              const isOpen = market.days.includes(day);
              const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day;
              
              return (
                <div className={`schedule-row ${isToday ? 'today' : ''}`} key={day}>
                  <span className="day">{day}</span>
                  <span className="hours">
                    {isOpen ? market.hours : 'Closed'}
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
          <Link to="/produce" className="btn btn-primary" style={{marginTop: '2rem'}}>Explore Produce Guide →</Link>
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;