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
      token,
      from,
      to,
      value,
    };
    console.log("Transfer", enterprise, token, from, to, value);
    const queryStr = queryString.stringify(data);

    const res = await axios({
      method: "POST",
      url: `${EVENT_SIGNAL_URL}/transfer?${queryStr}`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });

    console.log("====Transfer Result======", res.data);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
