const Moralis = require("moralis").default;
const Chains = require("@moralisweb3/common-evm-utils");
const EvmChain = Chains.EvmChain;
const abi = require("./config/abi.json");
require("dotenv").config();
const options = {
  chains: [EvmChain.BSC_TESTNET],
  description: "Tess",
  tag: "test",
  includeContractLogs: true,
  abi: abi,
  topic0: ["CreateWorldEnterprise(address[] users,uint256[] shares,string name,string symbol,address indexed enterprise)"],
  webhookUrl: "https://22be-2001-2003-f58b-b400-f167-f427-d7a8-f84e.ngrok.io/webhook",
  advancedOptions: [
    {
        topic0: "CreateWorldEnterprise(address[] users,uint256[] shares,string name,string symbol,address indexed enterprise)",
        filter: {
            // gt : ["value", "100000"+"".padEnd(6,"0")]
        }
    }
]
};
Moralis.start({
  apiKey: "",
}).then(async () => {
  const stream = await Moralis.Streams.add(options);
  const { id } = stream.toJSON();
  await Moralis.Streams.addAddress({
      id: id,
      address: ["0x2AaC58A12DBd5F10AFf469182E1C2D19f8939945"]
  })
});