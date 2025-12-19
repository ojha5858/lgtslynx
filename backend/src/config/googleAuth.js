const { google } = require("googleapis");

if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is missing");
}

let credentials;
try {
  credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
} catch {
  throw new Error("Invalid GOOGLE_SERVICE_ACCOUNT_JSON");
}

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/indexing"],
});

const indexingClient = google.indexing({
  version: "v3",
  auth,
});

module.exports = { indexingClient };
