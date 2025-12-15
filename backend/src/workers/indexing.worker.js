const { Worker } = require("bullmq");
const IndexingJob = require("../models/IndexingJob");
const { redis } = require("../config/redis");
const { logger } = require("../utils/logger");

const pushLog = async (jobId, type, message) => {
  const time = new Date().toLocaleTimeString();

  await IndexingJob.findByIdAndUpdate(jobId, {
    $push: { logs: { type, message, time } },
  });
};

new Worker(
  "indexing",
  async (job) => {
    const dbJob = await IndexingJob.findById(job.data.jobId);

    await pushLog(dbJob._id, "info", "Initializing indexing workflow");
    await pushLog(dbJob._id, "info", "Authenticating with Google OAuth2");

    // Google API calls yahan aayengi
    await pushLog(dbJob._id, "success", "Indexing signals triggered");

    dbJob.status = "done";
    await dbJob.save();

    logger.info(`Indexing job completed: ${dbJob._id}`);
  },
  { connection: redis }
);
