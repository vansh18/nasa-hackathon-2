import { useState } from "react";
import "./DragDrop.css";

import rodImg from "../assets/parts/rod.png";
import tripod from "../assets/parts/tripod.png";
import nylonRope from "../assets/parts/nylonRope.png";
import wasteAnchor from "../assets/parts/wasteAnchor.png";
import boom from "../assets/parts/boom.png";
import something from "../assets/parts/13.png";
import antenna from "../assets/antenna.png"


const AntennaPart = ({ id, src, name, onDragStart, isPlaced }) => {
  return (
    <div
      className={`antenna-part ${isPlaced ? "placed" : ""}`}
      draggable={!isPlaced}
      onDragStart={(e) => onDragStart(e, id)}
      style={{ opacity: isPlaced ? 0.3 : 1 }}
    >
      <img src={src} alt={name} />
      <p>{name}</p>
    </div>
  );
};

const DropZone = ({ onDrop, onDragOver, placedParts, targetImage }) => {
  return (
    <div className="drop-zone" onDrop={onDrop} onDragOver={onDragOver}>
      {placedParts.length === 0 ? (
        <div className="drop-message">
          <p>Drag antenna parts here to build</p>
        </div>
      ) : (
        <div className="assembled-parts">
          {placedParts.map((part, index) => (
            <img
              key={index}
              src={part.src}
              alt={part.name}
              className="placed-part"
            />
          ))}
        </div>
      )}
      {placedParts.length === 6 && (
        <div className="completion-overlay">
          <img
            src={targetImage}
            alt="Complete Antenna"
            className="target-image"
          />
          <div className="success-message">
            <h2>🎉 Antenna Complete!</h2>
            <button onClick={() => window.location.reload()}>
              Build Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const parts = [
    { id: 1, name: "Vertical Rods", src: rodImg },
    { id: 2, name: "Horizontal Bar", src: boom },
    { id: 3, name: "Diagonal Rod", src: nylonRope},
    { id: 4, name: "Center Pole", src: something },
    { id: 5, name: "Support Legs", src: tripod},
    { id: 6, name: "Ground Rock", src: wasteAnchor},
  ];

  const [placedParts, setPlacedParts] = useState([]);
  const [draggedPart, setDraggedPart] = useState(null);

  const handleDragStart = (e, partId) => {
    const part = parts.find((p) => p.id === partId);
    setDraggedPart(part);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedPart && !placedParts.find((p) => p.id === draggedPart.id)) {
      setPlacedParts([...placedParts, draggedPart]);
    }
    setDraggedPart(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Build the Antenna</h1>
        <p className="progress">
          Parts Placed: {placedParts.length} / {parts.length}
        </p>
      </header>

      <div className="container">
        <div className="parts-panel">
          <h2>Available Parts</h2>
          <div className="parts-grid">
            {parts.map((part) => (
              <AntennaPart
                key={part.id}
                id={part.id}
                src={part.src}
                name={part.name}
                onDragStart={handleDragStart}
                isPlaced={placedParts.find((p) => p.id === part.id)}
              />
            ))}
          </div>
        </div>

        <div className="build-area">
          <h2>Assembly Area</h2>
          <DropZone
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            placedParts={placedParts}
            targetImage= {antenna}
          />
        </div>
      </div>
    </div>
  );
}
