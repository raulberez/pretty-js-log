# Pretty-js-log 📝

[![Node.js CI](https://github.com/belguinan/pretty-js-log/actions/workflows/node.js.yml/badge.svg)](https://github.com/belguinan/pretty-js-log/actions/workflows/node.js.yml)
[![npm version](https://badge.fury.io/js/pretty-js-log.svg)](https://www.npmjs.com/package/pretty-js-log)
[![npm downloads](https://img.shields.io/npm/dm/pretty-js-log.svg)](https://www.npmjs.com/package/pretty-js-log)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/min/pretty-js-log@1.1.1)](https://bundlephobia.com/package/pretty-js-log@1.1.1)
[![Bundle Size (gzip)](https://img.shields.io/bundlephobia/minzip/pretty-js-log@1.1.1)](https://bundlephobia.com/package/pretty-js-log@1.1.1)

A lightweight and colorful logging package for Node.js and Bun applications. Makes your console output beautiful and saves logs to files!

## Features

- Colorful console output
- File logging support
- Multiple log levels (info, warn, error, debug)
- Support for both Node.js and Bun
- JSON object / Array formatting
- Custom IDs for tracking (like process ID)
- Timezone-aware timestamps

## Installation 🚀

```bash
# Using npm
npm install pretty-js-log
```

```bash
# Using bun
bun install pretty-js-log
```

## Quick Start 🎯

```javascript
const { logFactory } = require('pretty-js-log');

// Create a basic logger
const logger = logFactory({});

// Log some messages
logger('Hello World');
logger.info('This is an info message');
logger.warn('Warning! Something needs attention');
logger.error('Oops! Something went wrong');
logger.debug('Debug information');
```

## Output 🎑

![Pretty JS Log Demo](https://i.ibb.co/ZmYhVwT/pretty-js-log.png)

## Advanced Usage 🔧

### Save Logs to File

```javascript
const logger = logFactory({
    path: './logs/app.log',  // Logs will be saved here
    id: process.pid          // Add process ID to logs
});

logger('This will be saved to the file too!');
```

### Logging Objects

```javascript
const data = {
    user: 'john',
    age: 25
};

logger('User data:', data);  // Objects are automatically formatted
```

### Day-Based File Logging

Automatically prefix your log files with dates to organize them by day:

```javascript
// Using default date format (YYYYMMDD)
const logger = logFactory({
    path: './logs/app.log',
    dayBasedFileLog: true
});
// Creates: ./logs/20251020-app.log

// With custom date format
const logger2 = logFactory({
    path: './logs/app.log',
    dayBasedFileLog: true,
    dateFormat: 'YYYY-MM-DD'
});
// Creates: ./logs/2025-10-20-app.log

// Hourly log files
const logger3 = logFactory({
    path: './logs/app.log',
    dayBasedFileLog: true,
    dateFormat: 'YYYYMMDD-HH'
});
// Creates: ./logs/20251020-14-app.log (for 2 PM)
```

### Disable Console Output

If you want to write logs only to file without console output, use the `toStdout` option:

```javascript
const logger = logFactory({
    path: './logs/app.log',
    toStdout: false    // Disables console output, logs go to file only
});
```

> **Note:** This is useful in production environments where you don't want to flood stdout but still need a persistent log file.
