// const jwt = require("jsonwebtoken");
// const UserModel = require("../models/user");
// exports = {};
// exports.getToken = async (email, user) => {
//   const token = jwt.sign({ identifier: user._id }, "9049113166Raj@$");
//   return token;
// };
// module.exports = exports;

const jwt = require("jsonwebtoken");

exports = {};

exports.getToken = async (email, user) => {
  // Assume this code is complete
  const token = jwt.sign({ identifier: user._id }, "9049113166Raj@$");
  return token;
};

module.exports = exports;
