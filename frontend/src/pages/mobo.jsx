import Header from "../components/Header";
import Footer from "../components/Footer";
import "./mobo.css";
import React, { useEffect, useState } from "react";
import { useBuilder } from "../BuilderContext.jsx";
import { useNavigate } from "react-router-dom";

function Motherboard() {
  const { addToBuilder, removeFromBuilder, builder } = useBuilder();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    brand: [],
    price: "",
    socket: [],
  });

  const brandOptions = ["MSI", "Gigabyte", "AsRock", "Asus"];
  const socketOptions = ["AM4", "AM5", "LGA1700", "LGA1851"];
  const priceOptions = [
    { label: "৳1,000 - ৳10,000", value: "01-10" },
    { label: "৳10,000 - ৳20,000", value: "10-20" },
    { label: "৳20,000 - ৳30,000", value: "20-30" },
    { label: "৳30,000+", value: "30-100" },
  ];

  const selectedCpu = builder?.cpu || null;
  const selectedRam = builder?.ram || null;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/mobo");
        if (!response.ok) throw new Error("Not Ok");
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("error fetching data", err);
      }
    };
    fetchItems();
  }, []);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === "brand" || type === "socket") {
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
  const handleLearnMore = (mobo) => setSelectedItem(mobo);
  const handleClosePopup = () => setSelectedItem(null);

  const checkMoboCompatibility = (mobo) => {
    const reasons = [];
    let isCompatible = true;

    if (selectedCpu) {
      if (mobo.socket !== selectedCpu.socket) {
        isCompatible = false;
        reasons.push(
          `Socket mismatch: Motherboard uses ${mobo.socket}, CPU uses ${selectedCpu.socket}`
        );
      }
    }

    if (selectedRam) {
      const ramDdr = selectedRam.ddr || selectedRam.type; 
      const moboRamType = mobo.ramtype; 

      if (moboRamType !== ramDdr) {
        isCompatible = false;
        reasons.push(
          `RAM type mismatch: Motherboard supports ${moboRamType}, RAM is ${ramDdr}`
        );
      }
    }

    return { isCompatible, reasons };
  };

  const filteredItems = items.filter((item) => {
    if (filters.brand.length && !filters.brand.includes(item.brand)) return false;
    if (filters.socket.length && !filters.socket.includes(item.socket)) return false;
    if (filters.price) {
      const price = item.price;
      if (filters.price === "01-10" && !(price >= 1000 && price <= 10000)) return false;
      if (filters.price === "10-20" && !(price > 10000 && price <= 20000)) return false;
      if (filters.price === "20-30" && !(price > 20000 && price <= 30000)) return false;
      if (filters.price === "30-100" && !(price > 30000 && price <= 100000)) return false;
    }
    return true;
  });

  const { supportedMobos, unsupportedMobos } = filteredItems.reduce(
    (acc, mobo) => {
      const { isCompatible, reasons } = checkMoboCompatibility(mobo);
      if (isCompatible) {
        acc.supportedMobos.push(mobo);
      } else {
        acc.unsupportedMobos.push({ ...mobo, incompatibilityReasons: reasons });
      }
      return acc;
    },
    { supportedMobos: [], unsupportedMobos: [] }
  );

  const sortItems = (itemList) =>
    [...itemList].sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const sortedSupportedMobos = sortItems(supportedMobos);
  const sortedUnsupportedMobos = sortItems(unsupportedMobos);

  const getCompatibilityReasonMessage = () => {
    const reasons = [];

    if (selectedCpu) {
      reasons.push(
        <span key="cpu">
          <strong>CPU:</strong> {selectedCpu.name} (Socket:{" "}
          <span className="highlight-socket">{selectedCpu.socket}</span>)
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

  const hasSelectedComponents = selectedCpu || selectedRam;

  const renderMoboCard = (item, isSupported = true) => (
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
        <strong>Chipset:</strong>{" "}
        {["AM4", "AM5"].includes(item.socket) ? "AMD" : "Intel"}
      </p>
      <p>
        <strong>Socket:</strong> {item.socket}
      </p>
      <p>
        <strong>RAM Type:</strong> {item.ramtype}
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
            removeFromBuilder("mobo");
            removeFromBuilder("ram");
            addToBuilder("mobo", item);
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
      <h2 className="item-title">Motherboards</h2>

      <div className="item-main-layout">
        {/* Filter Sidebar */}
        <aside className="item-filter-section">
          <h4>Filter</h4>

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
                  {sortedSupportedMobos.length} Compatible
                </span>
                
                <span className="unsupported-count">
                  {sortedUnsupportedMobos.length} Incompatible
                </span>
              </div>
            </div>
          )}

          {/* Conditional Rendering based on selected components */}
          {hasSelectedComponents ? (
            <>
              {/* Supported Motherboards Section */}
              <div className="section-header supported-header">
                <h3>Compatible Motherboards ({sortedSupportedMobos.length})</h3>
                <p className="section-description">
                  These motherboards are fully compatible with your selected components.
                </p>
              </div>

              {sortedSupportedMobos.length > 0 ? (
                <div className="list-container">
                  {sortedSupportedMobos.map((item) => renderMoboCard(item, true))}
                </div>
              ) : (
                <div className="no-items-message">
                  <p>No compatible motherboards found with your current selections.</p>
                  <p>Try changing your CPU or RAM selection.</p>
                </div>
              )}

              {/* Unsupported Motherboards Section */}
              {sortedUnsupportedMobos.length > 0 && (
                <>
                  <div className="section-header unsupported-header">
                    <h3>Incompatible Motherboards ({sortedUnsupportedMobos.length})</h3>
                    <p className="section-description">
                      These motherboards are not compatible with your selected components.
                    </p>
                  </div>

                  <div className="list-container incompatible-list">
                    {sortedUnsupportedMobos.map((item) => renderMoboCard(item, false))}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="section-header all-items-header">
                <h3>All Motherboards ({filteredItems.length})</h3>
                <p className="section-description">
                  Select a CPU or RAM first to see compatibility filtering.
                </p>
              </div>

              <div className="list-container">
                {sortItems(filteredItems).map((item) => renderMoboCard(item, true))}
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
                  <strong>Socket:</strong> {selectedItem.socket}
                </p>
                <p>
                  <strong>Form Factor:</strong> {selectedItem.formfactor}
                </p>
                <p>
                  <strong>RAM Slots:</strong> {selectedItem.ramslot} x{" "}
                  {selectedItem.ramtype}
                </p>
                <p>
                  <strong>Supported CPU:</strong> {selectedItem.supportedcpu}
                </p>
                <p>
                  <strong>PCIe Version:</strong> {selectedItem.pcie}.0
                </p>

                {/* Show compatibility status in popup */}
                {hasSelectedComponents && (
                  <div className="popup-compatibility-status">
                    {checkMoboCompatibility(selectedItem).isCompatible ? (
                      <span className="compatible-status">
                        Compatible with your build
                      </span>
                    ) : (
                      <div className="incompatible-status">
                        <span>Incompatible</span>
                        <ul>
                          {checkMoboCompatibility(selectedItem).reasons.map(
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
                      !checkMoboCompatibility(selectedItem).isCompatible
                        ? "disabled-btn"
                        : ""
                    }`}
                    onClick={() => {
                      if (
                        hasSelectedComponents &&
                        !checkMoboCompatibility(selectedItem).isCompatible
                      ) {
                        return;
                      }
                      removeFromBuilder("mobo");
                      removeFromBuilder("ram");
                      addToBuilder("mobo", selectedItem);
                      navigate("/builder");
                    }}
                    disabled={
                      hasSelectedComponents &&
                      !checkMoboCompatibility(selectedItem).isCompatible
                    }
                  >
                    {hasSelectedComponents &&
                    !checkMoboCompatibility(selectedItem).isCompatible
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

export default Motherboard;