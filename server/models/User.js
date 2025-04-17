const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  name: String,
  email: String,
  picture: String,
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
