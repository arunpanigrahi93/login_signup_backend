const express = require("express");
const userAuth = require("./middleware/auth");
const connectDb = require("./config/datbase");
const User = require("./model/user");
const validateSignUpData = require("./helper/validation");
const bcrypt = require("bcrypt");

const app = express();
const port = 9999;
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //validate the data

    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    //create new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added sucessfully");
  } catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //email is available in db ?
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    // password check
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error :" + err.message);
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

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("updated successfully");
  } catch (err) {
    res.status(400).send("update failed" + err.message);
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
