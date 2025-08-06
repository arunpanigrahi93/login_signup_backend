const express = require("express");

const app = express();
const port = 9999;

app.listen(9999, () => {
  console.log("server running on: " + port);
});
