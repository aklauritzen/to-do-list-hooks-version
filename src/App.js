// TODO: #16 Connect app to database (MongoDB?)
// TODO: #5 Undo complete
// TODO: #6 If modified, then change meta to modified date: Modified 23-01-2021 23:00
// TODO: #10 Completed task should move to the end of the to do list. animated move?
// TODO: #12 Sort todo list by alphabetical order or by created order
// TODO: #13 On delete show confirm delete popup. Not default JavaScript popup. Design should match project.
// TODO: #15 Clear fields after submit

import React from 'react';
import './App.css';

// Todo item
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className={todo.isCompleted ? "todo todoCompleted" : "todo"} >
      <div className={todo.isCompleted ? "titleMetaContainer titleMetaContainerCompleted" : "titleMetaContainer"}>      
        <div className="navItems">      
          <div className="todoTitle">
            {todo.text}
          </div>
          <div className="iconButtonContainer">
            <button className="iconButton" onClick={() => completeTodo(index)}><img className="todoIcon" alt="Check mark icon" src="complete-todo-icon.svg" /></button>
            <button className="iconButton" onClick={() => removeTodo(index)}><img className="todoIcon" alt="Delete icon" src="delete-todo-icon.svg" /></button>
          </div>
        </div>      
        <div className="todoMeta">
          created: {todo.currentDateFormated}
        </div>
        <div className="todoDescription">
          {todo.description}
        </div>
      </div>
    </div>
  );
};

const initialValues = {
  title: "",
  description: "",
};

// Handles update, submit and empty field issue
function TodoForm({ addTodo }) {  
  const [values, setValues] = React.useState(initialValues);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = e => {    
    // Important! - preventDefault() cancels the native behavior of the Submit button.
    e.preventDefault();

    // Title value has to be entered
    if(!values.title) return;
    
    // Add new To Do item
    addTodo(values.title, values.description);   

    // Reset input values
    setValues({ title: "", description: ""});
  }

  // On input submit call
  return (    
    <form className="createTaskForm" onSubmit={handleFormSubmit}>
      <input        
        placeholder="Enter task title" 
        type="text"
        id="titleInput"
        className="input"
        value={values.title}
        name="title"
        label="Title"
        onChange={handleInputChange}
      />
      <textarea        
        placeholder="Enter description (optional)"
        type="text"
        className="input descriptionTextarea"
        value={values.description}
        name="description"
        label="Description"
        onChange={handleInputChange}
      />
      <button className="submitButton" type="submit">Submit</button>      
    </form>
  );
}

function App() {  
  // Todo object list with test data
  const [todos, setTodos] = React.useState([   
    { text: "First task", 
      description: "Laboris aute proident nisi quis ipsum laborum voluptate sunt esse in laborum deserunt sint do.",
      isCompleted: false,
      currentDateFormated: "21-01-2021 21:00"
    },
    {
      text: "Second task",
      description: "Est in sit aliqua fugiat dolor laborum laboris. Deserunt aliqua proident excepteur id minim fugiat.",
      isCompleted: false,
      currentDateFormated: "22-01-2021 22:00"
    },
    { 
      text: "Third task",
      description: "Lorem id amet veniam sint. Labore eu irure consequat cupidatat tempor voluptate veniam.",
      isCompleted: true,
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
  const minutes = ('0' + parseInt(today.getMinutes() + 1)).slice(-2);   
  const currentDateFormated = date + "-" + month + "-" + year + " " + hours + ":" + minutes;

  // Adds a new todo
  const addTodo = (title, description) => {
    // Spread operator copies the existing list
    const newTodos = [...todos, { text: title, description, currentDateFormated }];
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
      <h3>Create Task</h3>
      <TodoForm addTodo={addTodo} />
      <h3>Tasks</h3>
      <div className="todoList">        
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