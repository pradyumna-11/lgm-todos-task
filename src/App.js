import { Component } from "react";
import { v4 } from "uuid";
import "./App.css";
import TodoItem from "./TodoItem";

class App extends Component {
  state = { task: "", todosList: [] };

  onChangeTask = (event) => {
    this.setState({ task: event.target.value });
  };

  addTodoItem = () => {
    const { task } = this.state;
    if (task !== "") {
      const newTodoItem = {
        id: v4(),
        task,
        isChecked: false,
      };
      this.setState((prevState) => ({
        todosList: [...prevState.todosList, newTodoItem],
      }));
      this.setState({ task: "" });
    } else {
      alert("Please Enter Valid Task");
    }
  };

  changeTodoItemCheckStatus = (id) => {
    //const {todosList} =this.state
    /*const todoItems = todosList.filter((each)=>each.id===id)
    const todoObj = todoItems[0]
    todoObj.isChecked= !todoObj.isChecked 
    const newTodoList = todosList.forEach((each)=>{
      if(each.id===id) {
        each.isChecked=!each.isChecked
      }
      
    })*/
    this.setState((prevState) => ({
      todosList: [
        ...prevState.todosList.map((each) => {
          if (each.id === id) {
            return {
              id: each.id,
              task: each.task,
              isChecked: !each.isChecked,
            };
          } else {
            return each;
          }
        }),
      ],
    }));
  };

  deleteTodo = (id) => {
    const { todosList } = this.state;
    const newList = todosList.filter((each) => each.id !== id);
    this.setState({ todosList: newList });
  };

  render() {
    const { task, todosList } = this.state;
    console.log(todosList);
    const unCheckedTodosList = todosList.filter(
      (each) => each.isChecked === false
    );
    const checkedTodosList = todosList.filter(
      (each) => each.isChecked === true
    );
    return (
      <div className="todos-bg-container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="todos-heading">Todos</h1>
              <h1 className="create-task-heading">
                Create <span className="create-task-heading-subpart">Task</span>
              </h1>
              <input
                type="text"
                id="todoUserInput"
                className="todo-user-input"
                placeholder="What needs to be done?"
                onChange={this.onChangeTask}
                value={task}
              />
              <button
                className="button"
                id="addTodoButton"
                onClick={this.addTodoItem}
              >
                Add
              </button>
              <h1 className="todo-items-heading">
                My <span className="todo-items-heading-subpart">Tasks</span>
              </h1>
              {unCheckedTodosList.length === 0 ? (
                <h1 className="no-tasks-heading">No Tasks Added</h1>
              ) : (
                <ul className="todo-items-container" id="todoItemsContainer">
                  {unCheckedTodosList.map((each) => (
                    <TodoItem
                      todoItemDetails={each}
                      key={each.id}
                      checkFunction={this.changeTodoItemCheckStatus}
                      onRemoveTodo={this.deleteTodo}
                    />
                  ))}
                </ul>
              )}

              <h1 className="create-task-heading">
                Completed{" "}
                <span className="create-task-heading-subpart">Tasks</span>
              </h1>
              {checkedTodosList.length === 0 ? (
                <h1 className="no-tasks-heading">No Tasks Completed yet</h1>
              ) : (
                <ul className="todo-items-container" id="todoItemsContainer">
                  {checkedTodosList.map((each) => (
                    <TodoItem
                      todoItemDetails={each}
                      key={each.id}
                      checkFunction={this.changeTodoItemCheckStatus}
                      onRemoveTodo={this.deleteTodo}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
