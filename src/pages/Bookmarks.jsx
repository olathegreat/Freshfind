import React from "react";
import { Link } from "react-router-dom";
import "./Bookmarks.css";
import bookmarkimage from "../assets/bookmark-hero.png";

// Market records from the supplied data. Add derived fields (area/categories)
// at render time so the original records remain easy to maintain.
const markets = [
  { id: 1, name: "Mile 12 Market", location: "Mile 12, Lagos", hours: "8:00 AM – 6:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "A beautifully organized market offering a wide variety of fresh produce, meats, and local delicacies.", availableProduce: ["Tomatoes", "Carrots", "Lettuce", "Eggs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790267540/2AC3786A-86F6-4E78-8A0C-2565CD8B15F6.png" },
  { id: 2, name: "Oyingbo Market", location: "Oyingbo- Ebute Metta, Lagos", hours: "8:00 AM – 6:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "A community market featuring fresh produce from local growers.", availableProduce: ["Apples", "Sweet Corn", "Leafy Greens"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790277063/market1.png", categories: ["Fruits", "Vegetables", "Dairy"] },
  { id: 3, name: "Ketu Market", location: "Ketu, Lagos", hours: "7:00 AM – 7:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "Fresh seasonal fruits, vegetables and farm products.", availableProduce: ["Bananas", "Strawberries", "Leafy Greens", "Fresh Herbs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790278427/Market2.png" },
  { id: 4, name: "Fruit Market, Ilupeju", location: "Ilupeju, Lagos", hours: "7:30 AM – 6:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "Fresh seasonal fruits, vegetables and farm products.", availableProduce: ["Veggies", "Oranges", "Leafy Greens", "Fresh Herbs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790279831/Market3.png" },
  { id: 5, name: "Masha Fruit Farmers Market", location: "Surulere, Lagos", hours: "6:00 AM – 4:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "A vibrant market with a variety of fresh produce and artisanal goods.", availableProduce: ["Strawberries", "Blueberries", "Tomatoes", "Carrots"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790282750/Market4.png" },
  { id: 6, name: "Jakande Fruit Market", location: "Ketu, Lagos", hours: "8:00 AM – 5:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "A family-friendly market offering fresh produce, baked goods, and handmade crafts.", availableProduce: ["Potatoes", "Sweet Corn", "Carrots", "Leafy Greens"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790283685/Market5.png" },
  { id: 7, name: "Oshodi Market", location: "Oshodi, Lagos", hours: "9:00 AM – 6:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "One of the largest, busiest, and most chaotic open-air commercial hubs in West Africa.", availableProduce: ["Pumpkins", "Watermelons", "Leafy Greens", "Fresh Herbs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790284459/Market6.png" },
  { id: 8, name: "Daleko Market", location: "Mushin, Lagos", hours: "8:00 AM – 5:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "A major wholesale grain and food market located in Mushin, Lagos.", availableProduce: ["Tomatoes", "Carrots", "Leafy Greens", "Fresh Herbs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790285303/Market7.png" },
  { id: 9, name: "Bodija Market", location: "Bodija, Ibadan", hours: "7:00 AM – 6:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "A bustling market with fresh produce, baked goods, and local crafts.", availableProduce: ["Tomatoes", "Carrots", "Leafy Greens", "Fresh Herbs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790285816/Market8.png" },
  { id: 10, name: "Dugbe Market", location: "Dugbe, Ibadan", hours: "9:00 AM – 6:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "It's a very large market, and prices of goods are relatively cheap.", availableProduce: ["Tomatoes", "Carrots", "Leafy Greens"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790286816/Market9.png" },
  { id: 11, name: "Oja-Oba Market", location: "Oja-Oba, Ibadan", hours: "9:00 AM – 7:00 PM", days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "A market that connects local farmers with the community, offering fresh produce and artisanal goods.", availableProduce: ["Tomatoes", "Carrots", "Leafy Greens", "Fresh Herbs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790288230/market10.png" },
  { id: 12, name: "Onitsha Main Market", location: "Onitsha, Anambra State", hours: "9:00 AM – 6:00 PM", days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "A weekend market with a variety of fresh produce, baked goods, and local crafts.", availableProduce: ["Onions", "Cabbage", "Plantains", "Pineapples"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790289129/Market11.png" },
  { id: 13, name: "Garki International Market", location: "Garki, Abuja", hours: "7:00 AM – 3:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], description: "A prominent commercial hub and central trading point for a wide range of goods and services.", availableProduce: ["Corn", "Pomegranates", "Guava", "Yams"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790290828/Market12.png" },
  { id: 14, name: "Wuse Market", location: "Wuse, Abuja", hours: "9:00 AM – 4:00 PM", days: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"], description: "A weekend market with a variety of fresh produce and local crafts.", availableProduce: ["Gingers", "Carrots", "Green Beans", "Fresh Herbs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790291713/Market13.png" },
  { id: 15, name: "Dawanau Market", location: "Dawanau, Kano", hours: "10:00 AM – 7:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"], description: "A major agricultural commodity and grain market in Kano State.", availableProduce: ["Corn", "Pomegranates", "Guava", "Yams"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790292288/Market14.png" },
  { id: 16, name: "Sabon Gari Market", location: "Sabon Gari, Kano", hours: "7:30 AM – 3:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"], description: "A vibrant market with a variety of fresh produce and artisanal goods.", availableProduce: ["Tomatoes", "Carrots", "Leafy Greens", "Fresh Herbs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790292672/Market15.png" },
  { id: 17, name: "Oil Mill Market", location: "Port Harcourt, Rivers State", hours: "8:00 AM – 4:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "A community-owned weekly market and lively trading hub along Aba Road.", availableProduce: ["Tomatoes", "Habanero Peppers", "Leafy Greens", "Fresh Herbs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790329005/Market16.png" },
  { id: 18, name: "Fruit & Vegetable Market, Onitsha", location: "Onitsha, Anambra State", hours: "9:00 AM – 3:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "A local market featuring fresh produce, flowers, and artisanal products.", availableProduce: ["Tomatoes", "Carrots", "Oranges", "Fresh Herbs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790329621/Market17.png" },
  { id: 19, name: "Iyana-Iba Market", location: "Iyana-Iba, Lagos State", hours: "9:00 AM – 6:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "A market with a wide range of goods and products at affordable prices.", availableProduce: ["Avocado", "Carrots", "Coconuts", "Fresh Herbs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790330239/Market18.png" },
  { id: 20, name: "Maitama Farmers Market, Abuja", location: "Maitama, Abuja", hours: "7:30 AM – 6:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "An organized open-air market known for local and exotic fruit, vegetables, and gourmet groceries.", availableProduce: ["Pomegranates", "Coconuts", "Leafy Greens", "Fresh Herbs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790330859/Market19.png" },
  { id: 21, name: "Akinyele Market, Ibadan", location: "Akinyele, Ibadan", hours: "8:00 AM – 4:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "A farmers market known for affordable peppers, tomatoes, and vegetables.", availableProduce: ["Tomatoes", "Carrots", "Leafy Greens", "Fresh Herbs"], image: "https://res.cloudinary.com/tummi9le/image/upload/v1790331466/Market20.png" },
];

const MARKET_DETAIL_BASE_PATH = "/markets";
const produceCategories = {
  fruit: ["apple", "banana", "strawberr", "orange", "watermelon", "pomegranate", "guava", "pineapple", "avocado", "coconut"],
  grain: ["corn", "maize", "rice", "bean", "yam", "potato", "cassava"],
  other: ["egg", "dairy", "meat", "fish", "baked", "craft"],
};

function getDerivedCategories(market) {
  if (market.categories?.length) return market.categories;
  const items = market.availableProduce || [];
  const categories = new Set();
  items.forEach((item) => {
    const value = item.toLowerCase();
    if (produceCategories.fruit.some((term) => value.includes(term))) categories.add("Fruits");
    else if (produceCategories.grain.some((term) => value.includes(term))) categories.add("Grains");
    else if (produceCategories.other.some((term) => value.includes(term))) categories.add("Other");
    else categories.add("Vegetables");
  });
  return [...categories];
}

function formatDayRange(days = []) {
  const shortDays = days.map((day) => day.slice(0, 3));
  if (shortDays.length === 0) return "Hours vary";
  if (shortDays.length === 7) return "Daily";
  if (shortDays.length === 6 && shortDays[0] === "Mon" && shortDays[5] === "Sat") return "Mon–Sat";
  return shortDays.join(", ");
}

function BookmarkIcon() {
  return <svg viewBox="0 0 24 28" aria-hidden="true"><path d="M3 2h18v25l-9-6-9 6z" /></svg>;
}

export default function Bookmarks({
  pageItems = markets,
  sortBy = "recent",
  bookmarkedIds = [],
  onToggleBookmark,
}) {
  return (
    <main className="bookmarks-page">
      <section className="saved-hero" aria-labelledby="saved-title">
        <div className="saved-hero__inner">
          <div className="saved-hero__copy">
            <div className="saved-hero__icon" aria-hidden="true"><BookmarkIcon /></div>
            <div className="saved-hero__text">
              <h1 id="saved-title">Your Saved Picks</h1>
              <p>Keep the farm-fresh products you love close at hand.<br className="saved-hero__desktop-break" /> Come back anytime when you're ready to shop.</p>
              <div className="saved-hero__count"><strong>{pageItems.length}</strong><span>saved markets</span></div>
            </div>
          </div>
          <div className="saved-hero__art" aria-hidden="true">
            <img src={bookmarkimage} alt="" />
          </div>
        </div>
      </section>

      <section className="saved-toolbar" aria-label="Filter saved markets">
        <div className="saved-toolbar__inner">
          <div className="saved-categories" role="group" aria-label="Market category">
            {["All", "Fruits", "Vegetables", "Grains", "Other"].map((category, index) => (
              <button className={`saved-category${index === 0 ? " is-active" : ""}`} type="button" key={category}>{category}</button>
            ))}
          </div>
          <label className="saved-sort">Sort by
            <select aria-label="Sort saved markets" value={sortBy} readOnly>
              <option value="recent">Recently Added</option>
              <option value="nextOpen">Next open</option>
              <option value="nearMe">Nearest</option>
              <option value="az">Name: A to Z</option>
            </select>
          </label>
        </div>
      </section>

      <section className="saved-markets" aria-label="Saved markets">
        <div className="md-grid">
          {pageItems.map((market) => {
            const derivedCategories = getDerivedCategories(market);
            const area = market.area || market.location.split(",")[0].trim();
            const isBookmarked = bookmarkedIds.includes(market.id);

            return (
              <article className="md-card" key={market.id}>
                <div className="md-card-image">
                  <span className="md-badge">WHOLESALE &amp; FRESH</span>
                  <img src={market.image} alt={market.name} loading="lazy" />
                  <button
                    className={`md-bookmark${isBookmarked ? " is-bookmarked" : ""}`}
                    type="button"
                    aria-label={`${isBookmarked ? "Remove" : "Save"} ${market.name} ${isBookmarked ? "from" : "to"} bookmarks`}
                    aria-pressed={isBookmarked}
                    onClick={() => onToggleBookmark?.(market)}
                  >
                    <BookmarkIcon />
                  </button>
                </div>
                <div className="md-card-body">
                  <div className="md-card-top">
                    <h2>{market.name}</h2>
                    {sortBy === "nextOpen" && <span className="md-status-tag">{market.openInDays === 0 ? "Open today" : market.openInDays === 1 ? "Opens tomorrow" : market.openInDays === Infinity ? "Hours vary" : typeof market.openInDays === "number" ? `Opens in ${market.openInDays}d` : "Hours vary"}</span>}
                    {sortBy === "nearMe" && typeof market.distanceKm === "number" && <span className="md-status-tag">~{Math.round(market.distanceKm)} km away</span>}
                    {sortBy === "az" && <span className="md-area-tag">{area}</span>}
                  </div>
                  <p className="md-card-location">{market.location}</p>

                  <div className="md-card-meta">
                    <div>
                      <span className="md-meta-label">When to go</span>
                      <span className="md-meta-value">{formatDayRange(market.days)} · {market.hours}</span>
                    </div>
                    <div>
                      <span className="md-meta-label">Good for</span>
                      <span className="md-meta-value">{derivedCategories.length ? derivedCategories.slice(0, 2).join(", ") : (market.availableProduce || []).slice(0, 2).join(", ")}</span>
                    </div>
                  </div>

                  <p className="md-card-tip">Go early for the widest choice.</p>
                  <Link to={`${MARKET_DETAIL_BASE_PATH}/${market.id}`} className="md-view-link">View market <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export { markets, formatDayRange };
