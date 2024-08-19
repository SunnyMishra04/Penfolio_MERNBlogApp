const express = require('express');
const { connectToMongo } = require('./config/db');  // Import connectToMongo
const authRouter = require('./routes/blog');  // Import the router containing blog routes
const cors = require('cors');
const app = express();

// Connect to MongoDB
connectToMongo();

app.use(cors());
app.use(express.json());
app.use(express.static("public/upload")); // Serve static files from the upload directory

// Test Route to verify server is running
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Use the blog router for all API routes
app.use("/api/v1", authRouter); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
