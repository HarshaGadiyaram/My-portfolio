const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  const telegramMessage = `New Contact Form Submission:
    Name: ${fullName}
    Email: ${email}
    Message: ${message}`;

  try {
    const response = await fetch(process.env.HARSHA_MESSAGING_SERVER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: telegramMessage,
      }),
    });

    if (response.ok) {
      res.status(200).json({ success: true, message: "Message sent!" });
    } else {
      throw new Error("Failed to send message.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});

module.exports = router;
