import { Link } from "react-router-dom";
import { useState } from "react";
import ErrorImage from "../assets/errorimg.png";

import "./Error404.css";

// Small inline social icons so this component has no extra dependencies.
// Swap these for lucide-react / react-icons if your project already uses one.
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.8A11.7 11.7 0 0 1 3.4 4.6a4.2 4.2 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4 4 0 0 1-1.9.1 4.1 4.1 0 0 0 3.9 2.9A8.3 8.3 0 0 1 2 18.6a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.4 11.7-11.9v-.5c.8-.6 1.5-1.3 2-2.2Z" />
  </svg>
);
const PinterestIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.7.2-2.5l1.4-6s-.3-.7-.3-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.5-1 3.9-.2 1.1.6 2 1.7 2 2 0 3.5-2.1 3.5-5.2 0-2.7-2-4.6-4.7-4.6-3.2 0-5.1 2.4-5.1 4.9 0 1 .4 2 .8 2.6.1.1.1.2.1.3l-.3 1.3c0 .2-.2.2-.3.1-1.2-.6-2-2.3-2-3.7 0-3 2.2-5.8 6.3-5.8 3.3 0 5.9 2.4 5.9 5.5 0 3.3-2.1 6-5 6-1 0-1.9-.5-2.2-1.1l-.6 2.3c-.2.8-.8 1.9-1.2 2.5A10 10 0 1 0 12 2Z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.2c2.7 0 3 0 4 .1 1 0 1.7.2 2.1.4a4.2 4.2 0 0 1 1.5 1 4.2 4.2 0 0 1 1 1.5c.2.4.4 1.1.4 2.1.1 1 .1 1.3.1 4s0 3-.1 4c0 1-.2 1.7-.4 2.1a4.5 4.5 0 0 1-2.5 2.5c-.4.2-1.1.4-2.1.4-1 .1-1.3.1-4 .1s-3 0-4-.1c-1 0-1.7-.2-2.1-.4a4.2 4.2 0 0 1-1.5-1 4.2 4.2 0 0 1-1-1.5c-.2-.4-.4-1.1-.4-2.1-.1-1-.1-1.3-.1-4s0-3 .1-4c0-1 .2-1.7.4-2.1a4.2 4.2 0 0 1 1-1.5 4.2 4.2 0 0 1 1.5-1c.4-.2 1.1-.4 2.1-.4 1-.1 1.3-.1 4-.1Zm0 1.8c-2.6 0-2.9 0-4 .1-.8 0-1.3.2-1.6.3-.4.1-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.6-.1 1.1-.1 1.4-.1 4s0 2.9.1 4c0 .8.2 1.3.3 1.6.1.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.6.3 1.1.1 1.4.1 4 .1s2.9 0 4-.1c.8 0 1.3-.2 1.6-.3.4-.1.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.6.1-1.1.1-1.4.1-4s0-2.9-.1-4c0-.8-.2-1.3-.3-1.6a2.4 2.4 0 0 0-.6-1 2.4 2.4 0 0 0-1-.6c-.3-.1-.8-.3-1.6-.3-1.1-.1-1.4-.1-4-.1Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm5.7-2a1.1 1.1 0 1 1-2.1 0 1.1 1.1 0 0 1 2.1 0Z" />
  </svg>
);

export default function Error404() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire this up to your actual newsletter endpoint
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="notfound-page">
      

      <div className="breadcrumb-banner">
        <div className="breadcrumb-inner">
          <Link to="/" aria-label="Home">
            🏠
          </Link>
          <span className="crumb-sep">›</span>
          <span className="crumb-current">404 Error Page</span>
        </div>
      </div>

      <section className="notfound-content">
        <div className="illustration-wrap">
          <img className="errorimage" src={ErrorImage} alt="404image" />
          
        </div>

        <h1>Oops! page not found</h1>
        <p>
          Looks like this page wandered off while looking for the freshest
          produce! 🥕🍅
          <br />
          The page you&apos;re looking for doesn&apos;t exist, may have been
          moved, or the link might be incorrect.
        </p>
        <Link to="/" className="btn-home">
          Back to Home
        </Link>
      </section>

      <section className="newsletter">
        <div className="newsletter-inner">
          <div className="newsletter-copy">
            <h3>Subscribe our Newsletter</h3>
            <p>
              Get latest of farm produce and market updates as they come
              directly to your email.
            </p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </form>
          {submitted && <span className="subscribed-note">Thanks — you're subscribed!</span>}

          <div className="socials">
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" aria-label="Pinterest"><PinterestIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
          </div>
        </div>
      </section>

      
    </div>
  );
}
