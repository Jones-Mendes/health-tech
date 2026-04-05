const express = require("express");
const path = require("path");
const routes = require("./routes");
const { notFoundHandler, errorHandler } = require("./utils/errors");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
