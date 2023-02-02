const axios = require("axios");
const queryString = require("querystring");
const { EVENT_SIGNAL_URL } = require("../config");

module.exports = async (proposalIndex, proposer, amount) => {
  try {
    proposalIndex = Number(proposalIndex);
    amount = Number(amount);

    const data = {
      proposalIndex,
      proposer,
      amount,
    };
    console.log("ExecutePassed", proposalIndex, proposer, amount);
    const queryStr = queryString.stringify(data);

    await axios({
      method: "POST",
      url: `${EVENT_SIGNAL_URL}/assed?${queryStr}`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
