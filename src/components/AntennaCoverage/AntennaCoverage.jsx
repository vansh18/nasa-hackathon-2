import React, { useState, useEffect, useRef } from "react";
import "./AntennaCoverage.css";

const AntennaCoverage = () => {
  const [antennas, setAntennas] = useState([
    { id: 1, x: 200, y: 150, coverage: 0.4 },
    { id: 2, x: 400, y: 300, coverage: 0.4 },
    { id: 3, x: 600, y: 200, coverage: 0.4 },
  ]);

  const [rover, setRover] = useState({ x: 500, y: 400 });
  const [baseStation] = useState({ x: 100, y: 250, coverage: 0.4 });
  const [dragging, setDragging] = useState(null);
  const [networkState, setNetworkState] = useState({
    connectedAntennas: [],
    roverConnected: false,
    totalNodes: 1,
  });

  const mapRef = useRef(null);
  const mapWidth = 800;
  const mapHeight = 500;
  const mapSize = Math.min(mapWidth, mapHeight);

  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  const isInRange = (x1, y1, x2, y2, coverage) => {
    const distance = calculateDistance(x1, y1, x2, y2);
    const radius = (mapSize * coverage) / 2;
    return distance <= radius;
  };

  const isCoverageOverlap = (x1, y1, coverage1, x2, y2, coverage2) => {
    const distance = calculateDistance(x1, y1, x2, y2);
    const radius1 = (mapSize * coverage1) / 2;
    const radius2 = (mapSize * coverage2) / 2;
    return distance <= radius1 + radius2;
  };

  const calculateNetworkConnectivity = () => {
    const connectedAntennas = new Set();
    const visited = new Set();
    const queue = [{ type: "base", x: baseStation.x, y: baseStation.y }];

    while (queue.length > 0) {
      const current = queue.shift();
      const currentKey = `${current.type}-${current.x}-${current.y}`;

      if (visited.has(currentKey)) continue;
      visited.add(currentKey);

      antennas.forEach((antenna) => {
        const antennaKey = `antenna-${antenna.id}`;
        if (visited.has(antennaKey)) return;

        let isConnected = false;
        if (current.type === "base") {
          isConnected = isCoverageOverlap(
            current.x,
            current.y,
            baseStation.coverage,
            antenna.x,
            antenna.y,
            antenna.coverage
          );
        } else if (current.type === "antenna") {
          const currentAntenna = antennas.find((a) => a.id === current.id);
          if (currentAntenna) {
            isConnected = isCoverageOverlap(
              current.x,
              current.y,
              currentAntenna.coverage,
              antenna.x,
              antenna.y,
              antenna.coverage
            );
          }
        }

        if (isConnected) {
          connectedAntennas.add(antenna.id);
          queue.push({
            type: "antenna",
            x: antenna.x,
            y: antenna.y,
            id: antenna.id,
          });
        }
      });
    }

    let roverConnected = isInRange(
      rover.x,
      rover.y,
      baseStation.x,
      baseStation.y,
      baseStation.coverage
    );

    if (!roverConnected) {
      for (const antenna of antennas) {
        if (
          connectedAntennas.has(antenna.id) &&
          isInRange(rover.x, rover.y, antenna.x, antenna.y, antenna.coverage)
        ) {
          roverConnected = true;
          break;
        }
      }
    }

    return {
      connectedAntennas: Array.from(connectedAntennas),
      roverConnected,
      totalNodes: 1 + connectedAntennas.size,
    };
  };

  useEffect(() => {
    const newNetworkState = calculateNetworkConnectivity();
    setNetworkState(newNetworkState);
  }, [antennas, rover, baseStation]);

  const handleMouseDown = (e, type, id = null) => {
    e.preventDefault();
    setDragging({ type, id, startX: e.clientX, startY: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const deltaX = e.clientX - dragging.startX;
    const deltaY = e.clientY - dragging.startY;

    if (dragging.type === "antenna") {
      setAntennas((prev) =>
        prev.map((antenna) =>
          antenna.id === dragging.id
            ? {
                ...antenna,
                x: Math.max(50, Math.min(mapWidth - 50, antenna.x + deltaX)),
                y: Math.max(50, Math.min(mapHeight - 50, antenna.y + deltaY)),
              }
            : antenna
        )
      );
    } else if (dragging.type === "rover") {
      setRover((prev) => ({
        x: Math.max(25, Math.min(mapWidth - 25, prev.x + deltaX)),
        y: Math.max(25, Math.min(mapHeight - 25, prev.y + deltaY)),
      }));
    }

    setDragging((prev) => ({ ...prev, startX: e.clientX, startY: e.clientY }));
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging, antennas, rover]);

  const getAntennaStatus = (antennaId) => {
    const isConnected = networkState.connectedAntennas.includes(antennaId);
    const antenna = antennas.find((a) => a.id === antennaId);
    if (!antenna) return "disconnected";

    const roverInRange = isInRange(
      rover.x,
      rover.y,
      antenna.x,
      antenna.y,
      antenna.coverage
    );

    if (!isConnected) return "disconnected";
    if (isConnected && roverInRange) return "rover-connected";
    return "connected";
  };

  return (
    <div className="antenna-coverage-container">
      <div className="status-panel">
        <div className="rover-status">
          <div
            className={`status-indicator ${
              networkState.roverConnected ? "connected" : "disconnected"
            }`}
          >
            ● {networkState.roverConnected ? "CONNECTED" : "OUT OF RANGE"}
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">NETWORK NODES</div>
          <div className="stat-value">{networkState.totalNodes}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">ROVER STATUS</div>
          <div
            className={`stat-value ${
              networkState.roverConnected ? "online" : "offline"
            }`}
          >
            {networkState.roverConnected ? "ONLINE" : "OFFLINE"}
          </div>
        </div>
      </div>

      <div className="legend-container">
        <div className="legend-title">MARS COMMUNICATION NETWORK</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-icon base-station-icon"></div>
            <div className="legend-text">
              <div className="legend-label">BASE STATION</div>
              <div className="legend-description">Central communication hub - Fixed position</div>
            </div>
          </div>
          <div className="legend-item">
            <div className="legend-icon antenna-icon"></div>
            <div className="legend-text">
              <div className="legend-label">ANTENNA</div>
              <div className="legend-description">Relay communication nodes - Draggable</div>
            </div>
          </div>
          <div className="legend-item">
            <div className="legend-icon rover-icon"></div>
            <div className="legend-text">
              <div className="legend-label">ROVER</div>
              <div className="legend-description">Mobile exploration vehicle - Draggable</div>
            </div>
          </div>
        </div>
        <div className="legend-status">
          <div className="status-legend">
            <div className="status-item">
              <div className="status-dot connected"></div>
              <span>Connected & Rover in Range</span>
            </div>
            <div className="status-item">
              <div className="status-dot connected-only"></div>
              <span>Connected to Network</span>
            </div>
            <div className="status-item">
              <div className="status-dot disconnected"></div>
              <span>Disconnected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="map-container">
        <div
          ref={mapRef}
          className="mars-map"
          style={{ width: mapWidth, height: mapHeight }}
        >
          <div className="grid-overlay"></div>

          <div
            className="base-station"
            style={{
              left: baseStation.x - 30,
              top: baseStation.y - 30,
            }}
          >
            <div className="base-dome"></div>
            <div className="base-platform"></div>
            <div className="base-glow"></div>
          </div>

          <div
            className={`coverage-zone base-coverage ${
              networkState.roverConnected ? "rover-connected" : ""
            }`}
            style={{
              left: baseStation.x - (mapSize * baseStation.coverage) / 2,
              top: baseStation.y - (mapSize * baseStation.coverage) / 2,
              width: mapSize * baseStation.coverage,
              height: mapSize * baseStation.coverage,
            }}
          >
            <div className="radar-sweep"></div>
          </div>

          {antennas.map((antenna) => {
            const status = getAntennaStatus(antenna.id);
            return (
              <React.Fragment key={antenna.id}>
                <div
                  className={`coverage-zone antenna-coverage ${status}`}
                  style={{
                    left: antenna.x - (mapSize * antenna.coverage) / 2,
                    top: antenna.y - (mapSize * antenna.coverage) / 2,
                    width: mapSize * antenna.coverage,
                    height: mapSize * antenna.coverage,
                  }}
                >
                  <div className="radar-sweep"></div>
                </div>

                <div
                  className={`antenna ${status}`}
                  style={{
                    left: antenna.x - 20,
                    top: antenna.y - 20,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, "antenna", antenna.id)}
                >
                  <div className="antenna-dish"></div>
                  <div className="antenna-support"></div>
                  <div className="antenna-glow"></div>
                </div>
              </React.Fragment>
            );
          })}

          <div
            className={`rover ${
              networkState.roverConnected ? "connected" : "disconnected"
            }`}
            style={{
              left: rover.x - 15,
              top: rover.y - 15,
            }}
            onMouseDown={(e) => handleMouseDown(e, "rover")}
          >
            <div className="rover-body"></div>
            <div className="rover-wheels"></div>
            <div className="rover-panel"></div>
            <div className="rover-glow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntennaCoverage;
