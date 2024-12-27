const axios = require("axios");
const Token = require("../models/Token");
const { TOKEN_INFO_API, getChartAPI } = require("../constants");
const ListedPairs = require("../models/ListedPairs");

class TokenService {
  async updateTokenInfo(pairAddress, category) {
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

  async getChartByPairAddress(pairAddress) {
    try {
      // Fetch tokens from external API
      // Replace this URL with your actual API endpoint

      const token = await Token.findOne({ pairAddress });
      if (!token) {
        console.log("Token not found");
        return null;
      }

      const API = getChartAPI(token.baseToken.address);

      console.log("API", API);
      const response = await axios.get(API);
      const chartData = response.data;

      console.log("chart data", chartData);

      if (!chartData) {
        console.log("Error fetching chart info");
        return;
      }

      return chartData;
    } catch (error) {
      console.error("Error chart info:", error.message);

      return null;
    }
  }

  async getTokens() {
    return Token.find().sort({ symbol: 1 });
  }

  async getCategories() {
    return ListedPairs.find().sort({ symbol: 1 });
  }

  // run to update all listed pairs in the database
  async updateListedPairs() {
    // fetch all the listed tokens to track
    const pairs = await ListedPairs.find();

    for (const pair of pairs) {
      await this.updateTokenInfo(pair.pairAddress, pair.category);
    }
  }
}

module.exports = new TokenService();
