
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    // origin: "https://localhost:8100"
    origin: '*:*',
  }
});
io.on('connection', client => {
  client.on('subscribeToServer', interval => {
    console.log(
      'client has subscribed to the socketio server. Updating at interval(ms): ',
      interval
    );
    setInterval(() => {
      let temp = +(10 + Math.random() * 10).toFixed(1);
      let humidity = +(80 + Math.random() * 10).toFixed(1);
      client.emit('reading', [Date.now(), temp, humidity]);
    }, interval);
  });
});

io.listen(3000);
// io.listen(port);
// console.log('socketio server listening on port ', port);
