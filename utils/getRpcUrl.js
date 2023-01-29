const config = require("../config");

module.exports = (chainId) => {
  const nodes = {
    56: JSON.parse(config.WEB3.PUBLIC_BSC_NODES), // mainnet
    97: JSON.parse(config.WEB3.PUBLIC_BSC_TEST_NODES), // testnet
  };

  return nodes[chainId];
};
