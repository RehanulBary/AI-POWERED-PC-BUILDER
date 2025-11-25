import Header from "../components/Header";
import Footer from "../components/Footer";
import "./pcbuilder.css";
import cpuIcon from "../assets/cpu.png";
import motherboardIcon from "../assets/motherboard.png";
import ramIcon from "../assets/ram.png";
import ssdIcon from "../assets/ssd.png";
import psuIcon from "../assets/psu.png";
import caseIcon from "../assets/case.png";
import gpuIcon from "../assets/GPU.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBuilder } from "../BuilderContext";

export default function Builder() {
  const { builder, clearBuilder, removeComponent } = useBuilder();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    Object.values(builder).forEach((component) => {
      if (component && component.price) total += parseInt(component.price, 10);
    });
    setTotalPrice(total);
  }, [builder]);

  const components = [
    { key: "cpu", label: "Processor", icon: cpuIcon, requirement: "Select First", link: "/cpu" },
    { key: "mobo", label: "Motherboard", icon: motherboardIcon, requirement: "Select After CPU", link: "/motherboard" },
    { key: "ram", label: "RAM", icon: ramIcon, requirement: "Select After CPU", link: "/ram" },
    { key: "ssd", label: "Storage", icon: ssdIcon, link: "/ssd" },
    { key: "gpu", label: "Graphics Card", icon: gpuIcon, link: "/gpu" },
    { key: "psu", label: "Power Supply", icon: psuIcon, link: "/psu" },
    { key: "case", label: "Casing", icon: caseIcon, link: "/case" },
  ];

  return (
    <div className="builder-page-wrapper">
      <Header />
      <div className="super-mega-container">
        <div className="builder-container fade-in">
          <div className="title-container">
            <div className="title-left">
              <p className="title">Build Your Own PC</p>
              <button className="clear-build-btn" onClick={clearBuilder}>⟳ Clear Build</button>
            </div>
            <p className="total-price">৳{totalPrice}</p>
          </div>

          <div className="component-list">
            {components.map((comp, index) => (
              <div
                key={comp.key}
                className="component-card stagger"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <img src={comp.icon} alt={`${comp.label} Icon`} />
                <div className="component-info">
                  <p className="comp-title">
                    {comp.label}
                    {comp.requirement && <span className="required">{comp.requirement}</span>}
                  </p>
                  <p className="name">{builder[comp.key]?.name || "Not selected"}</p>
                </div>
                <div className="component-action">
                  <p className="price">৳{builder[comp.key]?.price || 0}</p>
                  <div className="action-buttons">
                    {builder[comp.key] && (
                      <button
                        className="clear-item-btn"
                        onClick={() => removeComponent(comp.key)}
                      >
                        ✕ Clear
                      </button>
                    )}
                    <Link to={comp.link}>
                      <button className="select-button">
                        {builder[comp.key] ? "Change" : "Choose"}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
