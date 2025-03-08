const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

let entries = []; // Store guestbook entries in memory

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files (CSS, JS, etc.)

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle form submissions
app.post("/submit", (req, res) => {
  const { name, message } = req.body;
  if (name && message) {
    entries.push({ name, message, timestamp: new Date().toLocaleString() });
  }
  res.redirect("/");
});

// API to fetch stored entries
app.get("/entries", (req, res) => {
  res.json(entries);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
