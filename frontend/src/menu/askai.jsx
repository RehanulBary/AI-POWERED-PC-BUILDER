import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./askai.css";
import { useBuilder } from "../BuilderContext.jsx";
import Footer from "../components/Footer.jsx";

export default function AskAI() {
  const { addToBuilder, clearBuilder } = useBuilder();
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState("gaming");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateBuild(e) {
    e.preventDefault();
    if (!budget.trim() || isNaN(budget)) {
      setError("Please enter a valid budget number.");
      return;
    }

    setLoading(true);
    setError("");
    clearBuilder();

    const message = `Build a PC for ${purpose} with a budget of ${budget} BDT.`;

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error(`Server responded with status: ${res.status}`);
      const data = await res.json();

      if (data.reply) {
        parseBuildToContext(data.reply);
        navigate("/builder");
      } else {
        setError(data.error || "Received empty response from server.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate build. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function parseBuildToContext(buildText) {
    // 🔥 FIX: Changed split("") to split("")
    const lines = buildText.split("\n").map(line => line.trim()).filter(Boolean);

    lines.forEach(line => {
      const match = line.match(/^(\w+):\s*"(.+?)",\s*Price:\s*"(.+?)"$/i);
      if (match) {
        const key = match[1].toLowerCase();
        const value = { name: match[2], price: match[3] };

        switch (key) {
          case "cpu": addToBuilder("cpu", value); break;
          case "gpu": addToBuilder("gpu", value); break;
          case "motherboard": addToBuilder("mobo", value); break;
          case "ram": addToBuilder("ram", value); break;
          case "storage": addToBuilder("ssd", value); break;
          case "psu": addToBuilder("psu", value); break;
          case "case": addToBuilder("case", value); break;
          case "total": addToBuilder("total", value); break;
          default: break;
        }
      }
    });
  }

  return (
    <div className="askai-page-wrapper">
      <Header />
      <main className="askai-main">
        <div className="generator-container">
          <h1>AI PC Build Generator</h1>
          <p>Select your primary use case and enter your budget to get a custom PC build suggestion.</p>
          
          <form onSubmit={generateBuild} className="build-form">
            <div className="form-group">
              <label htmlFor="purpose">Purpose:</label>
              <select
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                disabled={loading}
              >
                <option value="gaming">Gaming</option>
                <option value="video editing">Video Editing</option>
                <option value="programming">Programming</option>
                <option value="3d rendering">3D Rendering</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget (in BDT):</label>
              <input
                type="number"
                id="budget"
                placeholder="e.g., 85000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                disabled={loading}
              />
            </div>
            
            <button type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate Build"}
            </button>
          </form>

          {loading && (
            <div className="loading-indicator">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
          
          {error && <p className="error-message">{error}</p>}
        </div>
      </main>
      <Footer/>
    </div>
  );
}