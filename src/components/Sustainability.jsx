import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sustainability.css";
import rc from "../assets/icons/recycle.png";
import mcf from "../assets/icons/MCF.png";
import rd from "../assets/icons/resilientdesign.png";
import antenna from "../assets/antenna.png";

export default function Sustainability() {
  const [flipped, setFlipped] = useState([false, false, false]);

  const handleFlip = (index) => {
    setFlipped((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  const cards = [
    {
      title: "Zero Waste Value Cycling",
      icon: rc,
      shortDesc:
        "Built for Mars, not disposal. Every part is designed for repair, reuse, and reinvention.",
      longDesc:
        "Every component of the antenna is designed for full lifecycle use within the Martian environment. By applying Design for Disassembly, Repair, and Reuse (DFADR) principles, each element can be maintained, reconfigured, or repurposed using locally available materials and astronaut-assisted repairs. This zero-waste approach minimizes reliance on Earth resupply.",
    },
    {
      title: "Material Cascade Fidelity",
      icon: mcf,
      shortDesc:
        "We preserve what’s already been perfected. Each component is reused or upcycled.",
      longDesc:
        "Rather than degrading materials through destructive recycling, the design retains the embodied value of refined components. Structural and electronic parts are reused or upcycled into new, high-value configurations — maintaining their integrity across multiple lifecycles. This strategy ensures energy invested in manufacturing continues to yield benefits.",
    },
    {
      title: "Resilient Design Philosophy",
      icon: rd,
      shortDesc:
        "Performance that endures. Designed to thrive through dust, cold, and radiation.",
      longDesc:
        "In the harsh Martian environment — with dust storms, vacuum-like conditions, and extreme temperature swings — resilience takes precedence over raw performance. The antenna employs solid-state fabrication methods and modular repairability to ensure continuous function despite environmental stress. Prioritizing reliability, maintainability, and adaptability ensures sustained performance over transient optimization.",
    },
  ];

  return (
    <div className="SusBackground text-light py-5">
      <div className="container">
        <div>        <h1 className="text-center mb-5">Why use this antenna design?</h1>
        <img src={antenna} className="img-fluid mb-4"/>
</div>
        <div className="row g-3 row-cols-2 row-cols-lg-3">
          {cards.map((card, index) => (
            <div key={index} className="col d-flex justify-content-center">
              <div
                className={`flip-card ${flipped[index] ? "flipped" : ""}`}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front text-center p-4">
                    <img
                      src={card.icon}
                      alt={`${card.title} Icon`}
                      className="img-fluid feature-img mb-3"
                    />
                    <h2>{card.title}</h2>
                    <p>{card.shortDesc}</p>
                    <button
                      className="btn btn-outline-light mt-3"
                      onClick={() => handleFlip(index)}
                    >
                      Learn More
                    </button>
                  </div>
                  <div className="flip-card-back text-center p-4">
                    <h2>{card.title}</h2>
                    <p>{card.longDesc}</p>
                    <button
                      className="btn btn-outline-light mt-3"
                      onClick={() => handleFlip(index)}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">

          {/* Empty Space */}
          </div>
    </div>
  );
}
