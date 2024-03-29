import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const TodoList = ({ tasks, deleteTask }) => {
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHighlightedIndex(index);
  };

  const handleMouseLeave = () => {
    setHighlightedIndex(null);
  };

  return (
    <div>
      {tasks.length > 0 ? (
        <table className="table mb-4 satisfy-regular">
          <thead></thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <th scope="row">{task.lenght}</th>
                <td>{task.label}</td>
                <td>
                  {highlightedIndex === index && (
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => deleteTask(index)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p className="satisfy-regular">No tasks, add tasks ...</p>
        </div>
      )}
      {tasks.length > 0 && (
        <div>
          <p className="satisfy-regular">{tasks.length} {tasks.length === 1 ? "Task" : "Tasks"} Left</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
