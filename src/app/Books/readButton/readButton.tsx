"use client";

import { tsBook } from "@/types/type";
import React, { useContext } from "react";
import { BooksContext } from "../../../context/page";
import { toast } from "react-toastify";

const ReadButton = ({ book }: { book: tsBook }) => {
  const booksContext = useContext(BooksContext);

  if (!booksContext) {
    return null;
  }

  const { readBooks, setReadBooks } = booksContext;

  const handleReadBook = () => {
    const bookTitle = book.bookName ?? "Untitled";

    // Don't add the same book twice
    if (readBooks.some((readBook) => readBook.bookId === book.bookId)) {
      toast.info(`${bookTitle} is already in your read list!`);
      return;
    }

    setReadBooks((prevBooks) => [...prevBooks, book]);

    toast.success(`${bookTitle} added to read list!`);
  };

  return (
    <button
      onClick={handleReadBook}
      className="w-full sm:w-fit px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
    >
      Read
    </button>
  );
};

export default ReadButton;
