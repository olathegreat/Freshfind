import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaLeaf, FaCarrot, FaApple } from 'react-icons/fa';
import data from '../data/freshfindData.json';
import './ProduceGuide.css';

const ProduceGuide = () => {
  const [produce, setProduce] = useState([]);
  const [filteredProduce, setFilteredProduce] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Fruit', 'Vegetable', 'Herb', 'Dairy'];

  useEffect(() => {
    // We only have Vegetables in our mock data, but this logic supports all categories
    setProduce(data.produce);
    setFilteredProduce(data.produce);
  }, []);

  useEffect(() => {
    let result = produce;

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchTerm) {
      result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredProduce(result);
  }, [searchTerm, activeCategory, produce]);

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Vegetable': return <FaCarrot />;
      case 'Fruit': return <FaApple />;
      case 'Herb': return <FaLeaf />;
      default: return <FaLeaf />;
    }
  };

  return (
    <div className="produce-page">
      <div className="page-header section">
        <div className="container animate-fade-up">
          <h1>Explore Fresh Produce</h1>
          <p>Learn about different types of produce, when they're typically in season, and where you can find them.</p>
          
          <div className="produce-search">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search for a fruit, vegetable, herb..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="category-filters animate-fade-up delay-1">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat !== 'All' && getCategoryIcon(cat)} {cat}
            </button>
          ))}
        </div>

        {filteredProduce.length > 0 ? (
          <div className="produce-cards-grid">
            {filteredProduce.map((item, index) => (
              <div className={`produce-card animate-fade-up delay-${(index % 3) + 1}`} key={item.id}>
                <div className="produce-card-header">
                  <span className="category-badge">{item.category}</span>
                  <span className="season-badge">{item.season}</span>
                </div>
                <h3>{item.name}</h3>
                <p>Fresh {item.name.toLowerCase()} commonly available at local farmers’ markets.</p>
                <Link to="/markets" className="btn btn-secondary full-width" style={{marginTop: '1rem'}}>Find at Markets →</Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state animate-fade-up">
            <h3>No Produce Found</h3>
            <p>We couldn't find any produce matching your search.</p>
            <button className="btn btn-primary" onClick={() => {setSearchTerm(''); setActiveCategory('All');}}>Clear Search</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProduceGuide;