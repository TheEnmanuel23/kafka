const app = require("express")();
const cors = require("cors");

app.use(cors());

const http = require("http").createServer(app);
const io = require("socket.io")(http);
const consumer = require("./consumer");

const PORT = 3030;

io.on("connection", function(socket) {
  console.log("a user connected");
});

consumer("supervision.event.response", message => {
  //io.emit("sms", message.value);
  console.log(">>>>", message.value);
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
