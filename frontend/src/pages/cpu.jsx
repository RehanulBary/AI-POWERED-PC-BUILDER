import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBuilder } from "../BuilderContext.jsx";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./cpu.css";

function CPU() {
  const { addToBuilder, removeFromBuilder } = useBuilder();
  const [cpus, setCpus] = useState([]);
  const [selectedCpu, setSelectedCpu] = useState(null);
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
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

  useEffect(() => {
    const fetchCpus = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cpu");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCpus(data);
      } catch (err) {
        console.error("Error fetching CPUs:", err);
      }
    };

    fetchCpus();
  }, []);

  const handleLearnMore = (cpu) => {
    setSelectedCpu(cpu);
  };

  const handleClosePopup = () => {
    setSelectedCpu(null);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

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

  const sortedCpus = [...filteredCpus].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <>
      <Header />
      <h2 className="cpu-title">CPU List</h2>
      <div className="cpu-main-layout">
        <aside className="cpu-filter-section">
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
                {core}
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
                {brand}
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
                {socket}
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
        </aside>
        <main className="cpu-list-section">
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
          <div className="cpu-container">
            {sortedCpus.map((cpu) => (
              <div key={cpu.productid} className="cpu-card">
                <img
                  src={`http://localhost:3000/images/by-id/${cpu.productid}`}
                  alt={cpu.name}
                />
                <h3>{cpu.name}</h3>
                <p>Socket: {cpu.socket}</p>
                <p>Cores: {cpu.cores}</p>
                <p>Threads: {cpu.threads}</p>
                <p className="price-of-product">
                  Price: <span className="cpu-price">৳{cpu.price}</span>
                </p>
                <Link to={'/builder'}><button
                  className="add-to-builder-btn"
                  onClick={() => {
                    removeFromBuilder("cpu");
                    removeFromBuilder("mobo");
                    removeFromBuilder("ram");
                    addToBuilder("cpu", cpu);
                  }}
                >
                  Add to Builder
                </button></Link>
                <button
                  className="learn-more-btn"
                  onClick={() => handleLearnMore(cpu)}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
      {selectedCpu && (
        <div className="cpu-popup-overlay" onClick={handleClosePopup}>
          <div className="cpu-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup-btn" onClick={handleClosePopup}>
              ×
            </button>
            <div className="cpu-popup-content">
              <img
                src={`http://localhost:3000/images/by-id/${selectedCpu.productid}`}
                alt={selectedCpu.name}
                className="cpu-popup-img"
              />
              <div className="cpu-popup-info">
                <h3>{selectedCpu.name}</h3>
                <p>Brand: {selectedCpu.brand}</p>
                <p>Socket: {selectedCpu.socket}</p>
                <p>Clock Speed: {selectedCpu.clockspeed}</p>
                <p>Cores: {selectedCpu.cores}</p>
                <p>Threads: {selectedCpu.threads}</p>
                <p>Cache: {selectedCpu.cache}</p>
                <p className="price-of-product">
                  Price: <span className="cpu-price">৳{selectedCpu.price}</span>
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

export default CPU;
