const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    type: String,
    message: String,
    time: String,
  },
  { _id: false }
);

const indexingJobSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    options: {
      pingGSC: Boolean,
      updateSitemap: Boolean,
    },
    status: {
      type: String,
      enum: ["queued", "processing", "done", "failed"],
      default: "queued",
    },
    logs: [logSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("IndexingJob", indexingJobSchema);
