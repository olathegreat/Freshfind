import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaLeaf, FaHeart, FaComments, FaMapMarkerAlt } from 'react-icons/fa';
import Chatbot from './Chatbot';
import './Navbar.css';

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <FaLeaf className="logo-icon" />
            <span>FreshFind</span>
          </Link>
          
          {/* Main Navigation Links */}
          <div className="nav-links">
            <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
            <NavLink to="/markets" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Find a Market</NavLink>
            <NavLink to="/produce" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Produce Guide</NavLink>
            <NavLink to="/seasonal" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Seasonal Picks</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>About Us</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink>
          </div>

          {/* Right-side Actions */}
          <div className="nav-actions">
            <Link to="/bookmarks" className="icon-btn" title="Saved Items">
              <FaHeart />
              <span className="action-text">Saved</span>
            </Link>
            <Link to="/markets" className="btn btn-secondary nav-btn">
              <FaMapMarkerAlt /> Find a Market
            </Link>
            <button className="btn btn-primary nav-btn">Sign In</button>
          </div>
        </div>
      </nav>

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