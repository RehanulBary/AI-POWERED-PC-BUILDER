import Header from "../components/Header";
import Footer from "../components/Footer";
import "./mobo.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBuilder } from "../BuilderContext.jsx";

function GPU() {
  const navigate = useNavigate();
  const { addToBuilder, removeFromBuilder } = useBuilder();

  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    brand: [],
    price: "",
    vram: [],
  });

  const brandOptions = ["MSI", "Gigabyte", "PowerColor", "ASUS", "XFX"];
  const vramOptions = ["4GB", "6GB", "8GB", "10GB", "12GB", "16GB", "24GB"];
  const priceOptions = [
    { label: "৳20,000 - ৳40,000", value: "10-20" },
    { label: "৳40,000 - ৳80,000", value: "20-30" },
    { label: "৳80,000 - ৳120,000", value: "01-10" },
    { label: "৳120,000+", value: "30-100" },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/gpu");
        if (!response.ok) throw new Error("Failed fetch");
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("Fetch GPU error:", err);
      }
    };
    fetchItems();
  }, []);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === "brand" || type === "vram") {
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

  const handleLearnMore = (gpu) => setSelectedItem(gpu);
  const handleClosePopup = () => setSelectedItem(null);

  const filteredItems = items.filter((item) => {
    if (filters.brand.length && !filters.brand.includes(item.brand))
      return false;
    if (filters.vram.length && !filters.vram.includes(item.vram)) return false;

    const price = item.price;
    if (filters.price === "10-20" && !(price >= 20000 && price <= 40000))
      return false;
    if (filters.price === "20-30" && !(price > 40000 && price <= 80000))
      return false;
    if (filters.price === "01-10" && !(price > 80000 && price <= 120000))
      return false;
    if (filters.price === "30-100" && !(price > 120000 && price <= 400000))
      return false;

    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : sortOrder === "desc" ? b.price - a.price : 0
  );

  return (
    <>
      <Header />
      <h2 className="item-title">Graphics Cards (GPU)</h2>
      <div className="item-main-layout">
        <aside className="item-filter-section">
          <h4>Filter</h4>

          {/* Brand Filter */}
          <div className="filter-group">
            <span className="filter-label">Brand</span>
            {brandOptions.map((brand) => (
              <label key={brand} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.brand.includes(brand)}
                  onChange={() => handleFilterChange("brand", brand)}
                />
                {brand}
              </label>
            ))}
          </div>

          {/* VRAM Filter */}
          <div className="filter-group">
            <span className="filter-label">VRAM</span>
            {vramOptions.map((vram) => (
              <label key={vram} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.vram.includes(vram)}
                  onChange={() => handleFilterChange("vram", vram)}
                />
                {vram}
              </label>
            ))}
          </div>

          {/* Price Filter */}
          <div className="filter-group">
            <span className="filter-label">Price</span>
            {priceOptions.map((opt) => (
              <label key={opt.value} className="filter-radio">
                <input
                  type="radio"
                  name="price"
                  checked={filters.price === opt.value}
                  onChange={() => handleFilterChange("price", opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </aside>

        {/* GPU Grid */}
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
              <option value="asc">Price (Low → High)</option>
              <option value="desc">Price (High → Low)</option>
            </select>
          </div>

          <div className="list-container">
            {sortedItems.map((gpu) => (
              <div className="item-card" key={gpu.productid}>
                <img
                  src={`http://localhost:3000/images/by-id/${gpu.productid}`}
                  alt={gpu.name}
                />
                <h3>{gpu.name}</h3>
                <p>Brand: {gpu.brand}</p>
                <p>VRAM: {gpu.vram}</p>
                <p>Boost Clock: {gpu.boost_clock}</p>
                <p className="price-of-product">
                  Price: <span className="item-price">৳{gpu.price}</span>
                </p>

                <div className="card-actions">
                  <button
                    className="add-to-builder-btnn"
                    onClick={() => {
                      removeFromBuilder("gpu");
                      addToBuilder("gpu", gpu);
                      navigate("/builder");
                    }}
                  >
                    Add to Builder
                  </button>
                  <button
                    className="learn-more-btn"
                    onClick={() => handleLearnMore(gpu)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Popup */}
      <div
        className={`item-popup-overlay ${selectedItem ? "active" : ""}`}
        onClick={handleClosePopup}
      >
        {selectedItem && (
          <div className="item-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup-btn" onClick={handleClosePopup}>
              ×
            </button>
            <div className="item-popup-content">
              <img
                src={`http://localhost:3000/images/by-id/${selectedItem.productid}`}
                alt={selectedItem.name}
                className="item-popup-img"
              />
              <div className="item-popup-info">
                <h3>{selectedItem.name}</h3>
                <p>Brand: {selectedItem.brand}</p>
                <p>
                  VRAM: {selectedItem.vram} {selectedItem.memory_type}
                </p>
                <p>Boost Clock: {selectedItem.boost_clock}</p>
                <p>TDP: {selectedItem.tdp}</p>
                <p>PCIe Version: {selectedItem.pcie_version}</p>
                <p className="item-popup-price">৳{selectedItem.price}</p>
                <div className="item-popup-actions">
                  <button className="learn-more-btn" onClick={handleClosePopup}>
                    Close
                  </button>
                  <button
                    className="add-to-builder-btnn"
                    onClick={() => {
                      removeFromBuilder("gpu");
                      addToBuilder("gpu", selectedItem);
                      navigate("/builder");
                    }}
                  >
                    Add to Builder
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

export default GPU;