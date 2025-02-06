/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
// components/Dashboard.js
import { motion } from "framer-motion";
import "../index.css";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Dashboard = ({
  goToPage,
  dailyHabits,
  toggleHabitDayCompletion,
  tasks,
  toggleTaskCompletion,
}) => {
  return (
    <motion.div
      className="dashboard-container dark-container centered"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="title sleek-text colorful-text">7 Habits Planner</h1>
      <div className="button-group sleek-button-group horizontal-buttons">
        <motion.button
          className="nav-button sleek-button colorful-button"
          onClick={() => goToPage("plan")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Plan Your Day
        </motion.button>
        <motion.button
          className="nav-button sleek-button colorful-button"
          onClick={() => goToPage("review")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Review Your Day
        </motion.button>
        <motion.button
          className="nav-button sleek-button colorful-button"
          onClick={() => goToPage("settings")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Set Daily Habits
        </motion.button>
      </div>

      <section className="overview-section">
        <h2 className="subtitle sleek-text colorful-text">Today's Overview</h2>
        <div className="task-summary">
          <h3 className="sleek-text">Today's Tasks</h3>
          <ul className="task-list">
            {tasks.map((task, index) => (
              <motion.li
                key={index}
                className={`task-item ${
                  task.completed ? "completed" : ""
                } sleek-text`}
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="task-checkbox"
                />
                <span className="task-name">{task.name}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="progress-section">
        <h2 className="subtitle sleek-text colorful-text">
          Weekly Habit Progress
        </h2>
        <div className="progress-container horizontal-progress">
          {dailyHabits.map((habit, habitIndex) => (
            <motion.div
              key={habitIndex}
              className="progress-card sleek-card"
              style={{ flex: `0 0 ${100 / dailyHabits.length}%` }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="habit-name sleek-text colorful-text">
                {habit.name}
              </span>
              <div className="weekly-checklist">
                {daysOfWeek.map((day, dayIndex) => (
                  <label key={dayIndex} className="day-label sleek-text">
                    <input
                      type="checkbox"
                      checked={habit.completedDays[dayIndex]}
                      onChange={() =>
                        toggleHabitDayCompletion(habitIndex, dayIndex)
                      }
                      className="day-checkbox"
                    />
                    {day}
                  </label>
                ))}
              </div>
              <p className="streak sleek-text colorful-text">
                🔥 Streak: {habit.streak} days
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Dashboard;
