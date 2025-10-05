import React, { useState } from "react";
import "./TeamProfile.css";

import ajey from "../../assets/teampix/ajey.jpg";
import hh from "../../assets/teampix/hh.jpg";
import vansh from "../../assets/teampix/vansh.jpeg";
import harshiv from "../../assets/teampix/harshiv.jpg";
import jules from "../../assets/teampix/jules.jpg";
import bayan from "../../assets/teampix/bayan.jpeg"
import placeholder from "../../assets/teampix/placeholder.png";

export default function TeamProfile() {
  const [flipped, setFlipped] = useState(Array(6).fill(false));

  const handleFlip = (index) => {
    setFlipped((prev) => prev.map((f, i) => (i === index ? !f : f)));
  };

  const team = [
    {
      name: "Harshiv Chandra",
      image: harshiv,
      role: "Frontend & Ideation",
      brief:
        "BITS Pilani alum and Master’s student in Computer Engineering at NUS, with research experience in deep learning and multiple publications.",
    },
    {
      name: "Haihong Yu",
      image: hh,
      role: "Design & Ideation",
      brief:
        "Master student in Computer Engineering at NUS, Satellite research engineer, Part time locking dancer, Amateur photographer/DJ",
    },
    {
      name: "Ajay Sekar",
      image: ajey,
      role: "System Ideation & Architect",
      brief:
        "Aerospace innovator combining design, simulation, and prototyping to solve complex engineering challenges.",
    },
    {
      name: "Bayan Alqassab",
      image: bayan,
      role: "Design & UI/UX",
      brief:
        "Pursuing a Master’s in Engineering Design and Innovation at NUS, I excel in industrial design, 3D printing, sustainable innovation and creativity.",
    },
    {
      name: "Julianna Klek",
      image: jules,
      role: "System Architect & Analyst",
      brief:
        "LSE alum with deep-tech startup and BCG experience, pursuing MSc Engineering Design at NUS. Marathon swimmer.",
    },
    {
      name: "Vansh Gupta",
      image: vansh,
      role: "Frontend & UI/UX",
      brief:
        "BITS Pilani alum with startup and tech experience, currently working fulltime in a law related firm.",
    },
  ];

  return (
    <div className="team-section">
      <h1 className="title">Meet the Team</h1>
      <div className="team-scroll">
        {team.map((member, index) => (
          <div
            key={index}
            className={`flip-card ${flipped[index] ? "flipped" : ""}`}
            onClick={() => handleFlip(index)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={member.image} alt={member.name} className="avatar" />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
              <div className="flip-card-back">
                <p>{member.brief}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
