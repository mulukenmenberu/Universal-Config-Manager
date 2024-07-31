const loadConfig = require('universal-config-manager');

const config = loadConfig({ mergeAll: true });
console.log(config);
