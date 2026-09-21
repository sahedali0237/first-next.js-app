"use client";

import { tsBook } from "@/types/type";
import React, { createContext, useEffect, useState } from "react";

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
  const [readBooks, setReadBooks] = useState<tsBook[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const savedReadBooks = window.localStorage.getItem("readBooks");
      const parsedReadBooks = savedReadBooks ? JSON.parse(savedReadBooks) : [];

      return Array.isArray(parsedReadBooks) ? parsedReadBooks : [];
    } catch (error) {
      console.error("Failed to load read books:", error);
      return [];
    }
  });

  const [wishlistBooks, setWishlistBooks] = useState<tsBook[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const savedWishlistBooks = window.localStorage.getItem("wishlistBooks");
      const parsedWishlistBooks = savedWishlistBooks
        ? JSON.parse(savedWishlistBooks)
        : [];

      return Array.isArray(parsedWishlistBooks) ? parsedWishlistBooks : [];
    } catch (error) {
      console.error("Failed to load wishlist books:", error);
      return [];
    }
  });

  // ====================================================
  // SAVE READ BOOKS
  //
  // Whenever readBooks changes, save it.
  // ====================================================

  useEffect(() => {
    try {
      localStorage.setItem("readBooks", JSON.stringify(readBooks));
    } catch (error) {
      console.error("Failed to save read books:", error);
    }
  }, [readBooks]);

  // ====================================================
  // SAVE WISHLIST BOOKS
  // ====================================================

  useEffect(() => {
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
