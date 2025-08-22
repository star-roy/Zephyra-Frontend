import React from "react";

function XPProgressBar({ currentXP, levelXP, level }) {
  const progressPercent = Math.min((currentXP / levelXP) * 100, 100);

  return (
    <div className="flex items-center space-x-3">
      <div className="text-sm font-bold text-blue-500 bg-blue-200/70 px-2 py-1 rounded-md shadow-sm whitespace-nowrap">
        Lv. {level}
      </div>

      <div className="flex flex-col justify-center">
        <span className="text-xs font-semibold text-[#2C3E50] leading-none mb-1 ">
          XP: {currentXP} / {levelXP}
        </span>
        <div className="w-32 h-2 bg-blue-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default XPProgressBar;
