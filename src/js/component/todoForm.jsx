import React, { useState } from "react";

const Form = ({ addTask }) => {
  const [sendTask, setSendTask] = useState("");

  // Capturo el valor del input con el evento de e.target.value.

  const handleInputChange = (e) => {
    setSendTask(e.target.value);

    console.log("Valor introducido por el usuario para capturar---->", e.target.value)

  };

  const handleSubmit = (e) => {
    //Evito el comportamiento por defecto de la pagina que es, al enviarse el formulario, la página se recarga.
    e.preventDefault();
    if (sendTask.trim() !== "") {
      addTask(sendTask);
      setSendTask("");
    }
  };

  return (
    <div>
      <form
        className="row  g-3 justify-content-center align-items-center mb-4 pb-2"
        onSubmit={handleSubmit}
      >
        <div className="col-12">
          <div className="form-outline">
            <input
              type="text"
              id="form1"
              className="form-control satisfy-regular"
              style={{
                border: "none",
                borderBottom: "1px solid #ced4da",
                boxShadow: "none",
                borderRadius: "0",
              }}
              placeholder="What needs to be done?"
              value={sendTask}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
