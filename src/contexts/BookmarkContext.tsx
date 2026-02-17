"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "./AuthContext";

export interface Bookmark {
  id: string;
  user_id: string;
  title: string;
  url: string;
  created_at: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  isLoading: boolean;
  addBookmark: (title: string, url: string) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined,
);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const supabase = createClient();

  // Load initial bookmarks and set up real-time listener
  useEffect(() => {
    if (!user) {
      setBookmarks([]);
      return;
    }

    const loadBookmarks = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading bookmarks:", error);
      } else {
        setBookmarks(data as Bookmark[]);
      }
      setIsLoading(false);
    };

    loadBookmarks();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
          } else if (payload.eventType === "DELETE") {
            setBookmarks((prev) =>
              prev.filter((b) => b.id !== (payload.old as Bookmark).id),
            );
          } else if (payload.eventType === "UPDATE") {
            setBookmarks((prev) =>
              prev.map((b) =>
                b.id === (payload.new as Bookmark).id
                  ? (payload.new as Bookmark)
                  : b,
              ),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, supabase]);

  const addBookmark = async (title: string, url: string) => {
    if (!user) throw new Error("User not authenticated");

    const { error } = await supabase.from("bookmarks").insert([
      {
        user_id: user.id,
        title,
        url,
      },
    ]);

    if (error) {
      console.error("Error adding bookmark:", error);
      throw error;
    }
  };

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting bookmark:", error);
      throw error;
    }
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, isLoading, addBookmark, deleteBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
