const axios = require("axios");
const Token = require("../models/Token");
const { TOKEN_INFO_API } = require("../constants");
const ListedPairs = require("../models/ListedPairs");

class TokenService {
  async updateTokens(pairAddress, category) {
    try {
      console.log("running scheduled token update");

      // Fetch tokens from external API
      // Replace this URL with your actual API endpoint
      const response = await axios.get(`${TOKEN_INFO_API}/${pairAddress}`);
      const tokenInfo = response.data;

      console.log("Token info fetched successfully", tokenInfo.pair);

      if (!tokenInfo.pair) {
        console.log("Error fetching token info");
        return;
      }

      // check if token info is already in the database
      const token = await Token.findOne({
        pairAddress: tokenInfo.pair.pairAddress,
      });

      if (token) {
        // Update token info
        await Token.findOneAndUpdate(
          { pairAddress: tokenInfo.pair.pairAddress },
          tokenInfo.pair
        );
        console.log("Token updated successfully");
        return;
      } else {
        // Save new token info
        await new Token({ ...tokenInfo.pair, category }).save();
        console.log("Token saved successfully");
      }
    } catch (error) {
      console.error("Error updating tokens:", error.message);
    }
  }

  async getTokens() {
    return Token.find().sort({ symbol: 1 });
  }

  async getCategories() {
    return ListedPairs.find().sort({ symbol: 1 });
  }

  async updateListedPairs() {
    // fetch all the listed tokens to track
    const pairs = await ListedPairs.find();

    for (const pair of pairs) {
      await this.updateTokens(pair.pairAddress, pair.category);
    }
  }
}

module.exports = new TokenService();
