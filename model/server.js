const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const Sockets = require("./socket");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    // HTTP Server
    this.server = http.createServer(this.app);

    // Socket Configuration
    this.io = socketIO(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  socketConfiguration() {
    new Sockets(this.io);
  }

  execute() {
    // Middlewares
    this.middlewares();

    // Socket Configuration
    this.socketConfiguration();

    // Server
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
