const winston = require("winston");
const semver = require("semver");
const { WinstonKafkaTransport } = require("./dist/WinstonKafkaTransport");

if (semver.major(winston.version) === 2) {
	throw new Error(
		"Winston version 2 is not supported. Please upgrade to version 3."
	);
}

winston.transports.WinstonKafkaTransport = WinstonKafkaTransport;

module.exports = WinstonKafkaTransport;
