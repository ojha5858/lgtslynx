const express = require("express");
const {
  submitIndexingJob,
  getIndexingLogs,
  getRecentIndexingJobs,
  getDashboardStats,
  exportJobsCsv,
  checkServiceAccountAccess,
  getSavedStatus,
} = require("../controllers/indexing.controller");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

router.post("/submit", upload.single("file"), submitIndexingJob);
router.get("/logs/:jobId", getIndexingLogs);
router.get("/recent", getRecentIndexingJobs);
router.get("/dashboard", getDashboardStats);
router.get("/export", exportJobsCsv);
router.get("/verify-access", checkServiceAccountAccess);
router.get("/status", getSavedStatus);

module.exports = router;
