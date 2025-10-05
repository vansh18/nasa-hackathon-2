import { useState } from "react";
import "./FloatingParts.css";

import pole from "../../assets/parts/pole.png";
import tripod from "../../assets/parts/tripod.png";
import nylonRope from "../../assets/parts/nylonRope.png";
import wasteAnchor from "../../assets/parts/wasteAnchor.png";
import boom from "../../assets/parts/boom.png";
import rod from "../../assets/parts/rod.png";

const Parts = () => {
  const partsData = [
    {
      id: 1,
      name: "Pole",
      image: pole,
      description:
        "High-performance engine block designed for maximum power output and durability. Features advanced cooling channels and reinforced cylinder walls.",
      specs: [
        "Material: Cast Iron",
        "Displacement: 5.0L",
        "Cylinders: V8",
        "Weight: 180kg",
      ],
    },
    {
      id: 2,
      name: "Tripod",
      image: tripod,
      description:
        "Twin-scroll turbocharger with variable geometry for optimal boost across all RPM ranges. Significantly improves power and efficiency.",
      specs: [
        "Boost: 1.5 bar",
        "Material: Titanium",
        "Max RPM: 280,000",
        "Weight: 8kg",
      ],
    },
    {
      id: 3,
      name: "Nylon Rope",
      image: nylonRope,
      description:
        "Six-piston racing brake caliper with ceramic composite construction. Provides exceptional stopping power and heat dissipation.",
      specs: [
        "Pistons: 6",
        "Material: Aluminum",
        "Pad Area: 85cm²",
        "Weight: 2.5kg",
      ],
    },
    {
      id: 4,
      name: "Waste Anchor",
      image: wasteAnchor,
      description:
        "Eight-speed dual-clutch automatic transmission with lightning-fast shifts. Combines efficiency with performance for the ultimate driving experience.",
      specs: ["Gears: 8", "Type: DCT", "Shift Time: 80ms", "Weight: 75kg"],
    },
    {
      id: 5,
      name: "Boom",
      image: boom,
      description:
        "Adjustable coilover suspension system with 32-way damping adjustment. Perfect balance between comfort and track performance.",
      specs: [
        "Travel: 100mm",
        "Spring Rate: 10kg/mm",
        "Material: Steel/Aluminum",
        "Weight: 12kg",
      ],
    },
    {
      id: 6,
      name: "Antenna Rods",
      image: rod,
      description:
        "High-flow direct fuel injector with precision spray pattern. Ensures optimal fuel atomization for complete combustion and maximum power.",
      specs: [
        "Flow Rate: 1000cc/min",
        "Pressure: 250 bar",
        "Response: 2ms",
        "Weight: 0.3kg",
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
                <h3>Specifications</h3>
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
