const mongoose = require("mongoose");

const listedPairSchema = new mongoose.Schema({
  pairAddress: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ListedPair", listedPairSchema);
