const getRpcUrl = require("./getRpcUrl");
const { StaticJsonRpcProvider } = require("@ethersproject/providers");

/**
 * @param chainId chainId
 **/
module.exports.getRpcProvider = (chainId) => {
  const RPC_URL = getRpcUrl(chainId);
  return new StaticJsonRpcProvider(RPC_URL);
};
