import React, { useState } from "react";
import axios from "axios";
import "./GlobalSearch.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const response = await axios.get(`http://localhost:3000/search/${encodeURIComponent(query)}`);
      let result = response.data;

      // Filter products by query
      if (result.products && Array.isArray(result.products)) {
        const filteredProducts = result.products.filter((product) =>
          product.title?.toLowerCase().includes(query.toLowerCase()) ||
          product.name?.toLowerCase().includes(query.toLowerCase())
        );

        // Take only first 30 products (already sorted by price from backend)
        const top30Products = filteredProducts.slice(0, 30);

        // Recalculate stats from top 30 products only
        const prices = top30Products.map(p => p.priceNum).filter(p => p > 0);
        const lowestPrice = prices.length > 0 ? Math.min(...prices) : null;
        const highestPrice = prices.length > 0 ? Math.max(...prices) : null;

        result = {
          ...result,
          products: top30Products,
          stats: {
            ...result.stats,
            totalProducts: top30Products.length,
            lowestPrice: lowestPrice ? `৳ ${lowestPrice.toLocaleString('en-BD')}` : null,
            highestPrice: highestPrice ? `৳ ${highestPrice.toLocaleString('en-BD')}` : null,
          }
        };
      }

      setData(result);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="global-search-app">
      <Header/>
      <div className="gs-header">
        <div className="gs-container">
          <h1 className="gs-logo">
            <span className="gs-logo-icon">💻</span>
            <span className="gs-logo-text">Find the best price</span>
          </h1>
          <p className="gs-tagline">Compare prices across Bangladesh's top tech stores</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="gs-search-section">
        <div className="gs-container">
          <div className="gs-search-wrapper">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for products (e.g., Laptop, Ryzen 5, RTX 3060)"
              className="gs-search-input"
            />
            <button onClick={handleSearch} className="gs-search-button">
              <span>Search</span>
            </button>
          </div>

          <div className="gs-popular-searches">
            You can search your aspired product
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="gs-container">
        {loading && (
          <div className="gs-loading-container">
            <div className="gs-loader">
              <div className="gs-loader-circle"></div>
            </div>
            <p>Searching across multiple stores...</p>
          </div>
        )}

        {error && !loading && (
          <div className="gs-error-container">
            <p className="gs-error-message">{error}</p>
          </div>
        )}

        {data && !loading && (
          <>
            <div className="gs-stats-bar fade-in">
              <div className="gs-stat">
                <span className="gs-stat-label">Products Found:</span>
                <span className="gs-stat-value">{data.stats.totalProducts}</span>
              </div>
              <div className="gs-stat">
                <span className="gs-stat-label">Stores Searched:</span>
                <span className="gs-stat-value">{data.stats.totalSites}</span>
              </div>
              {data.stats.lowestPrice && (
                <div className="gs-stat gs-highlight">
                  <span className="gs-stat-label">Lowest Price:</span>
                  <span className="gs-stat-value">{data.stats.lowestPrice}</span>
                </div>
              )}
              {data.stats.highestPrice && (
                <div className="gs-stat">
                  <span className="gs-stat-label">Highest Price:</span>
                  <span className="gs-stat-value">{data.stats.highestPrice}</span>
                </div>
              )}
            </div>

            <div className="gs-results-container fade-in">
              <div className="gs-results-header">
                <h2>Top 30 Products (Sorted by Price)</h2>
              </div>

              {data.products && data.products.length === 0 ? (
                <div className="gs-no-products">
                  <p>No products found for "{query}"</p>
                </div>
              ) : (
                <div className="gs-products-grid gs-all-products">
                  {data.products.map((product, index) => (
                    <a
                      key={index}
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gs-product-card stagger"
                    >
                      <div className="gs-store-badge" style={{ backgroundColor: product.storeColor }}>
                        {product.store}
                      </div>

                      <div className="gs-product-image-wrapper">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="gs-product-image"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgOTBDMTExLjA0NiA5MCAxMjAgODEuMDQ1NyAxMjAgNzBDMTIwIDU4Ljk1NDMgMTExLjA0NiA1MCAxMDAgNTBDODguOTU0MyA1MCA4MCA1OC45NTQzIDgwIDcwQzgwIDgxLjA0NTcgODguOTU0MyA5MCAxMDAgOTBaIiBmaWxsPSIjRTVFN0VCIi8+CjxwYXRoIGQ9Ik0xNTAgMTUwSDUwVjEzMEw4MCA5NUwxMTAgMTE1TDEzMCA5NUwxNTAgMTIwVjE1MFoiIGZpbGw9IiNFNUU3RUIiLz4KPC9zdmc+";
                            }}
                          />
                        ) : (
                          <div className="gs-image-placeholder">
                            <span>📦</span>
                          </div>
                        )}
                      </div>

                      <div className="gs-product-info">
                        <h3 className="gs-product-title">{product.title}</h3>
                        <div className="gs-product-price">{product.price}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {!data && !loading && !error && (
          <div className="gs-empty-state">
            <div className="gs-empty-icon">🔎</div>
            <h3>Start searching for products</h3>
            <p>Find the best prices across multiple stores in Bangladesh</p>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default GlobalSearch;