const util = require('util'),
	winston = require('winston'),
	_ = require('lodash'),
	Kafka = require('kafka-node'),
	KafkaClient = Kafka.KafkaClient,
	HighLevelProducer = Kafka.HighLevelProducer;

function WinstonKafkaLogger(options) {
	//
	// Name this logger
	//
	this._payloads = [];
	this.numPerBatch = 1;

	this.name = options.name || "WinstonKafkaLogger";

	this.timestamp = options.timestamp || function() {
		return new Date()
	};

	this.formatter = options.formatter || JSON.stringify;

	//
	// Set the level from your options
	//
	this.level = options.level || "info";

	this.meta = options.meta || {}; //{host-name: os.hostname()}
	//
	// Configure your storage backing as you see fit
	//
	this.connected = false;
	this.kafkaHost = options.kafkaHost || "localhost:9092";
	this.clientId = options.clientId || "winston-kafka-logger";
	this.topic = options.topic || "winston-logs";
	//this.sslOptions = options.sslOptions
	this.client = new KafkaClient({
		kafkaHost: this.kafkaHost,
		clientId: this.clientId
			//sslOptions: this.sslOptions
	});
	this.producer = new HighLevelProducer(this.client);
	this.producer
		.on('ready', () => {
			this.connected = true
		})
		.on('error', err => {
			this.connected = false;
			console.log(err);
			throw new Error("winston-kafka-logger cannot connect to Kafka server");
		})
};

//
// Inherit from `winston.Transport` so you can take advantage
// of the base functionality and `.handleExceptions()`.
//
util.inherits(WinstonKafkaLogger, winston.Transport);

WinstonKafkaLogger.prototype.log = function(level, msg, meta, callback) {
	//
	// Store this message and metadata, maybe use some custom logic
	// then callback indicating success.
	const payload = {
		level: level,
		msg: msg,
		meta: _.defaultsDeep({}, meta, this.meta),
		timestamp: this.timestamp()
	};
	this._payloads.push({
		topic: this.topic,
		messages: [this.formatter(payload)]
	});

	if (this.connected && this._payloads.length >= this.numPerBatch) {

		const payloads = this._payloads;
		this._payloads = [];
		try {
			this.producer.send(payloads, () => { /**nop**/ });
		} catch (err) {
			console.log(err);
		}
	}
	callback(null, true);
};


module.exports = WinstonKafkaLogger;
