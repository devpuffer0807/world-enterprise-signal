const axios = require("axios");
const { EVENT_WE_USER_URL } = require("../config");

module.exports.processUser = async (address, shareAmount, enterprise) => {
  let userInfo = {};
  let _enterpriseObj = {};
  _enterpriseObj[enterprise] = parseFloat(shareAmount);

  try {
    const res = await axios
      .get(`${EVENT_WE_USER_URL}/user/${address}`)
      .then((response) => {
        if (response.data?.error) throw response.data?.msg;
        return response;
      });

    if (res.data?.exists) {
      userInfo["enterprises"] = {
        ...res.data?.enterprises,
        ..._enterpriseObj,
      };

      userInfo["name"] = res.data?.name;
      userInfo["username"] = res.data?.username;
      userInfo["image_url"] = res.data?.image_url;
    } else {
      userInfo["enterprises"] = _enterpriseObj;
    }
  } catch (e) {
    console.error("====we user error====", e);
    userInfo["enterprises"] = _enterpriseObj;
  }

  return userInfo;
};

module.exports.saveUser = (address, userInfo) => {
  return axios
    .post(`${EVENT_WE_USER_URL}/user/${address}`, userInfo)
    .then((response) => {
      if (response.data?.error) throw response.data?.msg;
      return response;
    });
};
