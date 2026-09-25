import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import data from '../data/freshfindData.json';
import './MarketDirectory.css';

const MarketDirectory = () => {
  const [markets, setMarkets] = useState([]);
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  
  // Filter States
  const [locationFilter, setLocationFilter] = useState('');
  const [dayFilter, setDayFilter] = useState('');
  const [produceFilter, setProduceFilter] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    setMarkets(data.markets);
    setFilteredMarkets(data.markets);
  }, []);

  // Apply Filters & Sorting
  useEffect(() => {
    let result = [...markets];

    if (locationFilter) {
      result = result.filter(m => m.location.toLowerCase().includes(locationFilter.toLowerCase()));
    }
    if (dayFilter) {
      result = result.filter(m => m.days.includes(dayFilter));
    }
    if (produceFilter) {
      result = result.filter(m => 
        m.availableProduce.some(p => p.toLowerCase().includes(produceFilter.toLowerCase()))
      );
    }

    // Sorting
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'nextOpen') {
      // Simple mock sort for "next open" - assuming first day in array is next
      result.sort((a, b) => a.days[0].localeCompare(b.days[0]));
    }

    setFilteredMarkets(result);
  }, [locationFilter, dayFilter, produceFilter, sortBy, markets]);

  const clearFilters = () => {
    setLocationFilter('');
    setDayFilter('');
    setProduceFilter('');
    setSortBy('recommended');
  };

  return (
    <div className="directory-page">
      <div className="page-header section">
        <div className="container animate-fade-up">
          <h1>Find a Farmers’ Market</h1>
          <p>Discover farmers’ markets near you and find the right place to shop for fresh, local produce.</p>
        </div>
      </div>

      <div className="container section">
        <div className="filter-section animate-fade-up delay-1">
          <div className="filter-header">
            <h3><FaFilter /> Filter Markets</h3>
            <button className="btn-text" onClick={clearFilters}>Clear All</button>
          </div>
          
          <div className="filters-grid">
            <div className="filter-group">
              <label>Location</label>
              <input 
                type="text" 
                placeholder="e.g. Central Community" 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            
            <div className="filter-group">
              <label>Day of Week</label>
              <select value={dayFilter} onChange={(e) => setDayFilter(e.target.value)}>
                <option value="">Any day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Produce</label>
              <input 
                type="text" 
                placeholder="e.g. Tomatoes" 
                value={produceFilter}
                onChange={(e) => setProduceFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="results-header animate-fade-up delay-2">
          <p>Showing <strong>{filteredMarkets.length}</strong> markets</p>
          <div className="sort-control">
            <FaSortAmountDown />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="name">Name (A-Z)</option>
              <option value="nextOpen">Next Open</option>
            </select>
          </div>
        </div>

        {filteredMarkets.length > 0 ? (
          <div className="markets-grid">
            {filteredMarkets.map((market, index) => (
              <div className={`market-card animate-fade-up delay-${(index % 3) + 1}`} key={market.id}>
                <div className="market-image">
                  <img src={market.image} alt={market.name} />
                </div>
                <div className="market-info">
                  <h3>{market.name}</h3>
                  <p className="market-location"><FaMapMarkerAlt /> {market.location}</p>
                  <p className="market-hours"><FaClock /> Open Today · {market.hours}</p>
                  <p className="market-desc">{market.description}</p>
                  <div className="produce-tags">
                    {market.availableProduce.slice(0, 3).map((item, i) => (
                      <span key={i} className="tag">{item}</span>
                    ))}
                  </div>
                  <Link to={`/market/${market.id}`} className="btn btn-primary full-width">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state animate-fade-up">
            <h3>No Markets Found</h3>
            <p>We couldn't find a market matching your current filters. Try changing your location, day, or produce selection.</p>
            <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketDirectory;