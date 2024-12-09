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

    const { filterKey, filterValue, sortKey, sortOrder } = req.query;

    if (filterKey && filterValue) {
      if (!['name', 'language', 'id', 'bio', 'version'].includes(filterKey)) {
        return res.status(400).json({ error: `Invalid filter key: ${filterKey}` });
      }

      data = data.filter((item) => String(item[filterKey]).toLowerCase() === filterValue.toLowerCase());
    }

    // Apply sorting based on the provided sort key and order (ascending or descending)
    if (sortKey) {
      // Ensure sortKey is valid
      if (!['name', 'language', 'id', 'bio', 'version'].includes(sortKey)) {
        return res.status(400).json({ error: `Invalid sort key: ${sortKey}` });
      }

      data.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];

        // Handle numerical sorting (for version)
        if (typeof valA === "number" && typeof valB === "number") {
          return sortOrder === "desc" ? valB - valA : valA - valB;
        }

        // Handle string sorting (for name, language, etc.)
        if (typeof valA === "string" && typeof valB === "string") {
          return sortOrder === "desc"
              ? valB.localeCompare(valA)
              : valA.localeCompare(valB);
        }

        // Default case if types are different (or undefined)
        return 0;
      });
    }

    // Return filtered and sorted data
    res.json(data);
  } catch (error) {
    console.error("Error reading data:", error.message);
    res
        .status(500)
        .json({ error: "Error reading data", details: error.message });
  }
};

module.exports = { getData };