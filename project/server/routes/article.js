const express = require("express");
const path = require("path");

const router = express.Router();

// GET /article1
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/article.html"));
});

module.exports = router;
