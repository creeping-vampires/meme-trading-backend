const express = require("express");
const router = express.Router();
const tokenService = require("../services/tokenService");

router.get("/", async (req, res) => {
  try {
    const tokens = await tokenService.getTokens();
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tokens-by-category", async (req, res) => {
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

module.exports = router;
