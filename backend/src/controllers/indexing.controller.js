const fs = require("fs");
const csv = require("csv-parser");
const { Parser } = require("json2csv");
const { google } = require("googleapis");

const IndexingJob = require("../models/IndexingJob");
const User = require("../models/User");
const { indexingQueue } = require("../queues/indexing.queue");
const { logger } = require("../utils/logger");
const { auth } = require("../config/googleAuth");

const normalizeUrl = (url) => {
  if (!url) return null;
  let cleanUrl = url.trim();
  if (!/^https?:\/\//i.test(cleanUrl)) {
    return `https://${cleanUrl}`;
  }
  return cleanUrl;
};

const processBulkUpload = (filePath, req, res, next) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => {
      const url = data.url || Object.values(data)[0];
      if (url) results.push(normalizeUrl(url));
    })
    .on("end", async () => {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        if (results.length === 0) {
          return res.status(400).json({ success: false, message: "CSV is empty or invalid" });
        }

        const userId = req.user ? req.user._id : null;
        const { pingGSC, updateSitemap } = req.body;

        const jobDocuments = results.map((url) => ({
          user: userId,
          url: url,
          options: {
            pingGSC: pingGSC === 'true' || pingGSC === true,
            updateSitemap: updateSitemap === 'true' || updateSitemap === true
          },
          status: "queued"
        }));

        const savedJobs = await IndexingJob.insertMany(jobDocuments);

        logger.info(`Adding ${savedJobs.length} jobs to queue...`);

        for (const job of savedJobs) {
          await indexingQueue.add("index-url", {
            jobId: String(job._id)
          });
        }

        logger.info(`Bulk Indexing: ${savedJobs.length} jobs created by user ${userId}`);

        return res.status(201).json({
          success: true,
          message: `Successfully queued ${savedJobs.length} URLs`,
          count: savedJobs.length,
          jobId: savedJobs[0]._id,
          mode: "bulk"
        });

      } catch (err) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        next(err);
      }
    })
    .on("error", (err) => {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      next(err);
    });
};

const submitIndexingJob = async (req, res, next) => {
  try {
    if (req.file) {
      return processBulkUpload(req.file.path, req, res, next);
    }

    let { url, pingGSC, updateSitemap } = req.body;

    if (!url) {
      const err = new Error("URL is required");
      err.statusCode = 400;
      throw err;
    }

    url = normalizeUrl(url);

    const job = await IndexingJob.create({
      user: req.user ? req.user._id : null,
      url,
      options: { pingGSC, updateSitemap },
    });

    await indexingQueue.add("index-url", {
      jobId: String(job._id),
    });

    logger.info(`Indexing job queued: ${job._id} | ${url}`);

    res.status(201).json({
      success: true,
      jobId: job._id,
      status: "queued",
      url,
      mode: "single"
    });
  } catch (err) {
    next(err);
  }
};
const normalizeLogs = (logs = []) => {
  return logs.map((log) => {
    let message = "";

    if (log.message) {
      message = log.message;
    } else if (typeof log.data === "string") {
      message = log.data;
    } else if (typeof log.data === "object" && log.data !== null) {
      message = JSON.stringify(log.data);
    } else {
      message = "Log message unavailable";
    }

    return {
      type: log.type || "info",
      message,
      time: log.time || new Date().toLocaleTimeString(),
    };
  });
};

// --- 3. GET SINGLE LOGS ---
const getIndexingLogs = async (req, res, next) => {
  try {
    const job = await IndexingJob.findById(req.params.jobId).lean();

    if (!job) {
      const err = new Error("Job not found");
      err.statusCode = 404;
      throw err;
    }

    res.json({
      success: true,
      jobId: job._id,
      status: job.status,
      summary: {
        mode: job.options?.pingGSC ? "direct" : "suggestion",
        ownerRequired: job.options?.pingGSC === true,
        finalDecision: "Google",
      },
      logs: normalizeLogs(job.logs),
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    });
  } catch (err) {
    next(err);
  }
};

const getRecentIndexingJobs = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null;
    const jobs = await IndexingJob.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.json({
      success: true,
      jobs: jobs.map((job) => ({
        _id: job._id,
        jobId: job._id,
        url: job.url,
        status: job.status,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
      })),
    });
  } catch (err) {
    next(err);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "User session not found" });
    }

    const [statsAgg, recentActivity, userData] = await Promise.all([
      IndexingJob.aggregate([
        { $match: { user: userId } },
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]),
      IndexingJob.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("url status createdAt")
        .lean(),
      User.findById(userId).select("credits").lean()
    ]);

    let stats = { totalIndexed: 0, pending: 0, failed: 0 };

    statsAgg.forEach((s) => {
      if (["submitted", "signals_sent", "done"].includes(s._id)) {
        stats.totalIndexed += s.count;
      } else if (["queued", "processing"].includes(s._id)) {
        stats.pending += s.count;
      } else if (s._id === "failed") {
        stats.failed += s.count;
      }
    });

    res.json({
      success: true,
      stats: {
        ...stats,
        credits: userData?.credits || 0,
      },
      recentActivity: recentActivity || []
    });

  } catch (err) {
    console.error("DASHBOARD_CONTROLLER_ERROR:", err);
    next(err);
  }
};

const exportJobsCsv = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const jobs = await IndexingJob.find({ user: userId })
      .sort({ createdAt: -1 })
      .select("url status options createdAt")
      .lean();

    if (!jobs.length) {
      return res.status(404).json({ success: false, message: "No jobs found to export" });
    }

    const fields = [
      { label: "Page URL", value: "url" },
      { label: "Status", value: "status" },
      { label: "Submission Date", value: (row) => new Date(row.createdAt).toLocaleString() },
      { label: "GSC Pinged", value: (row) => row.options?.pingGSC ? "Yes" : "No" }
    ];

    const json2csvParser = new Parser({ fields });
    const csvData = json2csvParser.parse(jobs);

    res.header("Content-Type", "text/csv");
    res.attachment(`indexing-report-${Date.now()}.csv`);

    return res.send(csvData);

  } catch (err) {
    next(err);
  }
};

const checkServiceAccountAccess = async (req, res, next) => {
  try {
    const webmasters = google.webmasters({
      version: "v3",
      auth: auth,
    });

    const response = await webmasters.sites.list();
    const sites = response.data.siteEntry || [];

    const verifiedSites = sites
      .filter(site => site.permissionLevel === "siteOwner")
      .map(site => site.siteUrl);

    if (verifiedSites.length > 0 && req.user && req.user._id) {
        await User.findByIdAndUpdate(req.user._id, { 
            verifiedSites: verifiedSites 
        });
    }

    res.status(200).json({
      success: true,
      sites: verifiedSites
    });

  } catch (err) {
    console.error("Verification Error:", err.message);
    res.status(200).json({
      success: false,
      message: "Failed to connect to Google API",
      sites: []
    });
  }
};

const getSavedStatus = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.json({ success: false, sites: [] });
      }
      
      const user = await User.findById(req.user._id).select("verifiedSites");
      res.json({ 
        success: user.verifiedSites && user.verifiedSites.length > 0, 
        sites: user.verifiedSites || [] 
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching status" });
    }
};
module.exports = {
  submitIndexingJob,
  getIndexingLogs,
  getRecentIndexingJobs,
  getDashboardStats,
  exportJobsCsv,
  checkServiceAccountAccess,
  getSavedStatus,
};
