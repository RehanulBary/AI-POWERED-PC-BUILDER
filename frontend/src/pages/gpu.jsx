import Header from "../components/Header";
import Footer from "../components/Footer";
import "./mobo.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBuilder, BuilderProvider } from "../BuilderContext.jsx";

function GPU() {
  const navigate = useNavigate();
  const { addToBuilder, removeFromBuilder } = useBuilder();
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    brand: [],
    price: "",
    socket: [],
    vram: [],
  });

  const brandOptions = ["MSI", "Gigabyte", "PowerColor", "Asus", "XFX"];
  const vramOptions = [
    "4GB",
    "6GB",
    "8GB",
    "10GB",
    "12GB",
    "16GB",
    "20GB",
    "24GB",
  ];

  const priceOptions = [
    { label: "৳20,000 - ৳40,000", value: "10-20" },
    { label: "৳40,000 - ৳80,000", value: "20-30" },
    { label: "৳80,0000 - ৳120,000", value: "01-10" },
    { label: "৳120,000 +", value: "30-100" },
  ];

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

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleLearnMore = (mobo) => {
    setSelectedItem(mobo);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const filteredItems = items.filter((item) => {
    if (filters.brand.length && !filters.brand.includes(item.brand))
      return false;
    if (filters.vram.length && !filters.vram.includes(item.vram)) return false;

    if (filters.price) {
      const price = item.price;
      if (filters.price === "01-10" && !(price >= 80000 && price <= 120000))
        return false;
      if (filters.price === "10-20" && !(price > 20000 && price <= 40000))
        return false;
      if (filters.price === "20-30" && !(price > 40000 && price <= 80000))
        return false;
      if (filters.price === "30-100" && !(price > 120000 && price <= 400000))
        return false;
    }
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/gpu");
        if (!response.ok) {
          throw new Error("Not Ok");
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("error fetching data", err);
      }
    };
    fetchItems();
  }, []);

  return (
    <>
      <Header />
      <h2 className="item-title">GPU List</h2>
      <div className="item-main-layout">
        <aside className="item-filter-section">
          <h4>Filter</h4>

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

          {/* Capacity Filter */}
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
        </aside>

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

          <div className="list-container">
            {sortedItems.map((item) => (
              <div className="item-card" key={item.productid}>
                <img
                  src={`http://localhost:3000/images/by-id/${item.productid}`}
                  alt={item.name}
                />
                <h3>{item.name}</h3>
                <p>Brand: {item.brand}</p>
                <p>VRAM: {item.vram}</p>
                <p className="price-of-product">
                  Price: <span className="cpu-price">৳{item.price}</span>
                </p>
                <button
                  className="add-to-builder-btn"
                  onClick={() => {
                    removeFromBuilder("gpu");
                    addToBuilder("gpu", item);
                    navigate("/builder");
                  }}
                >
                  Add to Builder
                </button>
                <button
                  className="learn-more-btn"
                  onClick={() => handleLearnMore(item)}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
      {selectedItem && (
        <div className="item-popup-overlay" onClick={handleClosePopup}>
          <div className="item-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup-btn" onClick={handleClosePopup}>
              ×
            </button>
            <div className="item-popup-content">
              <img
                src={`http://localhost:3000/images/by-id/${selectedItem.productid}`}
                alt={selectedItem.name}
                className="cpu-popup-img"
              />
              <div className="item-popup-info">
                <h3>{selectedItem.name}</h3>
                <p>Brand: {selectedItem.brand}</p>
                <p>Brand: {selectedItem.brand}</p>
                <p>
                  VRAM: {selectedItem.vram} {selectedItem.memory_type} Memory
                </p>
                <p>Boost Clock Speed: {selectedItem.boost_clock}</p>
                <p>TDP: {selectedItem.tdp}</p>
                <p>PCIe: {selectedItem.pcie_version}</p>
                <p className="price-of-product">
                  Price:{" "}
                  <span className="cpu-price">৳{selectedItem.price}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
export default GPU;
