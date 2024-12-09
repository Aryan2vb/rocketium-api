const axios = require("axios");
const fs = require("fs");
const path = require('path');
const {DUMMY_DATA_URL,DATA_FILE} = require("../config");

const fetchData = async (url, filePath) => {
  try {

    const response = await axios.get(DUMMY_DATA_URL);

    // Create the directory if it doesn't exist
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });

    if (!response.data) {
      throw new Error("No data fetched from the API.");
    }
    fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));
    console.log("Data fetched and stored successfully!");
  } catch (error) {
    console.error("Error fetching dummy data:", error.message);
    throw error;
  }
};

module.exports = fetchData;
