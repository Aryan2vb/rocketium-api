const path = require('path');
const DUMMY_DATA_URL =
  "https://microsoftedge.github.io/Demos/json-dummy-data/256KB.json";
const DATA_FILE = path.join(__dirname, 'data', 'data.json');

module.exports = { DUMMY_DATA_URL, DATA_FILE };
