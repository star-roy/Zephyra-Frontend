import React, { useState } from "react";

const FEEDBACK_CATEGORIES = [
  "General Feedback",
  "Feature Request",
  "Bug Report",
  "User Experience",
  "Other",
];

export default function ProvideFeedback() {
  
  const [category, setCategory] = useState("General Feedback");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comments, setComments] = useState("");

  const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
    <svg
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill={filled ? "#fbe600" : "none"}
      stroke="#111"
      strokeWidth="2"
      style={{ cursor: "pointer", transition: "fill 0.2s" }}
    >
      <polygon
        points="18,3 22,14 34,14 24,22 28,33 18,26 8,33 12,22 2,14 14,14"
      />
    </svg>
  );

  return (
    <div className="bg-[#FAFBFC] min-h-screen flex flex-col items-center py-16 px-4">
      <form className="w-full max-w-xl bg-white rounded-2xl shadow border border-gray-200 mx-auto p-8">
        <h1 className="text-2xl font-extrabold text-midnightIndigo mb-2">Provide Feedback</h1>
        <p className="mb-4 text-gray-600">
          We'd love to hear from you! Please share your thoughts, suggestions, or any issues you've encountered.
        </p>
        <hr className="mb-6" />
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Feedback Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full rounded-lg px-4 py-3 bg-[#F5FAF8] text-gray-800 border border-gray-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
          >
            {FEEDBACK_CATEGORIES.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">How would you rate your experience?</label>
          <div className="flex gap-3 mt-2">
            {[1, 2, 3, 4, 5].map(num => (
              <Star
                key={num}
                filled={hover ? num <= hover : num <= rating}
                onClick={() => setRating(num)}
                onMouseEnter={() => setHover(num)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>
        </div>
        <div className="mb-8">
          <label className="block font-medium text-gray-700 mb-2">Comments or Suggestions</label>
          <textarea
            rows={4}
            placeholder="Tell us more..."
            value={comments}
            onChange={e => setComments(e.target.value)}
            className="w-full rounded-lg px-4 py-3 bg-[#F5FAF8] text-gray-800 border border-gray-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 resize-none"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="shine-sweep px-8 py-3 rounded-full bg-blue-500 text-white font-bold text-lg shadow hover:bg-blue-600 transition"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}