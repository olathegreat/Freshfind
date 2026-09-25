import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBookOpen, FaCalendarAlt, FaUsers, FaLeaf } from 'react-icons/fa';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="page-header section">
        <div className="container animate-fade-up">
          <span className="badge">About FreshFind</span>
          <h1>Making Local Markets Easier to Discover</h1>
          <p>FreshFind brings useful farmers’ market information together so residents can discover nearby markets, explore seasonal produce, and plan their visits with confidence.</p>
        </div>
      </div>

      {/* Our Story */}
      <div className="container section">
        <div className="about-grid animate-fade-up delay-1">
          <div className="about-text">
            <h2>Why FreshFind Exists</h2>
            <p>Finding information about local farmers’ markets shouldn't require checking different flyers, social media pages, community boards, or asking around.</p>
            <p>FreshFind brings market locations, opening times, and produce information together in one simple platform.</p>
            <p className="highlight-text">This directly reflects the problem identified in the SRS: market information is scattered across multiple sources, making it difficult for residents to know where and when to visit.</p>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=600" alt="Community Market" />
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="mission-section section">
        <div className="container animate-fade-up">
          <h2>Our Mission</h2>
          <p className="mission-text">To make it easier for people to discover local farmers’ markets and make the most of fresh, seasonal produce in their community.</p>
        </div>
      </div>

      {/* What We Do */}
      <div className="container section">
        <div className="section-header animate-fade-up">
          <h2>What We Do</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card animate-fade-up delay-1">
            <div className="feature-icon"><FaSearch /></div>
            <h3>Find Local Markets</h3>
            <p>Discover farmers’ markets around your community.</p>
          </div>
          <div className="feature-card animate-fade-up delay-2">
            <div className="feature-icon"><FaBookOpen /></div>
            <h3>Learn About Produce</h3>
            <p>Explore produce, categories, seasons, and availability.</p>
          </div>
          <div className="feature-card animate-fade-up delay-3">
            <div className="feature-icon"><FaCalendarAlt /></div>
            <h3>Plan Your Visit</h3>
            <p>Check market schedules and decide when to go.</p>
          </div>
          <div className="feature-card animate-fade-up delay-4">
            <div className="feature-icon"><FaUsers /></div>
            <h3>Support Local Communities</h3>
            <p>Make it easier for residents and local farmers to connect.</p>
          </div>
        </div>
      </div>

      {/* Team & CTA */}
      <div className="container section">
        <div className="team-cta-container animate-fade-up">
          <div className="team-info">
            <h2>Meet the Team</h2>
            <p>FreshFind is built by a team focused on creating a simple and accessible way to discover local markets.</p>
            <div className="team-icons">
              <FaLeaf className="team-leaf" />
              <FaLeaf className="team-leaf" />
              <FaLeaf className="team-leaf" />
            </div>
          </div>
          <div className="cta-box">
            <h3>Ready to Discover What's Fresh?</h3>
            <Link to="/markets" className="btn btn-primary" style={{marginTop: '1rem'}}>Find a Market</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;