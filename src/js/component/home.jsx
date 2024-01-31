import React, { useState } from "react";
import Form from "./todoForm";
import TodoList from "./todoList";

const Home = () => {
  
	// Almaceno las tareas y utilizo un array para almacenarlas y asi tambien tener su indice

  const [tasks, setTasks] = useState([]);  

	// Funcion para setear tasks con el setTasks, hago ... copia del array tasks y añado una nueva task al final del array
  const addTask = (task) => {
	  setTasks([...tasks, task]);
	};

	console.log("Tareas ----->",tasks)

	// Funcion para eliminar tareas
	
  const deleteTask = (index) => {
	// Hago una copia de las tareas y la guardo
    const updatedTasks = [...tasks];
	// Elimino la tarea en la posicion index de la copia
    updatedTasks.splice(index, 1);
	// Actualizo en estado de tasks con updateTasks que era la copia guardada anteriormente
    setTasks(updatedTasks);
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h4 className="text-center my-3 pb-3">To-Do</h4>

				  {/* Traemos por props el envio de tareas, las tareas y el eliminar tareas o tareas actualizadas */}
                  
				  <Form addTask={addTask} /> 
                  <TodoList tasks={tasks} deleteTask={deleteTask} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
