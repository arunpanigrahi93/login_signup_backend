const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please login"); // ✅ return to stop further execution
    }

    const decodedObj = await jwt.verify(token, "DEV$Tinder$790");

    const { _id } = decodedObj;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send("User not found"); // ✅ also return here
    }

    req.user = user;
    next(); // ✅ only call next() if no response has been sent
  } catch (err) {
    return res.status(400).send("ERROR: " + err.message); // ✅ return here too
  }
};

module.exports = userAuth;
