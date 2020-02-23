const program = require("commander");
const publish = require("./producer");

program
  .version("0.0.1")
  .usage("[options] <message>")
  .option("-t, --topic [topic]", "Kafka topic", "test")
  .parse(process.argv);

const message = program.args.join(" ");

console.log("TOPIC:", program.topic);
console.log("MESSAGE:", message);
publish(program.topic, message);
