import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // SRS specifies no backend storage, so this remains a frontend demo interaction.
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000); // Reset message after 5 seconds
  };

  return (
    <div className="contact-page">
      <div className="page-header section">
        <div className="container animate-fade-up">
          <h1>Get in Touch</h1>
          <p>Have a question about FreshFind? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="container section">
        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info animate-fade-up delay-1">
            <h2>Contact Information</h2>
            
            <div className="info-item">
              <div className="info-icon"><FaMapMarkerAlt /></div>
              <div>
                <h4>Visit Us</h4>
                <p>FreshFind Community Office<br />Market District</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><FaEnvelope /></div>
              <div>
                <h4>Email</h4>
                <p>hello@freshfind.example</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><FaPhone /></div>
              <div>
                <h4>Phone</h4>
                <p>+234 800 000 0000</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><FaClock /></div>
              <div>
                <h4>Hours</h4>
                <p>Monday – Friday<br />9:00 AM – 5:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container animate-fade-up delay-2">
            <h2>Send Us a Message</h2>
            
            {submitted ? (
              <div className="success-message">
                <p>Thanks for reaching out! Your message has been received.</p>
                <p className="small-text">(Note: This is a frontend demo. No data was actually sent.)</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" name="subject" placeholder="What is your message about?" value={formData.subject} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" rows="4" placeholder="Tell us how we can help..." value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary full-width">
                  Send Message <FaPaperPlane />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section animate-fade-up delay-3">
          <h2>Find Us</h2>
          <p>Use the map to view our location and plan your route.</p>
          <div className="map-placeholder">
            {/* Placeholder for actual Google Map integration */}
            <div className="map-content">
              <FaMapMarkerAlt size={40} />
              <p>Map Integration Area</p>
              <span>Central Community Market Road</span>
            </div>
          </div>
          <button className="btn btn-secondary" style={{marginTop: '1rem'}}>Get Directions</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;