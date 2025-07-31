import React from "react";

export default function Terms() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 py-10">
      <h1 className="text-4xl font-bold text-zephyraBlue mb-8 text-center tracking-tight drop-shadow">
        Feature Under Development
      </h1>
      <div className="w-full max-w-2xl flex justify-center mb-10 ">
        {/* Use connect-bg.png instead of SVG */}
        <img
          src="/connect-bg.png"
          alt="Connect Background"
          className="w-full h-[340px] object-cover rounded-xl shadow-lg"
        />
      </div>
      <div className="w-full max-w-2xl mt-8 text-center text-gray-800 text-xl font-medium">
        <span className="inline-block animate-bounce mr-2 text-teal-400">🚀</span>
        Something exciting is brewing behind the scenes...<br />
        <span className="text-indigo-400 font-semibold">Stay curious</span> — new adventures are almost here.<br/>
        <span className="text-indigo-600 font-semibold">Check back soon for the big reveal!</span>
      </div>
    </div>
  );
}