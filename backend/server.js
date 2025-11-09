// PC Builder
// Server File
// Author: Rehanul Bary

const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { load } = require('cheerio');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Directory for storing product images
// __dirname is a special variable that gives the absolute path of the current file’s directory.
const IMAGE_DIR = path.join(__dirname, 'public/images');
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

// Default headers for web scraping
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Connection': 'keep-alive',
};

/**
 * Extracts numerical price from a string
 * @param {string} priceText 
 * @returns {number} Price in BDT
 */
const extractPrice = (priceText) => {
  if (!priceText) return 0;
  const cleanPrice = priceText.replace(/[^\d,\.]/g, '');
  const priceNum = parseInt(cleanPrice.replace(/[,\.]/g, '')) || 0;

  if (priceNum < 100 || priceNum > 10000000) return 0; // filter invalid prices
  return priceNum;
};

/**
 * Checks if a product title is relevant to the search query
 * @param {string} title 
 * @param {string} query 
 * @returns {boolean} 
 */
const isRelevantProduct = (title, query) => {
  if (!title || !query) return false;
  const titleLower = title.toLowerCase();
  const queryWords = query.toLowerCase().split(/\s+/);
  return queryWords.some(word => titleLower.includes(word));
};

// List of supported e-commerce sites for scraping
const sites = [
  // StarTech
  {
    name: "StarTech",
    color: "#ef4444",
    url: (query) => `https://www.startech.com.bd/product/search?search=${encodeURIComponent(query)}`,
    parse: async (html, query) => {
      const $ = load(html);
      const results = [];
      $(".p-item").each((i, el) => {
        const title = $(el).find("h4.p-item-name a").text().trim();
        if (!isRelevantProduct(title, query)) return;

        const priceElement = $(el).find(".p-item-price span, .p-item-price").first();
        const priceNum = extractPrice(priceElement.text().trim());
        if (priceNum === 0) return;

        let link = $(el).find("h4.p-item-name a").attr("href");
        let image = $(el).find(".p-item-img img").attr("src") || $(el).find("img[data-src]").attr("data-src") || $(el).find("img").first().attr("src");
        if (image && !image.startsWith('http')) {
          image = image.startsWith('//') ? `https:${image}` : `https://www.startech.com.bd${image}`;
        }

        results.push({
          title: title.length > 80 ? title.substring(0, 77) + '...' : title,
          price: `৳ ${priceNum.toLocaleString('en-BD')}`,
          priceNum,
          link: link?.startsWith('http') ? link : `https://www.startech.com.bd${link}`,
          image: image || null,
          store: "StarTech",
          storeColor: "#ef4444"
        });
      });
      return results;
    }
  },
  // UltraTech
  {
    name: "UltraTech",
    color: "#3b82f6",
    url: (query) => `https://www.ultratech.com.bd/index.php?route=product/search&search=${encodeURIComponent(query)}`,
    parse: async (html, query) => {
      const $ = load(html);
      const results = [];
      $(".product-layout, .product-thumb").each((i, el) => {
        const title = $(el).find(".caption h4 a").text().trim() ||
                      $(el).find(".name a").text().trim() ||
                      $(el).find("h4 a").text().trim();
        if (!isRelevantProduct(title, query)) return;

        let priceText = $(el).find(".price-new").text().trim() || $(el).find(".price").text().trim().split('Ex Tax')[0];
        const priceNum = extractPrice(priceText);
        if (priceNum === 0) return;

        const link = $(el).find("h4 a").attr("href") || $(el).find(".caption a").attr("href") || $(el).find("a").first().attr("href");
        let image = $(el).find(".image img").attr("src") || $(el).find("img").first().attr("src");
        if (image && !image.startsWith('http')) image = image.startsWith('//') ? `https:${image}` : `https://www.ultratech.com.bd${image}`;

        results.push({
          title: title.length > 80 ? title.substring(0, 77) + '...' : title,
          price: `৳ ${priceNum.toLocaleString('en-BD')}`,
          priceNum,
          link: link?.startsWith('http') ? link : `https://www.ultratech.com.bd${link}`,
          image: image || null,
          store: "UltraTech",
          storeColor: "#3b82f6"
        });
      });
      return results;
    }
  },
  // Computer Village
  {
    name: "Computer Village",
    color: "#10b981",
    url: (query) => `https://www.computervillage.com.bd/index.php?route=product/search&search=${encodeURIComponent(query)}`,
    parse: async (html, query) => {
      const $ = load(html);
      const results = [];
      $(".product-layout, .product-thumb").each((i, el) => {
        const title = $(el).find(".caption h4 a").text().trim() ||
                      $(el).find(".name a").text().trim() ||
                      $(el).find("h4 a").text().trim();
        if (!isRelevantProduct(title, query)) return;

        let priceText = $(el).find(".price-new").text().trim() || $(el).find(".price").text().trim().split('Ex Tax')[0];
        const priceNum = extractPrice(priceText);
        if (priceNum === 0) return;

        const link = $(el).find("h4 a").attr("href") || $(el).find(".caption a").attr("href") || $(el).find("a").first().attr("href");
        let image = $(el).find(".image img").attr("src") || $(el).find("img").first().attr("src");
        if (image && !image.startsWith('http')) image = image.startsWith('//') ? `https:${image}` : `https://www.computervillage.com.bd${image}`;

        results.push({
          title: title.length > 80 ? title.substring(0, 77) + '...' : title,
          price: `৳ ${priceNum.toLocaleString('en-BD')}`,
          priceNum,
          link: link?.startsWith('http') ? link : `https://www.computervillage.com.bd${link}`,
          image: image || null,
          store: "Computer Village",
          storeColor: "#10b981"
        });
      });
      return results;
    }
  }
];

