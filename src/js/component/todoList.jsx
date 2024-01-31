import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const TodoList = ({ tasks, deleteTask }) => {
  return (
    <div>
      {tasks.length > 0 && (
        <table className="table mb-4">
          <thead></thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{task}</td>
                <td>
                    <FontAwesomeIcon
                     icon={faTimes} 
                     onClick={() => deleteTask(index)}
                     style={{ cursor: "pointer" }}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {tasks.length > 0 && (
        <div>
          <p>{tasks.length} {tasks.length === 1 ? "Task" : "Tasks"} Left</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
