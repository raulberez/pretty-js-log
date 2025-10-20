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
    toStdout: false    // Logs will only be written to file
});

logger('This will only appear in the log file');
logger.info('Silent logging to file');
````

### Update Logger ID
You can dynamically update the logger ID after creation using the `id` method:

```javascript
const logger = logFactory({
    id: 'initial-id'
});

logger('First log with initial ID');

logger.id('new-id');
logger('This log will show the new ID');
```

## Output Examples 🎨

When you run your logs, they'll look something like this in the console:

```
[2024-03-15 10:30:45] - [id:1234] - Hello World
[2024-03-15 10:30:46] - [id:1234] - This is an info message
[2024-03-15 10:30:47] - [id:1234] - Warning! Something needs attention
```

## Contributing 🤝

Feel free to open issues and submit PRs! This is an open-source project and we welcome contributions.

## License 📄

MIT License - feel free to use this in your projects!

## Todo 📋

- [ ] File logging rotation based on file size or on dates.
- [ ] Add support for external logging API's endpoints.

## Author 👨‍💻

Belguinan Noureddine

GitHub: https://github.com/belguinan