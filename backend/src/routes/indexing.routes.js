const express = require("express");
const {
  submitIndexingJob,
  getIndexingLogs,
} = require("../controllers/indexing.controller");

const router = express.Router();

router.post("/submit", submitIndexingJob);
router.get("/logs/:jobId", getIndexingLogs);

module.exports = router;
