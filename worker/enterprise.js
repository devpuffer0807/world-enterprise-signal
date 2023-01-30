const ethers = require("ethers");
const EnterpriseABI = require("../abi/EnterpriseABI.json");

/**
 * @dev create service worker for mumbai factory contract
 **/
module.exports = async (provider, address) => {
  try {
    const enterpriseContract = new ethers.Contract(
      address,
      EnterpriseABI,
      provider
    );

    enterpriseContract.on(
      "JoinWorldEnterprise",
      (proposalIndex, proposer, amount, startTime, endTime) => {
        console.log(
          "=====JoinWorldEnterprise====",
          proposalIndex,
          proposer,
          amount,
          startTime,
          endTime
        );
      }
    );

    enterpriseContract.on("VoteYes", (account, proposalIndex) => {
      console.log("====VoteYes=====", account, proposalIndex);
    });

    enterpriseContract.on("VoteNo", (account, proposalIndex) => {
      console.log("====VoteNo=====", account, proposalIndex);
    });

    enterpriseContract.on(
      "ExecutePassed",
      (proposalIndex, proposer, amount) => {
        console.log("=====ExecutePassed====", proposalIndex, proposer, amount);
      }
    );

    enterpriseContract.on("ExecuteFailed", (proposalIndex) => {
      console.log("====ExecuteFailed=====", proposalIndex);
    });

    enterpriseContract.on(
      "CreateBuyOrder",
      (orderIndex, owner, amount, price) => {
        console.log(
          "====CreateBuyOrder=====",
          orderIndex,
          owner,
          amount,
          price
        );
      }
    );

    enterpriseContract.on(
      "CreateSellOrder",
      (orderIndex, owner, amount, price) => {
        console.log(
          "=====CreateSellOrder====",
          orderIndex,
          owner,
          amount,
          price
        );
      }
    );

    enterpriseContract.on("CloseOrder", (orderId) => {
      console.log("====CloseOrder=====", orderId);
    });

    enterpriseContract.on("CancelOrder", (orderId) => {
      console.log("=====CancelOrder====", orderId);
    });
  } catch (e) {
    console.error("===Enterprise worker error===", e);
  }
};
