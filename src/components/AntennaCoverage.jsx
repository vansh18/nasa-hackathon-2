import { useState, useEffect } from "react";
import "./AntennaCoverage.css";

const AntennaCoverage = () => {
  const [antennaCount, setAntennaCount] = useState(1);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
    }));
    setStars(newStars);
  }, []);

  const antennas = [
    { id: 1, x: 20, y: 40, coverage: 30 },
    { id: 2, x: 50, y: 30, coverage: 30 },
    { id: 3, x: 80, y: 60, coverage: 30 },
    { id: 4, x: 30, y: 70, coverage: 30 },
  ];

  const visibleAntennas = antennas.slice(0, antennaCount);
  const coveragePercent = Math.min(antennaCount * 25, 100);

  return (
    <div className="app-container">
      {/* Animated background stars */}
      <div className="stars-container">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="content-wrapper">
        {/* Header */}
        <div className="header">
          <h1 className="main-title">MARS COMMUNICATION NETWORK</h1>
          <p className="subtitle">SURFACE ANTENNA ARRAY SYSTEM</p>
        </div>

        {/* Control Panel */}
        <div className="control-panel">
          <div className="control-header">
            <span className="control-label">ANTENNA ARRAY</span>
            <div className="control-count">
              <span className="count-number">{antennaCount}</span>
              <span className="count-total">/ 4 ACTIVE</span>
            </div>
          </div>

          <input
            type="range"
            min="1"
            max="4"
            value={antennaCount}
            onChange={(e) => setAntennaCount(parseInt(e.target.value))}
            className="slider"
            style={{
              background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${
                (antennaCount - 1) * 33.33
              }%, #334155 ${(antennaCount - 1) * 33.33}%, #334155 100%)`,
            }}
          />

          <div className="slider-indicators">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`indicator ${num <= antennaCount ? "active" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* Mars Surface Container */}
        <div className="mars-container">
          <div className="mars-panel">
            <div className="mars-surface-wrapper">
              {/* Mars Surface */}
              <div className="mars-surface">
                <div className="terrain-overlay"></div>
              </div>

              {/* Grid overlay */}
              <svg className="grid-overlay">
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="cyan"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Coverage areas */}
              {visibleAntennas.map((antenna, index) => (
                <div key={`coverage-${antenna.id}`}>
                  {/* Outer pulse ring */}
                  <div
                    className="pulse-ring"
                    style={{
                      left: `${antenna.x}%`,
                      top: `${antenna.y}%`,
                      width: `${antenna.coverage * 2.4}%`,
                      height: `${antenna.coverage * 2.4}%`,
                      marginLeft: `-${antenna.coverage * 1.2}%`,
                      marginTop: `-${antenna.coverage * 1.2}%`,
                      animationDelay: `${index * 0.3}s`,
                    }}
                  />

                  {/* Main coverage area */}
                  <div
                    className="coverage-area"
                    style={{
                      left: `${antenna.x}%`,
                      top: `${antenna.y}%`,
                      width: `${antenna.coverage * 2}%`,
                      height: `${antenna.coverage * 2}%`,
                      marginLeft: `-${antenna.coverage}%`,
                      marginTop: `-${antenna.coverage}%`,
                      animationDelay: `${index * 0.3}s`,
                    }}
                  />

                  {/* Scanning line effect */}
                  <div
                    className="scan-line"
                    style={{
                      left: `${antenna.x}%`,
                      top: `${antenna.y}%`,
                      width: `${antenna.coverage * 2}%`,
                      height: `${antenna.coverage * 2}%`,
                      marginLeft: `-${antenna.coverage}%`,
                      marginTop: `-${antenna.coverage}%`,
                      animationDelay: `${index * 0.3}s`,
                    }}
                  />
                </div>
              ))}

              {/* Antennas */}
              {visibleAntennas.map((antenna, index) => (
                <div
                  key={`antenna-${antenna.id}`}
                  className="antenna-wrapper"
                  style={{
                    left: `${antenna.x}%`,
                    top: `${antenna.y}%`,
                    animationDelay: `${index * 0.4}s`,
                  }}
                >
                  <div className="antenna-glow"></div>

                  <div className="antenna-structure">
                    <div className="antenna-base"></div>

                    <div className="antenna-dish-wrapper">
                      <div className="antenna-dish"></div>
                      <div className="dish-inner"></div>
                      <div className="dish-center"></div>

                      <div className="signal-indicator"></div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Surface features */}
              <div className="crater crater-1"></div>
              <div className="crater crater-2"></div>
              <div className="crater crater-3"></div>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="stats-grid">
            <div className="stat-card stat-coverage">
              <div className="stat-value">{coveragePercent}%</div>
              <div className="stat-label">SURFACE COVERAGE</div>
            </div>

            <div className="stat-card stat-datarate">
              <div className="stat-value">{antennaCount * 2.4} Gbps</div>
              <div className="stat-label">DATA RATE</div>
            </div>

            <div className="stat-card stat-quality">
              <div className="stat-value">
                {antennaCount > 1 ? "OPTIMAL" : "BASIC"}
              </div>
              <div className="stat-label">SIGNAL QUALITY</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntennaCoverage;
