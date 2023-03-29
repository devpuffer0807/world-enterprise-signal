const ethers = require("ethers");
const EnterpriseABI = require("../abi/EnterpriseABI.json");
const joinWorldEnterpriseAPI = require("../api/joinWorldEnterprise");
const voteYesAPI = require("../api/voteYes");
const voteNoAPI = require("../api/voteNo");
const executePassedAPI = require("../api/executePassed");
const executeFailedAPI = require("../api/executeFailed");
const createBuyOrderAPI = require("../api/createBuyOrder");
const createSellOrderAPI = require("../api/createSellOrder");
const closeOrderAPI = require("../api/closeOrder");
const cancelOrderAPI = require("../api/cancelOrder");
const transferAPI = require("../api/transfer");

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
      (
        proposalIndex,
        proposer,
        amount,
        price,
        commentUrl,
        startTime,
        endTime
      ) => {
        console.log(
          "=====JoinWorldEnterprise====",
          address,
          proposalIndex,
          proposer,
          amount,
          price,
          commentUrl,
          startTime,
          endTime
        );
        joinWorldEnterpriseAPI(
          address,
          proposalIndex,
          proposer,
          amount,
          price,
          commentUrl,
          startTime,
          endTime
        );
      }
    );

    enterpriseContract.on("VoteYes", async (account, proposalIndex) => {
      console.log("====VoteYes=====", address, account, proposalIndex);
      await voteYesAPI(address, account, proposalIndex);
    });

    enterpriseContract.on("VoteNo", async (account, proposalIndex) => {
      console.log("====VoteNo=====", address, account, proposalIndex);
      await voteNoAPI(address, account, proposalIndex);
    });

    enterpriseContract.on(
      "ExecutePassed",
      async (proposalIndex, proposer, amount) => {
        console.log("=====ExecutePassed====", proposalIndex, proposer, amount);
        await executePassedAPI(proposalIndex, proposer, amount);
      }
    );

    enterpriseContract.on("ExecuteFailed", async (proposalIndex) => {
      console.log("====ExecuteFailed=====", proposalIndex);
      await executeFailedAPI(proposalIndex);
    });

    enterpriseContract.on(
      "CreateBuyOrder",
      async (orderIndex, owner, amount, price) => {
        console.log(
          "====CreateBuyOrder=====",
          orderIndex,
          owner,
          amount,
          price
        );
        await createBuyOrderAPI(address, orderIndex, owner, amount, price);
      }
    );

    enterpriseContract.on(
      "CreateSellOrder",
      async (orderIndex, owner, amount, price) => {
        console.log(
          "=====CreateSellOrder====",
          orderIndex,
          owner,
          amount,
          price
        );
        await createSellOrderAPI(address, orderIndex, owner, amount, price);
      }
    );

    enterpriseContract.on("CloseOrder", async (orderId) => {
      console.log("====CloseOrder=====", orderId);
      await closeOrderAPI(address, orderId);
    });

    enterpriseContract.on("CancelOrder", async (orderId) => {
      console.log("=====CancelOrder====", orderId);
      await cancelOrderAPI(address, orderId);
    });

    enterpriseContract.on("Transfer", async (from, to, value) => {
      console.log("=====Transfer====", from, to, value);
      await transferAPI(address, address, from, to, value);
    });

    enterpriseContract.on("Withdraw", async (admin, to, value) => {
      console.log("=====Withdraw====", admin, to, value);
      await transferAPI(
        address,
        ethers.constants.AddressZero,
        admin,
        to,
        value
      );
    });

    enterpriseContract.on("WithdrawToken", async (token, admin, to, value) => {
      console.log("=====WithdrawToken====", token, admin, to, value);
      await transferAPI(address, token, admin, to, value);
    });
  } catch (e) {
    console.error("===Enterprise worker error===", e);
  }
};
