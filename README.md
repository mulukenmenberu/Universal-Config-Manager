# Universal Config Manager

A universal configuration manager that loads and merges config files from JSON, YAML, and ENV formats with environment-specific overrides.

## Installation

```bash
npm install universal-config-manager
```

## Usage

```javascript
const loadConfig = require('universal-config-manager');

const config = loadConfig();
console.log(config);
```

## Configuration Files

Place your configuration files in a `config` directory at the root of your project. The following formats are supported:
- JSON (`default.json`, `development.json`, `production.json`)
- YAML (`default.yaml`, `development.yaml`, `production.yaml`)
- ENV (`.env.default`, `.env.development`, `.env.production`)

The configurations will be merged in the following order of precedence (from lowest to highest):
1. `default.json`, `default.yaml`, `.env.default`
2. `development.json`, `development.yaml`, `.env.development` (or corresponding environment)
