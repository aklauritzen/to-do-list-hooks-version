// TODO: Connect app to database (MongoDB?)
// TODO: #8 Completed tasks background should be greyed out
// TODO: #5 Undo complete
// TODO: #6 If modified, then change meta to modified date: Modified 23-01-2021 23:00
// TODO: #7 Add optional task desription, and change current todo.text to taskTitle
// TODO: #10 Completed task should move to the end of the to do list. animated move?

import React from 'react';
import './App.css';

// Todo item
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div 
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : ""}}
    >
      <div className="title-meta-container">
        <div className="todo-title">
          {todo.text}
        </div>
        <div className="todo-meta">
          created: {todo.currentDateFormated}
        </div>
        </div>
      <div>
        <button onClick={() => completeTodo(index)}><img className="todo-icon" alt="Checkmark icon" src="complete-todo-icon.svg" /></button>
        <button onClick={() => removeTodo(index)}><img className="todo-icon" alt="Delete icon" src="delete-todo-icon.svg" /></button>
      </div>
    </div>
  );
};

// Handles update, submit and empty field issue
function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    
    // Important! - preventDefault() cancels the native behavior of the Submit button.
    e.preventDefault();

    // If no value return
    if(!value) return;

    addTodo(value);
    setValue("");
  };

  // On input submit call
  return (    
    <form className="title-form" onSubmit={handleSubmit}>
      <input
        placeholder="Enter Task title" 
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  
  // Todo object list with test data
  const [todos, setTodos] = React.useState([   
    { text: "First task", 
      isCompleted: false,
      currentDateFormated: "21-01-2021 21:00"
    },
    {
      text: "Second task",
      isCompleted: false,
      currentDateFormated: "22-01-2021 22:00"
    },
    { 
      text: "Third task",
      isCompleted: false,
      currentDateFormated: "23-01-2021 23:00"
    },
  ]);

  // Used in production if list should be empty at the beginning
  // const [todos, setTodos] = React.useState([]);

  // Current date and time for Todo
  const today = new Date();
  const date = ('0' + parseInt(today.getDate())).slice(-2);
  const month = ('0' + parseInt(today.getMonth() + 1)).slice(-2);
  const year = today.getFullYear();
  const hours = ('0' + parseInt(today.getHours() + 1)).slice(-2);
  const minutes = today.getMinutes();
   
  const currentDateFormated = date + "-" + month + "-" + year + " " + hours + ":" + minutes;

  // Adds a new todo
  const addTodo = text => {
    // Spread operator copies the existing list
    const newTodos = [...todos, { text, currentDateFormated }];
    setTodos(newTodos)
  };
  
  const completeTodo = index => {    
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };
  
  const removeTodo = index => {
    const newTodos = [...todos];

    // Removes "index" item from array
    newTodos.splice(index, 1);

    // Return the array
    setTodos(newTodos);
  };

  // Mapping over the todo items and display them by index
  return (
    <div className="app">
      <h1>To Do List</h1>
      <em>React Hook Version</em>
      <h3>Create task</h3>
      <TodoForm addTodo={addTodo} />
      <div className="todo-list">        
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}

        
      </div>
    </div>
  );
}

// Expose App for other modules (index.js)
export default App;