import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // <-- Import Footer
import Chatbot from "./components/Chatbot";

// Pages
import Home from "./pages/Home";
import MarketDirectory from "./pages/MarketDirectory";
import MarketDetail from "./pages/MarketDetail";
import ProduceGuide from "./pages/ProduceGuide";
import SeasonalPicks from "./pages/SeasonalPicks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";
import Bookmarks from "./pages/Bookmarks";
import { BookmarkProvider } from "./context/BookmarkContext";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    let timeoutId;
    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target && attempts < 20) {
        attempts += 1;
        timeoutId = window.setTimeout(scrollToTarget, 50);
        return;
      }
      if (!target) return;
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: targetTop, behavior: "instant" });
    };
    timeoutId = window.setTimeout(scrollToTarget, 0);
    return () => window.clearTimeout(timeoutId);
  }, [pathname, hash]);
  return null;
};

function App() {
  return (
    <Router>
      <BookmarkProvider>
        <ScrollToTop />
        <div
          className="app"
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
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
              <Route path="*" element={<Error404 />} />
            </Routes>
          </main>
          <Chatbot />
          <Footer />
        </div>
      </BookmarkProvider>
    </Router>
  );
}

export default App;
