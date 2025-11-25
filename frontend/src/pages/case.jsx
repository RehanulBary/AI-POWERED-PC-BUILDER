import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "./mobo.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBuilder } from "../BuilderContext.jsx";

function Case() {
  const navigate = useNavigate();
  const { addToBuilder, removeFromBuilder } = useBuilder();

  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    brand: [],
    type: [],
  });

  const brandOptions = [
    "Corsair",
    "Lian Li",
    "NZXT",
    "Cooler Master",
    "Fractal Design",
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/case");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching case list:", err);
      }
    };
    fetchItems();
  }, []);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === "brand" || type === "type") {
        const current = prev[type];
        const arr = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        return { ...prev, [type]: arr };
      }
      return prev;
    });
  };

  const handleSortChange = (order) => setSortOrder(order);

  const handleLearnMore = (casing) => setSelectedItem(casing);
  const handleClosePopup = () => setSelectedItem(null);

  const filteredItems = items.filter((item) => {
    if (filters.brand.length && !filters.brand.includes(item.brand)) return false;
    if (filters.type.length && !filters.type.includes(item.type)) return false;
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <Header />
      <h2 className="item-title">PC Case List</h2>

      <div className="item-main-layout">
        {/* Sidebar Filter Section */}
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
        </aside>

        {/* Main Product List */}
        <main className="list-section">
          {/* Sort dropdown */}
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

          {/* Product Grid */}
          <div className="list-container">
            {sortedItems.map((item) => (
              <div className="item-card" key={item.productid}>
                <img
                  src={`http://localhost:3000/images/by-id/${item.productid}`}
                  alt={item.name}
                />

                <h3>{item.name}</h3>
                <p>Brand: {item.brand}</p>
                <p>Form Factor: {item.form_factor}</p>
                <p>Type: {item.type}</p>

                <p className="price-of-product">
                  Price: <span className="item-price">৳{item.price}</span>
                </p>

                <div className="card-actions">
                  <button
                    className="add-to-builder-btnn"
                    onClick={() => {
                      removeFromBuilder("case");
                      addToBuilder("case", item);
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
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Product Details Popup */}
      <div
        className={`item-popup-overlay ${selectedItem ? "active" : ""}`}
        onClick={handleClosePopup}
      >
        {selectedItem && (
          <div
            className="item-popup"
            onClick={(e) => e.stopPropagation()}
          >
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
                <p>Form Factor: {selectedItem.form_factor}</p>
                <p>Type: {selectedItem.type}</p>
                <p>GPU Clearance: {selectedItem.gpu_clearance}</p>

                <p className="item-popup-price">৳{selectedItem.price}</p>

                <div className="item-popup-actions">
                  <button
                    className="add-to-builder-btnn"
                    onClick={() => {
                      removeFromBuilder("case");
                      addToBuilder("case", selectedItem);
                      navigate("/builder");
                    }}
                  >
                    Add to Builder
                  </button>
                  <button
                    className="learn-more-btn"
                    onClick={handleClosePopup}
                  >
                    Close
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

export default Case;