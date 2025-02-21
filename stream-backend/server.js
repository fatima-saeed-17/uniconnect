const express = require("express");
const cors = require("cors");
const StreamChat = require("stream-chat").StreamChat;
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-service-account.json"); // 🔹 Replace with your Firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Stream Chat
const serverClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_SECRET_KEY
);

// 🔹 API Route to Generate Stream Token
app.post("/get-token", async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    // Verify Firebase Token
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    const userId = decodedToken.uid;

    // Generate Stream Token
    const streamToken = serverClient.createToken(userId);
    res.json({ token: streamToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
});

// Start Server
app.listen(3000, () => console.log("Server running on port 3000"));
