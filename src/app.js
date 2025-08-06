const express = require("express");
const userAuth = require("./middleware/auth");
const connectDb = require("./config/datbase");
const User = require("./model/user");

const app = express();
const port = 9999;
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added sucessfully");
  } catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }
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
