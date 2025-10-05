import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TeamProfile.css";
import placeholder from "../assets/teampix/placeholder.png";

export default function TeamProfile() {
  const [flipped, setFlipped] = useState(Array(6).fill(false));

  const handleFlip = (index) => {
    setFlipped((prev) => prev.map((f, i) => (i === index ? !f : f)));
  };

  const team = [
    { name: "Harshiv Chandra", role: "Systems Architect", brief:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor justo non sapien faucibus, id rhoncus justo mattis." },
    { name: "Haihong Yu", role: "Embedded Engineer",brief:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor justo non sapien faucibus, id rhoncus justo mattis."  },
    { name: "Ajay Sekar", role: "Thermal Systems Lead",brief:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor justo non sapien faucibus, id rhoncus justo mattis."  },
    { name: "Bayan", role: "Design",brief:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor justo non sapien faucibus, id rhoncus justo mattis."  },
    { name: "Julianna Klek", role: "Power Systems Engineer",brief:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor justo non sapien faucibus, id rhoncus justo mattis."  },
    { name: "Vansh Gupta", role: "Mission Data Analyst",brief:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor justo non sapien faucibus, id rhoncus justo mattis."  },
  ];

  return (
    <div className="team-section text-light py-5">
      <div className="container text-center">
        <h1 className="fw-bold mb-5">Meet the Team</h1>
      </div>

      <div className="team-scroll d-flex justify-content-center px-4">
        {team.map((member, index) => (
          <div
            key={index}
            className={`flip-card ${flipped[index] ? "flipped" : ""}`}
            onClick={() => handleFlip(index)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front text-center p-4">
                <img
                  src={placeholder}
                  alt={member.name}
                  className="rounded-circle mb-3"
                  width="120"
                  height="120"
                />
                <h4>{member.name}</h4>
                <p className="text-muted small">{member.role}</p>
              </div>
              <div className="flip-card-back text-center p-4">
                <p className="small">
		 {member.brief}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

