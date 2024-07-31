const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function loadENVConfig(filePath) {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    return {};
  }
  const configContent = fs.readFileSync(absolutePath, 'utf8');
  return dotenv.parse(configContent);
}

module.exports = loadENVConfig;
