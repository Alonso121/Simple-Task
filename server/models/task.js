const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
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
