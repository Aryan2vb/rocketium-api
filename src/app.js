// src/app.js
const express = require("express");
const fs = require("fs");
const fetchData = require("./services/fetchData");
const apiRoutes = require("./routes/apiRoutes");
const { DUMMY_DATA_URL, DATA_FILE } = require("./config");

// Initialize Express
const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

// Initialize the data when the server starts
const initializeData = async () => {
  try {
    if (!fs.existsSync(DATA_FILE) || fs.statSync(DATA_FILE).size === 0) {
      console.log("Fetching dummy data...");
      await fetchData(DUMMY_DATA_URL, DATA_FILE);
    }
  } catch (error) {
    console.error("Error during initialization:", error.message);
  }
};

// Start server and initialize data
initializeData();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
