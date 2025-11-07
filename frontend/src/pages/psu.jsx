import Header from "../components/Header";
import Footer from "../components/Footer";
import "./mobo.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBuilder } from "../BuilderContext.jsx";

function PSU() {
  const navigate = useNavigate();
  const { addToBuilder, removeFromBuilder } = useBuilder();

  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    brand: [],
    efficiency: [],
    modular: [],
  });

  const brandOptions = ["Corsair", "Seasonic", "Cooler Master"];
  const efficiencyOptions = ["80+ White", "80+ Bronze", "80+ Gold", "80+ Platinum", "80+ Titanium"];
  const modularOptions = ["Non-Modular", "Fully Modular", "Semi-Modular"];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/psu");
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
      const arr = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: arr };
    });
  };

  const handleSortChange = (order) => setSortOrder(order);
  const handleLearnMore = (psu) => setSelectedItem(psu);
  const handleClosePopup = () => setSelectedItem(null);

  const filteredItems = items.filter((item) => {
    if (filters.brand.length && !filters.brand.includes(item.brand)) return false;
    if (filters.efficiency.length && !filters.efficiency.includes(item.efficiency)) return false;
    if (filters.modular.length && !filters.modular.includes(item.modular)) return false;
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "asc") return Number(a.price) - Number(b.price);
    if (sortOrder === "desc") return Number(b.price) - Number(a.price);
    return 0;
  });

  return (
    <>
      <Header />
      <h2 className="item-title">Power Supply Units</h2>
      <div className="item-main-layout">
        <aside className="item-filter-section">
          <h4>Filter</h4>

          <div className="filter-group">
            <span className="filter-label">Efficiency</span>
            {efficiencyOptions.map((efficiency) => (
              <label key={efficiency} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.efficiency.includes(efficiency)}
                  onChange={() => handleFilterChange("efficiency", efficiency)}
                />
                <span>{efficiency}</span>
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
            <span className="filter-label">Modularity</span>
            {modularOptions.map((modular) => (
              <label key={modular} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.modular.includes(modular)}
                  onChange={() => handleFilterChange("modular", modular)}
                />
                <span>{modular}</span>
              </label>
            ))}
          </div>
        </aside>

        <main className="list-section">
          <div className="sort-dropdown">
            <label htmlFor="sortOrder" className="sort-label">Sort by:</label>
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
                <p><strong>Brand:</strong> {item.brand}</p>
                <p><strong>Wattage:</strong> {item.wattage}W</p>
                <p><strong>Efficiency:</strong> {item.efficiency}</p>
                <p><strong>Type:</strong> {item.modular}</p>
                <p className="price-of-product">
                  <span className="item-price">৳{item.price}</span>
                </p>
                <div className="card-actions">
                  <button
                    className="add-to-builder-btnn"
                    onClick={() => {
                      removeFromBuilder("psu");
                      addToBuilder("psu", item);
                      navigate("/builder");
                    }}
                  >
                    Add to Builder
                  </button>
                  <button
                    className="learn-more-btn"
                    onClick={() => handleLearnMore(item)}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {selectedItem && (
        <div 
          className="item-popup-overlay active" 
          onClick={handleClosePopup}
        >
          <div 
            className="item-popup" 
            onClick={(e) => e.stopPropagation()}
          >
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
                <p><strong>Brand:</strong> {selectedItem.brand}</p>
                <p><strong>Wattage:</strong> {selectedItem.wattage}W</p>
                <p><strong>Efficiency Rating:</strong> {selectedItem.efficiency}</p>
                <p><strong>Modularity:</strong> {selectedItem.modular}</p>
                <p><strong>Certification:</strong> 80 Plus Certified</p>
                <p className="item-popup-price">৳{selectedItem.price}</p>
                
                <div className="item-popup-actions">
                  <button 
                    className="learn-more-btn"
                    onClick={handleClosePopup}
                  >
                    Close
                  </button>
                  <button
                    className="add-to-builder-btnn"
                    onClick={() => {
                      removeFromBuilder("psu");
                      addToBuilder("psu", selectedItem);
                      navigate("/builder");
                    }}
                  >
                    Add to Builder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default PSU;