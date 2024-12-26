const mongoose = require("mongoose");

const txnSchema = new mongoose.Schema(
  {
    buys: Number,
    sells: Number,
  },
  { _id: false }
);

const volumeSchema = new mongoose.Schema(
  {
    h24: Number,
    h6: Number,
    h1: Number,
    m5: Number,
  },
  { _id: false }
);

const priceChangeSchema = new mongoose.Schema(
  {
    m5: Number,
    h1: Number,
    h6: Number,
    h24: Number,
  },
  { _id: false }
);

const liquiditySchema = new mongoose.Schema(
  {
    usd: Number,
    base: Number,
    quote: Number,
  },
  { _id: false }
);

const tokenInfoSchema = new mongoose.Schema(
  {
    address: String,
    name: String,
    symbol: String,
  },
  { _id: false }
);

const tokenSchema = new mongoose.Schema(
  {
    chainId: {
      type: String,
      required: true,
    },
    dexId: {
      type: String,
      required: true,
    },
    category: String,
    url: String,
    pairAddress: {
      type: String,
      required: true,
      unique: true,
    },
    baseToken: tokenInfoSchema,
    quoteToken: tokenInfoSchema,
    priceNative: String,
    priceUsd: String,
    txns: {
      m5: txnSchema,
      h1: txnSchema,
      h6: txnSchema,
      h24: txnSchema,
    },
    volume: volumeSchema,
    priceChange: priceChangeSchema,
    liquidity: liquiditySchema,
    fdv: Number,
    marketCap: Number,
    pairCreatedAt: Number,
    info: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    strict: false,
  }
);

// Create compound index for efficient querying
tokenSchema.index({ chainId: 1, dexId: 1, pairAddress: 1 });

module.exports = mongoose.model("Token", tokenSchema);
