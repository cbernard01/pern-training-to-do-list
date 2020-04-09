import React, {Fragment, useState, useEffect} from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos`);
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(()=> {
    getTodos().then();
  }, []);

  const deleteClickHandler = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todo/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderTodos = () => {
    return todos.map(todo => {
      return (
        <tr key={todo.todo_id}>
          <td>{todo.description}</td>
          <td>
            <EditTodo todo={todo}/>
          </td>
          <td>
            <button
              className={"btn btn-danger"}
              onClick={ () => deleteClickHandler(todo.todo_id)}
            >Delete</button>
          </td>
        </tr>
      );
    })
  };

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
        <tr>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {renderTodos()}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
