const IORedis = require("ioredis");
const { logger } = require("../utils/logger");
const redisUrl = process.env.REDIS_URL;

const connectionOptions = {
  maxRetriesPerRequest: null,
  tls: redisUrl.startsWith("rediss://") ? { rejectUnauthorized: false } : undefined,
};

const redis = new IORedis(process.env.REDIS_URL, connectionOptions);

redis.on("connect", () => logger.info("Redis Connected via IORedis"));
redis.on("error", (err) => logger.error("Redis Error: " + err.message));

redis.on("error", (err) => {
  logger.error("Redis error: " + err.message);
});

module.exports = { redis };
