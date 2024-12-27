const express = require("express");
const router = express.Router();
const tokenService = require("../services/tokenService");
const { cache } = require("../middleware/cache");

router.get("/", async (req, res) => {
  try {
    const tokens = await tokenService.getTokens();
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tokens-by-category", cache("5m"), async (req, res) => {
  try {
    const listedCategoris = await tokenService.getCategories();
    const tokens = await tokenService.getTokens();

    const result = {};
    listedCategoris.forEach((category) => {
      result[category.category] = tokens.filter(
        (token) => token.category === category.category
      );
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get token chart by pairAddress
router.get("/chart/:pairAddress", cache("5m"), async (req, res) => {
  try {
    const pairAddress = req.params.pairAddress;

    if (!pairAddress) {
      return res.status(400).json({ error: "pairAddress is required" });
    }

    const chart = await tokenService.getChartByPairAddress(pairAddress);

    if (!chart) {
      return res.status(404).json({ error: "Chart not found" });
    }
    res.json(chart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
