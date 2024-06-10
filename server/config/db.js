const mongoose = require("mongoose");

// Assuming you have a Mongoose model defined somewhere in your application
// For example, in a separate file like models/Product.js // Adjust the path according to your project structure

const connectDB = async () => {
  try {
    // Construct the connection string with the database name appended
    const connectionString = `${process.env.MONGO_URI}/e_commerce`;

    // Connect to MongoDB using Mongoose, specifying the database name
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB and e_commerce database");
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = connectDB;
