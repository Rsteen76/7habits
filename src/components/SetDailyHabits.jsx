import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SetDailyHabits = ({ habits, setHabits }) => {
  const [newHabit, setNewHabit] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(savedHabits);
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addOrEditHabit = () => {
    if (!newHabit.trim()) {
      setErrorMessage("Habit name cannot be empty.");
      return;
    }

    if (habits.some((habit, index) => habit.name === newHabit && index !== editIndex)) {
      setErrorMessage("Habit already exists.");
      return;
    }

    if (editIndex !== null) {
      const updatedHabits = habits.map((habit, index) =>
        index === editIndex ? { ...habit, name: newHabit } : habit
      );
      setHabits(updatedHabits);
      setSuccessMessage("Habit updated successfully!");
    } else {
      setHabits([
        ...habits,
        {
          name: newHabit,
          completedDays: [false, false, false, false, false, false, false],
          streak: 0,
        },
      ]);
      setSuccessMessage("Habit added successfully!");
    }

    setNewHabit("");
    setEditIndex(null);
    setErrorMessage("");
  };

  const deleteHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
    setSuccessMessage("Habit deleted successfully!");
    setErrorMessage("");
  };

  const startEditing = (index) => {
    setNewHabit(habits[index].name);
    setEditIndex(index);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedHabits = [...habits];
    const [movedHabit] = updatedHabits.splice(result.source.index, 1);
    updatedHabits.splice(result.destination.index, 0, movedHabit);

    setHabits(updatedHabits);
    setSuccessMessage("Habit order updated!");
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="subtitle">Set Your Daily Habits</h2>
      <div className="habit-input-container">
        <input
          className="input-field"
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Enter habit name"
        />
        <button className="nav-button" onClick={addOrEditHabit}>
          {editIndex !== null ? "Edit Habit" : "Add Habit"}
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="habits">
          {(provided) => (
            <ul className="habit-list" {...provided.droppableProps} ref={provided.innerRef}>
              {habits.map((habit, index) => (
                <Draggable key={index} draggableId={String(index)} index={index}>
                  {(provided, snapshot) => (
                    <motion.li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`habit-item ${snapshot.isDragging ? "dragging" : ""}`}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="habit-name">{habit.name}</span>
                      <div className="habit-actions">
                        <button className="edit-button" onClick={() => startEditing(index)}>
                          Edit
                        </button>
                        <button className="delete-button" onClick={() => deleteHabit(index)}>
                          Delete
                        </button>
                      </div>
                    </motion.li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </motion.div>
  );
};

// Props Validation
SetDailyHabits.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      completedDays: PropTypes.arrayOf(PropTypes.bool).isRequired,
      streak: PropTypes.number.isRequired,
    })
  ).isRequired,
  setHabits: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default SetDailyHabits;
