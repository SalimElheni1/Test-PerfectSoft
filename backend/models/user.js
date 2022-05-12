const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  fName: String,
  lName: String,
  age: String,
  email: { type: String, unique: true },
  pwd: String,
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);
module.exports = User;
