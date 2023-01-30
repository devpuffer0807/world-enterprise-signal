const ethers = require("ethers");

/**
 * @param chainId chain id
 * @dev get socket provider
 *
 * ** */
module.exports.getProvider = (chainId) => {
  const chainList = {
    80001: `wss://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
  };
  return new ethers.providers.WebSocketProvider(chainList[chainId]);
};
