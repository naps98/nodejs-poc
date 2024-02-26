const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName : {
    type: String,
    required: true
  },
  password : String
});

const users = mongoose.model("users", userSchema);
module.exports = users;