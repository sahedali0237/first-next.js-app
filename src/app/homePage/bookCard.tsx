import React from "react";
import { tsBook } from "@/types/type";
import  Link  from "next/link";

interface bookCardProps {
  book: tsBook;
}

const bookCard = ({ book }: bookCardProps) => {
  return (
    <div className="card-body">
      <div className="flex items-center justify-between gap-3">
        <span className="badge badge-primary badge-outline">
          {book.category}
        </span>

        <span className="flex items-center gap-1 text-sm font-semibold">
          ⭐ {book.rating}
        </span>
      </div>

      <h2 className="card-title mt-2 line-clamp-1 text-xl">{book.bookName}</h2>

      <p className="text-sm text-base-content/60">by {book.author}</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {book.tags.map((tag) => (
          <span key={tag} className="text-xs font-medium text-base-content/50">
            #{tag}
          </span>
        ))}
      </div>

      <div className="card-actions mt-4">
        <Link href={`/Books/${book.bookId}`}>
          <button className="btn btn-primary mt-4">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default bookCard;
