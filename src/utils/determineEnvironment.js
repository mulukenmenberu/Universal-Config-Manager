function determineEnvironment() {
  return process.env.NODE_ENV || 'development';
}

module.exports = determineEnvironment;
