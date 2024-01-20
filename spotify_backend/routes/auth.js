const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { getToken } = require("../utils/helper");
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    return res
      .status(403)
      .json({ error: "A user with this email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserdata = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
  };
  const newUser = await User.create(newUserdata);

  const token = await getToken(email, newUser);

  const userToreturn = { ...newUser.toJSON(), token };
  delete userToreturn.password;

  return res.status(200).json(userToreturn);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ error: "invalid email" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(403).json({ error: "invalid password" });
  }

  const token = await getToken(user.email, user);
  const userToreturn = { ...user.toJSON(), token };
  delete userToreturn.password;
  return res.status(200).json(userToreturn);
});
module.exports = router;
