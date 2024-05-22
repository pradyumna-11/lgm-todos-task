import "./index.css";

const TodoItem = (props) => {
  const { todoItemDetails, checkFunction, onRemoveTodo } = props;
  const { id, task, isChecked } = todoItemDetails;
  const modifyCheckStatus = () => {
    checkFunction(id);
  };
  const labelClassName = isChecked
    ? "checkbox-label checked"
    : "checkbox-label";
  const removeTodo = () => {
    onRemoveTodo(id);
  };

  return (
    <li className="todo-item-container d-flex flex-row">
      <input
        type="checkbox"
        className="checkbox-input"
        id={`checkbox${id}`}
        onChange={modifyCheckStatus}
      />
      <div className="label-container d-flex flex-row">
        <label className={labelClassName} htmlFor={`checkbox${id}`}>
          {task}
        </label>
        <div className="delete-icon-container">
          <i className="far fa-trash-alt delete-icon" onClick={removeTodo}></i>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
