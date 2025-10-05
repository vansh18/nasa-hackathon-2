import { useState } from "react";
import "./FloatingParts.css";

import pole from "../../assets/parts/pole.png";
import tripod from "../../assets/parts/tripod.png";
import nylonRope from "../../assets/parts/nylonRope.png";
import Modal from "react-modal";
import wasteAnchor from "../../assets/parts/wasteAnchor.png";
import boom from "../../assets/parts/boom.png";
import rod from "../../assets/parts/rod.png";
import foam from "../../assets/parts/foam.png";

import e_boom from "../../assets/energy/e-boom.png"
import e_mast from "../../assets/energy/e-mast.png"
import e_thinfoam from "../../assets/energy/e-thinfoam.png"
import e_threeway from "../../assets/energy/e-threeway.png"
import e_tripod from "../../assets/energy/e-tripod.png"
import e_rope from "../../assets/energy/e-rope.png"

Modal.setAppElement("#root");

const Parts = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const partsData = [
    {
      id: 1,
      name: "Mast",
      image: pole,
      description:
        "Supports the antenna assembly to remain elevated and stable under Martian wind conditions. ",
      specs: [
        "Source: 3D cube structure from habitat construction.",
        "Material: Large Aluminum Struts",
      ],
      detailedInfo: {
        manufacturingMethod: "Guillotine shear cutting",
        tool: "Guillotine shear cutter machine",
        toolUsage: "The guillotine shear is a simple, low-energy cutting tool ideal for shaping recycled aluminum struts on Mars. To use it, the strut is first positioned and clamped securely beneath the stationary upper blade. A manual lever or servo-assisted arm is then pulled downward, driving the blade in a single controlled motion to shear cleanly through the aluminum with minimal force. The cut produces one solid piece and a smooth edge—no dust, sparks, or micro-waste—making it safe for enclosed habitats and fully compatible with in-situ recycling.",
        energyToValue: <img src={e_mast} alt="Energy to Value - Mast" className="energy-value-img" />,
        timeTaken: "5-8min",
        rStrategies: "R3, R4, R5, R6",
      },
    },
    {
      id: 2,
      name: "Tripod",
      image: tripod,
      description: "A tripod leg system that supports the antenna assembly.",
      specs: [
        "Source: 3D cube structure from habitat construction.",
        "Material: Aluminum",
      ],
      detailedInfo: {
        manufacturingMethod: "Guillotine shear cutting",
        tool: "Guillotine shear cutter machine",
        toolUsage: "The guillotine shear is a simple, low-energy cutting tool ideal for shaping recycled aluminum struts on Mars. To use it, the strut is first positioned and clamped securely beneath the stationary upper blade. A manual lever or servo-assisted arm is then pulled downward, driving the blade in a single controlled motion to shear cleanly through the aluminum with minimal force. The cut produces one solid piece and a smooth edge—no dust, sparks, or micro-waste—making it safe for enclosed habitats and fully compatible with in-situ recycling.",
        energyToValue: <img src={e_tripod} alt="Energy to Value - Tripod" className="energy-value-img" />,
        timeTaken: "12-20min",
        rStrategies: "R3, R4, R5, R6",
      },
    },
    {
      id: 3,
      name: "Nylon Rope",
      image: nylonRope,
      description:
        "Used to secure multiple components in the antenna assembly.",
      specs: ["Source: Packaging Waste", "Material: Nylon "],
      detailedInfo: {
        manufacturingMethod: "nil",
        tool: "Sccissors/ruler/pen-knife",
        toolUsage: "Secure the assembly strucuture by using the rope from mast middle section to a martian rock on the ground, spaced 120 degrees apart ",
        energyToValue: <img src={e_rope} alt="Energy to Value - Nylon Rope" className="energy-value-img" />,
        timeTaken: "5-8min",
        rStrategies: "R2, R3, R5, R7",
      },
    },
    {
      id: 4,
      name: "Thin Foam Gaskets",
      image: foam,
      description:
        "Used for grip and damping of the elements that is slotted through the boom.",
      specs: ["Source: Construction Trash", "Material: Foam"],
      detailedInfo: {
        manufacturingMethod: "Manual Cutting",
        tool: "Sccissors/ruler/pen-knife",
        toolUsage: " Basic hand tools such as scissors/pen-knife are sufficient cut the material into their defined dimensions",
        energyToValue: <img src={e_thinfoam} alt="Energy to Value - Thin Foam" className="energy-value-img" />,
        timeTaken: "5-10min",
        rStrategies: "R2, R3, R5, R7",
      },
    },
    {
      id: 5,
      name: "Boom",
      image: boom,
      description:
        "Thermoformed hollow square boom that securely holds the antenna elements in alignment.",
      specs: ["Source: Construction Trash", "Material: Themoplastic"],
      detailedInfo: {
        manufacturingMethod: "Thermoforming",
        tool: "Thermoplastic sheet, portable heat press machine",
        toolUsage: "The thermoforming process shapes recycled thermoplastic sheets into the boom structure through controlled heat and pressure. First, the cleaned plastic waste is melted or flattened into uniform sheets, which are then heated until pliable. The softened sheet is draped over or wrapped around a pre-shaped mandrel—such as a square mold representing the boom’s cross-section—and pressed tightly to capture its form and any integrated slots for the antenna elements. Once cooled, the plastic hardens into a rigid, lightweight tube that requires no machining, produces zero microplastic waste, and can be easily remelted for future reuse.",
        energyToValue: <img src={e_boom} alt="Energy to Value - Boom" className="energy-value-img" />,
        timeTaken: "20-30min",
        rStrategies: "R3, R5, R6 & R9",
      },
    },
    {
      id: 6,
      name: "Three way antenna elements",
      image: rod,
      description:
        "Smaller aluminum strut sections are repurposed as the antenna's three main elements: the reflector, driven element and director. Each rod is precision cut to achieve accurate spacing and resonance at 420 MHz.",
      specs: [
        "Source: 3D cube structure from habitat construction.",
        "Material: Small Aluminium Struts.",
      ],
      detailedInfo: {
        manufacturingMethod: "Guillotine shear cutting",
        tool: "Guillotine shear cutter machine",
        toolUsage: "The guillotine shear is a simple, low-energy cutting tool ideal for shaping recycled aluminum struts on Mars. To use it, the strut is first positioned and clamped securely beneath the stationary upper blade. A manual lever or servo-assisted arm is then pulled downward, driving the blade in a single controlled motion to shear cleanly through the aluminum with minimal force. The cut produces one solid piece and a smooth edge—no dust, sparks, or micro-waste—making it safe for enclosed habitats and fully compatible with in-situ recycling.",
        energyToValue: <img src={e_threeway} alt="Energy to Value - Three Way Elements" className="energy-value-img" />,
        timeTaken: "12-18min",
        rStrategies: "R3, R4, R5, R6",
      },
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
              <button
                className="dive-deep-btn"
                onClick={() => setModalIsOpen(true)}
              >
                Dive Deep
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="deep-dive-modal"
        overlayClassName="deep-dive-overlay"
      >
        <h2>{selectedPart.name} - Detailed Information</h2>
        <div className="deep-dive-content">
          <div className="info-row">
            <h3>Manufacturing Method</h3>
            <p>{selectedPart.detailedInfo?.manufacturingMethod}</p>
          </div>
          <div className="info-row">
            <h3>Tool</h3>
            <p>{selectedPart.detailedInfo?.tool}</p>
          </div>
          <div className="info-row">
            <h3>Tool Usage</h3>
            <p>{selectedPart.detailedInfo?.toolUsage}</p>
          </div>
          <div className="info-row">
            <h3>Energy-to-Value</h3>
            <p>{selectedPart.detailedInfo?.energyToValue}</p>
          </div>
          <div className="info-row">
            <h3>Time Taken</h3>
            <p>{selectedPart.detailedInfo?.timeTaken}</p>
          </div>
          <div className="info-row">
            <h3>R-Strategies</h3>
            <p>{selectedPart.detailedInfo?.rStrategies}</p>
          </div>
        </div>
        <button
          className="close-modal-btn"
          onClick={() => setModalIsOpen(false)}
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default Parts;
