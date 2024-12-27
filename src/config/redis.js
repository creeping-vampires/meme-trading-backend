const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL_PROD || "redis://localhost:6379",
});

client.on("error", (err) => console.error("Redis Client Error:", err));
client.on("connect", () => console.log("Connected to Redis"));

// Connect to Redis
(async () => {
  await client.connect();
})();

module.exports = client;
