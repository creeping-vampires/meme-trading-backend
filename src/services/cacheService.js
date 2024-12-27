const redis = require("../config/redis");

class CacheService {
  static async invalidatePattern(pattern) {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(keys);
        console.log(`Invalidated cache keys matching pattern: ${pattern}`);
      }
    } catch (error) {
      console.error("Cache invalidation error:", error);
    }
  }

  static async invalidateTokenCache() {
    await this.invalidatePattern("cache:/api/tokens*");
  }
}

module.exports = CacheService;
