"use client";

import React, { useContext } from "react";
import { BooksContext } from "@/context/page";
import { tsBook } from "@/types/type";

const ListedBooks = () => {
  const booksContext = useContext(BooksContext);

  if (!booksContext) {
    return <div>Loading...</div>;
  }

  const { readBooks } = booksContext;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Listed Books Page</h1>

      {readBooks.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {readBooks.map((book) => (
            <li key={book} className="text-lg text-gray-700">
              {book}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListedBooks;
