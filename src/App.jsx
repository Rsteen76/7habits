import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Dashboard from "./components/Dashboard";
import PlanDay from "./components/PlanDay";
import ReviewDay from "./components/ReviewDay";
import SetDailyHabits from "./components/SetDailyHabits";
import "./index.css";

const App = () => {
  const [page, setPage] = useState("dashboard");
  const [habits, setHabits] = useState([]);
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setHabits(savedHabits);
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [habits, tasks]);

  useEffect(() => {
    if (page !== "dashboard" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [page]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && page === "plan") {
      document.getElementById("add-task-button")?.click();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [page]);

  const toggleHabitDayCompletion = (habitIndex, dayIndex) => {
    const newHabits = [...habits];
    newHabits[habitIndex].completedDays[dayIndex] =
      !newHabits[habitIndex].completedDays[dayIndex];
    setHabits(newHabits);
  };

  const toggleTaskCompletion = (taskIndex) => {
    const newTasks = [...tasks];
    newTasks[taskIndex].completed = !newTasks[taskIndex].completed;
    setTasks(newTasks);
  };

  const renderBackButton = () => (
    <div className="button-container">
      <motion.button
        className="back-button sleek-button colorful-button"
        onClick={() => setPage("dashboard")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Back to Dashboard
      </motion.button>
    </div>
  );

  return (
    <div className="app-container dark-mode">
      {page === "dashboard" && (
        <Dashboard
          goToPage={setPage}
          dailyHabits={habits}
          tasks={tasks}
          toggleHabitDayCompletion={toggleHabitDayCompletion}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      )}
      {page === "plan" && (
        <>
          {renderBackButton()}
          <PlanDay tasks={tasks} setTasks={setTasks} inputRef={inputRef} />
        </>
      )}
      {page === "review" && (
        <>
          {renderBackButton()}
          <ReviewDay tasks={tasks} inputRef={inputRef} />
        </>
      )}
      {page === "settings" && (
        <>
          {renderBackButton()}
          <SetDailyHabits
            habits={habits}
            setHabits={setHabits}
            inputRef={inputRef}
          />
        </>
      )}
    </div>
  );
};

export default App;
