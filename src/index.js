const path = require('path');
const loadJSONConfig = require('./loaders/jsonLoader');
const loadYAMLConfig = require('./loaders/yamlLoader');
const loadENVConfig = require('./loaders/envLoader');
const mergeConfigs = require('./utils/mergeConfigs');
const determineEnvironment = require('./utils/determineEnvironment');

function loadConfig() {
  const env = determineEnvironment();
  const configDir = path.resolve(__dirname, '..', 'config');

  const defaultJSONConfig = loadJSONConfig(path.join(configDir, 'default.json'));
  const envJSONConfig = loadJSONConfig(path.join(configDir, `${env}.json`));

  const defaultYAMLConfig = loadYAMLConfig(path.join(configDir, 'default.yaml'));
  const envYAMLConfig = loadYAMLConfig(path.join(configDir, `${env}.yaml`));

  const defaultENVConfig = loadENVConfig(path.join(configDir, '.env.default'));
  const envENVConfig = loadENVConfig(path.join(configDir, `.env.${env}`));

  const finalConfig = mergeConfigs(
    defaultJSONConfig,
    envJSONConfig,
    defaultYAMLConfig,
    envYAMLConfig,
    defaultENVConfig,
    envENVConfig
  );

  return finalConfig;
}

module.exports = loadConfig;
