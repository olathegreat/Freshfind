import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import "./Bookmarks.css";
import bookmarkimage from "../assets/bookmark-hero.png";
import marketData from "../data/freshfindData.json";
import { useBookmarks } from "../context/useBookmarks";

// Market records from the supplied data. Add derived fields (area/categories)
// at render time so the original records remain easy to maintain.
const markets = [
  {
    id: 1,
    name: "Mile 12 Market",
    location: "Mile 12, Lagos",
    hours: "8:00 AM – 6:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "A beautifully organized market offering a wide variety of fresh produce, meats, and local delicacies.",
    availableProduce: ["Tomatoes", "Carrots", "Lettuce", "Eggs"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790267540/2AC3786A-86F6-4E78-8A0C-2565CD8B15F6.png",
  },
  {
    id: 2,
    name: "Oyingbo Market",
    location: "Oyingbo- Ebute Metta, Lagos",
    hours: "8:00 AM – 6:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "A community market featuring fresh produce from local growers.",
    availableProduce: ["Apples", "Sweet Corn", "Leafy Greens"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790277063/market1.png",
    categories: ["Fruits", "Vegetables", "Dairy"],
  },
  {
    id: 3,
    name: "Ketu Market",
    location: "Ketu, Lagos",
    hours: "7:00 AM – 7:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description: "Fresh seasonal fruits, vegetables and farm products.",
    availableProduce: [
      "Bananas",
      "Strawberries",
      "Leafy Greens",
      "Fresh Herbs",
    ],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790278427/Market2.png",
  },
  {
    id: 4,
    name: "Fruit Market, Ilupeju",
    location: "Ilupeju, Lagos",
    hours: "7:30 AM – 6:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description: "Fresh seasonal fruits, vegetables and farm products.",
    availableProduce: ["Veggies", "Oranges", "Leafy Greens", "Fresh Herbs"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790279831/Market3.png",
  },
  {
    id: 5,
    name: "Masha Fruit Farmers Market",
    location: "Surulere, Lagos",
    hours: "6:00 AM – 4:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "A vibrant market with a variety of fresh produce and artisanal goods.",
    availableProduce: ["Strawberries", "Blueberries", "Tomatoes", "Carrots"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790282750/Market4.png",
  },
  {
    id: 6,
    name: "Jakande Fruit Market",
    location: "Ketu, Lagos",
    hours: "8:00 AM – 5:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "A family-friendly market offering fresh produce, baked goods, and handmade crafts.",
    availableProduce: ["Potatoes", "Sweet Corn", "Carrots", "Leafy Greens"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790283685/Market5.png",
  },
  {
    id: 7,
    name: "Oshodi Market",
    location: "Oshodi, Lagos",
    hours: "9:00 AM – 6:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "One of the largest, busiest, and most chaotic open-air commercial hubs in West Africa.",
    availableProduce: [
      "Pumpkins",
      "Watermelons",
      "Leafy Greens",
      "Fresh Herbs",
    ],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790284459/Market6.png",
  },
  {
    id: 8,
    name: "Daleko Market",
    location: "Mushin, Lagos",
    hours: "8:00 AM – 5:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "A major wholesale grain and food market located in Mushin, Lagos.",
    availableProduce: ["Tomatoes", "Carrots", "Leafy Greens", "Fresh Herbs"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790285303/Market7.png",
  },
  {
    id: 9,
    name: "Bodija Market",
    location: "Bodija, Ibadan",
    hours: "7:00 AM – 6:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "A bustling market with fresh produce, baked goods, and local crafts.",
    availableProduce: ["Tomatoes", "Carrots", "Leafy Greens", "Fresh Herbs"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790285816/Market8.png",
  },
  {
    id: 10,
    name: "Dugbe Market",
    location: "Dugbe, Ibadan",
    hours: "9:00 AM – 6:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "It's a very large market, and prices of goods are relatively cheap.",
    availableProduce: ["Tomatoes", "Carrots", "Leafy Greens"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790286816/Market9.png",
  },
  {
    id: 11,
    name: "Oja-Oba Market",
    location: "Oja-Oba, Ibadan",
    hours: "9:00 AM – 7:00 PM",
    days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "A market that connects local farmers with the community, offering fresh produce and artisanal goods.",
    availableProduce: ["Tomatoes", "Carrots", "Leafy Greens", "Fresh Herbs"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790288230/market10.png",
  },
  {
    id: 12,
    name: "Onitsha Main Market",
    location: "Onitsha, Anambra State",
    hours: "9:00 AM – 6:00 PM",
    days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "A weekend market with a variety of fresh produce, baked goods, and local crafts.",
    availableProduce: ["Onions", "Cabbage", "Plantains", "Pineapples"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790289129/Market11.png",
  },
  {
    id: 13,
    name: "Garki International Market",
    location: "Garki, Abuja",
    hours: "7:00 AM – 3:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    description:
      "A prominent commercial hub and central trading point for a wide range of goods and services.",
    availableProduce: ["Corn", "Pomegranates", "Guava", "Yams"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790290828/Market12.png",
  },
  {
    id: 14,
    name: "Wuse Market",
    location: "Wuse, Abuja",
    hours: "9:00 AM – 4:00 PM",
    days: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    description:
      "A weekend market with a variety of fresh produce and local crafts.",
    availableProduce: ["Gingers", "Carrots", "Green Beans", "Fresh Herbs"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790291713/Market13.png",
  },
  {
    id: 15,
    name: "Dawanau Market",
    location: "Dawanau, Kano",
    hours: "10:00 AM – 7:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
    description:
      "A major agricultural commodity and grain market in Kano State.",
    availableProduce: ["Corn", "Pomegranates", "Guava", "Yams"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790292288/Market14.png",
  },
  {
    id: 16,
    name: "Sabon Gari Market",
    location: "Sabon Gari, Kano",
    hours: "7:30 AM – 3:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
    description:
      "A vibrant market with a variety of fresh produce and artisanal goods.",
    availableProduce: ["Tomatoes", "Carrots", "Leafy Greens", "Fresh Herbs"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790292672/Market15.png",
  },
  {
    id: 17,
    name: "Oil Mill Market",
    location: "Port Harcourt, Rivers State",
    hours: "8:00 AM – 4:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "A community-owned weekly market and lively trading hub along Aba Road.",
    availableProduce: [
      "Tomatoes",
      "Habanero Peppers",
      "Leafy Greens",
      "Fresh Herbs",
    ],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790329005/Market16.png",
  },
  {
    id: 18,
    name: "Fruit & Vegetable Market, Onitsha",
    location: "Onitsha, Anambra State",
    hours: "9:00 AM – 3:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "A local market featuring fresh produce, flowers, and artisanal products.",
    availableProduce: ["Tomatoes", "Carrots", "Oranges", "Fresh Herbs"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790329621/Market17.png",
  },
  {
    id: 19,
    name: "Iyana-Iba Market",
    location: "Iyana-Iba, Lagos State",
    hours: "9:00 AM – 6:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "A market with a wide range of goods and products at affordable prices.",
    availableProduce: ["Avocado", "Carrots", "Coconuts", "Fresh Herbs"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790330239/Market18.png",
  },
  {
    id: 20,
    name: "Maitama Farmers Market, Abuja",
    location: "Maitama, Abuja",
    hours: "7:30 AM – 6:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "An organized open-air market known for local and exotic fruit, vegetables, and gourmet groceries.",
    availableProduce: [
      "Pomegranates",
      "Coconuts",
      "Leafy Greens",
      "Fresh Herbs",
    ],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790330859/Market19.png",
  },
  {
    id: 21,
    name: "Akinyele Market, Ibadan",
    location: "Akinyele, Ibadan",
    hours: "8:00 AM – 4:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description:
      "A farmers market known for affordable peppers, tomatoes, and vegetables.",
    availableProduce: ["Tomatoes", "Carrots", "Leafy Greens", "Fresh Herbs"],
    image:
      "https://res.cloudinary.com/tummi9le/image/upload/v1790331466/Market20.png",
  },
];

const MARKET_DETAIL_BASE_PATH = "/market";
const produceCategories = {
  fruit: [
    "apple",
    "banana",
    "strawberr",
    "orange",
    "watermelon",
    "pomegranate",
    "guava",
    "pineapple",
    "avocado",
    "coconut",
  ],
  grain: ["corn", "maize", "rice", "bean", "yam", "potato", "cassava"],
  other: ["egg", "dairy", "meat", "fish", "baked", "craft"],
};

function getDerivedCategories(market) {
  if (market.categories?.length) return market.categories;
  const items = market.availableProduce || [];
  const categories = new Set();
  items.forEach((item) => {
    const value = item.toLowerCase();
    if (produceCategories.fruit.some((term) => value.includes(term)))
      categories.add("Fruits");
    else if (produceCategories.grain.some((term) => value.includes(term)))
      categories.add("Grains");
    else if (produceCategories.other.some((term) => value.includes(term)))
      categories.add("Other");
    else categories.add("Vegetables");
  });
  return [...categories];
}

function daysUntilNextOpen(days) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date().getDay();
  const offsets = days
    .map((day) => weekdays.indexOf(day))
    .filter((dayIndex) => dayIndex >= 0)
    .map((dayIndex) => (dayIndex - today + 7) % 7);
  return offsets.length ? Math.min(...offsets) : Infinity;
}

function formatDayRange(days = []) {
  const shortDays = days.map((day) => day.slice(0, 3));
  if (shortDays.length === 0) return "Hours vary";
  if (shortDays.length === 7) return "Daily";
  if (
    shortDays.length === 6 &&
    shortDays[0] === "Mon" &&
    shortDays[5] === "Sat"
  )
    return "Mon–Sat";
  return shortDays.join(", ");
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 28" aria-hidden="true">
      <path d="M3 2h18v25l-9-6-9 6z" />
    </svg>
  );
}

export default function Bookmarks() {
  const {
    bookmarkedIds,
    bookmarkedProduceIds,
    toggleBookmark,
    toggleProduceBookmark,
    notes,
    updateNote,
  } = useBookmarks();
  const [activeType, setActiveType] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const allItems = useMemo(() => {
    const sourceMarkets = marketData.markets.length
      ? marketData.markets
      : markets;
    return [
      ...sourceMarkets
        .filter((market) => bookmarkedIds.includes(market.id))
        .map((item) => ({ ...item, contentType: "market" })),
      ...marketData.produce
        .filter((item) => bookmarkedProduceIds.includes(item.id))
        .map((item) => ({ ...item, contentType: "produce" })),
    ];
  }, [bookmarkedIds, bookmarkedProduceIds]);

  const pageItems = useMemo(() => {
    const filtered = allItems.filter((item) => {
      if (activeType === "Markets" && item.contentType !== "market")
        return false;
      if (activeType === "Produce" && item.contentType !== "produce")
        return false;
      if (activeCategory === "All") return true;
      if (item.contentType === "market") {
        return getDerivedCategories(item).some((category) =>
          category
            .toLowerCase()
            .includes(activeCategory.toLowerCase().replace(/s$/, "")),
        );
      }
      return item.category
        .toLowerCase()
        .includes(activeCategory.toLowerCase().replace(/s$/, ""));
    });

    if (sortBy === "az") {
      return filtered.sort((itemA, itemB) =>
        itemA.name.localeCompare(itemB.name),
      );
    }
    if (sortBy === "nextOpen") {
      return filtered.sort((itemA, itemB) => {
        const daysA =
          itemA.contentType === "market"
            ? daysUntilNextOpen(itemA.days || [])
            : Infinity;
        const daysB =
          itemB.contentType === "market"
            ? daysUntilNextOpen(itemB.days || [])
            : Infinity;
        return daysA - daysB || itemA.name.localeCompare(itemB.name);
      });
    }
    return filtered.sort((itemA, itemB) => {
      const orderA =
        itemA.contentType === "market"
          ? bookmarkedIds.indexOf(itemA.id)
          : bookmarkedProduceIds.indexOf(itemA.id);
      const orderB =
        itemB.contentType === "market"
          ? bookmarkedIds.indexOf(itemB.id)
          : bookmarkedProduceIds.indexOf(itemB.id);
      return orderB - orderA;
    });
  }, [
    activeCategory,
    activeType,
    allItems,
    bookmarkedIds,
    bookmarkedProduceIds,
    sortBy,
  ]);

  const exportBookmarks = () => {
    const text = ["FreshFind saved recommendations", ""]
      .concat(
        allItems.map((item) => {
          const note = notes[`${item.contentType}:${item.id}`];
          const detail =
            item.contentType === "market"
              ? item.location
              : `${item.category} | available at ${(item.markets || []).join(", ")}`;
          return [
            `${item.contentType === "market" ? "Market" : "Produce"}: ${item.name}`,
            detail,
            item.description || "",
            note ? `Personal note: ${note}` : "",
          ]
            .filter(Boolean)
            .join("\n");
        }),
      )
      .join("\n\n");
    const file = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "freshfind-bookmarks.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="bookmarks-page">
      <section className="saved-hero" aria-labelledby="saved-title">
        <div className="saved-hero__inner">
          <div className="saved-hero__copy">
            <div className="saved-hero__icon" aria-hidden="true">
              <BookmarkIcon />
            </div>
            <div className="saved-hero__text">
              <h1 id="saved-title">Your Saved Picks</h1>
              <p>
                Keep the farm-fresh products you love close at hand.
                <br className="saved-hero__desktop-break" /> Come back anytime
                when you're ready to shop.
              </p>
              <div className="saved-hero__count">
                <strong>
                  {bookmarkedIds.length + bookmarkedProduceIds.length}
                </strong>
                <span>saved items</span>
              </div>
            </div>
          </div>
          <div className="saved-hero__art" aria-hidden="true">
            <img src={bookmarkimage} alt="" />
          </div>
        </div>
      </section>

      <section
        className="saved-toolbar"
        aria-label="Filter and export saved items"
      >
        <div className="saved-toolbar__inner">
          <div
            className="saved-type-filters"
            role="group"
            aria-label="Saved content type"
          >
            {["All", "Markets", "Produce"].map((type) => (
              <button
                className={`saved-category${activeType === type ? " is-active" : ""}`}
                type="button"
                key={type}
                aria-pressed={activeType === type}
                onClick={() => setActiveType(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <div
            className="saved-categories"
            role="group"
            aria-label="Market category"
          >
            {["All", "Fruits", "Vegetables", "Grains", "Other"].map(
              (category) => (
                <button
                  className={`saved-category${activeCategory === category ? " is-active" : ""}`}
                  type="button"
                  key={category}
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ),
            )}
          </div>
          <label className="saved-sort">
            Sort by
            <select
              aria-label="Sort saved markets"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="recent">Recently Added</option>
              <option value="nextOpen">Next open</option>
              <option value="az">Name: A to Z</option>
            </select>
          </label>
          <button
            className="saved-export"
            type="button"
            onClick={exportBookmarks}
            disabled={!allItems.length}
          >
            <FiDownload aria-hidden="true" /> Export list
          </button>
        </div>
      </section>

      <section
        className="saved-markets"
        aria-label="Saved market and produce recommendations"
      >
        <div className="md-grid">
          {pageItems.map((item) => {
            const isMarket = item.contentType === "market";
            const isBookmarked = isMarket
              ? bookmarkedIds.includes(item.id)
              : bookmarkedProduceIds.includes(item.id);
            const noteKey = `${item.contentType}:${item.id}`;
            const shareText = `${item.name}${isMarket ? `, ${item.location}` : ` (${item.category})`} - saved with FreshFind`;
            const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

            return (
              <article className="md-card saved-content-card" key={noteKey}>
                <div className="md-card-image">
                  <span className="md-badge">
                    {isMarket ? "MARKET" : item.category.toUpperCase()}
                  </span>
                  <img
                    src={isMarket ? item.image : item.picture}
                    alt={item.name}
                    loading="lazy"
                  />
                  <button
                    className={`md-bookmark${isBookmarked ? " is-bookmarked" : ""}`}
                    type="button"
                    aria-label={`${isBookmarked ? "Remove" : "Save"} ${item.name} ${isBookmarked ? "from" : "to"} bookmarks`}
                    aria-pressed={isBookmarked}
                    onClick={() =>
                      isMarket
                        ? toggleBookmark(item)
                        : toggleProduceBookmark(item)
                    }
                  >
                    <BookmarkIcon />
                  </button>
                </div>
                <div className="md-card-body">
                  <div className="md-card-top">
                    <h2>{item.name}</h2>
                  </div>
                  <p className="md-card-location">
                    {isMarket
                      ? item.location
                      : `${item.category} · ${item.season} season`}
                  </p>
                  {isMarket ? (
                    <div className="md-card-meta">
                      <div>
                        <span className="md-meta-label">When to go</span>
                        <span className="md-meta-value">
                          {formatDayRange(item.days)} · {item.hours}
                        </span>
                      </div>
                      <div>
                        <span className="md-meta-label">Good for</span>
                        <span className="md-meta-value">
                          {getDerivedCategories(item).slice(0, 2).join(", ") ||
                            (item.availableProduce || [])
                              .slice(0, 2)
                              .join(", ")}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="md-card-tip">{item.description}</p>
                      <p className="md-card-tip">
                        <strong>Markets:</strong>{" "}
                        {(item.markets || []).join(", ")}
                      </p>
                    </>
                  )}
                  <label className="saved-note">
                    Personal note (this session)
                    <textarea
                      value={notes[noteKey] || ""}
                      onChange={(event) =>
                        updateNote(
                          item.contentType,
                          item.id,
                          event.target.value,
                        )
                      }
                      placeholder="Add a reminder or recommendation"
                    />
                  </label>
                  <div className="saved-card-actions">
                    <Link
                      to={
                        isMarket
                          ? `${MARKET_DETAIL_BASE_PATH}/${item.id}`
                          : "/produce"
                      }
                      className="md-view-link"
                    >
                      {isMarket ? "View market" : "View produce guide"}{" "}
                      <span aria-hidden="true">↗</span>
                    </Link>
                    <a
                      href={shareUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Share ${item.name} on WhatsApp`}
                    >
                      <FaWhatsapp /> WhatsApp
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Share ${item.name} on Facebook`}
                    >
                      <FaFacebookF /> Facebook
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
          {pageItems.length === 0 && (
            <div className="saved-empty">
              <h2>
                {allItems.length
                  ? "No saved items match these filters"
                  : "No bookmarks yet"}
              </h2>
              <p>
                Bookmark markets or produce from their guide cards to collect
                recommendations.
              </p>
              <div className="saved-empty-links">
                <Link to="/markets" className="saved-empty__link">
                  Browse markets
                </Link>
                <Link to="/produce" className="saved-empty__link">
                  Browse produce
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
