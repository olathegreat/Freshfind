import { useMemo } from "react";
import heroimage from "../assets/hero-image.png";
import Chatbot from "../components/Chatbot";
import freshfindData from "../data/freshfindData.json";
import "./SeasonalPicks.css";






// Nigeria has two broad seasons in this dataset: "Rainy" (~April–October)
// and "Harmattan" (~November–March). We use the current month to decide
// what's "Currently In Season" vs "Coming Soon".
function getCurrentSeason(date = new Date()) {
  const month = date.getMonth(); // 0 = Jan
  const isRainy = month >= 3 && month <= 9; // Apr (3) – Oct (9)
  return isRainy ? "Rainy" : "Harmattan";
}

const FEATURES = [
  {
    icon: "📍",
    title: "Find Nearby Markets",
    text: "Discover farmers' markets in your area",
  },
  {
    icon: "🥦",
    title: "Explore Fresh Produce",
    text: "See what produce is available at each market",
  },
  {
    icon: "🕐",
    title: "Check market hours",
    text: "Know when your favorite markets are open.",
  },
  {
    icon: "🤖",
    title: "FreshFind Assistant",
    text: "Get quick answers about markets and produce.",
  },
];

function ProduceCard({ item, tagText }) {
  return (
    <div className="p-card">
      <div className="p-thumb">
        <span className="tag">{tagText}</span>
        <img src={item.picture} alt={item.name} loading="lazy" />
      </div>
      <div className="p-body">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="markets">
          Markets Available: <b>{item.markets.join(", ")}</b>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { inSeason, comingSoon } = useMemo(() => {
    const currentSeason = getCurrentSeason();
    const all = freshfindData.produce;

    return {
      inSeason: all.filter((p) => p.season === currentSeason).slice(0, 8),
      comingSoon: all.filter((p) => p.season !== currentSeason).slice(0, 4),
    };
  }, []);

  return (
    <div className="home">
      

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">WELCOME TO FRESHFIND</div>
          <h1>Fresh &amp; Healthy Food In Season</h1>
          <h2>
            What&apos;s Fresh this <b>Season?</b>
          </h2>
          <p>Explore seasonal produce available at markets near you.</p>
          <a href="#in-season" className="btn">
            Shop now →
          </a>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img  src={heroimage} alt="hero-image" />
        </div>
      </section>

      <section className="features">
        {FEATURES.map((f) => (
          <div className="feature" key={f.title}>
            <div className="icon">{f.icon}</div>
            <div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="produce" id="in-season">
        <div className="section-head">
          <h2>Currently In Season</h2>
          <a href="/produce-guide">View All →</a>
        </div>
        <div className="grid">
          {inSeason.map((item) => (
            <ProduceCard key={item.id} item={item} tagText="IN SEASON" />
          ))}
        </div>
      </section>

      <section className="produce">
        <div className="section-head">
          <h2>Coming Soon…</h2>
        </div>
        <div className="grid">
          {comingSoon.map((item) => (
            <ProduceCard key={item.id} item={item} tagText="COMING SOON" />
          ))}
        </div>
      </section>

      
      <Chatbot />
    </div>
  );
}
