import React, { useState } from "react";
import "./TeamProfile.css";

import ajey from "../../assets/teampix/ajey.jpg";
import hh from "../../assets/teampix/hh.jpg";
import vansh from "../../assets/teampix/vansh.jpeg";
import harshiv from "../../assets/teampix/harshiv.jpg";
import jules from "../../assets/teampix/jules.jpg";
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
      role: "Systems Architect",
      brief:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor justo non sapien faucibus, id rhoncus justo mattis.",
    },
    {
      name: "Haihong Yu",
      image: hh,
      role: "Embedded Engineer",
      brief:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor justo non sapien faucibus, id rhoncus justo mattis.",
    },
    {
      name: "Ajay Sekar",
      image: ajey,
      role: "Thermal Systems Lead",
      brief:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor justo non sapien faucibus, id rhoncus justo mattis.",
    },
    {
      name: "Bayan",
      image: placeholder,
      role: "Design",
      brief:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor justo non sapien faucibus, id rhoncus justo mattis.",
    },
    {
      name: "Julianna Klek",
      image: jules,
      role: "Power Systems Engineer",
      brief:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor justo non sapien faucibus, id rhoncus justo mattis.",
    },
    {
      name: "Vansh Gupta",
      image: vansh,
      role: "Developer | AI Engineer",
      brief:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor justo non sapien faucibus, id rhoncus justo mattis.",
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
