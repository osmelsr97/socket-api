const Server = require("./model/server");

// Environment Variables
require("dotenv").config();

const server = new Server();

server.execute();
