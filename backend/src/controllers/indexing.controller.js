const IndexingJob = require("../models/IndexingJob");
const { indexingQueue } = require("../queues/indexing.queue");
const { logger } = require("../utils/logger");

/**
 * POST /api/indexing/submit
 */
const submitIndexingJob = async (req, res, next) => {
  try {
    const { url, pingGSC, updateSitemap } = req.body;

    if (!url) {
      const err = new Error("URL is required");
      err.statusCode = 400;
      throw err;
    }

    const job = await IndexingJob.create({
      url,
      options: { pingGSC, updateSitemap },
    });

    await indexingQueue.add("index-url", {
      jobId: job._id,
    });

    logger.info(`Indexing job queued: ${job._id}`);

    res.status(201).json({
      success: true,
      jobId: job._id,
      status: "queued",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/indexing/logs/:jobId
 */
const getIndexingLogs = async (req, res, next) => {
  try {
    const job = await IndexingJob.findById(req.params.jobId);

    if (!job) {
      const err = new Error("Job not found");
      err.statusCode = 404;
      throw err;
    }

    res.json({
      success: true,
      status: job.status,
      logs: job.logs,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitIndexingJob,
  getIndexingLogs,
};
