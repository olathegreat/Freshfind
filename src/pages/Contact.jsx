import { useState, useEffect } from 'react';

import './Contact.css';
import { BsEnvelope } from 'react-icons/bs';
import { PiMapPinLineLight } from 'react-icons/pi';
import { FiPhoneCall } from 'react-icons/fi';
import { FaPaperPlane } from 'react-icons/fa';

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
            <div className="info-item">
              <PiMapPinLineLight className="info-icon"/>
                <p>Aptech Ringroad, Ibadan, Oyo State, NIGERIA</p>
            </div>

            <div className="info-item">
              <BsEnvelope className="info-icon"/>
                <p>freshfind@gmail.com</p>
                <p>help.freshfind@gmail.com</p>
            </div>

            <div className="info-item2">
              <FiPhoneCall className="info-icon"/>
                <p>+234 807 612 3249 </p>
                <p>+234 812 215 2357</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container animate-fade-up delay-2">
            <h2>Send Us a Message</h2>
            <h5>Have a question or feedback? Fill out the form and we will get back to you.</h5>
            
            {submitted ? (
              <div className="success-message">
                <p>Thanks for reaching out! Your message has been received.</p>
                <p className="small-text">(Note: This is a frontend demo. No data was actually sent.)</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
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
          <h2>Find Us 🍀</h2>
          <p>Explore fresh markets and discover what is growing around you.</p>
          <div className="map-placeholder">
            {/* Placeholder for actual Google Map integration */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d247.31767490788292!2d3.8716741647541824!3d7.358634841816332!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa7e4c41b4f088ca3%3A0xd6fcaaa98b447682!2sAptech%20Ringroad!5e0!3m2!1sen!2sng!4v1790337071731!5m2!1sen!2sng"  allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className='map'></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
// export default MapComponent;