"use client";

import React from "react";

interface SpinnerProps {
  size?: "small" | "large";
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = "large", text }) => {
  const sizeClasses = size === "small" ? "h-8 w-8" : "h-12 w-12";
  const containerClasses =
    size === "small"
      ? "flex flex-col justify-center items-center py-4"
      : "flex flex-col justify-center items-center h-screen";

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Outer rotating ring */}
        <div
          className={`animate-spin rounded-full border-2 border-transparent bg-gradient-to-r from-green-400 to-emerald-500 ${sizeClasses}`}
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, #10b981 360deg)',
            borderRadius: '50%',
            padding: '2px'
          }}
        >
          <div className="rounded-full bg-white h-full w-full"></div>
        </div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Floating dots around the spinner */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-1 h-1 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute top-1/2 left-0 transform -translate-x-1 -translate-y-1/2 w-1 h-1 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>
      
      {/* Loading text with gradient */}
      {text && (
        <p className="mt-4 text-sm font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">
          {text}
        </p>
      )}
      
      {!text && (
        <p className="mt-4 text-sm font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">
          {size === "small" ? "Loading..." : "Please wait..."}
        </p>
      )}
    </div>
  );
};

export default Spinner;