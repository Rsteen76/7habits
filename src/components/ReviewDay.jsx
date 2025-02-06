import { motion } from "framer-motion";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const ReviewDay = ({ tasks }) => {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="subtitle">Review Your Day</h2>
      <h3>Completed Tasks</h3>
      <ul>
        {tasks
          .filter((task) => task.completed)
          .map((task, index) => (
            <li key={index} className="task-item completed">
              {task.name}
            </li>
          ))}
      </ul>
    </motion.div>
  );
};

// ✅ Define PropTypes
ReviewDay.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired, // Ensure `tasks` is an array of objects with `name` (string) and `completed` (boolean)
};

export default ReviewDay;
