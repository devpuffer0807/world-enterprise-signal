const axios = require("axios");
const queryString = require("querystring");
const { EVENT_SIGNAL_URL } = require("../config");

/**
 * @param enterprise enterprise address
 * @param token token address
 * @param from from address
 * @param to to address
 * @param value transfer amount
 **/
module.exports = async (enterprise, token, from, to, value) => {
  try {
    value = Number(value);
    value = parseFloat(value).toLocaleString();
    value = value.replace(/,/g, "");

    const data = {
      enterprise,
      from,
      to,
      value,
      token,
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
