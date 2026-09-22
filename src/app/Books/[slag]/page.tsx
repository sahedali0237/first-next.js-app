import React from "react";
import { tsBook } from "@/types/type"; // Your custom type file
import Image from "next/image";
import ReadButton from "../readButton/readButton";
import WishlistBooks from "../readButton/wishlistButton";

interface bookDetailsPage {
  params: Promise<{
    slag: string;
  }>;
}

const detailsPage = async ({ params }: bookDetailsPage) => {
  const { slag } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/booksData.json`,
    { cache: "no-store" },
  );
  const data: tsBook[] = await res.json();

  const book = data.find((item) => item.bookId.toString() === slag);

  if (!book) {
    return <div>Book not found!</div>;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Book Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm bg-gray-100 rounded-2xl p-6">
            <Image
              src={book.image}
              alt={book.bookName}
              width={400}
              height={600}
              className="w-full h-125 object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
            {book.category}
          </span>

          <h1 className="text-4xl font-bold mt-2">{book.bookName}</h1>

          <p className="text-lg text-gray-600 mt-3">By {book.author}</p>

          <div className="flex items-center gap-3 mt-5">
            <span className="text-yellow-500 text-xl">★</span>

            <span className="font-semibold">{book.rating}</span>

            <span className="text-gray-500">({book.totalPages} pages)</span>
          </div>

          <p className="text-gray-700 leading-7 mt-6">{book.review}</p>

          <div className="border-t border-gray-200 mt-8 pt-6 space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Publisher</span>

              <span className="text-gray-600">{book.publisher}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Published</span>

              <span className="text-gray-600">{book.yearOfPublishing}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Pages</span>

              <span className="text-gray-600">{book.totalPages}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <ReadButton book={book} />

            <WishlistBooks book={book} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default detailsPage;
