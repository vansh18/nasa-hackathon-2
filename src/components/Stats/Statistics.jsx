import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import "./Statistics.css";
import {
  FaRocket,
  FaDollarSign,
  FaRedoAlt,
  FaBolt,
  FaTint,
  FaUserClock,
  FaShieldAlt,
} from "react-icons/fa";

export default function Statistics() {
  const [flipped, setFlipped] = useState(Array(7).fill(false));
  const frontRefs = useRef([]);
  const backRefs = useRef([]);

  const handleFlip = useCallback((index, e) => {
    if (e) {
      e.stopPropagation();
    }
    setFlipped((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }, []);

  const handleKeyFlip = useCallback(
    (e, index) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleFlip(index);
      }
    },
    [handleFlip]
  );

  const data = useMemo(
    () => [
      {
        metric: "Flown Mass Avoided",
        unit: "(kg)",
        icon: <FaRocket />,
        one: "0.7 – 2.0",
        ten: "7.0 – 20.0",
        justification:
          "In-situ manufacturing avoids shipping pre-built spares from Earth. Spare Mars comms antennas typically weigh 700g–2kg, directly reducing launched mass.",
      },
      {
        metric: "Launch Cost Avoided",
        unit: "(@$237k/kg)",
        icon: <FaDollarSign />,
        one: "$166k – $474k",
        ten: "$1.6M – $4.7M",
        justification:
          "Based on ~$237,073/kg delivery. Avoiding 0.7–2.0 kg per antenna yields large launch cost savings.",
      },
      {
        metric: "Mission Replacement Value",
        unit: "(@$2.63M/kg)",
        icon: <FaRedoAlt />,
        one: "$1.8M – $5.3M",
        ten: "$18.4M – $52.7M",
        justification:
          "Each kg on Mars reflects full lifecycle value; in-situ antennas hedge communication failure risk.",
      },
      {
        metric: "Energy Saved",
        unit: "(kWh)",
        icon: <FaBolt />,
        one: "45 – 120",
        ten: "450 – 1,200",
        justification:
          "Reusing scrap aluminum avoids ~40 kWh/kg ISRU manufacturing draw—freeing power for science/crew.",
      },
      {
        metric: "Water Saved",
        unit: "(Liters)",
        icon: <FaTint />,
        one: "~30",
        ten: "~300",
        justification:
          "Primary aluminum from ore is water-intensive (~10 L/kg). Scrap reuse preserves life-support water.",
      },
      {
        metric: "Crew Build Time",
        unit: "(hrs)",
        icon: <FaUserClock />,
        one: "~6",
        ten: "~60",
        justification:
          "One trained astronaut builds a unit in ~6 hours—offsetting Earth-side logistics overhead.",
      },
      {
        metric: "1-Year Survival Probability",
        unit: "(Mitigated)",
        icon: <FaShieldAlt />,
        one: "40% → 85%",
        ten: "Network Redundancy",
        justification:
          "Simple mitigations raise baseline (40%) to ~70–85%. Ten units provide robust continuity.",
      },
    ],
    []
  );

  return (
    <section className="stats-section" aria-labelledby="waste-impact-title">
      <h1 id="waste-impact-title">WASTE-TO-ASSET SYSTEM IMPACT</h1>

      <div className="st-stats-grid">
        {data.map((item, index) => (
          <article
            key={item.metric}
            className={`flip-card ${flipped[index] ? "flipped" : ""}`}
            role="button"
            aria-pressed={flipped[index]}
            tabIndex={0}
            onClick={(e) => handleFlip(index, e)}
            onKeyDown={(e) => handleKeyFlip(e, index)}
          >
            <div className="flip-card-inner">
              <div
                className="flip-card-front"
                ref={(el) => (frontRefs.current[index] = el)}
              >
                {item.icon}
                <h4>{item.metric}</h4>
                <p>{item.unit}</p>
                <div className="stats-values">
                  <div>
                    <strong>1 Antenna:</strong>{" "}
                    <span className="highlight-number">{item.one}</span>
                  </div>
                  <div>
                    <strong>10 Antennas:</strong>{" "}
                    <span className="highlight-number">{item.ten}</span>
                  </div>
                </div>
              </div>

              <div
                className="flip-card-back"
                ref={(el) => (backRefs.current[index] = el)}
              >
                <p>{item.justification}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
