import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  
  useEffect(() => {
    fetchTodos();
  }, []);
  
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
   
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        title: newTask,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setNewTask("");
    
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTask = (id, newTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
 
  const filteredTodos = showCompleted
    ? todos.filter((todo) => todo.completed)
    : todos;

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
    
     <div className='container'>
      <div className='app-container'>
      <h1>Todo App</h1>
      <div>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Enter a new task"    />
      <button onClick={handleAddTask}>Add Task</button><br/>
      </div>
        <div className='checkbox'>
          <label>
           <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}/>
            Show Completed Tasks
          </label>
          <p style={{textDecoration:"bold"}}>Click a task to mark it as Completed</p>
        </div>
        
      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "none" : "none",
              color: todo.completed ? "#0000FF" : "#333",
            }}>
          
            <span className='status-icon'
              onClick={() => handleToggleComplete(todo.id)}
              style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              marginRight: "10px",
              backgroundColor: todo.completed ? "#0000FF" : "transparent"
              }}
            ></span>
            <span onClick={() => handleToggleComplete(todo.id)}>
              {todo.title}
            </span>
            <div className='button-container'>
            <button onClick={() => handleDeleteTask(todo.id)}>Delete</button>
            <button
              onClick={() => {
                const newTitle = prompt("Enter new task name", todo.title);
                if (newTitle && newTitle.trim() !== "") {
                  handleEditTask(todo.id, newTitle);
                }
              }}
            >
              Edit
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div className="card">
        <p>TASK STATUS</p>
        <div className="status-indicator"></div>
        <p >Task completed</p>
        <div className="status"></div>
        <p>Task Incomplete</p>
      </div>
    </div>
    </div>

  ); 
 
}

export default App;
