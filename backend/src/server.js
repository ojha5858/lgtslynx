require("dotenv").config();

const mongoose = require("mongoose");
const app = require("../app");
const { logger } = require("./utils/logger");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    logger.info("MongoDB connected");

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.info("MongoDB error:", err);
  });
