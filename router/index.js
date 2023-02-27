var axios = require("axios");
var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Express api");
});

router.post("/", async (req, res, next) => {
  const ipfsURL = req.body.ipfsURL;
  const ipfsData = await axios.get(ipfsURL);
  res.send(ipfsData.data);
});

module.exports = router;
