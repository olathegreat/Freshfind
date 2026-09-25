import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaLeaf, FaArrowRight } from 'react-icons/fa';
import data from '../data/freshfindData.json';
import './SeasonalPicks.css';

const SeasonalPicks = () => {
  const [seasonalProduce, setSeasonalProduce] = useState([]);

  useEffect(() => {
    // In a real app, this would filter based on the current month.
    // For this SRS, we'll just show all available produce as "in season".
    setSeasonalProduce(data.produce);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="seasonal-page">
      <div className="page-header section">
        <div className="container animate-fade-up">
          <span className="badge">Fresh Right Now</span>
          <h1>What's in Season?</h1>
          <p>Discover produce that is typically available during the current season and find markets where you can look for it.</p>
        </div>
      </div>

      <div className="container section">
        <div className="section-header animate-fade-up delay-1">
          <h2>This Season's Picks</h2>
          <p>Explore fresh produce that is likely to be available at local farmers’ markets during this time of year.</p>
        </div>

        <div className="seasonal-grid">
          {seasonalProduce.map((item, index) => (
            <div className={`seasonal-card animate-fade-up delay-${(index % 4) + 1}`} key={item.id}>
              <div className="seasonal-card-icon">
                {item.category === 'Vegetable' ? <FaLeaf /> : <FaSun />}
              </div>
              <h3>{item.name}</h3>
              <p className="season-tag">In Season: {item.season}</p>
              <p className="seasonal-desc">Fresh, locally grown {item.name.toLowerCase()} available at selected markets.</p>
              <Link to="/markets" className="btn btn-secondary full-width">
                Find a Market <FaArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>

        <div className="section-cta animate-fade-up delay-2">
          <h2>Where to Find Them</h2>
          <p>Select a produce item to see the markets where it is typically available.</p>
          <Link to="/markets" className="btn btn-primary" style={{marginTop: '1rem'}}>Browse All Markets</Link>
        </div>
      </div>
    </div>
  );
};

export default SeasonalPicks;