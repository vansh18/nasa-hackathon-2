import { useState } from "react";
import "./DragDrop.css";

import anchor from "../../assets/parts/wasteAnchor.png";
import pole from "../../assets/parts/pole.png";
import boom from "../../assets/parts/boom.png";
import rope from "../../assets/parts/nylonRope.png";
import rod from "../../assets/parts/rod.png";
import tripod from "../../assets/parts/tripod.png";
import antenna from "../../assets/antenna.png";

import visibleAnchor from "../../assets/parts/visible/visible_anchors.png";
import visibleRod from "../../assets/parts/visible/visible_antenna_rods.png";
import visibleBoom from "../../assets/parts/visible/visible_boom.png";
import visiblePole from "../../assets/parts/visible/visible_pole.png";
import visibleRopes from "../../assets/parts/visible/visible_ropes.png";
import visibleTripod from "../../assets/parts/visible/visible_tripod.png";


const visiblePartsMap = {
  [pole]: visiblePole,
  [boom]: visibleBoom,
  [rope]: visibleRopes,
  [rod]: visibleRod,
  [tripod]: visibleTripod,
  [anchor]: visibleAnchor,
};

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
              src={visiblePartsMap[part.src]} // Use the visible version instead
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
            <h2>Antenna Complete!</h2>
            <button onClick={() => window.location.reload()}>
              Build Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function DragDrop() {
  const parts = [
    { id: 1, name: "Vertical Pole", src: pole },
    { id: 2, name: "Boom", src: boom },
    { id: 3, name: "Nylon Ropes", src: rope },
    { id: 4, name: "Antenna Rods", src: rod },
    { id: 5, name: "Tripod", src: tripod },
    { id: 6, name: "Waste Anchor", src: anchor },
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

  const resetAssembly = () => {
    setPlacedParts([]);
  };

  return (
    <div className="app">
      <header>
        <h1>BUILD YOUR OWN ANTENNA</h1>
        <p className="progress">
          Parts Placed: {placedParts.length} / {parts.length}
        </p>
      </header>

      <div className="container">
        <div className="parts-panel">
          <h2>Available Parts</h2>
          <div className="visible-parts-grid">
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
            targetImage={antenna}
          />
        </div>
      </div>
    </div>
  );
}
