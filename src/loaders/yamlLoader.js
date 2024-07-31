const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function loadYAMLConfig(filePath) {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    return {};
  }
  const configContent = fs.readFileSync(absolutePath, 'utf8');
  return yaml.load(configContent);
}

module.exports = loadYAMLConfig;
