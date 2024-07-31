const path = require('path');
const fs = require('fs');
const loadJSONConfig = require('./loaders/jsonLoader');
const loadYAMLConfig = require('./loaders/yamlLoader');
const loadENVConfig = require('./loaders/envLoader');
const mergeConfigs = require('./utils/mergeConfigs');
const determineEnvironment = require('./utils/determineEnvironment');

/**
 * Load and merge configuration files.
 *
 * @param {Object} options - Options to specify the merge behavior.
 * @param {string[]} [options.files] - Specific files to merge.
 * @param {string} [options.env] - Environment to merge (e.g., 'development', 'production').
 * @param {boolean} [options.mergeAll] - If true, merge all files under the config directory.
 * @returns {Object} The merged configuration.
 */
function loadConfig(options = {}) {
  const { files, env, mergeAll } = options;
  const environment = env || determineEnvironment();
  const configDir = path.resolve(__dirname, '..', 'config');

  let finalConfig = {};

  if (mergeAll) {
    // Merge all files in the config directory
    const configFiles = fs.readdirSync(configDir);

    configFiles.forEach(file => {
      const filePath = path.join(configDir, file);
      const ext = path.extname(file);

      if (fs.lstatSync(filePath).isFile()) {
        if (ext === '.json') {
          finalConfig = mergeConfigs(finalConfig, loadJSONConfig(filePath));
        } else if (ext === '.yaml') {
          finalConfig = mergeConfigs(finalConfig, loadYAMLConfig(filePath));
        } else if (ext === '.env') {
          finalConfig = mergeConfigs(finalConfig, loadENVConfig(filePath));
        }
      }
    });
  } else if (files && files.length > 0) {
    // Merge specific files
    files.forEach(file => {
      const filePath = path.join(configDir, file);
      const ext = path.extname(file);

      if (fs.existsSync(filePath)) {
        if (ext === '.json') {
          finalConfig = mergeConfigs(finalConfig, loadJSONConfig(filePath));
        } else if (ext === '.yaml') {
          finalConfig = mergeConfigs(finalConfig, loadYAMLConfig(filePath));
        } else if (ext === '.env') {
          finalConfig = mergeConfigs(finalConfig, loadENVConfig(filePath));
        }
      }
    });
  } else {
    // Merge by environment (default behavior)
    const defaultJSONConfig = loadJSONConfig(path.join(configDir, 'default.json'));
    const envJSONConfig = loadJSONConfig(path.join(configDir, `${environment}.json`));

    const defaultYAMLConfig = loadYAMLConfig(path.join(configDir, 'default.yaml'));
    const envYAMLConfig = loadYAMLConfig(path.join(configDir, `${environment}.yaml`));

    const defaultENVConfig = loadENVConfig(path.join(configDir, '.env.default'));
    const envENVConfig = loadENVConfig(path.join(configDir, `.env.${environment}`));

    finalConfig = mergeConfigs(
      defaultJSONConfig,
      envJSONConfig,
      defaultYAMLConfig,
      envYAMLConfig,
      defaultENVConfig,
      envENVConfig
    );
  }

  return finalConfig;
}

module.exports = loadConfig;
