"use client";

import React, { createContext, useState } from "react";

type BooksContextType = {
  readBooks: string[];
  setReadBooks: React.Dispatch<React.SetStateAction<string[]>>;
  wishlistBooks: string[];
  setWishlistBooks: React.Dispatch<React.SetStateAction<string[]>>;
};

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined,
);

export const BooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [readBooks, setReadBooks] = useState<string[]>([]);
  const [wishlistBooks, setWishlistBooks] = useState<string[]>([]);

  const shard: BooksContextType = {
    readBooks,
    setReadBooks,
    wishlistBooks,
    setWishlistBooks,
  };

  return (
    <BooksContext.Provider value={shard}>{children}</BooksContext.Provider>
  );
};

export default BooksContext;
