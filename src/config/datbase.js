const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://arunpanigrahi94:arun1234@loginsignup.xrkh5af.mongodb.net/test"
  );
};

module.exports = connectDb;
