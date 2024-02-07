import React, { useState, useEffect } from "react";
import Form from "./todoForm";
import TodoList from "./todoList";

const Home = () => {

  const [tasks, setTasks] = useState([]);
  const [defaultUser, setDefaultUser] = useState("david21");

  // Hago un useEffect con un FETCH (GET) para obtener tareas y usuario, como no hay usuario despues hago un POST.
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
    };

    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${defaultUser}`, options)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setTasks(data);
      })
      .catch(err => {
        if (err.message.includes("NOT FOUND")) {
          const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
            body: JSON.stringify(tasks),
          };
          // Hago un FETCH para crear el usuario.
          fetch(`https://playground.4geeks.com/apis/fake/todos/user/${defaultUser}`, postOptions)
            .then(response => response.json())
            .then(response => {
              alert(response.msg);

              // Después del POST, hago un GET para recuperar los datos actualizados.
              fetch(`https://playground.4geeks.com/apis/fake/todos/user/${defaultUser}`, options)
                .then(response => response.json())
                .then(data => {
                  setTasks(data);
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        }
        console.error(err);
      });
  }, []);


  // Función para añadir una nueva tarea.
  const addNewTask = (task) => {
    const newTasks = [...tasks, { label: task, done: false }];
    setTasks(newTasks);
    updateTasksInServer(newTasks);

    console.log("tarea nueva agregada de la funcion addNewTask", newTasks)

  };

  //Función para eliminar la tarea completada, de una en una.
  const deleteCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    updateTasksInServer(updatedTasks);
  };

  //Función para eliminar todas las tareas, usuario y dejar el array vacío.
  const deleteAllTasks = () => {
    const emptyTasks = [];
    setTasks(emptyTasks);
    updateTasksInServer(emptyTasks);
    alert("User & tasks has been deleted")
  };

  // Función para actualizar las tareas.
  const updateTasksInServer = (tasks) => {
    // Condicional para manejar el error cuando el array de tareas esta vacío.
    if (tasks.length > 0) {
      fetch(`https://playground.4geeks.com/apis/fake/todos/user/${defaultUser}`, {
        method: "PUT",
        body: JSON.stringify(tasks),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    } else {

      fetch(`https://playground.4geeks.com/apis/fake/todos/user/${defaultUser}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }
  };

  console.log("tareas despues de ejcutarse todas la funcionalidades--->", tasks)

  return (

    <div>
      <div style={{ backgroundColor: '#eeeee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h4 className="satisfy-regular text-center my-3 pb-3">To-Do</h4>
                  <Form addTask={addNewTask} />
                  <TodoList tasks={tasks} deleteTask={deleteCompleteTask} />
                </div>
                <div className="border-bottom paper m-0 p-1"></div>
                <div className="border-bottom paper m-0 p-1"></div>
                <div className="border-bottom paper m-0 p-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-secondary"
          onClick={deleteAllTasks}
        >Delete all tasks</button>
      </div>
    </div>

  );

};
export default Home;