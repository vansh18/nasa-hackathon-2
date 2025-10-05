import { useState } from "react";
import "./FloatingParts.css";

import pole from "../../assets/parts/pole.png";
import tripod from "../../assets/parts/tripod.png";
import nylonRope from "../../assets/parts/nylonRope.png";
import wasteAnchor from "../../assets/parts/wasteAnchor.png";
import boom from "../../assets/parts/boom.png";
import rod from "../../assets/parts/rod.png";
import foam from "../../assets/parts/foam.png";

const Parts = () => {
  const partsData = [
    {
      id: 1,
      name: "Mast",
      image: pole,
      description:
        "Supports the antenna assembly to remain elevated and stable under Martian wind conditions. ",
      specs: [
        "Source: 3D cube structure from habitat construction.",
        "Material: Large Aluminum Struts"
      ],
    },
    {
      id: 2,
      name: "Tripod",
      image: tripod,
      description:
        "A tripod leg system that supports the antenna assembly.",
      specs: [
        "Source: 3D cube structure from habitat construction.",
        "Material: Aluminum",
      ],
    },
    {
      id: 3,
      name: "Nylon Rope",
      image: nylonRope,
      description:
        "Used to secure multiple components in the antenna assembly.",
      specs: [
          "Source: Packaging Waste",
        "Material: Nylon ",
      ],
    },
    {
      id: 4,
      name: "Thin Foam Gaskets",
      image: foam,
      description:
        "Used for grip and damping of the elements that is slotted through the boom.",
      specs: [
        "Source: Construction Trash",
        "Material: Foam",
],
    },
    {
      id: 5,
      name: "Boom",
      image: boom,
      description:
"Thermoformed hollow square boom that securely holds the antenna elements in alignment.",
      specs: [
        "Source: Construction Trash",
        "Material: Themoplastic",
      ],
    },
    {
      id: 6,
      name: "Three way antenna elements",
      image: rod,
      description:
        "Smaller aluminum strut sections are repurposed as the antenna's three main elements: the reflector, driven element and director. Each rod is precision cut to achieve accurate spacing and resonance at 420 MHz.",
      specs: [
        "Source: 3D cube structure from habitat construction.",
        "Material: Small Aluminium Struts."
      ],
    },
   
  ];

  const [selectedPart, setSelectedPart] = useState(partsData[0]);

  return (
    <>
      <h1 className="section-title">KNOW YOUR ANTENNA PARTS</h1>
      <div className="parts-container">
        <div className="parts-grid">
          {partsData.map((part) => (
            <div
              key={part.id}
              className={`part-thumbnail ${
                selectedPart.id === part.id ? "active" : ""
              }`}
              onClick={() => setSelectedPart(part)}
            >
              <img src={part.image} alt={part.name} />
              <div className="thumbnail-overlay">
                <span>{part.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="part-details">
          <div className="details-content" key={selectedPart.id}>
            <div className="detail-image">
              <img src={selectedPart.image} alt={selectedPart.name} />
            </div>
            <div className="detail-info">
              <h2>{selectedPart.name}</h2>
              <p className="description">{selectedPart.description}</p>
              <div className="specifications">
                <h3>Material Composition</h3>
                <ul>
                  {selectedPart.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Parts;
