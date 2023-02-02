const axios = require("axios");
const queryString = require("querystring");
const { EVENT_SIGNAL_URL } = require("../config");

module.exports = async (proposalIndex) => {
  try {
    proposalIndex = Number(proposalIndex);

    const data = {
      proposalIndex,
    };
    console.log("ExecuteFailed", proposalIndex);
    const queryStr = queryString.stringify(data);

    await axios({
      method: "POST",
      url: `${EVENT_SIGNAL_URL}/execute-failed?${queryStr}`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
