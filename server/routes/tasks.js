const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/RequireLogin");
const mongoose = require("mongoose");
const Task = mongoose.model("Task");

//Get all Tasks
router.get("/tasks", requireLogin, (req, res) => {
  Task.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((myTasks) => {
      res.json({ tasks: myTasks });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Add new Task
router.post("/tasks", requireLogin, (req, res) => {
  const { text, reminder, date, time } = req.body;
  if (!text || !date) {
    return res.status(422).json({ error: "Task or date missing!" });
  }
  req.user.password = undefined;
  req.user.name = undefined;
  req.user.email = undefined;
  const task = new Task({
    text,
    reminder,
    date,
    time,
    postedBy: req.user,
  });
  task
    .save()
    .then((result) => {
      res.json({ task: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete task
router.delete(`/tasks/:id`, requireLogin, (req, res) => {
  Task.findOne({ _id: req.params.id })
    .populate("postedBy", { id: 1 })
    .exec((err, task) => {
      if (err || !task) {
        res.status(422).json({ error: err });
      } else if (task.postedBy._id.toString() === req.user._id.toString()) {
        res.json({ message: "ok" });
        task
          .remove()
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

// Get one task
router.get("/tasks/:id", (req, res) => {
  Task.findById({ _id: req.params.id })
    .then((task) => res.json({ task: task }))
    .catch((err) => console.log(err));
});

// Toggle task reminder
router.put("/tasks/:id", requireLogin, (req, res) => {
  Task.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: { reminder: req.body.reminder },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((task) => {
      res.send(task);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
