const axios = require("axios");
const queryString = require("querystring");
const { EVENT_SIGNAL_URL } = require("../config");

module.exports = async (enterprise, from, to, value) => {
  try {
    value = Number(value);

    const data = {
      enterprise,
      from,
      to,
      value,
    };
    console.log("Transfer", enterprise, from, to, value);
    const queryStr = queryString.stringify(data);

    await axios({
      method: "POST",
      url: `${EVENT_SIGNAL_URL}/transfer?${queryStr}`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};