const axios = require("axios");
const queryString = require("querystring");
const { EVENT_SIGNAL_URL } = require("../config");

module.exports = async (orderIndex, owner, amount, price) => {
  try {
    orderIndex = Number(orderIndex);
    amount = Number(amount);
    price = Number(price);

    const data = {
      orderIndex,
      owner,
      amount,
      price,
    };
    console.log("CreateBuyOrder", orderIndex, owner, amount, price);
    const queryStr = queryString.stringify(data);

    await axios({
      method: "POST",
      url: `${EVENT_SIGNAL_URL}/create-buy-order?${queryStr}`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
