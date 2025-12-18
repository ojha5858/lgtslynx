require("dotenv").config();

const mongoose = require("mongoose");
const axios = require("axios");
const { Worker } = require("bullmq");

const IndexingJob = require("../models/IndexingJob");
const { redis } = require("../config/redis");
const { logger } = require("../utils/logger");
const { indexingClient } = require("../config/googleAuth");

process.on("unhandledRejection", (reason) => {
  logger.error("UNHANDLED REJECTION", reason);
});

process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION", err);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info("Worker MongoDB connected"))
  .catch((err) => {
    logger.error("MongoDB connection failed", err);
    process.exit(1);
  });

const pushLog = async (jobId, type, message) => {
  try {
    await IndexingJob.updateOne(
      { _id: jobId },
      {
        $push: {
          logs: {
            type,
            message,
            time: new Date().toLocaleTimeString(),
          },
        },
      }
    );
  } catch (err) {
    logger.error("Failed to push log", err);
  }
};

new Worker(
  "indexing",
  async (job) => {
    const jobId = job.data.jobId;

    try {
      logger.info(`Worker started for job ${jobId}`);

      const dbJob = await IndexingJob.findById(jobId);
      if (!dbJob) throw new Error("Indexing job not found");

      await IndexingJob.updateOne(
        { _id: jobId },
        { $set: { status: "processing" } }
      );

      const url = dbJob.url;
      let pingGSC = dbJob.options?.pingGSC === true;
      let domain;

      try {
        domain = new URL(url).origin;
      } catch {
        await pushLog(jobId, "error", "Invalid URL format");
        await IndexingJob.updateOne(
          { _id: jobId },
          { $set: { status: "failed" } }
        );
        return;
      }

      if (pingGSC) {
        try {
          await indexingClient.urlNotifications.publish({
            requestBody: { url, type: "URL_UPDATED" },
          });

          await pushLog(
            jobId,
            "success",
            "Google Indexing API notified successfully"
          );
        } catch (err) {
          const msg = err?.message || "";
          console.log("msg", err)

          if (msg.includes("Permission denied")) {
            await pushLog(
              jobId,
              "warning",
              msg
            );

            await pushLog(
              jobId,
              "info",
              "Tip: Verify this site in Google Search Console to enable direct indexing."
            );

            pingGSC = false;
          } else {
            await pushLog(
              jobId,
              "error",
              `Indexing API error: ${msg}`
            );

            await IndexingJob.updateOne(
              { _id: jobId },
              { $set: { status: "failed" } }
            );
            return;
          }
        }
      }

      if (!pingGSC) {
        await pushLog(
          jobId,
          "info",
          "Suggestion mode enabled (no ownership required)"
        );
      }

      let html = "";
      try {
        const res = await axios.get(url, {
          timeout: 10000,
          validateStatus: () => true,
          headers: { "User-Agent": "Mozilla/5.0" },
        });

        if (res.status === 200) {
          html = typeof res.data === "string" ? res.data : "";
          await pushLog(jobId, "info", "URL reachable (200 OK)");
        } else {
          await pushLog(
            jobId,
            "warning",
            `URL returned status ${res.status}`
          );
        }
      } catch (err) {
        await pushLog(
          jobId,
          "error",
          `URL fetch failed: ${err?.message || "unknown"}`
        );
      }

      if (!pingGSC) {
        try {
          const robots = await axios.get(`${domain}/robots.txt`, {
            timeout: 5000,
            validateStatus: () => true,
          });

          if (robots.data && /Disallow:\s*\/\b/i.test(robots.data)) {
            await pushLog(
              jobId,
              "warning",
              "robots.txt may block crawling"
            );
          }
        } catch {
          await pushLog(jobId, "info", "robots.txt not found (OK)");
        }

        if (html && /noindex/i.test(html)) {
          await pushLog(
            jobId,
            "warning",
            "Meta noindex detected — Google may skip indexing"
          );
        }
      }
      console.log("domain", domain)
      const canonicalDomain = domain.replace("://www.", "://");

      console.log("canonicalDomain", canonicalDomain)

      const sitemaps = [
        `${canonicalDomain}/sitemap.xml`,
      ];
      console.log("sitemapCandidates", sitemaps)
      let sitemapPinged = false;

      for (const sm of sitemaps) {
        try {
          const r = await axios.get(sm, {
            timeout: 8000,
            maxRedirects: 5,
            validateStatus: (status) => status >= 200 && status < 500,
          });

          if (r.status === 200 && typeof r.data === "string") {
            await pushLog(
              jobId,
              "info",
              `Sitemap detected (Google auto-discovers via GSC): ${sm}`
            );
            sitemapPinged = true;
            break;
          }
          else {
            await pushLog(
              jobId,
              "warning",
              `Sitemap check failed (${r.status}): ${sm}`
            );
          }
        } catch (err) {
          console.log(err)
          await pushLog(
            jobId,
            "warning",
            `Sitemap fetch error: ${sm} (${err?.message || "unknown"})`
          );
        }
      }

      if (!sitemapPinged) {
        await pushLog(
          jobId,
          "info",
          "No valid sitemap found on canonical domain"
        );
      }


      await IndexingJob.updateOne(
        { _id: jobId },
        {
          $set: {
            status: pingGSC ? "submitted" : "signals_sent",
          },
        }
      );

      await pushLog(
        jobId,
        "success",
        pingGSC
          ? "Indexing request submitted to Google"
          : "Indexing signals sent (Google decides final indexing)"
      );

      logger.info(`Worker completed successfully for ${url}`);
    } catch (err) {
      logger.error({
        tag: "WORKER_FATAL",
        message: err?.message || "Unknown error",
        stack: err?.stack,
      });

      await IndexingJob.updateOne(
        { _id: jobId },
        { $set: { status: "failed" } }
      );

      await pushLog(
        jobId,
        "error",
        err?.message || "Worker crashed with unknown error"
      );

      throw err;
    }
  },
  { connection: redis }
);
