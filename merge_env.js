const loadConfig = require('universal-config-manager');

const config = loadConfig({ env: 'production' });
console.log(config);
