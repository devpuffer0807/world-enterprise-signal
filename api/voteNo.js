const axios = require("axios");
const queryString = require("querystring");
const { EVENT_SIGNAL_URL } = require("../config");

module.exports = async (account, proposalIndex) => {
  try {
    proposalIndex = Number(proposalIndex);

    const data = {
      account,
      proposalIndex,
    };
    console.log("VoteNo", account, proposalIndex);
    const queryStr = queryString.stringify(data);

    await axios({
      method: "POST",
      url: `${EVENT_SIGNAL_URL}/vote-no?${queryStr}`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
