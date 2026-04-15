const { logFactory } = require('./src/log.js');

// convenience shorthand so I don't have to destructure every time
const logger = logFactory();

// also export a pre-configured debug logger for development
const debugLogger = logFactory({ level: 'debug' });

module.exports = {
	logFactory,
	logger,
	debugLogger
}
