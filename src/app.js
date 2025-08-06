const express = require("express");
const userAuth = require("./middleware/auth");
const connectDb = require("./config/datbase");
const User = require("./model/user");

const app = express();
const port = 9999;
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();
    res.send("User added sucessfully");
  } catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ emailId: req.body.emailId });
    if (!user) {
      res.send("No user found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      res.send("No users found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = req.body;

    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("updated successfully");
  } catch (err) {
    res.status(400).send("someting went wrong");
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
