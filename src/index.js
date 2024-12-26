const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const tokenRoutes = require("./routes/tokenRoutes");
const listPairRoutes = require("./routes/listPairRoutes");
const tokenService = require("./services/tokenService");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL_DEV || "mongodb://localhost:27017/token-db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());

// Routes
app.use("/api/tokens", tokenRoutes);
app.use("/api/listPair", listPairRoutes);

// // Schedule token updates every 10 minutes
// cron.schedule("*/5 * * * *", () => {
//   console.log("Running scheduled token update");
//   tokenService.updateTokens();
// });

// Initial token update on startup
tokenService.updateListedPairs();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
