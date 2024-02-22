/*import { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const formSubmit = (event) => {
    event.preventDefault();
    if (!todo) return;
    // Update the structure to include a completed property
    setTodos([...todos, { text: todo, completed: false }]);
    setTodo(""); //Will make the input form empty
  };

  const removeAllTasks = () => { //Function of the Remoove all tasks button
    setTodos([]);
  };

  const toggleCompleted = (index) => {
    const newTodos = todos.map((task, taskIndex) => {
      if (index === taskIndex) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTodos(newTodos);
  };

  // Today's date
  const todayDate = new Date().toLocaleDateString();

  // Calculate the number of remaining tasks
  const remainingTasks = todos.filter(task => !task.completed).length;

  return (
    <div>
      <header className="header">
        <p>Logo</p>
        <p>Home</p>
      </header>

    <div className="app-body">
        <h1>To-Do List</h1>
        <div className="Date variable">
          <p>Today's date: {todayDate}</p>
        </div>

        <form className="Input-form" onSubmit={formSubmit}>
          <input
            type="text"
            placeholder="Enter task"
            value={todo}
            onChange={(event) => setTodo(event.target.value)}
          />
          <button type="submit">Add task</button>
        </form>

        <div className="Entered-tasks">
          {todos.map((task, index) => (
            <div key={index} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.text}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(index)}
              />
            </div>
          ))}
        </div>

        <div>
          <span> Remaining tasks: {remainingTasks}</span>
        </div>

        <button onClick={removeAllTasks}>Remove all tasks</button>
      </div>

      <footer>
        <h1>FOOTER</h1>
      </footer>
    </div>
  );
};

export default App;

*/
import React from 'react'
import {useState} from "react"

const App = () => {

  const [taskName, setTaskName] = useState("") //This will handle the content from form
  const [enteredTasks, setEnteredTasks] = useState([]) //Objects array, handle the form submit
  
  const formSubmit = (event) => { 
    event.preventDefault(); // Prevent the constant reloading of the webpage
  
    if (taskName) { //SAVING VALUES TO OBJECTS + CONTROL MECHANISM
      const newTaskObject = { task: taskName }; // Correctly define a new task object
      setEnteredTasks(currentTasks => [...currentTasks, newTaskObject]); // Correctly add the new task to the array
    } else {
      console.log("Task field was empty.");
    }
    setTaskName(""); // Correctly reset the task input field to empty
  };
  

    const removeAllTasks=()=>setEnteredTasks([]) //REMOVE ALL TASKS FUNCTION






  return <div>
    <header>
      <p>Header</p>
    </header>

    <div className="app-body">
      <div>
        <h1>To-Do List app</h1>
        <p>Today's date is:</p>
        <form onSubmit={formSubmit}>
          <input 
            type="text" 
            placeholder="Enter the task" 
            value={taskName}
            onChange={(event)=>setTaskName(event.target.value)}/> {/*Once anything changes here, it will be catched to setTaskName and refreshed (e.tar.value will be changed to value*/}
          <input 
            type="Submit" 
            value="Add task"/>
        </form>
      </div>

      <div>
        <p>---------------------------</p>
      </div>


      <div> {/*MAPPING OF TASKS*/}
        <p>Remaining tasks: {enteredTasks.length}</p>
        {enteredTasks.map((oneTask, index) => {// Make sure to access the correct property (`task`) from each task object
        return (
          <div className="item" key={index}>
              <h4>{oneTask.task}</h4> {/* Corrected to use the task property */}
          </div>
          );
        })}

      </div>


      <div>
        <input type="button" value="Remove all tasks" onClick={removeAllTasks}/>
      </div>

      <div>
        <p>----------------------------</p>
      </div>
    </div>


    <footer>
      <p>Footer</p>
    </footer>
  </div>
}

export default App