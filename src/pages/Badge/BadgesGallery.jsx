import React from 'react';
import { badges } from './badges';

// Color theme mapping for outer glow (not the shine effect)
const badgeEffects = {
  Silver: "shadow-[0_0_24px_8px_rgba(192,192,192,0.5)] ring-2 ring-gray-300",
  Gold: "shadow-[0_0_32px_10px_rgba(255,215,0,0.7)] ring-2 ring-yellow-300",
  'Sapphire Blue': "shadow-[0_0_36px_10px_rgba(30,144,255,0.6)] ring-2 ring-blue-400",
  'Royal Purple': "shadow-[0_0_36px_10px_rgba(128,0,128,0.6)] ring-2 ring-purple-400",
  'Red & Gold Gradient': "shadow-[0_0_44px_12px_rgba(255,80,0,0.7)] ring-2 ring-yellow-300 ring-offset-2",
};

// CSS for continuous automatic shine sweep (not on hover)
const style = `
.badge-shine {
  position: relative;
  overflow: hidden;
}
.badge-shine::before {
  content: "";
  position: absolute;
  top: 0; left: -60%;
  width: 220%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.7) 50%,
    rgba(255,255,255,0) 100%
  );
  opacity: 0.5;
  transform: skewX(-20deg);
  pointer-events: none;
  z-index: 2;
  animation: badgeShineSweep 2.8s cubic-bezier(.5,.8,.5,1) infinite;
}
@keyframes badgeShineSweep {
  from {
    left: -60%;
    opacity: 0.4;
  }
  20% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  to {
    left: 100%;
    opacity: 0.4;
  }
}
`;

function groupByCategory(badgeArr) {
  return badgeArr.reduce((acc, badge) => {
    acc[badge.category] = acc[badge.category] || [];
    acc[badge.category].push(badge);
    return acc;
  }, {});
}

export default function BadgesGallery() {
  const grouped = groupByCategory(badges);

  return (
    <div className="min-h-screen bg-black py-10 flex flex-col items-center">
      {/* Custom style for the automatic shine effect */}
      <style>{style}</style>
      <h1 className="text-4xl font-bold text-center text-white mb-8">Badges Gallery</h1>
      <div className="flex flex-col gap-14 w-full max-w-7xl items-center">
        {Object.entries(grouped).map(([category, catBadges]) => (
          <div key={category} className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-5 text-center">{category}</h2>
            <div className="w-full flex justify-center">
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 place-items-center">
                {catBadges.map(badge => (
                  <div
                    key={badge.badgeId}
                    className="flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105"
                    style={{ minWidth: 180, minHeight: 180, maxWidth: 200, maxHeight: 200 }}
                  >
                    <div
                      className={`badge-shine flex items-center justify-center rounded-full relative ${badgeEffects[badge.colorTheme] || ""}`}
                      style={{
                        width: '104px',
                        height: '104px',
                        marginBottom: '0.75rem',
                        transition: 'box-shadow 0.4s',
                      }}
                    >
                      <img
                        src={badge.image}
                        alt={badge.name}
                        className="w-24 h-24 object-contain drop-shadow-xl"
                        draggable="false"
                        style={{ borderRadius: '50%' }}
                      />
                    </div>
                    <span className="text-white font-semibold text-lg text-center mb-1 drop-shadow">{badge.name}</span>
                    <span className="mt-2 text-xs font-bold text-gray-400 text-center">{badge.tier}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}