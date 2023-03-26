const axios = require("axios");
const queryString = require("querystring");
const { EVENT_SIGNAL_URL } = require("../config");

module.exports = async (
  enterprise_address,
  order_id,
  owner_address,
  amount,
  price
) => {
  try {
    order_id = Number(order_id);
    amount = Number(amount);
    price = Number(price);
    const type = "SELL";
    const status = "ACTIVE";

    const data = {
      enterprise_address,
      order_id,
      owner_address,
      amount,
      price,
      type,
      status,
    };

    console.log(
      "CreateSellOrder",
      enterprise_address,
      order_id,
      owner_address,
      amount,
      price
    );

    const queryStr = queryString.stringify(data);

    await axios({
      method: "POST",
      url: `${EVENT_SIGNAL_URL}/create-order?${queryStr}`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
