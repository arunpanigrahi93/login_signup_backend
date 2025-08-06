const express = require("express");

const app = express();
const port = 9999;

// get
app.get("/user", (req, res) => {
  res.send({ firstName: "Arun", lastName: "Kumar" });
});

//post
app.post("/user", (req, res) => {
  res.send("Data saved successfully in database");
});

//patch
app.patch("/user", (req, res) => {
  res.send("Data updated successfully");
});

//delete
app.delete("/user", (req, res) => {
  res.send("user deleted successfully");
});

app.listen(9999, () => {
  console.log("server running on port number : " + port);
});
