"use client";

import { useState } from "react";
import { useBookmarks } from "@/contexts/BookmarkContext";

export default function BookmarkList() {
  const { bookmarks, isLoading, deleteBookmark } = useBookmarks();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this bookmark?")) {
      setDeletingId(id);
      try {
        await deleteBookmark(id);
      } catch (err) {
        console.error("Failed to delete bookmark:", err);
        alert("Failed to delete bookmark");
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500 text-center">Loading bookmarks...</p>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500 text-center">
          No bookmarks yet. Add one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold mb-4">Your Bookmarks</h2>
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-start justify-between"
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 break-words">
              {bookmark.title}
            </h3>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm truncate block"
            >
              {bookmark.url}
            </a>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(bookmark.created_at).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => handleDelete(bookmark.id)}
            disabled={deletingId === bookmark.id}
            className="ml-4 px-3 py-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50 transition-colors flex-shrink-0"
          >
            {deletingId === bookmark.id ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}
