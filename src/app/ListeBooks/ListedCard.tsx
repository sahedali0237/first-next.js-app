import React from "react";
import Image from "next/image";
import Link from "next/link";
import { tsBook } from "@/types/type";

interface ListedCardProps {
  book: tsBook;
}

const ListedCard = ({ book }: ListedCardProps) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl border border-base-300 p-4 gap-6 items-center">
      {/* Book Image */}
      <figure className="relative w-full lg:w-48 h-48 bg-base-200 rounded-xl overflow-hidden shrink-0">
        <Image
          src={book.image}
          alt={book.bookName}
          fill
          sizes="(max-width: 1024px) 100vw, 192px"
          className="object-cover"
        />
      </figure>

      {/* Book Details */}
      <div className="card-body p-0 grow">
        <h2 className="card-title text-2xl font-bold">{book.bookName}</h2>

        <p className="text-gray-500 font-medium">By: {book.author}</p>

        <div className="flex flex-wrap gap-4 mt-2 items-center text-sm">
          <div className="badge badge-primary badge-outline p-3 font-semibold">
            Category: {book.category}
          </div>

          <div className="badge badge-secondary badge-outline p-3 font-semibold">
            Rating: {book.rating}
          </div>

          <div className="text-gray-500 font-medium">
            Pages: {book.totalPages}
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            href={`/Books/${book.bookId}`}
            className="btn btn-primary rounded-full px-6"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListedCard;
