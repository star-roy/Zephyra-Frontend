import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, RefreshCw } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [autoRedirect, setAutoRedirect] = useState(true);

  useEffect(() => {
    if (autoRedirect && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (autoRedirect && countdown === 0) {
      navigate('/');
    }
  }, [countdown, autoRedirect, navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleStopAutoRedirect = () => {
    setAutoRedirect(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Icon and Number */}
        <div className="mb-8" data-aos="fade-up">
          <div className="relative inline-block">
            <div className="text-8xl md:text-9xl font-bold text-blue-500 opacity-20 select-none">
              404
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          
          <p className="text-gray-500">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Auto Redirect Counter */}
          {autoRedirect && (
            <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mb-6" data-aos="fade-in" data-aos-delay="400">
              <div className="flex items-center justify-center space-x-2 text-blue-700">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>
                  Redirecting to home in <strong>{countdown}</strong> seconds
                </span>
              </div>
              <button
                onClick={handleStopAutoRedirect}
                className="text-blue-600 hover:text-blue-800 text-sm mt-2 underline"
              >
                Cancel auto-redirect
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8" data-aos="fade-up" data-aos-delay="600">
            <button
              onClick={handleGoHome}
              className="shine-sweep flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span>Go Back Home</span>
            </button>

            <button
              onClick={handleGoBack}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 border border-gray-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>

            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-600 px-6 py-3 rounded-lg font-medium transition-colors duration-200 border border-gray-300"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Refresh Page</span>
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200" data-aos="fade-up" data-aos-delay="800">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Try these instead:
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/explore')}
                className="text-blue-500 hover:text-blue-600 hover:underline font-medium"
              >
                Explore Quests
              </button>
              <button
                onClick={() => navigate('/my-quest')}
                className="text-blue-500 hover:text-blue-600 hover:underline font-medium"
              >
                My Quests
              </button>
              <button
                onClick={() => navigate('/compass')}
                className="text-blue-500 hover:text-blue-600 hover:underline font-medium"
              >
                Compass
              </button>
              <button
                onClick={() => navigate('/help')}
                className="text-blue-500 hover:text-blue-600 hover:underline font-medium"
              >
                Help Center
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-sm text-gray-400" data-aos="fade-up" data-aos-delay="1000">
            <p>If you believe this is an error, please contact our support team.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
