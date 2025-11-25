import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBuilder } from "../BuilderContext.jsx";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./mobo.css";

function CPU() {
  const navigate = useNavigate();
  const { builder, addToBuilder, removeFromBuilder } = useBuilder();

  const [cpus, setCpus] = useState([]);
  const [selectedCpu, setSelectedCpu] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const [filters, setFilters] = useState({
    cores: [],
    brand: [],
    price: "",
    socket: [],
  });

  const coreOptions = [4, 6, 8, 12, 16];
  const brandOptions = ["Intel", "AMD"];
  const socketOptions = ["AM4", "AM5", "LGA1700", "LGA1851"];
  const priceOptions = [
    { label: "৳10,000 - ৳20,000", value: "10-20" },
    { label: "৳20,000 - ৳40,000", value: "20-40" },
    { label: "৳40,000 - ৳60,000", value: "40-60" },
    { label: "৳60,000 - ৳100,000", value: "60-100" },
  ];

  const socketDdrCompatibility = {
    AM4: ["DDR4"],
    AM5: ["DDR5"],
    LGA1700: ["DDR4", "DDR5"],
    LGA1851: ["DDR5"],
  };

  const selectedMobo = builder?.mobo || null;
  const selectedRam = builder?.ram || null;

  useEffect(() => {
    const fetchCpus = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cpu");
        if (!response.ok) throw new Error("Failed to fetch CPUs");
        const data = await response.json();
        setCpus(data);
      } catch (err) {
        console.error("Error fetching CPUs:", err);
      }
    };
    fetchCpus();
  }, []);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === "cores" || type === "brand" || type === "socket") {
        const arr = prev[type].includes(value)
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value];
        return { ...prev, [type]: arr };
      }
      if (type === "price") {
        return { ...prev, price: value };
      }
      return prev;
    });
  };

  const handleSortChange = (order) => setSortOrder(order);
  const handleLearnMore = (cpu) => setSelectedCpu(cpu);
  const handleClosePopup = () => setSelectedCpu(null);

  const checkCpuCompatibility = (cpu) => {
    const reasons = [];
    let isCompatible = true;

    if (selectedMobo) {
      if (cpu.socket !== selectedMobo.socket) {
        isCompatible = false;
        reasons.push(
          `Socket mismatch: CPU uses ${cpu.socket}, motherboard uses ${selectedMobo.socket}`
        );
      }
    }

    if (selectedRam) {
      const ramDdr = selectedRam.ddr || selectedRam.type;
      const supportedDdr = socketDdrCompatibility[cpu.socket] || [];

      if (!supportedDdr.includes(ramDdr)) {
        isCompatible = false;
        reasons.push(
          `DDR mismatch: CPU socket ${cpu.socket} supports ${supportedDdr.join("/")}, RAM is ${ramDdr}`
        );
      }
    }

    return { isCompatible, reasons };
  };

  const filteredCpus = cpus.filter((cpu) => {
    if (filters.cores.length && !filters.cores.includes(cpu.cores))
      return false;
    if (filters.brand.length && !filters.brand.includes(cpu.brand))
      return false;
    if (filters.socket.length && !filters.socket.includes(cpu.socket))
      return false;
    if (filters.price) {
      const price = cpu.price;
      if (filters.price === "10-20" && !(price >= 10000 && price <= 20000))
        return false;
      if (filters.price === "20-40" && !(price > 20000 && price <= 40000))
        return false;
      if (filters.price === "40-60" && !(price > 40000 && price <= 60000))
        return false;
      if (filters.price === "60-100" && !(price > 60000 && price <= 100000))
        return false;
    }
    return true;
  });

  const { supportedCpus, unsupportedCpus } = filteredCpus.reduce(
    (acc, cpu) => {
      const { isCompatible, reasons } = checkCpuCompatibility(cpu);
      if (isCompatible) {
        acc.supportedCpus.push(cpu);
      } else {
        acc.unsupportedCpus.push({ ...cpu, incompatibilityReasons: reasons });
      }
      return acc;
    },
    { supportedCpus: [], unsupportedCpus: [] }
  );

  const sortCpus = (cpuList) =>
    [...cpuList].sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const sortedSupportedCpus = sortCpus(supportedCpus);
  const sortedUnsupportedCpus = sortCpus(unsupportedCpus);

  const getCompatibilityReasonMessage = () => {
    const reasons = [];

    if (selectedMobo) {
      reasons.push(
        <span key="mobo">
          <strong>Motherboard:</strong> {selectedMobo.name} (Socket:{" "}
          <span className="highlight-socket">{selectedMobo.socket}</span>)
        </span>
      );
    }

    if (selectedRam) {
      const ramDdr = selectedRam.ddr || selectedRam.type;
      reasons.push(
        <span key="ram">
          <strong>RAM:</strong> {selectedRam.name} (Type:{" "}
          <span className="highlight-ddr">{ramDdr}</span>)
        </span>
      );
    }

    return reasons;
  };

  const hasSelectedComponents = selectedMobo || selectedRam;

  const renderCpuCard = (cpu, isSupported = true) => (
    <div
      className={`item-card ${!isSupported ? "incompatible-card" : ""}`}
      key={cpu.productid}
    >
      {!isSupported && (
        <div className="incompatible-badge">
          <span>Incompatible</span>
        </div>
      )}

      <img
        src={`http://localhost:3000/images/by-id/${cpu.productid}`}
        alt={cpu.name}
        className={!isSupported ? "incompatible-img" : ""}
      />

      <h3>{cpu.name}</h3>
      <p>
        <strong>Brand:</strong> {cpu.brand}
      </p>
      <p>
        <strong>Socket:</strong> {cpu.socket}
      </p>
      <p>
        <strong>Cores:</strong> {cpu.cores}
      </p>
      <p>
        <strong>Threads:</strong> {cpu.threads}
      </p>

      {!isSupported && cpu.incompatibilityReasons && (
        <div className="incompatibility-reasons">
          {cpu.incompatibilityReasons.map((reason, idx) => (
            <p key={idx} className="incompatibility-reason">
              ⚠️ {reason}
            </p>
          ))}
        </div>
      )}

      <p className="price-of-product">
        <span className="item-price">৳{cpu.price}</span>
      </p>

      <div className="card-actions">
        <button
          className={`add-to-builder-btnn ${!isSupported ? "disabled-btn" : ""}`}
          onClick={() => {
            if (!isSupported) return;
            removeFromBuilder("cpu");
            removeFromBuilder("mobo");
            removeFromBuilder("ram");
            addToBuilder("cpu", cpu);
            navigate("/builder");
          }}
          disabled={!isSupported}
        >
          {isSupported ? "Add to Builder" : "Incompatible"}
        </button>
        <button
          className="learn-more-btn"
          onClick={() => handleLearnMore(cpu)}
        >
          Details
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <h2 className="item-title">Processors (CPU)</h2>

      <div className="item-main-layout">
        {/* Filter Sidebar */}
        <aside className="item-filter-section">
          <h4>Filter</h4>

          <div className="filter-group">
            <span className="filter-label">Cores</span>
            {coreOptions.map((core) => (
              <label key={core} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.cores.includes(core)}
                  onChange={() => handleFilterChange("cores", core)}
                />
                <span>{core}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <span className="filter-label">Brand</span>
            {brandOptions.map((brand) => (
              <label key={brand} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.brand.includes(brand)}
                  onChange={() => handleFilterChange("brand", brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <span className="filter-label">Socket</span>
            {socketOptions.map((socket) => (
              <label key={socket} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.socket.includes(socket)}
                  onChange={() => handleFilterChange("socket", socket)}
                />
                <span>{socket}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <span className="filter-label">Price Range</span>
            {priceOptions.map((opt) => (
              <label key={opt.value} className="filter-radio">
                <input
                  type="radio"
                  name="price"
                  checked={filters.price === opt.value}
                  onChange={() => handleFilterChange("price", opt.value)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="list-section">
          <div className="sort-dropdown">
            <label htmlFor="sortOrder" className="sort-label">
              Sort by:
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="">Default</option>
              <option value="asc">Price (Low to High)</option>
              <option value="desc">Price (High to Low)</option>
            </select>
          </div>

          {/* Compatibility Reason Section */}
          {hasSelectedComponents && (
            <div className="compatibility-reason-section">
              <div className="compatibility-header">
                <h3>Filtering based on your selections:</h3>
              </div>
              <div className="compatibility-details">
                {getCompatibilityReasonMessage().map((reason, idx) => (
                  <div key={idx} className="compatibility-item">
                    {reason}
                  </div>
                ))}
              </div>
              <div className="compatibility-summary">
                <span className="supported-count">
                  {sortedSupportedCpus.length} Compatible
                </span>
                <span className="unsupported-count">
                  {sortedUnsupportedCpus.length} Incompatible
                </span>
              </div>
            </div>
          )}

          {/* Supported CPUs Section */}
          {hasSelectedComponents ? (
            <>
              <div className="section-header supported-header">
                <h3>Compatible CPUs ({sortedSupportedCpus.length})</h3>
                <p className="section-description">
                  These CPUs are fully compatible with your selected components.
                </p>
              </div>

              {sortedSupportedCpus.length > 0 ? (
                <div className="list-container">
                  {sortedSupportedCpus.map((cpu) => renderCpuCard(cpu, true))}
                </div>
              ) : (
                <div className="no-items-message">
                  <p>No compatible CPUs found with your current selections.</p>
                  <p>Try changing your motherboard or RAM selection.</p>
                </div>
              )}

              {/* Unsupported CPUs Section */}
              {sortedUnsupportedCpus.length > 0 && (
                <>
                  <div className="section-header unsupported-header">
                    <h3>Incompatible CPUs ({sortedUnsupportedCpus.length})</h3>
                    <p className="section-description">
                      These CPUs are not compatible with your selected components.
                    </p>
                  </div>

                  <div className="list-container incompatible-list">
                    {sortedUnsupportedCpus.map((cpu) => renderCpuCard(cpu, false))}
                  </div>
                </>
              )}
            </>
          ) : (
            // No components selected - show all CPUs
            <>
              <div className="section-header all-items-header">
                <h3>All CPUs ({filteredCpus.length})</h3>
                <p className="section-description">
                  Select a motherboard or RAM first to see compatibility filtering.
                </p>
              </div>

              <div className="list-container">
                {sortCpus(filteredCpus).map((cpu) => renderCpuCard(cpu, true))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Popup Modal */}
      <div
        className={`item-popup-overlay ${selectedCpu ? "active" : ""}`}
        onClick={handleClosePopup}
      >
        {selectedCpu && (
          <div className="item-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup-btn" onClick={handleClosePopup}>
              ×
            </button>

            <div className="item-popup-content">
              <img
                src={`http://localhost:3000/images/by-id/${selectedCpu.productid}`}
                alt={selectedCpu.name}
                className="item-popup-img"
              />
              <div className="item-popup-info">
                <h3>{selectedCpu.name}</h3>
                <p>
                  <strong>Brand:</strong> {selectedCpu.brand}
                </p>
                <p>
                  <strong>Socket:</strong> {selectedCpu.socket}
                </p>
                <p>
                  <strong>Cores:</strong> {selectedCpu.cores}
                </p>
                <p>
                  <strong>Threads:</strong> {selectedCpu.threads}
                </p>
                <p>
                  <strong>Clock Speed:</strong> {selectedCpu.clockspeed}
                </p>
                <p>
                  <strong>Cache:</strong> {selectedCpu.cache}
                </p>

                {/* Show compatibility status in popup */}
                {hasSelectedComponents && (
                  <div className="popup-compatibility-status">
                    {checkCpuCompatibility(selectedCpu).isCompatible ? (
                      <span className="compatible-status">Compatible with your build</span>
                    ) : (
                      <div className="incompatible-status">
                        <span>Incompatible</span>
                        <ul>
                          {checkCpuCompatibility(selectedCpu).reasons.map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <p className="item-popup-price">৳{selectedCpu.price}</p>

                <div className="item-popup-actions">
                  <button className="learn-more-btn" onClick={handleClosePopup}>
                    Close
                  </button>
                  <button
                    className={`add-to-builder-btnn ${
                      hasSelectedComponents && !checkCpuCompatibility(selectedCpu).isCompatible
                        ? "disabled-btn"
                        : ""
                    }`}
                    onClick={() => {
                      if (
                        hasSelectedComponents &&
                        !checkCpuCompatibility(selectedCpu).isCompatible
                      ) {
                        return;
                      }
                      removeFromBuilder("cpu");
                      removeFromBuilder("mobo");
                      removeFromBuilder("ram");
                      addToBuilder("cpu", selectedCpu);
                      navigate("/builder");
                    }}
                    disabled={
                      hasSelectedComponents &&
                      !checkCpuCompatibility(selectedCpu).isCompatible
                    }
                  >
                    {hasSelectedComponents &&
                    !checkCpuCompatibility(selectedCpu).isCompatible
                      ? "Incompatible"
                      : "Add to Builder"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default CPU;