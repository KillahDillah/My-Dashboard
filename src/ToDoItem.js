function ToDoItem({ todo }) {
  return (
    <div>
      <input type="checkbox" />
      {todo.name}
    </div>
  );
}

export default ToDoItem;
