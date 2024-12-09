const fs = require("fs");
const path = require("path");
const { DATA_FILE } = require("../config");

const getData = (req, res) => {
  try {
    // Check if the data file exists
    if (!fs.existsSync(DATA_FILE)) {
      return res.status(500).json({ error: "Data file not found." });
    }

    // Read the data file
    const rawData = fs.readFileSync(DATA_FILE, "utf-8");
    let data = [];

    // Parse the JSON data
    try {
      data = JSON.parse(rawData);
    } catch (err) {
      return res.status(500).json({
        error: "Error parsing JSON data",
        details: err.message,
      });
    }

    // Destructure query parameters
    const { filterKey, filterValue, sortKey, sortOrder = "asc" } = req.query;

    // Validate and apply filtering
    if (filterKey && filterValue) {
      const validKeys = ["name", "language", "id", "bio", "version"];
      if (!validKeys.includes(filterKey)) {
        return res
          .status(400)
          .json({ error: `Invalid filter key: ${filterKey}` });
      }

      data = data.filter(
        (item) =>
          String(item[filterKey]).toLowerCase() ===
          String(filterValue).toLowerCase()
      );
    }

    // Validate and apply sorting
    if (sortKey) {
      const validKeys = ["name", "language", "id", "bio", "version"];
      if (!validKeys.includes(sortKey)) {
        return res.status(400).json({ error: `Invalid sort key: ${sortKey}` });
      }

      data.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];

        // Handle numerical sorting
        if (typeof valA === "number" && typeof valB === "number") {
          return sortOrder === "desc" ? valB - valA : valA - valB;
        }

        // Handle string sorting
        if (typeof valA === "string" && typeof valB === "string") {
          return sortOrder === "desc"
            ? valB.localeCompare(valA)
            : valA.localeCompare(valB);
        }

        // Default case for mixed or undefined types
        return 0;
      });
    }

    // Respond with the filtered and sorted data
    res.status(200).json(data);
  } catch (error) {
    // Log the error and send a server error response
    console.error("Error handling request:", error.message);
    res.status(500).json({
      error: "An unexpected error occurred",
      details: error.message,
    });
  }
};

module.exports = { getData };
