const express = require("express");
const path = require("path");
const { nanoid } = require("nanoid");

const app = express();
const PORT = 3000;

// In-memory database (for demo)
// In production use MongoDB
const urlDatabase = {};

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Create short URL
app.post("/api/shorten", (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    new URL(longUrl);
  } catch {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  const shortCode = nanoid(6);
  urlDatabase[shortCode] = longUrl;

  res.json({
    shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`
  });
});

// Redirect handler
app.get("/:code", (req, res) => {
  const { code } = req.params;
  const originalUrl = urlDatabase[code];

  if (originalUrl) {
    return res.redirect(originalUrl);
  }

  res.status(404).send("URL not found");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
