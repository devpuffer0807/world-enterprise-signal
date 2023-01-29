require("dotenv-safe").config();
const { getRpcProvider } = require("./utils/provider");
const { Contract } = require("@ethersproject/contracts");
const Web3 = require("web3");
const abi = require("./config/abi.json");

const rpcProvider = getRpcProvider(97);
const contract = new Contract(
  "0x2AaC58A12DBd5F10AFf469182E1C2D19f8939945",
  abi,
  rpcProvider
);

rpcProvider.on(contract.filters.CreateWorldEnterprise(), async (tx) => {
    console.log(tx);
})