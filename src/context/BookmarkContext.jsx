import { useEffect, useState } from "react";
import { BookmarkContext } from "./bookmarkStore";

const STORAGE_KEY = "freshfind-bookmarked-markets";
function readBookmarkedIds() {
  try {
    const savedIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(savedIds)
      ? savedIds.filter(
          (id) => typeof id === "string" || typeof id === "number",
        )
      : [];
  } catch {
    return [];
  }
}

export function BookmarkProvider({ children }) {
  const [bookmarkedIds, setBookmarkedIds] = useState(readBookmarkedIds);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarkedIds));
    } catch {
      // Keep bookmarks usable for this session when browser storage is unavailable.
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (market) => {
    setBookmarkedIds((currentIds) =>
      currentIds.includes(market.id)
        ? currentIds.filter((id) => id !== market.id)
        : [...currentIds, market.id],
    );
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedIds, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}
