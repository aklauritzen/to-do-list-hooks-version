// TODO: Connect app to database (MongoDB?)
// TODO: Undo complete

import React from 'react';
import './App.css';

// Todo item
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div 
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : ""}}
    >
      {todo.text} - created: {todo.currentDateFormated}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  
  // Todo object list
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

  // Used if list should start empty
  // const [todos, setTodos] = React.useState([]);

  // Current date and time for Todo
  const currentDate = new Date();
  const currentDateFormated = currentDate.getDate() + "-" + currentDate.getMonth() + 1 + "-" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes();

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

        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

// Expose App for other modules (index.js)
export default App;