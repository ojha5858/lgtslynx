const mongoose = require("mongoose");

const ContentStrategySchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: true,
      index: true,
    },
    pillar: {
      type: String,
      required: true,
    },
    clusters: {
      type: Array,
      default: [],
    },
    calendar: {
      type: Array,
      default: [],
    },
    rawResponse: {
      type: Object,
      required: true,
    },
    logs: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContentStrategy", ContentStrategySchema);
