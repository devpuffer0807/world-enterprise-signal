const axios = require("axios");
const queryString = require("querystring");
const { EVENT_SIGNAL_URL } = require("../config");

module.exports.createWorldEnterpriseAPI = async (
  users,
  _shares,
  name,
  symbol,
  enterprise
) => {
  try {
    var shares = [];
    if (_shares.length > 0) {
      for (var i; i < _shares.length; i++) {
        try {
          shares[i] = Number(_shares[i]);
        } catch (e) {}
      }
    }
    const data = {
      users,
      shares,
      name,
      symbol,
      enterprise,
    };
    console.log("########", data);
    const queryStr = queryString.stringify(data);
    await axios({
      method: "POST",
      url: `${EVENT_SIGNAL_URL}/factory?${queryStr}`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
