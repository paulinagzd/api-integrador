const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser"); // This will be our application entry. We'll setup our server here.
const http = require("http");

const app = express(); // Log requests to the console.

app.use(cors());
app.use(logger("dev"));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./routes")(app);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness.",
  })
);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);
const server = http.createServer(app);
server.listen(port);

module.exports = app;
