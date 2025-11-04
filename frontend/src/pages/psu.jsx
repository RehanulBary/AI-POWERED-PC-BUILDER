import Header from "../components/Header";
import Footer from "../components/Footer";
import "./mobo.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBuilder, BuilderProvider } from "../BuilderContext.jsx";

function PSU() {
    const navigate = useNavigate();
  
    const { addToBuilder, removeFromBuilder } = useBuilder();
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    brand: [],
    price: "",
    efficiency: [],
    modular: [],
  });
  const brandOptions = ["Corsair", "Seasonic", "Cooler Master"];
  const efficiencyOptions = ["80+ White", "80+ Bronze", "80+ Gold","80+ Platinum", "80+ Titanium"];
  const modularOptions = ["Non-Modular", "Fully Modular", "Semi-Modular", "Fanless Modular"];

    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/psu");
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

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === "brand" || type === "modular" || type === "efficiency") {
        const arr = prev[type].includes(value)
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value];
        return { ...prev, [type]: arr };
      }
      return prev;
    });
  };

    const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleLearnMore = (psu) => {
    setSelectedItem(psu);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const filteredItems = items.filter((item) => {
    if (filters.brand.length && !filters.brand.includes(item.brand)) return false;
    if (filters.efficiency.length && !filters.efficiency.includes(item.efficiency)) return false;
    if (filters.modular.length && !filters.modular.includes(item.modular)) return false;
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "asc") {
      return Number(a.price) - Number(b.price);
    } else if (sortOrder === "desc") {
      return Number(b.price) - Number(a.price);
    }
    return 0;
  });


    return(
        <>
      <Header />
      <h2 className="item-title">Power Supply Unit List</h2>
      <div className="item-main-layout">
        <aside className="item-filter-section">
          <h4>Filter</h4>

          {/* type Filter */}
          <div className="filter-group">
            <span className="filter-label">Efficiency</span>
            {efficiencyOptions.map((efficiency) => (
              <label key={efficiency} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.efficiency.includes(efficiency)}
                  onChange={() => handleFilterChange("efficiency", efficiency)}
                />
                {efficiency}
              </label>
            ))}
          </div>

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

          {/* Capacity Filter */}
          <div className="filter-group">
            <span className="filter-label">Modularity</span>
            {modularOptions.map((modular) => (
              <label key={modular} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.modular.includes(modular)}
                  onChange={() => handleFilterChange("modular", modular)}
                />
                {modular}
              </label>
            ))}
          </div>
        </aside>

        {/* List Section */}
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
                <p>Wattage: {item.wattage}</p>
                <p>Efficiency: {item.efficiency}</p>
                <p className="price-of-product">
                  Price: <span className="item-price">৳{item.price}</span>
                </p>

                <button className="add-to-builder-btn"
                onClick={() => {
                    removeFromBuilder("psu");
                    addToBuilder("psu", item);
                    navigate("/builder");
                  }}
                >Add to Builder</button>
                <button className="learn-more-btn" onClick={() => handleLearnMore(item)}>
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Popup */}
      {selectedItem && (
        <div className="item-popup-overlay" onClick={handleClosePopup}>
          <div className="item-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup-btn" onClick={handleClosePopup}>×</button>
            <div className="item-popup-content">
              <img
                src={`http://localhost:3000/images/by-id/${selectedItem.productid}`}
                alt={selectedItem.name}
                className="ram-popup-img"
              />
              <div className="item-popup-info">
                <h3>{selectedItem.name}</h3>
                <p>Brand: {selectedItem.brand}</p>
                <p>Modular: {selectedItem.modular}</p>
                <p>Efficiency: {selectedItem.efficiency}</p>
                <p>Wattage: {selectedItem.wattage}</p>
                <p className="price-of-product">
                  Price: <span className="item-price">৳{selectedItem.price}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
    )
}
export default PSU;