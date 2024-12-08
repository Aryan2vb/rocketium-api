// src/controllers/dataController.js
const fs = require("fs");
const { DATA_FILE } = require("../config");

const getData = (req, res) => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return res.status(500).json({ error: "Data file not found." });
    }

    const rawData = fs.readFileSync(DATA_FILE, "utf-8");
    let data = [];

    try {
      data = JSON.parse(rawData);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Error parsing JSON data", details: err.message });
    }

    // Basic filtering and sorting
    const { filterKey, filterValue, sortKey, sortOrder } = req.query;

    if (filterKey && filterValue) {
      data = data.filter((item) => String(item[filterKey]) === filterValue);
    }

    if (sortKey) {
      data.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        return sortOrder === "desc" ? valB - valA : valA - valB;
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Error reading data:", error.message);
    res
      .status(500)
      .json({ error: "Error reading data", details: error.message });
  }
};

module.exports = { getData };
