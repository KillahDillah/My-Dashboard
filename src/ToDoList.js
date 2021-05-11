import { useState, useRef } from "react";
import ToDoItem from "./ToDoItem";
import uuidv4 from "uuid/v4";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const todoItemRef = useRef(); // notive ref keyword attribute on input

  function handleAddTodo(e) {
    const todoItemName = todoItemRef.current.value;
    if (todoItemName === "") return;
    setTodos((prevTodo) => {
      return [...prevTodo, { id: uuidv4, name: todoItemName, complete: false }];
    });

    todoItemRef.current.value = null; //clears out input after click
  }

  return (
    <section id="todoList">
      <section className="card">
        <input type="text" placeholder="Add To-Do" ref={todoItemRef} />
        <button onClick={handleAddTodo}>Add</button>
        <button>Clear</button>
        <ul>
          {todos.map((todo) => {
            return <ToDoItem todo={todo} />;
          })}
        </ul>
      </section>
    </section>
  );
}
export default ToDoList;
