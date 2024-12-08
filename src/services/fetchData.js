const axios = require("axios");
const fs = require("fs");

const fetchData = async (url, filePath) => {
  try {
    const response = await axios.get(url);

    // Ensure data is available
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
