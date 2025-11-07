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

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const arr = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: arr };
    });
  };

  const handleSortChange = (order) => setSortOrder(order);
  const handleLearnMore = (ram) => setSelectedItem(ram);
  const handleClosePopup = () => setSelectedItem(null);

  const filteredItems = items.filter((item) => {
    if (filters.brand.length && !filters.brand.includes(item.brand)) return false;
    if (filters.type.length && !filters.type.includes(item.type)) return false;
    if (filters.capacity.length && !filters.capacity.includes(item.capacity)) return false;
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "asc") return Number(a.price) - Number(b.price);
    if (sortOrder === "desc") return Number(b.price) - Number(a.price);
    return 0;
  });

  const cpuFilteredItems = builder.mobo
    ? sortedItems.filter((ram) => ram.type === builder.mobo.ramtype)
    : sortedItems;

  return (
    <>
      <Header />
      <h2 className="item-title">Memory (RAM)</h2>
      <div className="item-main-layout">
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
            {cpuFilteredItems.map((item) => (
              <div className="item-card" key={item.productid}>
                <img
                  src={`http://localhost:3000/images/by-id/${item.productid}`}
                  alt={item.name}
                />
                <h3>{item.name}</h3>
                <p><strong>Brand:</strong> {item.brand}</p>
                <p><strong>Capacity:</strong> {item.capacity}</p>
                <p><strong>Type:</strong> {item.type}</p>
                <p><strong>Speed:</strong> {item.frequency}MHz</p>
                <p className="price-of-product">
                  <span className="item-price">৳{item.price}</span>
                </p>
                <div className="card-actions">
                  <button
                    className="add-to-builder-btnn"
                    onClick={() => {
                      removeFromBuilder("ram");
                      addToBuilder("ram", item);
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
                <p><strong>Capacity:</strong> {selectedItem.capacity}</p>
                <p><strong>Type:</strong> {selectedItem.type}</p>
                <p><strong>Speed:</strong> {selectedItem.frequency}MHz</p>
                <p><strong>CAS Latency:</strong> {selectedItem.caslatency}</p>
                <p><strong>Voltage:</strong> 1.35V</p>
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
                      removeFromBuilder("ram");
                      addToBuilder("ram", selectedItem);
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

export default Ram;