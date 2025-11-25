import Header from "../components/Header";
import Footer from "../components/Footer";
import "./mobo.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBuilder } from "../BuilderContext.jsx";

function Ram() {
  const { addToBuilder, removeFromBuilder, builder } = useBuilder();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    brand: [],
    type: [],
    capacity: [],
  });

  const brandOptions = ["Corsair", "Kingston", "ADATA", "TeamGroup", "G.Skill", "Patriot"];
  const typeOptions = ["DDR4", "DDR5"];
  const capacityOptions = ["8GB", "16GB", "32GB", "64GB", "128GB"];

  const socketDdrCompatibility = {
    AM4: ["DDR4"],
    AM5: ["DDR5"],
    LGA1700: ["DDR4", "DDR5"],
    LGA1851: ["DDR5"],
  };

  const selectedCpu = builder?.cpu || null;
  const selectedMobo = builder?.mobo || null;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/ram");
        if (!response.ok) throw new Error("Not Ok");
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("error fetching data", err);
      }
    };
    fetchItems();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      const arr = prev[filterType].includes(value)
        ? prev[filterType].filter((v) => v !== value)
        : [...prev[filterType], value];
      return { ...prev, [filterType]: arr };
    });
  };

  const handleSortChange = (order) => setSortOrder(order);
  const handleLearnMore = (ram) => setSelectedItem(ram);
  const handleClosePopup = () => setSelectedItem(null);

  const checkRamCompatibility = (ram) => {
    const reasons = [];
    let isCompatible = true;

    if (selectedMobo) {
      if (ram.type !== selectedMobo.ramtype) {
        isCompatible = false;
        reasons.push(
          `RAM type mismatch: RAM is ${ram.type}, motherboard supports ${selectedMobo.ramtype}`
        );
      }
    }

    if (selectedCpu) {
      const supportedDdr = socketDdrCompatibility[selectedCpu.socket] || [];
      if (!supportedDdr.includes(ram.type)) {
        isCompatible = false;
        reasons.push(
          `CPU compatibility: ${selectedCpu.socket} socket supports ${supportedDdr.join("/")}, RAM is ${ram.type}`
        );
      }
    }

    return { isCompatible, reasons };
  };

  const filteredItems = items.filter((item) => {
    if (filters.brand.length && !filters.brand.includes(item.brand)) return false;
    if (filters.type.length && !filters.type.includes(item.type)) return false;
    if (filters.capacity.length && !filters.capacity.includes(item.capacity)) return false;
    return true;
  });

  const { supportedRams, unsupportedRams } = filteredItems.reduce(
    (acc, ram) => {
      const { isCompatible, reasons } = checkRamCompatibility(ram);
      if (isCompatible) {
        acc.supportedRams.push(ram);
      } else {
        acc.unsupportedRams.push({ ...ram, incompatibilityReasons: reasons });
      }
      return acc;
    },
    { supportedRams: [], unsupportedRams: [] }
  );

  const sortItems = (itemList) =>
    [...itemList].sort((a, b) => {
      if (sortOrder === "asc") return Number(a.price) - Number(b.price);
      if (sortOrder === "desc") return Number(b.price) - Number(a.price);
      return 0;
    });

  const sortedSupportedRams = sortItems(supportedRams);
  const sortedUnsupportedRams = sortItems(unsupportedRams);

  const getCompatibilityReasonMessage = () => {
    const reasons = [];

    if (selectedCpu) {
      const supportedDdr = socketDdrCompatibility[selectedCpu.socket] || [];
      reasons.push(
        <span key="cpu">
          <strong>CPU:</strong> {selectedCpu.name} (Socket:{" "}
          <span className="highlight-socket">{selectedCpu.socket}</span> → Supports{" "}
          <span className="highlight-ddr">{supportedDdr.join("/")}</span>)
        </span>
      );
    }

    if (selectedMobo) {
      reasons.push(
        <span key="mobo">
          <strong>Motherboard:</strong> {selectedMobo.name} (RAM Type:{" "}
          <span className="highlight-ddr">{selectedMobo.ramtype}</span>)
        </span>
      );
    }

    return reasons;
  };

  const hasSelectedComponents = selectedCpu || selectedMobo;

  const renderRamCard = (item, isSupported = true) => (
    <div
      className={`item-card ${!isSupported ? "incompatible-card" : ""}`}
      key={item.productid}
    >
      {!isSupported && (
        <div className="incompatible-badge">
          <span>Incompatible</span>
        </div>
      )}

      <img
        src={`http://localhost:3000/images/by-id/${item.productid}`}
        alt={item.name}
        className={!isSupported ? "incompatible-img" : ""}
      />

      <h3>{item.name}</h3>
      <p>
        <strong>Brand:</strong> {item.brand}
      </p>
      <p>
        <strong>Capacity:</strong> {item.capacity}
      </p>
      <p>
        <strong>Type:</strong> {item.type}
      </p>
      <p>
        <strong>Speed:</strong> {item.frequency}MHz
      </p>

      {!isSupported && item.incompatibilityReasons && (
        <div className="incompatibility-reasons">
          {item.incompatibilityReasons.map((reason, idx) => (
            <p key={idx} className="incompatibility-reason">
              ⚠️ {reason}
            </p>
          ))}
        </div>
      )}

      <p className="price-of-product">
        <span className="item-price">৳{item.price}</span>
      </p>

      <div className="card-actions">
        <button
          className={`add-to-builder-btnn ${!isSupported ? "disabled-btn" : ""}`}
          onClick={() => {
            if (!isSupported) return;
            removeFromBuilder("ram");
            addToBuilder("ram", item);
            navigate("/builder");
          }}
          disabled={!isSupported}
        >
          {isSupported ? "Add to Builder" : "Incompatible"}
        </button>
        <button
          className="learn-more-btn"
          onClick={() => handleLearnMore(item)}
        >
          Details
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <h2 className="item-title">Memory (RAM)</h2>

      <div className="item-main-layout">
        {/* Filter Sidebar */}
        <aside className="item-filter-section">
          <h4>Filter</h4>

          <div className="filter-group">
            <span className="filter-label">Type</span>
            {typeOptions.map((type) => (
              <label key={type} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.type.includes(type)}
                  onChange={() => handleFilterChange("type", type)}
                />
                <span>{type}</span>
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
            <span className="filter-label">Capacity</span>
            {capacityOptions.map((capacity) => (
              <label key={capacity} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.capacity.includes(capacity)}
                  onChange={() => handleFilterChange("capacity", capacity)}
                />
                <span>{capacity}</span>
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
                  {sortedSupportedRams.length} Compatible
                </span>
                <span className="unsupported-count">
                  {sortedUnsupportedRams.length} Incompatible
                </span>
              </div>
            </div>
          )}

          {/* Conditional Rendering based on selected components */}
          {hasSelectedComponents ? (
            <>
              {/* Supported RAMs Section */}
              <div className="section-header supported-header">
                <h3>Compatible RAM ({sortedSupportedRams.length})</h3>
                <p className="section-description">
                  These RAM modules are fully compatible with your selected components.
                </p>
              </div>

              {sortedSupportedRams.length > 0 ? (
                <div className="list-container">
                  {sortedSupportedRams.map((item) => renderRamCard(item, true))}
                </div>
              ) : (
                <div className="no-items-message">
                  <p>No compatible RAM found with your current selections.</p>
                  <p>Try changing your CPU or motherboard selection.</p>
                </div>
              )}

              {/* Unsupported RAMs Section */}
              {sortedUnsupportedRams.length > 0 && (
                <>
                  <div className="section-header unsupported-header">
                    <h3>Incompatible RAM ({sortedUnsupportedRams.length})</h3>
                    <p className="section-description">
                      These RAM modules are not compatible with your selected components.
                    </p>
                  </div>

                  <div className="list-container incompatible-list">
                    {sortedUnsupportedRams.map((item) => renderRamCard(item, false))}
                  </div>
                </>
              )}
            </>
          ) : (
            // No components selected - show all RAMs
            <>
              <div className="section-header all-items-header">
                <h3>All RAM ({filteredItems.length})</h3>
                <p className="section-description">
                  Select a CPU or motherboard first to see compatibility filtering.
                </p>
              </div>

              <div className="list-container">
                {sortItems(filteredItems).map((item) => renderRamCard(item, true))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Modal Popup */}
      <div
        className={`item-popup-overlay ${selectedItem ? "active" : ""}`}
        onClick={handleClosePopup}
      >
        {selectedItem && (
          <div className="item-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup-btn" onClick={handleClosePopup}>
              ✕
            </button>
            <div className="item-popup-content">
              <img
                src={`http://localhost:3000/images/by-id/${selectedItem.productid}`}
                alt={selectedItem.name}
                className="item-popup-img"
              />
              <div className="item-popup-info">
                <h3>{selectedItem.name}</h3>
                <p>
                  <strong>Brand:</strong> {selectedItem.brand}
                </p>
                <p>
                  <strong>Capacity:</strong> {selectedItem.capacity}
                </p>
                <p>
                  <strong>Type:</strong> {selectedItem.type}
                </p>
                <p>
                  <strong>Speed:</strong> {selectedItem.frequency}MHz
                </p>
                <p>
                  <strong>CAS Latency:</strong> {selectedItem.caslatency}
                </p>
                <p>
                  <strong>Voltage:</strong> 1.35V
                </p>

                {/* Show compatibility status in popup */}
                {hasSelectedComponents && (
                  <div className="popup-compatibility-status">
                    {checkRamCompatibility(selectedItem).isCompatible ? (
                      <span className="compatible-status">
                        Compatible with your build
                      </span>
                    ) : (
                      <div className="incompatible-status">
                        <span>Incompatible</span>
                        <ul>
                          {checkRamCompatibility(selectedItem).reasons.map(
                            (reason, idx) => (
                              <li key={idx}>{reason}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <p className="item-popup-price">৳{selectedItem.price}</p>

                <div className="item-popup-actions">
                  <button className="learn-more-btn" onClick={handleClosePopup}>
                    Close
                  </button>
                  <button
                    className={`add-to-builder-btnn ${
                      hasSelectedComponents &&
                      !checkRamCompatibility(selectedItem).isCompatible
                        ? "disabled-btn"
                        : ""
                    }`}
                    onClick={() => {
                      if (
                        hasSelectedComponents &&
                        !checkRamCompatibility(selectedItem).isCompatible
                      ) {
                        return;
                      }
                      removeFromBuilder("ram");
                      addToBuilder("ram", selectedItem);
                      navigate("/builder");
                    }}
                    disabled={
                      hasSelectedComponents &&
                      !checkRamCompatibility(selectedItem).isCompatible
                    }
                  >
                    {hasSelectedComponents &&
                    !checkRamCompatibility(selectedItem).isCompatible
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

export default Ram;