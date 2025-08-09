const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("Please login");
    }
    const decodedObj = await jwt.verify(token, "DEV$Tinder$790");

    const { _id } = decodedObj;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
};

module.exports = userAuth;
