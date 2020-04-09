import React, {Fragment, useState} from "react";

const EditTodo = ({todo}) => {
  const [description, setDescription] = useState(todo.description);

  const valueChangeHandler = e => setDescription(e.target.value);

  const resetTodoHandler = () => setDescription(todo.description);

  const updateClickHandler =  async (e) => {
    e.preventDefault();

    try {
      const body = {description: description};
      await fetch(`http://localhost:5000/api/todo/${todo.todo_id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });

      window.location = "/";
      setDescription("");
    } catch (err) {
      console.error(err.message);
    }
  }

  return(
    <Fragment>
      <button type="button" className={"btn btn-warning"} data-toggle="modal" data-target={`#id${todo.todo_id}`}>
        Edit
      </button>
      <div className={"modal"} id={`id${todo.todo_id}`} onClick={resetTodoHandler}>
        <div className={"modal-dialog"}>
          <div className={"modal-content"}>
            <div className={"modal-header"}>
              <h4 className={"modal-title"}>Edit Todo</h4>
              <button type="button" className={"close"} data-dismiss="modal">&times;</button>
            </div>
            <div className={"modal-body"}>
              <input type={"text"} className={"form-control"} value={description} onChange={valueChangeHandler}/>
            </div>
            <div className={"modal-footer"}>
              <button type="button" className={"btn btn-warning"} data-dismiss="modal" onClick={updateClickHandler}>Edit</button>
              <button type="button" className={"btn btn-danger"} data-dismiss="modal" onClick={resetTodoHandler}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
