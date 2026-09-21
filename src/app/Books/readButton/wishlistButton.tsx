"use client";
import { tsBook } from "@/types/type";
import React, { useContext } from "react";
import { BooksContext } from "../../../context/page";
import { toast } from "react-toastify";

const WishlistBooks = ({ book }: { book: tsBook }) => {
  const booksContext = useContext(BooksContext);

  // We removed the local useState here!

  if (!booksContext) {
    return null; // If the button is invisible, this is why!
  }

  const handelReadBook = () => {
    booksContext.setWishlistBooks((prevBooks) => [...prevBooks, book]);

    console.log("Wishlist button has been clicked", book);
    toast.success(`${book.bookName ?? "Untitled"} added to Wishlist list!`);
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
