require("dotenv").config({ path: "./.env" });
const bodyParser = require("body-parser");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");
const path = require("path");
const Emmiter = require("events");

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const eventEmitter = new Emmiter();
app.set("eventEmitter", eventEmitter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/resdata", require("./routes/resdata"));
app.use("/api/riderdata", require("./routes/riderdata"));
//Error Handler (Should be last Piece of Middleware)
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api Running");
  });
}
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, Promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});

//Socket

const io = require("socket.io")(server);
io.on("connection", (socket) => {
  socket.on("join", (orderId) => {
    socket.join(orderId);
  });
});

eventEmitter.on("orderUpdated", (data) => {
  io.to(`order_${data.id}`).emit("orderUpdated", data);
});
