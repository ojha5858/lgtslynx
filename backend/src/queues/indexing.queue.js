const { Queue } = require("bullmq");
const { redis } = require("../config/redis");

const indexingQueue = new Queue("indexing", {
  connection: redis,
});

module.exports = { indexingQueue };
