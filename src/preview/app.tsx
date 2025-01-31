import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import WakeMe from "../wake-me";

import "./index.css";

const App = () => {
  const [snapCount, setSnapCount] = useState(0);
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [isSnapped, setIsSnapped] = useState(false);

  const handleSnap = () => {
    setSnapCount((prev) => prev + 1);
    setIsSnapped(true);
    setTimeout(() => setIsSnapped(false), 500);
  };

  const handleNoise = (score: number) => {
    setNoiseLevel(score);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Wake Me Test
          </h1>
          <p className="text-gray-600">
            Snap your fingers or clap to test the detection!
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Snap Counter
              </h2>
              <p className="text-gray-600">Total snaps detected</p>
            </div>
            <div className="text-5xl font-bold text-purple-600">
              {snapCount}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-purple-500 transition-all duration-300"
                style={{ width: `${noiseLevel * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Current noise level: {(noiseLevel * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <div
          className={`
          transition-all duration-300 transform
          bg-white rounded-xl shadow-lg p-8
          ${isSnapped ? "scale-105 bg-purple-50" : ""}
        `}
        >
          <div className="text-center">
            <div
              className={`
              inline-block p-4 rounded-full mb-4
              ${isSnapped ? "bg-purple-500" : "bg-gray-200"}
              transition-colors duration-300
            `}
            >
              <svg
                className={`w-8 h-8 ${
                  isSnapped ? "text-white" : "text-gray-500"
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p
              className={`
              font-medium
              ${isSnapped ? "text-purple-600" : "text-gray-600"}
              transition-colors duration-300
            `}
            >
              {isSnapped ? "Snap Detected!" : "Waiting for snap..."}
            </p>
          </div>
        </div>
      </div>

      <WakeMe onSnap={handleSnap} onNoise={handleNoise} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
