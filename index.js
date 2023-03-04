require("dotenv").config();
const factoryWorker = require("./worker/factory");

factoryWorker(80001, process.env.MUMBAI_FACTORY_ADDRESS);

// var express = require("express");
// var bodyParser = require('body-parser');
// var router = require("./router");
// var cors = require('cors');

// var app = express();

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200,
// }
// app.use(cors(corsOptions));
// app.use("/", router);

// app.listen(80, () => {
//   console.log("Express server started");
// });
