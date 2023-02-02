const axios = require("axios");
const queryString = require("querystring");
const { EVENT_SIGNAL_URL } = require("../config");

module.exports = async (users, shares_, name, symbol, enterprise) => {
  try {
    try {
      var shares = [];
      for (var i = 0; i < shares_.length; i++) {
        try {
          shares[i] = Number(shares_[i]);
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {}

    const data = {
      users,
      shares,
      name,
      symbol,
      enterprise,
    };
    console.log(
      "CreateWorldEnterprise",
      users,
      shares,
      name,
      symbol,
      enterprise
    );
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
