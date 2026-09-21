import Image from "next/image";
import React from "react";
import type { tsBook } from "@/types/type";
import Link from "next/link";

const getData = async (): Promise<tsBook[]> => {
  const rsc = await fetch("http://localhost:3000/booksData.json");
  const data: tsBook[] = await rsc.json();

  return data;
};

const Page = async () => {
  const loadData = await getData();

  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-8">
        View Popular Books
      </h1>
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {loadData.slice(0, 6).map((book) => (
          <div
            key={book.bookId}
            className="card overflow-hidden border border-base-200 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <figure className="h-72 bg-base-200 p-6">
              <Image
                src={book.image}
                alt={book.bookName}
                width={200}
                height={250}
                className="h-full w-auto object-contain drop-shadow-lg"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{book.bookName}</h2>

              <p className="text-sm text-base-content/60">By {book.author}</p>

              <div className="mt-2 flex items-center justify-between">
                <span className="badge badge-primary">{book.category}</span>

                <span className="font-semibold">⭐ {book.rating}</span>
              </div>

              <Link href={`/Books/${book.bookId}`}>
                <button className="btn btn-primary mt-4">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
