const axios = require("axios");
const { EVENT_WE_USER_URL } = require("../config");

module.exports.processUser = async (
  index,
  address,
  shareAmount,
  logoImg,
  enterpriseName,
  ipfs,
  enterprise
) => {
  let userInfo = {};
  let _enterpriseObj = {};
  _enterpriseObj[enterprise.toUpperCase()] = {
    index: index,
    amount: parseFloat(shareAmount),
    ipfs: ipfs,
    logo: logoImg,
    name: enterpriseName,
  };

  try {
    const res = await axios
      .get(`${EVENT_WE_USER_URL}/user/${address}`)
      .then((response) => {
        if (response.data?.error) throw response.data?.msg;
        return response;
      });

    if (res.data?.exists) {
      userInfo = { ...res.data };
      let _enterprises;
      try{
        _enterprises = JSON.parse(res.data?.enterprises)
      }catch(e){}
      userInfo["enterprises"] = JSON.stringify({
        ..._enterprises,
        ..._enterpriseObj,
      });
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
