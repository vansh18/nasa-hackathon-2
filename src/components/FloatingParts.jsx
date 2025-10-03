import React, { useState } from "react";
import { motion } from "framer-motion";
import "./FloatingParts.css";

import rodImg from "../assets/parts/rod.png";
import tripod from "../assets/parts/tripod.png";
import nylonRope from "../assets/parts/nylonRope.png";
import wasteAnchor from "../assets/parts/wasteAnchor.png";
import boom from "../assets/parts/boom.png";
import something from "../assets/parts/13.png";

const parts = [
  {
    id: 1,
    src: rodImg,
    label: "Vertical Rod",
    info: "Recycled from aluminum strut",
    blob: "40% 60% 60% 40% / 40% 40% 60% 60%",
    side: "left",
    floatPattern: { y: [0, -30, 10, -20, 0] },
    floatDuration: 7,
    position: { top: "20%", left: "27%" },
  },
  {
    id: 2,
    src: boom,
    label: "Boom",
    info: "Made from EVA glove plastic",
    blob: "50% 50% 70% 30% / 30% 50% 50% 70%",
    side: "left",
    floatPattern: { y: [0, -15, -25, 5, 0] },
    floatDuration: 6,
    position: { top: "45%", left: "22%" },
  },
  {
    id: 3,
    src: tripod,
    label: "Tripod Base",
    info: "Constructed from foam packaging",
    blob: "60% 40% 50% 50% / 50% 60% 40% 50%",
    side: "left",
    floatPattern: { y: [0, -40, 15, -10, 0] },
    floatDuration: 8,
    position: { top: "70%", left: "30%" },
  },
  {
    id: 4,
    src: wasteAnchor,
    label: "Waste Anchor",
    info: "Repurposed from aluminum casing",
    blob: "30% 70% 50% 50% / 60% 40% 60% 40%",
    side: "right",
    floatPattern: { y: [0, -25, -5, -35, 0] },
    floatDuration: 9,
    position: { top: "15%", left: "60%" },
  },
  {
    id: 5,
    src: something,
    label: "Something",
    info: "Cut from CFRP panel",
    blob: "55% 45% 65% 35% / 40% 60% 50% 50%",
    side: "right",
    floatPattern: { y: [0, -10, -30, 8, 0] },
    floatDuration: 5,
    position: { top: "43%", left: "67%" },
  },
  {
    id: 6,
    src: nylonRope,
    label: "Coaxial Cable",
    info: "Recycled from rover wiring",
    blob: "45% 55% 55% 45% / 50% 50% 45% 55%",
    side: "right",
    floatPattern: { y: [0, -35, 12, -18, 0] },
    floatDuration: 7.5,
    position: { top: "71%", left: "60%" },
  },
];

export default function FloatingParts() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="parts-container">
      {/* Central Tooltip */}
      {hovered && (
        <motion.div
          className="central-tooltip"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <h4>{parts.find((part) => part.id === hovered)?.label}</h4>
          <p>{parts.find((part) => part.id === hovered)?.info}</p>
        </motion.div>
      )}

      {/* Floating Parts */}
      {parts.map((part) => (
        <motion.div
          key={part.id}
          className={`part ${hovered === part.id ? "active" : ""}`}
          animate={part.floatPattern}
          transition={{
            duration: part.floatDuration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={part.position}
          onMouseEnter={() => setHovered(part.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <motion.div
            className="blob"
            style={{ borderRadius: part.blob }}
            animate={{
              borderRadius: [
                part.blob,
                "50% 50% 60% 40% / 50% 60% 40% 50%",
                part.blob,
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            <img src={part.src} alt={part.label} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
