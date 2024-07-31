const loadConfig = require('../src');

test('loads and merges configurations correctly', () => {
  const config = loadConfig();

  expect(config).toEqual({
    appName: 'Universal Config Manager',
    port: 3001,
    database: {
      host: 'localhost',
      port: 5433
    },
    API_KEY: 'developmentapikey'
  });
});
