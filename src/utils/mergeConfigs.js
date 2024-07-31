const merge = require('lodash.merge');

function mergeConfigs(...configs) {
  return merge({}, ...configs);
}

module.exports = mergeConfigs;
