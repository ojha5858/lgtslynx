const express = require("express");
const cors = require("cors");
const indexingRoutes = require("./src/routes/indexing.routes");
const { errorHandler } = require("./src/middlewares/error.middleware");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/indexing", indexingRoutes);

// error middleware LAST
app.use(errorHandler);

module.exports = app;
