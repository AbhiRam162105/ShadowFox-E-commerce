const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/api/items", require("./routes/items"));
app.use("/api/payment", cors(), require("./routes/payment"));
app.use("/api/users", cors(), require("./routes/users"));
// Connect to the database
connectDB()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => console.error("Failed to connect to the database:", error));
