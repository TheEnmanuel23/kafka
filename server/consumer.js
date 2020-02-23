const kafka = require("kafka-node");
//"localhost:9092" //
function kafkaSubscribe(topic, cb) {
  const client = new kafka.KafkaClient({
    kafkaHost: "100.1.0.30:32769,100.1.0.30:32770,100.1.0.30:32771" //"100.1.0.30:32769,100.1.0.30:32770,100.1.0.30:32771" //"localhost:9092"
  });

  /*const admin = new kafka.Admin(client);
  admin.listGroups((err, res) => {
    console.log("consumerGroups", res);
  });

  admin.describeGroups(["2-hi-client-graphql"], (err, res) => {
    console.log(JSON.stringify(res, null, 1));
  });*/
  const topics = [{ topic: topic, partition: 0 }];
  const options = {
    autoCommit: false,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024
    //groupId: "custom-group-id-consumer",
    //  clientId: "custom-client-id-consumer"
  };

  const consumer = new kafka.Consumer(client, topics, options);

  consumer.on("error", function(err) {
    console.log("error", err);
  });

  client.refreshMetadata([topic], err => {
    const offset = new kafka.Offset(client);

    if (err) {
      throw err;
    }

    consumer.on("message", function(message) {
      cb(message);
    });

    /*
     * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
     */
    consumer.on("offsetOutOfRange", topic => {
      offset.fetch([topic], function(err, offsets) {
        if (err) {
          return console.error(err);
        }
        const min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
        consumer.setOffset(topic.topic, topic.partition, min);
      });
    });
  });

  return client;
}

module.exports = kafkaSubscribe;
