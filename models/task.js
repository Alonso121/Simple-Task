const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: false,
  },
  reminder: {
    type: Boolean,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

mongoose.model("Task", taskSchema);
