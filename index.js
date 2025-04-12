const express = require("express");
const Mercury = require("@postlight/mercury-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/parser", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing URL parameter");

  try {
    const result = await Mercury.parse(url, {
      contentType: "html",
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    res.json(result);
  } catch (err) {
    console.error("❌ Mercury parse failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Mercury Parser running on port ${PORT}`);
});


