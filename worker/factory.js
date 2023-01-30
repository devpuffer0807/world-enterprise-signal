const ethers = require("ethers");
const FactoryABI = require("../abi/FactoryABI.json");
const { getProvider } = require("../utils");
const enterpriseWorker = require("./enterprise");

/**
 * @dev create service worker for factory contract
 **/
module.exports = async (chainId, contractAddress) => {
  try {
    const provider = getProvider(chainId);
    const factoryContract = new ethers.Contract(
      contractAddress,
      FactoryABI,
      provider
    );

    const enterpriseCounter = await factoryContract.index();
    if (parseInt(enterpriseCounter) > 0) {
      for (var i = 0; i < enterpriseCounter; i++) {
        const enterpriseAddress = await factoryContract.worldEnterprises(i);
        enterpriseWorker(provider, enterpriseAddress);
      }
    }

    factoryContract.on(
      "CreateWorldEnterprise",
      (users, shares, name, symbol, enterprise) => {
        console.log(
          "===CreateWorldEnterprise===",
          users,
          shares,
          name,
          symbol,
          enterprise
        );
        try {
          enterpriseWorker(provider, enterprise);
        } catch (e) {
          console.error("===Enterprise worker error===", e);
        }
      }
    );
  } catch (e) {
    console.error("===Factory worker error===", e);
  }
};
