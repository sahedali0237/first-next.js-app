import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="hero min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-7xl mx-auto gap-12 lg:gap-24 px-6 py-16">
        <Image
          src="/assets/pngwing.png"
          alt="Books"
          width={500}
          height={500}
          className="w-full max-w-sm lg:max-w-md xl:max-w-lg object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] hover:scale-105 hover:-rotate-2 transition-all duration-500 ease-out"
        />

        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:space-y-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-linear-to-r from-white via-blue-100 to-blue-300 drop-shadow-sm">
            Books to freshen up <br className="hidden sm:block" /> your
            bookshelf
          </h1>

          <button className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-blue-900 transition-all duration-300 bg-white rounded-full shadow-[0_8px_30px_rgb(255,255,255,0.15)] hover:bg-blue-50 hover:shadow-[0_8px_30px_rgb(255,255,255,0.35)] hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-400">
            View The List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;