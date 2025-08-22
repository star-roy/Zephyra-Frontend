import React from 'react';

const SimpleLoader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default SimpleLoader;
