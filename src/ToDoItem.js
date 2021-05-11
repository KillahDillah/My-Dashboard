function ToDoItem({ todo }) {
  console.log(todo.name);
  return (
    <div className="todo">
      <input type="checkbox" />
      <p>{todo.name}</p>
    </div>
  );
}

export default ToDoItem;
