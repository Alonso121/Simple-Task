//import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Navbar from "./components/Navbar";

function App() {
  const history = useHistory();

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [logState, setLogState] = useState(false);
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setNewUser(user.name);
      setLogState(true);
    } else {
      return history.push("/signin");
    }

    fetch("/tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        setTasks(res.tasks);
      });
  }, [logState, history]);

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`/tasks/${id}`);
    const data = await res.json();
    return data.task;
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data.task]);
  };

  // Delete Task

  const deleteTask = async (id) => {
    const res = await fetch(`/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });

    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task._id !== id))
      : alert("Something went wrong when Deleting this Task");
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Navbar setLogState={setLogState} logState={logState} />
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
        name={newUser}
        logState={logState}
      />
      <Route
        path="/"
        exact
        render={() => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks ? (
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
              />
            ) : (
              <h2>Loading</h2>
            )}
          </>
        )}
      />
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/signin">
        <Signin setLogState={setLogState} />
      </Route>
    </div>
  );
}

export default App;
