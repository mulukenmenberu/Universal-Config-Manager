const loadConfig = require('universal-config-manager');

const config = loadConfig({ files: ['default.json', 'development.yaml'] });
console.log(config);
