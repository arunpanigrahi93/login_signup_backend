const userAuth = (req, res, next) => {
  try {
    const token = "xyaz";
    const isAuth = token === "xyz";

    if (!isAuth) {
      res.send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = userAuth;
