winston-kafka-connect
=======================
Simple [kafka](http://kafka.apache.org/) transport for [winston](https://github.com/winstonjs/winston)
(winston as source to kafka connector)
## Install

```sh
npm install winston winston-kafka-connect --save
```

## Usage

```js
var winston = require('winston');
winston.transports.Kafka = require('winston-kafka-connect');

winston.add(winston.transports.Kafka, {
  //defaults
    name: 'WinstonKafkaLogger',
    timestamp: function() {return Date.now()},
    formatter: JSON.stringify,
    level: "info",
    meta: {},
    kafkaHost: "localhost:9092 [,localhost:9093, localhost:9094]",
    clientId: "winston-kafka-logger",
    topic: "winston-logs"
});
```

## License
[MIT](https://github.com/giang12/winston-kafka-connect/blob/master/LICENSE)
