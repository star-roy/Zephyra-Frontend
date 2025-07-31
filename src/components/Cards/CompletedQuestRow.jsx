import React from "react";
import { Link } from "react-router-dom";

export default function CompletedQuestRow({ id, image, title, date }) {
  return (
    <Link
      to={`/quest-overview/${id}`}
      className="block"
      tabIndex={0}
      aria-label={`View details for ${title}`}
    >
      <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 p-4 px-5 gap-4 mb-3 min-h-[70px] w-full hover:shadow-md transition-shadow cursor-pointer">
        <img
          src={image}
          alt={title}
          className="w-12 h-12 rounded-lg object-cover bg-gray-50"
        />
        <div className="flex-1">
          <div className="font-bold text-gray-900 text-base mb-1">{title}</div>
          <div className="text-gray-600 text-sm">{date}</div>
        </div>
        <span className="bg-slate-50 text-stormyGrey font-semibold rounded-lg text-xs px-5 py-1.5 border border-gray-100">
          Completed
        </span>
      </div>
    </Link>
  );
}