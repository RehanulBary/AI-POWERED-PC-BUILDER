import "./PartsGrid.css";
import cpuIcon from "../assets/cpu.png";
import motherboardIcon from "../assets/motherboard.png";
import ramIcon from "../assets/ram.png";
import ssdIcon from "../assets/ssd.png";
import psuIcon from "../assets/psu.png";
import caseIcon from "../assets/case.png";
import GPU from "../assets/GPU.png";
import { Link } from "react-router-dom";

const parts = [
  { name: "CPU", icon: cpuIcon },
  { name: "Motherboard", icon: motherboardIcon },
  { name: "Ram", icon: ramIcon },
  { name: "SSD", icon: ssdIcon },
  { name: "GPU", icon: GPU },
  { name: "PSU", icon: psuIcon },
  { name: "Case", icon: caseIcon },
];

const PartsGrid = () => (
  <section className="parts-grid-section fade-in">
    <h2>Select Your Components</h2>
    <div className="parts-grid">
      {parts.map((part, index) => (
        <Link to={part.name} key={part.name}>
          <div
            className="part-card stagger"
            style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
          >
            <div className="part-card-inner">
              <img
                src={part.icon}
                alt={part.name + " icon"}
                className="part-icon"
              />
              <span>{part.name}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default PartsGrid;
