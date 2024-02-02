// import React, { useState, useEffect } from "react";
// import Form from "./todoForm";
// import TodoList from "./todoList";

// const Home = () => {

//   // Almaceno las tareas y utilizo un array para almacenarlas y asi tambien tener su indice.

//   const [tasks, setTasks] = useState([]);

//   const fetchData = () => {
//     var requestOptions = {
//       method: 'GET',
//       redirect: 'follow'
//     };

//     fetch("https://playground.4geeks.com/apis/fake/todos/user/david", requestOptions)
//       .then(response => response.json())
//       .then(result => setTasks(result))
//       .catch(error => console.log('error', error));
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);


//   // Funcion para setear tasks con el setTasks, hago ... copia del array tasks y añado una nueva task al final del array.
//   const addNewTask = (newTask) => {

//     const updatedList = [...tasks, newTask]

//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     var raw = JSON.stringify(updatedList)
//       ;

//     var requestOptions = {
//       method: 'PUT',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow'
//     };

//     fetch("https://playground.4geeks.com/apis/fake/todos/user/david", requestOptions)
//       .then(response => response.text())
//       .then(result => fetchData())
//       .catch(error => console.log('error', error));


//     console.log(updatedList);

//   };



//   // Funcion para eliminar tareas.

//   const deleteCompleteTask = (index) => {
//     // Hago una copia de las tareas y la guardo.
//     const updatedTasks = [...tasks];
//     // Elimino la tarea en la posicion index de la copia.
//     updatedTasks.splice(index, 1);
//     // Actualizo en estado de tasks con updateTasks que era la copia guardada anteriormente.
//     setTasks(updatedTasks);
//   };

//   return (
//     <div>
//       <div style={{ backgroundColor: '#eeeee' }}>
//         <div className="container py-5 h-100">
//           <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col col-lg-9 col-xl-7">
//               <div className="card rounded-3">
//                 <div className="card-body p-4">
//                   <h4 className="satisfy-regular text-center my-3 pb-3">To-Do</h4>

//                   {/* Traigo por Props las addTask y deleteTask */}

//                   <Form addTask={addNewTask} forwardTasks={tasks} />
//                   <TodoList tasks={tasks} deleteTask={deleteCompleteTask} />
//                 </div>
//                 <div className="border-bottom paper m-0 p-1"></div>
//                 <div className="border-bottom paper m-0 p-1"></div>
//                 <div className="border-bottom paper m-0 p-1"></div>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Home;




import React, { useState, useEffect } from "react";
import Form from "./todoForm";
import TodoList from "./todoList";

const Home = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/david')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addNewTask = (task) => {
    const newTasks = [...tasks, { label: task, done: false }];
    setTasks(newTasks);
    updateTasksInServer(newTasks);

    console.log("tarea nueva agregada de la funcion addNewTask", newTasks)

  };

  const deleteCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    updateTasksInServer(updatedTasks);
  };

  const updateTasksInServer = (tasks) => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/david', {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
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
    </div>

  );

};
export default Home;
