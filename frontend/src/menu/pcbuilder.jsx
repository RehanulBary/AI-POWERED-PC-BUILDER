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
  const { builder, clearBuilder } = useBuilder();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    Object.values(builder).forEach((component) => {
      if (component && component.price) total += parseInt(component.price, 10);
    });
    setTotalPrice(total);
  }, [builder]);

  return (
    <div className="builder-page-wrapper">
      <Header />
      <div className="super-mega-container">
        <div className="builder-container fade-in">
          <div className="title-container">
            <div className="title-left">
              <p className="title">Build Your Own PC</p>
              <button className="clear-build-btn" onClick={clearBuilder}>
                ⟳ Clear Build
              </button>
            </div>
            <p className="total-price">৳{totalPrice}</p>
          </div>

          <div className="component-list">
            {/* CPU */}
            <div
              className="component-card stagger"
              style={{ animationDelay: "0.1s" }}
            >
              <img src={cpuIcon} alt="CPU Icon" />
              <div className="component-info">
                <p className="comp-title">
                  Processor <span className="required">Select First</span>
                </p>
                <p className="name">{builder.cpu?.name || "Not selected"}</p>
              </div>
              <div className="component-action">
                <p className="price">৳{builder.cpu?.price || 0}</p>
                <Link to="/cpu">
                  <button className="select-button">Choose</button>
                </Link>
              </div>
            </div>

            {/* Motherboard */}
            <div
              className="component-card stagger"
              style={{ animationDelay: "0.2s" }}
            >
              <img src={motherboardIcon} alt="MOBO Icon" />
              <div className="component-info">
                <p className="comp-title">
                  Motherboard <span className="required">Select After CPU</span>
                </p>
                <p className="name">{builder.mobo?.name || "Not selected"}</p>
              </div>
              <div className="component-action">
                <p className="price">৳{builder.mobo?.price || 0}</p>
                <Link to="/motherboard">
                  <button className="select-button">Choose</button>
                </Link>
              </div>
            </div>

            {/* RAM */}
            <div
              className="component-card stagger"
              style={{ animationDelay: "0.3s" }}
            >
              <img src={ramIcon} alt="RAM Icon" />
              <div className="component-info">
                <p className="comp-title">
                  RAM <span className="required">Select After CPU</span>
                </p>
                <p className="name">{builder.ram?.name || "Not selected"}</p>
              </div>
              <div className="component-action">
                <p className="price">৳{builder.ram?.price || 0}</p>
                <Link to="/ram">
                  <button className="select-button">Choose</button>
                </Link>
              </div>
            </div>

            {/* SSD */}
            <div
              className="component-card stagger"
              style={{ animationDelay: "0.4s" }}
            >
              <img src={ssdIcon} alt="SSD Icon" />
              <div className="component-info">
                <p className="comp-title">Storage</p>
                <p className="name">{builder.ssd?.name || "Not selected"}</p>
              </div>
              <div className="component-action">
                <p className="price">৳{builder.ssd?.price || 0}</p>
                <Link to="/ssd">
                  <button className="select-button">Choose</button>
                </Link>
              </div>
            </div>

            {/* GPU */}
            <div
              className="component-card stagger"
              style={{ animationDelay: "0.5s" }}
            >
              <img src={gpuIcon} alt="GPU Icon" />
              <div className="component-info">
                <p className="comp-title">Graphics Card</p>
                <p className="name">{builder.gpu?.name || "Not selected"}</p>
              </div>
              <div className="component-action">
                <p className="price">৳{builder.gpu?.price || 0}</p>
                <Link to="/gpu">
                  <button className="select-button">Choose</button>
                </Link>
              </div>
            </div>

            {/* PSU */}
            <div
              className="component-card stagger"
              style={{ animationDelay: "0.6s" }}
            >
              <img src={psuIcon} alt="PSU Icon" />
              <div className="component-info">
                <p className="comp-title">Power Supply</p>
                <p className="name">{builder.psu?.name || "Not selected"}</p>
              </div>
              <div className="component-action">
                <p className="price">৳{builder.psu?.price || 0}</p>
                <Link to="/psu">
                  <button className="select-button">Choose</button>
                </Link>
              </div>
            </div>

            {/* Case */}
            <div
              className="component-card stagger"
              style={{ animationDelay: "0.7s" }}
            >
              <img src={caseIcon} alt="Case Icon" />
              <div className="component-info">
                <p className="comp-title">Casing</p>
                <p className="name">{builder.case?.name || "Not selected"}</p>
              </div>
              <div className="component-action">
                <p className="price">৳{builder.case?.price || 0}</p>
                <Link to="/case">
                  <button className="select-button">Choose</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}