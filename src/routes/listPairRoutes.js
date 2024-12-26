const express = require("express");
const router = express.Router();
const { addListedPair } = require("../controllers/listedPairController");

router.post("/", addListedPair);

module.exports = router;
