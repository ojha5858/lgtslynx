const IORedis = require("ioredis");
const { logger } = require("../utils/logger");

const redis = new IORedis(process.env.REDIS_URL);

redis.on("connect", () => {
  logger.info("Redis connected (Codespaces)");
});

redis.on("error", (err) => {
  logger.error("Redis error: " + err.message);
});

module.exports = { redis };
