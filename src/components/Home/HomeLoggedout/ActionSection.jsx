import React, { useState, useRef } from "react";

function ActionSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };
  return (
    <section className="w-full px-4 sm:px-6 lg:px-20 py-16 text-center bg-white">
      <h2 className="text-2xl sm:text-4xl font-bold text-[#2C3E50] mb-2">
         Where Zephyra Comes Alive
      </h2>
      <p className="text-blue-600 max-w-2xl mx-auto mb-12 text-base sm:text-lg md:text-xl font-medium tracking-wide">
        One tap. Endless adventures. Discover quests, track progress, earn rewards and connect with the Zephyra community.
      </p>

      <div className="w-full max-w-4xl mx-auto aspect-video bg-white rounded-3xl border-4 border-blue-100 overflow-hidden relative">
        <video
          ref={videoRef}
          className="w-full h-full rounded-3xl object-cover"
          muted
          playsInline
          onEnded={handleVideoEnd}
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            <div className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-105">
              <svg 
                className="w-8 h-8 text-blue-500" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}
        
        {isPlaying && (
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={togglePlay}
          />
        )}
      </div>
    </section>
  );
}

export default ActionSection;
