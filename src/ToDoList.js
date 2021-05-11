//add item
//input, button
//list item
//
//check off item
//delete item

import { useState, useRef } from "react";
import ToDoItem from "./ToDoItem";

function ToDoList() {
  const [todo, setTodo] = useState({ name: "toDo1", id: 1 });
  const todoItemRef = useRef();

  function handleAddTodo() {
    const todoName = todoItemRef.current.value;
    if (todoName === "") return;
    alert(todoName);
    todoItemRef.current.value = null;
  }

  return (
    <section id="todoList">
      <section className="card">
        <input type="text" placeholder="Add To-Do" ref={todoItemRef} />
        <button onClick={handleAddTodo}>Add</button>
        <button>Clear</button>
        <ul>
          <ToDoItem todo={todo} />
        </ul>
      </section>
    </section>
  );
}
export default ToDoList;
