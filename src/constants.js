const CHART_API = `https://fe-api.jup.ag/api/v1/charts`;
const RELAYER_API = `https://octane-relayer.onrender.com/api`;
const TOKEN_INFO_API = `https://api.dexscreener.com/latest/dex/pairs/solana`;

const QUOTE_ADDRESS = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
//https://fe-api.jup.ag/api/v1/charts/7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr?quote_address=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&type=4H&time_from=1730960076&time_to=1735280076
// chart Time = [1W, 1H, 4H, 1D, 1W]
const getChartAPI = (tokenAddress, chartTime = "4H") => {
  // manually calculate timeFrom and timeTo for each chart type
  const timeFrom = 1730960076;
  const timeTo = 1735280076;

  return `${CHART_API}/${tokenAddress}?quote_address=${QUOTE_ADDRESS}&type=${chartTime}&time_from=${timeFrom}&time_to=${timeTo}`;
};

module.exports = { getChartAPI, RELAYER_API, TOKEN_INFO_API };
