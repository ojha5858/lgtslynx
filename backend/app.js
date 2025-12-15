const express = require("express");
const cors =require("cors");
const indexingRoutes = require("./src/routes/indexing.routes");
const {errorHandler} = require("./src/middlewares/error.middleware")

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) =>  {
    res.send.json({status: "OK"});
});

app.use("/api/indexing", indexingRoutes);

app.use(errorHandler);

module.exports = app;