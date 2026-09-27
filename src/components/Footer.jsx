import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoWhite from "../assets/logowhite.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-intro">
          <img
            src={logoWhite}
            alt="FreshFind"
            className="footer-logo"
            loading="lazy"
          />
          <p>
            Your local market companion. Find the best
            <br />
            of produce directly from farmers with no hassle.
          </p>
          <div className="footer-contact">
            <a href="tel:+23482356789">(234) 823-56789</a>
            <span>or</span>
            <a href="mailto:Freshfind@gmail.com">Freshfind@gmail.com</a>
          </div>
          <div className="footer-socials" aria-label="FreshFind social links">
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://pinterest.com" aria-label="Pinterest">
              <FaPinterestP />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>

        <FooterColumn
          title="Home page"
          links={[
            { label: "Open Now", to: "/#opened-now" },
            { label: "Popular Market", to: "/#popular-markets" },
            { label: "Popular Produce", to: "/#popular-produce" },
            { label: "Markets Near You", to: "/markets" },
          ]}
        />
        <FooterColumn
          title="About Us"
          links={[
            { label: "About", to: "/about#about" },
            { label: "Mission", to: "/about#mission" },
            { label: "Our Team", to: "/about#team" },
          ]}
        />
        <FooterColumn
          title="Find a Market"
          links={[
            { label: "Markets", to: "/markets" },
            { label: "Opened Now", to: "/#opened-now" },
            { label: "Market Nearby", to: "/markets" },
          ]}
        />
        <FooterColumn
          title="Produce"
          links={[
            { label: "Fruit & Vegetables", to: "/produce#produce-guide-list" },
            { label: "Meat & Fish", to: "/produce#produce-guide-list" },
            { label: "Herbs", to: "/produce#produce-guide-list" },
            { label: "View produce", to: "/produce" },
          ]}
        />
      </div>
      <div className="footer-newsletter">
        <div className="container footer-newsletter__inner">
          <div className="footer-newsletter__copy">
            <h2>Subscribe to our newsletter</h2>
            <p>Get fresh produce and market updates delivered to your inbox.</p>
          </div>
          <form className="footer-newsletter__form" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              aria-label="Your email address"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {subscribed && (
            <p className="footer-newsletter__success" role="status">
              Thanks for subscribing.
            </p>
          )}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>Freshfind© 2026. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export function FooterColumn({ title, links }) {
  return (
    <div className="footer-column">
      <h2>{title}</h2>
      {links.map(({ label, to }) => (
        <Link to={to} key={`${label}-${to}`}>
          {label}
        </Link>
      ))}
    </div>
  );
}
