import { useEffect, useState } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";
import { BookmarkContext } from "./bookmarkStore";

const STORAGE_KEY = "freshfind-bookmarked-markets";
const PRODUCE_STORAGE_KEY = "freshfind-bookmarked-produce";

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

function readBookmarkedProduceIds() {
  try {
    const savedIds = JSON.parse(
      localStorage.getItem(PRODUCE_STORAGE_KEY) || "[]",
    );
    return Array.isArray(savedIds) ? savedIds : [];
  } catch {
    return [];
  }
}

export function BookmarkProvider({ children }) {
  const [bookmarkedIds, setBookmarkedIds] = useState(readBookmarkedIds);
  const [bookmarkedProduceIds, setBookmarkedProduceIds] = useState(
    readBookmarkedProduceIds,
  );
  const [notes, setNotes] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarkedIds));
    } catch {
      // Keep bookmarks usable for this session when browser storage is unavailable.
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(
        PRODUCE_STORAGE_KEY,
        JSON.stringify(bookmarkedProduceIds),
      );
    } catch {
      // Keep produce bookmarks available for this session if storage is unavailable.
    }
  }, [bookmarkedProduceIds]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timeout);
  }, [toast]);

  const toggleBookmark = (market) => {
    const isSaved = bookmarkedIds.includes(market.id);
    setBookmarkedIds((currentIds) =>
      isSaved
        ? currentIds.filter((id) => id !== market.id)
        : [...currentIds, market.id],
    );
    setToast({
      message: `${market.name} ${isSaved ? "removed from" : "added to"} bookmarks`,
    });
  };

  const toggleProduceBookmark = (produce) => {
    const isSaved = bookmarkedProduceIds.includes(produce.id);
    setBookmarkedProduceIds((currentIds) =>
      isSaved
        ? currentIds.filter((id) => id !== produce.id)
        : [...currentIds, produce.id],
    );
    setToast({
      message: `${produce.name} ${isSaved ? "removed from" : "added to"} bookmarks`,
    });
  };

  const updateNote = (contentType, contentId, value) => {
    const noteKey = `${contentType}:${contentId}`;
    setNotes((currentNotes) => ({ ...currentNotes, [noteKey]: value }));
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedIds,
        bookmarkedProduceIds,
        toggleBookmark,
        toggleProduceBookmark,
        notes,
        updateNote,
      }}
    >
      {children}
      {toast && (
        <div className="bookmark-toast" role="status" aria-live="polite">
          <FiCheckCircle aria-hidden="true" />
          <span>{toast.message}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setToast(null)}
          >
            <FiX aria-hidden="true" />
          </button>
        </div>
      )}
    </BookmarkContext.Provider>
  );
}
