const ethers = require("ethers");
const FactoryABI = require("../abi/FactoryABI.json");
const { getProvider } = require("../utils");
const enterpriseWorker = require("./enterprise");
const createWorldEnterpriseAPI = require("../api/createWorldEnterprise");

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
    let enterpriseCounter = await factoryContract.index();
    enterpriseCounter = Number(enterpriseCounter);
    factoryContract.on(
      "CreateWorldEnterprise",
      async (users, shares, name, symbol, enterprise) => {
        try {
          enterpriseWorker(provider, enterprise);
          await createWorldEnterpriseAPI(
            users,
            shares,
            name,
            symbol,
            enterprise
          );
        } catch (e) {
          console.error("===Enterprise worker error===", e);
        }
      }
    );

    if (parseInt(enterpriseCounter) > 0) {
      for (var i = 0; i < enterpriseCounter; i++) {
        const enterpriseAddress = await factoryContract.worldEnterprises(i);
        enterpriseWorker(provider, enterpriseAddress);
      }
    }
  } catch (e) {
    console.error("===Factory worker error===", e);
  }
  console.log("======= Started Event Listener ========");
  return true;
};
