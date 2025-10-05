import React, {
  useMemo, useState, useCallback, useRef, useLayoutEffect, useEffect
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Statistics.css";
import {
  FaRocket, FaDollarSign, FaRedoAlt, FaBolt, FaTint, FaUserClock, FaShieldAlt,
} from "react-icons/fa";

export default function Statistics() {
  const singleOpen = false;
  const [flipped, setFlipped] = useState(Array(7).fill(false));
  const [heights, setHeights] = useState(Array(7).fill(0));

  // refs for measuring each card's front/back content height
  const frontRefs = useRef([]);
  const backRefs  = useRef([]);
  const shellRefs = useRef([]);

  const measureHeights = useCallback(() => {
    setHeights((prev) =>
      prev.map((_, i) => {
        const front = frontRefs.current[i];
        const back  = backRefs.current[i];
        const fh = front ? front.scrollHeight : 0;
        const bh = back  ? back.scrollHeight  : 0;
        // add a small buffer for focus ring / rounding
        return Math.max(fh, bh) + 8;
      })
    );
  }, []);

  useLayoutEffect(() => { measureHeights(); }, [measureHeights, flipped]);
  useEffect(() => {
    // re-measure on window resize
    const ro = new ResizeObserver(measureHeights);
    [...frontRefs.current, ...backRefs.current].forEach(el => el && ro.observe(el));
    window.addEventListener("resize", measureHeights);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureHeights);
    };
  }, [measureHeights]);

  const handleFlip = useCallback((index) => {
    setFlipped(prev =>
      prev.map((v, i) => (i === index ? !v : (singleOpen ? false : v)))
    );
  }, []);
  const handleKeyFlip = useCallback((e, index) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleFlip(index); }
  }, [handleFlip]);

  const data = useMemo(() => [
    { metric:"Flown Mass Avoided", unit:"(kg)", icon:<FaRocket aria-hidden="true"/>, one:"0.7 – 2.0", ten:"7.0 – 20.0",
      justification:"In-situ manufacturing avoids shipping pre-built spares from Earth. Spare Mars comms antennas typically weigh 700g–2kg, directly reducing launched mass." },
    { metric:"Launch Cost Avoided", unit:"(@$237k/kg)", icon:<FaDollarSign aria-hidden="true"/>, one:"$166k – $474k", ten:"$1.6M – $4.7M",
      justification:"Based on ~$237,073/kg delivery. Avoiding 0.7–2.0 kg per antenna yields large launch cost savings." },
    { metric:"Mission Replacement Value", unit:"(@$2.63M/kg)", icon:<FaRedoAlt aria-hidden="true"/>, one:"$1.8M – $5.3M", ten:"$18.4M – $52.7M",
      justification:"Each kg on Mars reflects full lifecycle value; in-situ antennas hedge communication failure risk." },
    { metric:"Energy Saved", unit:"(kWh)", icon:<FaBolt aria-hidden="true"/>, one:"45 – 120", ten:"450 – 1,200",
      justification:"Reusing scrap aluminum avoids ~40 kWh/kg ISRU manufacturing draw—freeing power for science/crew." },
    { metric:"Water Saved", unit:"(Liters)", icon:<FaTint aria-hidden="true"/>, one:"~30", ten:"~300",
      justification:"Primary aluminum from ore is water-intensive (~10 L/kg). Scrap reuse preserves life-support water." },
    { metric:"Crew Build Time", unit:"(hrs)", icon:<FaUserClock aria-hidden="true"/>, one:"~6", ten:"~60",
      justification:"One trained astronaut builds a unit in ~6 hours—offsetting Earth-side logistics overhead." },
    { metric:"1-Year Survival Probability", unit:"(Mitigated)", icon:<FaShieldAlt aria-hidden="true"/>, one:"40% → 85%", ten:"Network Redundancy",
      justification:"Simple mitigations raise baseline (40%) to ~70–85%. Ten units provide robust continuity." },
  ], []);

  return (
    <section className="stats-section" aria-labelledby="waste-impact-title">
      <div className="container-lg">
        <header className="stats-header">
          <h1 id="waste-impact-title" className="stats-title">WASTE-TO-ASSET SYSTEM IMPACT</h1>
          <p className="stats-subtitle">
            Transforming mission waste into communication lifelines.
            See the exponential returns below.
          </p>
        </header>

        <div className="stats-grid">
          {data.map((item, index) => (
            <article
              key={item.metric}
              className={`flip-card ${flipped[index] ? "flipped" : ""}`}
              role="button"
              aria-pressed={flipped[index]}
              tabIndex={0}
              onClick={() => handleFlip(index)}
              onKeyDown={(e) => handleKeyFlip(e, index)}
              ref={(el) => (shellRefs.current[index] = el)}
              style={{ height: heights[index] ? `${heights[index]}px` : undefined }}
            >
              <div className="flip-card-inner">
                {/* FRONT */}
                <div
                  className="flip-card-front metric-card"
                  ref={(el) => (frontRefs.current[index] = el)}
                >
                  <div className="metric-header">
                    <div className="metric-icon">{item.icon}</div>
                    <div>
                      <h3 className="metric-name">{item.metric}</h3>
                      <small className="metric-unit">{item.unit}</small>
                    </div>
                  </div>

                  <div className="values-container">
                    <div className="value-box">
                      <span className="value-label">1 Antenna</span>
                      <p className="value-data">{item.one}</p>
                    </div>
                    <div className="separator" aria-hidden="true">→</div>
                    <div className="value-box">
                      <span className="value-label">10 Antennas</span>
                      <p className="value-data">{item.ten}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-light mt-auto btn-ghost"
                    onClick={(e) => { e.stopPropagation(); handleFlip(index); }}
                  >
                    Learn more
                  </button>
                </div>

                {/* BACK */}
                <div
                  className="flip-card-back metric-card"
                  ref={(el) => (backRefs.current[index] = el)}
                >
                  <h3 className="metric-name">{item.metric}</h3>
                  <p className="justification">{item.justification}</p>
                  <button
                    type="button"
                    className="btn btn-outline-light mt-auto btn-ghost"
                    onClick={(e) => { e.stopPropagation(); handleFlip(index); }}
                  >
                    Back
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

