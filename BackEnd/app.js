const express = require("express");
const mongoose = require("./db.js");
const cors = require("cors");
//var axios=require('axios');
const bodyParser = require("body-parser");

//const url="mongodb://localhost:27017/";
//const db='Project_Simulation';

const routes = require("./routes/routes.js");

var server = express();

server.use(bodyParser.json());
//server.use(cors({origin:'http://localhost:4200/'}));
server.use(cors());
server.use(express.json());

//server.use(bodyParser.urlencoded({extended:true}))
//server.use(express.urlencoded({encoded:false}));

server.listen(3200, () => {
  console.log("Express sever at port 3200");

  server.use("/", routes);
  //server.use('/carts',routes)
});
