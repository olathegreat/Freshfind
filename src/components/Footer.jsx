import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <FaLeaf className="footer-logo-icon" />
            <span>FreshFind</span>
          </Link>
          <p className="footer-tagline">Fresh All Along</p>
          <p className="footer-desc">
            Discover local farmers’ markets, explore seasonal produce, and plan your next market visit.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links Columns */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/markets">Find a Market</Link></li>
            <li><Link to="/produce">Produce Guide</Link></li>
            <li><Link to="/seasonal">Seasonal Picks</Link></li>
            <li><Link to="/bookmarks">Saved Markets</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="#">FAQs</Link></li>
            <li><Link to="#">FreshFind Assistant</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footer-col newsletter-col">
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for seasonal updates and market news.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </div>
          </form>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>&copy; {currentYear} FreshFind. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            {/* Dummy Login/Signup for design continuity */}
            <Link to="#" className="dummy-auth-link">Sign In / Sign Up</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;