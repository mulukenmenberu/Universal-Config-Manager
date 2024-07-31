const fs = require('fs');
const path = require('path');

function loadJSONConfig(filePath) {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    return {};
  }
  const configContent = fs.readFileSync(absolutePath, 'utf8');
  return JSON.parse(configContent);
}

module.exports = loadJSONConfig;
