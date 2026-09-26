
import './Navbar.css';
import logo from "../assets/freshfind-logo.png";
import logoWhite from "../assets/logowhite.png"



export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-intro">
          <img src={logoWhite} alt="FreshFind" className="footer-logo" />
          <p>Your local market companion. Find the best<br />of produce directly from farmers with no hassle.</p>
          <div className="footer-contact">
            <a href="tel:+23482356789">(234) 823-56789</a>
            <span>or</span>
            <a href="mailto:Freshfind@gmail.com">Freshfind@gmail.com</a>
          </div>
        </div>

        <FooterColumn title="Home page" links={["Open Now", "Popular Market", "Popular Produce", "Markets Near You"]} />
        <FooterColumn title="About Us" links={["About", "Mission", "Vision", "Our Team"]} />
        <FooterColumn title="Find a Market" links={["Markets", "Opened Now", "Market Nearby"]} />
        <FooterColumn title="Produce" links={["Fruit & Vegetables", "Meat & Fish", "Herbs", "View produce"]} />
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
      {links.map((link) => <a href="#" key={link}>{link}</a>)}
    </div>
  );
}