"use client";

import { tsBook } from "@/types/type";
import React, { createContext, useEffect, useRef, useState } from "react";

// ======================================================
// CONTEXT TYPE
// ======================================================

type BooksContextType = {
  readBooks: tsBook[];
  setReadBooks: React.Dispatch<React.SetStateAction<tsBook[]>>;

  wishlistBooks: tsBook[];
  setWishlistBooks: React.Dispatch<React.SetStateAction<tsBook[]>>;
};

// ======================================================
// CONTEXT
// ======================================================

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined,
);

// ======================================================
// PROVIDER
// ======================================================

export const BooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [readBooks, setReadBooks] = useState<tsBook[]>([]);
  const [wishlistBooks, setWishlistBooks] = useState<tsBook[]>([]);

  // Use a ref to track initialization without triggering extra re-renders
  const isLoadedRef = useRef(false);

  // Load from localStorage on initial mount
  useEffect(() => {
    try {
      const savedReadBooks = window.localStorage.getItem("readBooks");
      if (savedReadBooks) {
        const parsed = JSON.parse(savedReadBooks);
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setReadBooks(parsed as tsBook[]);
        }
      }

      const savedWishlistBooks = window.localStorage.getItem("wishlistBooks");
      if (savedWishlistBooks) {
        const parsed = JSON.parse(savedWishlistBooks);
        if (Array.isArray(parsed)) {
          
          setWishlistBooks(parsed as tsBook[]);
        }
      }
    } catch (error) {
      console.error("Failed to load books from localStorage:", error);
    } finally {
      isLoadedRef.current = true;
    }
  }, []);

  // Save read books (only after initial load)
  useEffect(() => {
    if (!isLoadedRef.current) return;
    try {
      localStorage.setItem("readBooks", JSON.stringify(readBooks));
    } catch (error) {
      console.error("Failed to save read books:", error);
    }
  }, [readBooks]);

  // Save wishlist books (only after initial load)
  useEffect(() => {
    if (!isLoadedRef.current) return;
    try {
      localStorage.setItem("wishlistBooks", JSON.stringify(wishlistBooks));
    } catch (error) {
      console.error("Failed to save wishlist books:", error);
    }
  }, [wishlistBooks]);

  // ====================================================
  // CONTEXT VALUE
  // ====================================================

  const shared: BooksContextType = {
    readBooks,
    setReadBooks,

    wishlistBooks,
    setWishlistBooks,
  };

  return (
    <BooksContext.Provider value={shared}>{children}</BooksContext.Provider>
  );
};

export default BooksContext;
