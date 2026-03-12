require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const API_KEY =
  process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;

app.post("/api/solve", async (req, res) => {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Anthropic error:", response.status, JSON.stringify(data));
      return res.status(response.status).json(data);
    }
    console.log("Anthropic success, stop_reason:", data.stop_reason);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Proxy server running on http://localhost:${PORT}`)
);
