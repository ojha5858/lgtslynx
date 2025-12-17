const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/indexing"],
});

const indexingClient = google.indexing({
  version: "v3",
  auth,
});

module.exports = { indexingClient };
