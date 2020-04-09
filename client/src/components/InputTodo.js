import React, {Fragment, useState} from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const valueChangeHandler = e => setDescription(e.target.value);

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      const body = {description: description};
      await fetch(`http://localhost:5000/api/todo`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });

      window.location = "/";
      setDescription("");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <h1 className={"text-center mt-5"}>PERN Todo List</h1>
      <form className={"d-flex mt-5"} onSubmit={onSubmitForm}>
        <input type="text" className={"form-control"} value={description} onChange={valueChangeHandler}/>
        <button className={"btn btn-success ml-2"}>Add</button>
      </form>
    </Fragment>
  );
}

export default InputTodo;
