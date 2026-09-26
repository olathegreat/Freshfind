import  { useState } from 'react';
import { FaComments } from 'react-icons/fa';
import Chatbot from './Chatbot';
import './Navbar.css';
import logo from "../assets/freshfind-logo.png";


const navItems = [
  {name:"Home", link:"/"},
  {name:"About Us", link:"/about"},
  {name:"Find a Market", link:"/markets"},
  {name:"Produce Guide", link:"/produce"},
  {name:"Seasonal Picks", link:"/seasonal"},
  {name:"Contact Us", link:"/contact"}
];

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <header className="site-header">
           <div className="utility-bar">
             <div className="container utility-inner">
               <span>Your location Aptech Ringroad, Ibadan,Oyo state,Nigeria</span>
               <div className="utility-links">
       
                 <a href="#">Sign in / Sign up</a>
               </div>
             </div>
           </div>
     
           <div className="header-main">
             <div className="header-inner">
               <a className="brand" href="#" aria-label="FreshFind home">
                 <img src={logo} alt="FreshFind" />
               </a>
     
               <form className="search-form" role="search">
                 <span aria-hidden="true">⌕</span>
                 <input type="search" placeholder="Search" aria-label="Search" />
                 <button type="submit">Search</button>
               </form>
     
               <div className="header-actions">
                 <a className="heart" href="#" aria-label="Wishlist">♡</a>
                 <a className="cart" href="#" aria-label="Shopping cart">
                   <span className="cart-icon">🛒</span>
                   <span><small>Shopping cart:</small><strong>$57.00</strong></span>
                 </a>
               </div>
             </div>
            
           </div>
            <form className="search-form-mobile" role="search">
                 <span aria-hidden="true">⌕</span>
                 <input type="search" placeholder="Search" aria-label="Search" />
                 <button type="submit">Search</button>
               </form>
     
           <div className="nav-bar">
             <div className="container nav-inner">
               <nav aria-label="Main navigation">
                 <ul>
                   {navItems.map((item, index) => (
                     <li key={item.name}>
                       <a href={item.link} className={index === 0 ? "active" : ""}>
                         {item.name}
                       </a>
                     </li>
                   ))}
                 </ul>
               </nav>
               <a className="phone-link" href="tel:+23487861234">☎ &nbsp; (219) 555-0114</a>
             </div>
           </div>
         </header>

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