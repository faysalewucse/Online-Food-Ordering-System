require("dotenv").config({ path: "./config.env" });
const bodyParser = require("body-parser");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");
const path = require("path");

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/resdata", require("./routes/resdata"));

//Error Handler (Should be last Piece of Middleware)
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, Promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
