const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./config");
const cors = require("cors");
const path = require("path");

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo.");
});

mongoose.connection.on("error", (error) => {
  console.log("Error connecting", error);
});

require("./models/task");
require("./models/user");

app.use(cors());
app.use(express.json());
app.use(require("./routes/tasks"));
app.use(require("./routes/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening on port ", PORT);
});
