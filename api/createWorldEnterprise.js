const axios = require("axios");
const queryString = require("querystring");
const { EVENT_SIGNAL_URL } = require("../config");
const { processUser, saveUser } = require("./weUser");

module.exports = async (
  users,
  shares_,
  name,
  symbol,
  enterprise,
  enterpriseInfo
) => {
  var shares = [];
  try {
    try {
      for (var i = 0; i < shares_.length; i++) {
        try {
          shares[i] = Number(shares_[i]);
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {}

    const logoImg = enterpriseInfo[0];
    const enterpriseName = enterpriseInfo[1];
    const description = enterpriseInfo[2];
    const isRG = enterpriseInfo[3];
    const companyType = enterpriseInfo[4];
    const admin = enterpriseInfo[5];
    const ipfs = enterpriseInfo[6];

    for (var i = 0; i < users.length; i++) {
      const userInfo = await processUser(users[i], shares[i], logoImg, enterpriseName, ipfs, enterprise);
      console.log("======userinfo====", userInfo);
      await saveUser(users[i], userInfo);
    }

    users = users.toString();
    shares = shares.toString();

    const data = {
      users,
      shares,
      name,
      symbol,
      enterprise,
      logoImg,
      enterpriseName,
      description,
      isRG,
      companyType,
      admin,
      ipfs,
    };

    console.log("CreateWorldEnterprise", data);

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
