const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// --- OAuth endpoints ---
app.get("/oauth/authorize", (req, res) => {
  res.json({ message: "OAuth authorize endpoint" });
});

app.post("/oauth/token", (req, res) => {
  res.json({ access_token: "fake-token", token_type: "Bearer" });
});

app.post("/oauth/revoke", (req, res) => {
  res.json({ message: "Token revoked" });
});

// --- API endpoints ---
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Shopinista App API" });
});

// --- Default ---
app.get("/", (req, res) => {
  res.send("Shopinista App backend running on Vercel");
});

module.exports = app;
