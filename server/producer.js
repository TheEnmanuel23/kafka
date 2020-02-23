const kafka = require("kafka-node");

function publish(topic, message) {
  const Producer = kafka.Producer;

  // The client connects to a Kafka broker
  const client = new kafka.KafkaClient({
    kafkaHost: "100.1.0.30:32769,100.1.0.30:32770,100.1.0.30:32771" //"localhost:9092"
  });

  // The producer handles publishing messages over a topic
  const _producer = new Producer(client, {
    "client.id": "1.client.id"
  });

  // First wait for the producer to be initialized
  _producer.on("ready", () => {
    // Update metadata for the topic we'd like to publish to
    client.refreshMetadata([topic], err => {
      if (err) {
        throw err;
      }

      console.log(`Sending message to ${topic}: ${message}`);

      _producer.send(
        [
          {
            topic,
            messages: [message],
            "client.id": "1.client.id",
            key: "custom-key"
          }
        ],
        (err, result) => {
          console.log(err || result);
          //process.exit();
        }
      );
    });
  });

  // Handle errors
  _producer.on("error", err => {
    console.log("error", err);
  });
}

module.exports = publish;
