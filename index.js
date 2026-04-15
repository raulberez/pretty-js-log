const { logFactory } = require('./src/log.js');

// convenience shorthand so I don't have to destructure every time
const logger = logFactory();

module.exports = {
	logFactory,
	logger
}
