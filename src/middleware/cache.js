const redis = require("../config/redis");
const ms = require("ms");

function cache(duration = "5m") {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;

    try {
      const cachedData = await redis.get(key);

      if (cachedData) {
        console.log("cached data");
        return res.json(JSON.parse(cachedData));
      }

      // Store original res.json to intercept the response
      const originalJson = res.json;
      res.json = function (data) {
        redis.setEx(key, ms(duration) / 1000, JSON.stringify(data));
        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error("Cache error:", error);
      next();
    }
  };
}

module.exports = { cache };
