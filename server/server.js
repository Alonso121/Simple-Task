const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./config");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

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

app.listen(PORT, () => {
  console.log("Server is listening on port ", PORT);
});
