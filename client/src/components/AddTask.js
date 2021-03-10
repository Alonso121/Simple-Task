import { useState } from "react";

const AddTask = ({ onAdd, showAddTask }) => {
  const [text, setText] = useState("");
  const [reminder, setReminder] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("00:01");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }

    onAdd({ text, date, time, reminder });

    setText("");
    setDate("");
    setTime("00:00");
    setReminder(false);
  };

  return (
    <form
      className={`add-form hidden ${showAddTask ? "active" : ""}`}
      onSubmit={onSubmit}
    >
      <hr />
      <div className="form-control">
        <label htmlFor="task-name">Tasks</label>
        <input
          id="task-name"
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <div className="form-control tasks-placeholder">
        <label htmlFor="task-date">Date</label>
        <input
          id="task-date"
          className="time"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label htmlFor="task-time">Time</label>
        <input
          id="task-time"
          className="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div className="input-reminder">
        <label htmlFor="task-reminder">Mark as Important</label>
        <input
          id="task-reminder"
          type="checkbox"
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="Save Task" className="btn btn-block" />
      <hr />
    </form>
  );
};

export default AddTask;
