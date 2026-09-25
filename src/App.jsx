import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <-- Import Footer

// Pages
import Home from './pages/Home';
import MarketDirectory from './pages/MarketDirectory';
import MarketDetail from './pages/MarketDetail';
import ProduceGuide from './pages/ProduceGuide';
import SeasonalPicks from './pages/SeasonalPicks';
import About from './pages/About';
import Contact from './pages/Contact';

const Bookmarks = () => (
  <div className="container section" style={{ minHeight: '60vh' }}>
    <h2>Your Saved Markets & Produce</h2>
    <p>Keep track of the markets and produce you want to explore later.</p>
    <p style={{ marginTop: '2rem', color: '#666' }}>Bookmarking functionality coming soon.</p>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/markets" element={<MarketDirectory />} />
            <Route path="/market/:id" element={<MarketDetail />} />
            <Route path="/produce" element={<ProduceGuide />} />
            <Route path="/seasonal" element={<SeasonalPicks />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer /> {/* <-- Add Footer here */}
      </div>
    </Router>
  );
}

export default App;