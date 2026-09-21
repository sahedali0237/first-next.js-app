"use client";

import React, { useContext } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BooksContext } from "@/context/page";

// Define the colors for each bar (matching the style in the screenshot)
const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF0000",
  "#FFC0CB",
  "#333333",
  "#8A2BE2",
];

// Draw the custom curved triangle path
const getPath = (x: number, y: number, width: number, height: number): string => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

interface TriangleBarProps {
  fill?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

// Custom shape component for the bar
const TriangleBar = (props: TriangleBarProps) => {
  const { fill, x = 0, y = 0, width = 0, height = 0 } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

interface CustomLabelProps {
  x?: number;
  y?: number;
  value?: number | string;
  width?: number;
  index?: number;
}

// Custom label to position the text above the peak and match the bar's color
const CustomLabel = (props: CustomLabelProps) => {
  const { x = 0, y = 0, value = 0, width = 0, index = 0 } = props;
  const color = colors[index % colors.length];

  return (
    <text
      x={x + width / 2}
      y={y - 12}
      fill={color}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={14}
      fontWeight={500}
    >
      {value}
    </text>
  );
};

const PagesToRead = () => {
  const booksContext = useContext(BooksContext);

  if (!booksContext) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const { readBooks } = booksContext;

  // Chart data comes directly from readBooks
  const chartData = readBooks.map((book) => ({
    id: book.bookId,
    name: book.bookName,
    pages: Number(book.totalPages),
    rating: Number(book.rating),
  }));

  // Total pages
  const totalPages = readBooks.reduce(
    (total, book) => total + Number(book.totalPages),
    0,
  );

  // Average rating
  const averageRating =
    readBooks.length > 0
      ? readBooks.reduce((total, book) => total + Number(book.rating), 0) /
        readBooks.length
      : 0;

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">Pages to Read</h1>

        <p className="mb-8 text-base-content/60">
          Your reading statistics based on books you have marked as read.
        </p>

        {/* No read books */}
        {readBooks.length === 0 ? (
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <p className="rounded-xl border bg-base-100 p-6 shadow-sm">
              No data available
            </p>
          </div>
        ) : (
          <>
            {/* Statistics */}
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border bg-base-100 p-6 shadow-sm">
                <p className="text-sm text-base-content/60">Books Read</p>
                <h2 className="mt-2 text-3xl font-bold">{readBooks.length}</h2>
              </div>

              <div className="rounded-xl border bg-base-100 p-6 shadow-sm">
                <p className="text-sm text-base-content/60">Total Pages</p>
                <h2 className="mt-2 text-3xl font-bold">{totalPages}</h2>
              </div>

              <div className="rounded-xl border bg-base-100 p-6 shadow-sm">
                <p className="text-sm text-base-content/60">Average Rating</p>
                <h2 className="mt-2 text-3xl font-bold">
                  {averageRating.toFixed(1)}
                </h2>
              </div>
            </div>

            {/* Chart */}
            <div className="rounded-xl border bg-base-100 p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold">Pages of Read Books</h2>

              <div className="h-[450px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 30,
                      right: 20,
                      left: 10,
                      bottom: 80,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={true} />

                    <XAxis
                      dataKey="name"
                      angle={-35}
                      textAnchor="end"
                      interval={0}
                      height={100}
                      tick={{ fill: "currentColor", opacity: 0.8 }}
                    />

                    <YAxis
                      label={{
                        value: "Pages",
                        angle: -90,
                        position: "insideLeft",
                        fill: "currentColor",
                        opacity: 0.8,
                      }}
                      tick={{ fill: "currentColor", opacity: 0.8 }}
                    />

                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        borderRadius: "8px",
                        backgroundColor:
                          "var(--fallback-b1,oklch(var(--b1)/1))",
                      }}
                    />

                    {/* Utilizing the custom Triangle shape */}
                    <Bar dataKey="pages" shape={<TriangleBar />}>
                      {/* Mapping through colors to give each bar a unique look */}
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}

                      {/* Replacing the default LabelList with our CustomLabel */}
                      <LabelList dataKey="pages" content={<CustomLabel />} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Read Books List */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold">Read Books</h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {readBooks.map((book) => (
                  <div
                    key={book.bookId}
                    className="rounded-xl border bg-base-100 p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold">{book.bookName}</h3>
                        <p className="text-sm text-base-content/60">
                          by {book.author}
                        </p>
                      </div>

                      <span className="badge badge-primary">
                        ⭐ {book.rating}
                      </span>
                    </div>

                    <p className="mt-3 text-sm">{book.totalPages} pages</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PagesToRead;
