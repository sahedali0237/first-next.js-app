"use client";

import React, { useContext } from "react";
import { BooksContext } from "@/context/page";
import ListedCard from "./ListedCard";

const ListedBooks = () => {
  const booksContext = useContext(BooksContext);

  if (!booksContext) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const { readBooks, wishlistBooks } = booksContext;

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Listed Books</h1>

      <div className="tabs tabs-box w-full">
        {/* READ BOOKS */}
        <input
          type="radio"
          name="my_tabs_6"
          className="tab font-semibold text-lg"
          aria-label={`Read Books(${readBooks.length})`}
          defaultChecked
        />

        <div className="tab-content bg-base-100 border-base-300 p-6 rounded-xl mt-4">
          {readBooks.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <h3 className="text-xl font-semibold">No Read Books Yet</h3>
              <p>Books you mark as read will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {readBooks.map((book, index) => (
                <ListedCard key={`read-book-${index}`} book={book} />
              ))}
            </div>
          )}
        </div>

        {/* WISHLIST */}
        <input
          type="radio"
          name="my_tabs_6"
          className="tab font-semibold text-lg"
          aria-label={`Wishlist(${wishlistBooks.length})`}
        />

        <div className="tab-content bg-base-100 border-base-300 p-6 rounded-xl mt-4">
          {wishlistBooks.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <h3 className="text-xl font-semibold">Wishlist is Empty</h3>
              <p>Books you want to read later will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {wishlistBooks.map((book, index) => (
                <ListedCard key={`wishlist-book-${index}`} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListedBooks;
