class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Client connected!", socket.id);

      socket.on("message-from-client", (data) => {
        console.log(data);

        this.io.emit("message-from-server", { name: socket.id, ...data });
      });
    });
  }
}

module.exports = Sockets;
