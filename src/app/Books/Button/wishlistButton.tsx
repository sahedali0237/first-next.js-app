"use client";
import { tsBook } from "@/types/type";
import React, { useContext } from "react";
import { BooksContext } from "../../../context/page";

const WishlistBooks = ({ book }: { book: tsBook }) => {
  const booksContext = useContext(BooksContext);

  // We removed the local useState here!

  if (!booksContext) {
    return null; // If the button is invisible, this is why!
  }

  const handelReadBook = () => {
    const bookTitle = (book as { bookName?: string }).bookName ?? "Untitled";
    booksContext.setWishlistBooks((prevBooks) => [...prevBooks, bookTitle]);

    console.log("Wishlist button has been clicked", book);
    alert(`${book.bookName}Added to Wishlist list!`);
  };

  return (
    <button
      onClick={handelReadBook}
      className="w-full sm:w-fit px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
    >
      Wishlist
    </button>
  );
};

export default WishlistBooks;
