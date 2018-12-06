# winston-kafka-connect

Simple [kafka](http://kafka.apache.org/) transport for [winston](https://github.com/winstonjs/winston)
(winston as source to kafka connector)

[![NPM](https://nodei.co/npm/winston-kafka-connect.svg?downloads=true&downloadRank=true)](https://nodei.co/npm/winston-kafka-connect/)&nbsp;&nbsp;
[![Build Status](https://travis-ci.org/giang12/winston-kafka-connect.svg?branch=master)](https://travis-ci.org/giang12/winston-kafka-connect)

## Install

```sh
npm install winston winston-kafka-connect --save
```

## Usage

```js
var winston = require('winston');
require('winston-kafka-connect');

winston.add(new winston.transports.WinstonKafkaTransport({
    level: "info",
    format: customFormat,
    meta: {},
    kafkaClient:{
    	kafkaHost: "localhost:9092 [,localhost:9093, localhost:9094]",
    	clientId: "winston-kafka-logger"
	}
    topic: "winston-logs",
    name: 'WinstonKafkaLogger',
    timestamp: function() {return Date.now()},
    formatter: JSON.stringify
});
```

## License

[MIT](https://github.com/giang12/winston-kafka-connect/blob/master/LICENSE)
