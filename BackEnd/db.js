const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/Project_Simulation", (err) => {
  if (!err) {
    console.log("Connection Successful");
  } else {
    console.log("Error in Connection " + err);
  }
});

module.exports = mongoose;
