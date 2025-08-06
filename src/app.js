const express = require("express");
const userAuth = require("./middleware/auth");
const connectDb = require("./config/datbase");

const app = express();
const port = 9999;

app.use("/user", userAuth);

app.get("/user/alldata", (req, res) => {
  res.send("Get all the data");
});

app.delete("/user/userData", (req, res) => {
  res.send("deleted user");
});

connectDb()
  .then(() => {
    console.log("Db connected");
    app.listen(port, () => {
      console.log("server running on port :" + port);
    });
  })
  .catch((err) => {
    "Db not connected";
  });
