require("dotenv").config();
const factoryWorker = require("./worker/factory");

factoryWorker(80001, process.env.MUMBAI_FACTORY_ADDRESS);
