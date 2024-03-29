const axios = require("axios");
const queryString = require("querystring");
const { EVENT_SIGNAL_URL } = require("../config");

module.exports = async (
  enterpriseAddress,
  proposalIndex,
  proposer,
  amount,
  price,
  commentUrl,
  startTime,
  endTime
) => {
  try {
    proposalIndex = Number(proposalIndex);
    amount = Number(amount);
    startTime = Number(startTime);
    endTime = Number(endTime);

    const data = {
      enterpriseAddress,
      proposalIndex,
      proposer,
      amount,
      price,
      commentUrl,
      startTime,
      endTime,
    };
    console.log(
      "JoinWorldEnterprise",
      enterpriseAddress,
      proposalIndex,
      proposer,
      amount,
      price,
      commentUrl,
      startTime,
      endTime
    );
    const queryStr = queryString.stringify(data);

    await axios({
      method: "POST",
      url: `${EVENT_SIGNAL_URL}/join-world-enterprise?${queryStr}`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
