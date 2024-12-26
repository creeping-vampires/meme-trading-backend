const ListedPairs = require("../models/ListedPairs");

async function addListedPair(req, res) {
  try {
    const { pairAddress, category } = req.body;

    console.log("pairAddress", pairAddress);
    console.log("category", category);

    if (!pairAddress || !category) {
      return res.status(400).json({
        error: "Both pairAddress and category are required",
      });
    }

    // check if pair already exists in db
    const pairExists = await ListedPairs.findOne({ pairAddress: pairAddress });

    if (pairExists) {
      return res.status(409).json({
        error: "Pair address already exists",
      });
    }

    const newPair = await ListedPairs.create({
      pairAddress,
      category,
    });

    res.status(201).json(newPair);

    console.log("pair listed");
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(409).json({
        error: "Pair address already exists",
      });
    }
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addListedPair,
};
