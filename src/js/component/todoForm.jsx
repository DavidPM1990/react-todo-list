import React, { useState } from "react";

const Form = ({ addTask }) => {

  const [sendTask, setSendTask] = useState("");

  const handleInputChange = (e) => {
    setSendTask(e.target.value);
  };
  const handleSubmit = (e) => {

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
                borderBottom: "1px solid #CED4DA",
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
