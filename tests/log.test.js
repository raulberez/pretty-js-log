const { logFactory } = require('../src/log.js');
const fs = require('node:fs');
const path = require('node:path');

jest.mock('node:fs', () => ({
    appendFileSync: jest.fn()
}));

describe('pretty-js-log', () => {

    console.log = jest.fn();

    beforeEach(() => {
        console.log.mockClear();
        fs.appendFileSync.mockClear();
    });

    test('should create a logger instance', () => {
        const logger = logFactory({});
        expect(logger).toBeDefined();
        expect(typeof logger).toBe('function');
    });

    test('should log a simple message', () => {
        const logger = logFactory({});
        logger('Hello world');
        expect(console.log).toHaveBeenCalled();
    });

    test('should ignore logging a message', () => {
        const logger = logFactory({
            toStdout: false
        });
        logger('Hello world');
        expect(console.log).not.toHaveBeenCalled();
    });

    test('should log info message', () => {
        const logger = logFactory({});
        logger.info('Info message');
        expect(console.log).toHaveBeenCalled();
    });

    test('should log error message', () => {
        const logger = logFactory({});
        logger.error('Error message');
        expect(console.log).toHaveBeenCalled();
    });

    test('should log warning message', () => {
        const logger = logFactory({});
        logger.warn('Warning message');
        expect(console.log).toHaveBeenCalled();
    });

    test('should log debug message', () => {
        const logger = logFactory({});
        logger.debug('Debug message');
        expect(console.log).toHaveBeenCalled();
    });

    test('should format object properly', () => {
        const logger = logFactory({});
        const testObject = { name: 'test' };
        logger(testObject);
        expect(console.log).toHaveBeenCalled();
    });

    test('should write to file without day-based prefix', () => {
        const logger = logFactory({
            path: '/logs/app.log',
            toStdout: false
        });
        logger('Test message');
        expect(fs.appendFileSync).toHaveBeenCalledWith(
            '/logs/app.log',
            expect.any(String),
            'utf8'
        );
    });

    test('should write to file with default day-based prefix when enabled', () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const expectedPath = `/logs/${year}${month}${day}-app.log`;

        const logger = logFactory({
            path: '/logs/app.log',
            dayBasedFileLog: true,
            toStdout: false
        });
        logger('Test message');
        expect(fs.appendFileSync).toHaveBeenCalledWith(
            expectedPath,
            expect.any(String),
            'utf8'
        );
    });

    test('should handle dayBasedFileLog default to false', () => {
        const logger = logFactory({
            path: '/logs/test.log',
            toStdout: false
        });
        logger('Test message');
        expect(fs.appendFileSync).toHaveBeenCalledWith(
            '/logs/test.log',
            expect.any(String),
            'utf8'
        );
    });

    test('should handle complex paths with day-based logging', () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const expectedPath = `/var/log/apps/${year}${month}${day}-error.log`;

        const logger = logFactory({
            path: '/var/log/apps/error.log',
            dayBasedFileLog: true,
            toStdout: false
        });
        logger.error('Error occurred');
        expect(fs.appendFileSync).toHaveBeenCalledWith(
            expectedPath,
            expect.any(String),
            'utf8'
        );
    });

    test('should use custom date format YYYY-MM-DD', () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const expectedPath = `/logs/${year}-${month}-${day}-app.log`;

        const logger = logFactory({
            path: '/logs/app.log',
            dayBasedFileLog: true,
            dateFormat: 'YYYY-MM-DD',
            toStdout: false
        });
        logger('Test message');
        expect(fs.appendFileSync).toHaveBeenCalledWith(
            expectedPath,
            expect.any(String),
            'utf8'
        );
    });

    test('should use custom date format with hours YYYYMMDD-HH', () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const expectedPath = `/logs/${year}${month}${day}-${hours}-app.log`;

        const logger = logFactory({
            path: '/logs/app.log',
            dayBasedFileLog: true,
            dateFormat: 'YYYYMMDD-HH',
            toStdout: false
        });
        logger('Test message');
        expect(fs.appendFileSync).toHaveBeenCalledWith(
            expectedPath,
            expect.any(String),
            'utf8'
        );
    });

    test('should use short year format YY', () => {
        const now = new Date();
        const year = String(now.getFullYear()).slice(-2);
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const expectedPath = `/logs/${year}${month}${day}-app.log`;

        const logger = logFactory({
            path: '/logs/app.log',
            dayBasedFileLog: true,
            dateFormat: 'YYMMDD',
            toStdout: false
        });
        logger('Test message');
        expect(fs.appendFileSync).toHaveBeenCalledWith(
            expectedPath,
            expect.any(String),
            'utf8'
        );
    });

    test('should handle non-padded date format', () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1);
        const day = String(now.getDate());
        const expectedPath = `/logs/${year}-${month}-${day}-app.log`;

        const logger = logFactory({
            path: '/logs/app.log',
            dayBasedFileLog: true,
            dateFormat: 'YYYY-M-D',
            toStdout: false
        });
        logger('Test message');
        expect(fs.appendFileSync).toHaveBeenCalledWith(
            expectedPath,
            expect.any(String),
            'utf8'
        );
    });

    test('should update id dynamically', () => {
        const logger = logFactory({ id: 'initial' });
        logger('First message');
        logger.id('updated');
        logger('Second message');
        expect(console.log).toHaveBeenCalledTimes(2);
    });
});