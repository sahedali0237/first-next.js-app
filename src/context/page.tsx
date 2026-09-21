"use client";

import { tsBook } from "@/types/type";
import React, { createContext, useState } from "react";

type BooksContextType = {
  readBooks: tsBook[];
  setReadBooks: React.Dispatch<React.SetStateAction<tsBook[]>>;
  wishlistBooks: tsBook[];
  setWishlistBooks: React.Dispatch<React.SetStateAction<tsBook[]>>;
};

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined,
);

export const BooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [readBooks, setReadBooks] = useState<tsBook[]>([]);
  const [wishlistBooks, setWishlistBooks] = useState<tsBook[]>([]);

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
