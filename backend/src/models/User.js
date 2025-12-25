const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true },
    email: { type: String, unique: true },
    displayName: String,
    image: String,
    verifiedSites: { type: [String], default: [] },
    provider: { type: String, default: "google" },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);