// Endpoint: Web scraping price comparison
app.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  console.log(`Searching for products: "${query}"`);

  try {
    const promises = sites.map(async (site) => {
      try {
        console.log(`Fetching data from ${site.name}...`);
        const { data, status } = await axios.get(site.url(query), { headers, timeout: 15000, maxRedirects: 5, validateStatus: () => true });
        if (status !== 200) {
          console.warn(`${site.name}: HTTP ${status}`);
          return [];
        }
        const results = await site.parse(data, query);
        console.log(`${site.name}: Found ${results.length} products`);
        return results;
      } catch (error) {
        console.error(`${site.name} fetch error:`, error.message);
        return [];
      }
    });

    const allResults = await Promise.all(promises);
    const allProducts = allResults.flat().sort((a, b) => a.priceNum - b.priceNum);

    const totalProducts = allProducts.length;
    const allPrices = allProducts.map(p => p.priceNum).filter(p => p > 0);
    const lowestPrice = allPrices.length ? Math.min(...allPrices) : null;
    const highestPrice = allPrices.length ? Math.max(...allPrices) : null;

    res.json({
      query,
      stats: { totalProducts, totalSites: sites.length, lowestPrice, highestPrice },
      products: allProducts
    });

  } catch (err) {
    console.error("Search endpoint error:", err.message);
    res.status(500).json({ error: "Failed to fetch search results", message: err.message });
  }
});

// Serve product images by product ID
app.get('/images/by-id/:productid', (req, res) => {
  const { productid } = req.params;
  const files = fs.readdirSync(IMAGE_DIR);
  const file = files.find(f => path.parse(f).name.toLowerCase() === productid.toLowerCase());

  if (file) {
    return res.sendFile(path.join(IMAGE_DIR, file));
  }

  console.log(`Image not found for product ID: ${productid}`);
  res.status(404).send('Image not found');
});

// Serve all images statically
app.use('/images', express.static(IMAGE_DIR));

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected successfully");
  }
});

// Supported component tables
const tables = {
  cpu: "cpulist",
  mobo: "mobolist",
  ram: "ramlist",
  ssd: "ssdlist",
  gpu: "gpulist",
  psu: "psulist",
  case: "caselist"
};

// Endpoint: Get components by type
app.get('/api/:component', (req, res) => {
  const component = req.params.component;
  if (!tables[component]) {
    return res.status(400).json({ error: "Invalid component type" });
  }

  const table = tables[component];
  db.query(`SELECT * FROM ${table}`, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const updatedResults = results.map(item => ({
      ...item,
      image: `http://localhost:${process.env.PORT || 3000}/images/by-id/${item.id}`
    }));

    res.json(updatedResults);
  });
});

// Endpoint: Home search for components
app.post("/home/search", (req, res) => {
  const search = req.body.search;

  const queries = Object.values(tables).map(table => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table} WHERE name LIKE ?`, [`%${search}%`], (err, results) => {
        if (err) return reject(err);
        const updatedResults = results.map(item => ({
          ...item,
          image: `http://localhost:${process.env.PORT || 3000}/images/by-id/${item.id}`
        }));
        resolve(updatedResults);
      });
    });
  });

  Promise.all(queries)
    .then(resultsArray => res.json(resultsArray.flat()))
    .catch(err => {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query failed" });
    });
});

// Endpoint: AI PC build generator via Google Gemini
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  console.log(message);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const structuredPrompt = `Based on this request: "${message}"

Provide a PC build in this exact format (use realistic current prices in bangladeshi currency, don't cross the budget. don't put comma (,) inside amount or price):
provide response in the given format. no extra text is required.

CPU: "[model]", Price: "[price] taka"
GPU: "[model]", Price: "[price] taka"
Motherboard: "[model]", Price: "[price] taka"
RAM: "[model]", Price: "[price] taka"
Storage: "[model]", Price: "[price] taka"
PSU: "[model]", Price: "[price] taka"
Case: "[model]", Price: "[price] taka"

Total: "[total] taka"
`;

    const result = await model.generateContent(structuredPrompt);
    console.log(result)
    const response = await result.response;
    console.log(response)
    const reply = response.text();

    res.json({ reply });
    console.log(reply);
  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({ error: err.message || "Error fetching from Gemini API" });
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "API Running",
    message: "PC Builder",
    version: "1.0.0",
    database: db.state === 'authenticated' ? 'Connected' : 'Disconnected',
    activeSites: sites.map(s => ({ name: s.name, color: s.color, url: s.url("test").split('?')[0] }))
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database: ${db.state === 'authenticated' ? 'Connected' : 'Disconnected'}`);
  console.log(`Scraping sites: ${sites.map(s => s.name).join(', ')}`);
});
