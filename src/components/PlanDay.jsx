import React, { useState } from "react";
import { motion } from "framer-motion";

const PlanDay = ({ tasks, setTasks, inputRef }) => {
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { name: newTask, completed: false }]);
      setNewTask("");
    }
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="subtitle">Plan Your Day</h2>
      <input
        className="input-field"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
        ref={inputRef} // Attach the ref here
      />
      <button id="add-task-button" className="nav-button" onClick={addTask}>
        Add Task
      </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {task.name}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default PlanDay;
