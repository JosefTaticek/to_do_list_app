import React from 'react'
import { useState } from "react"

const App = () => {
  const [taskName, setTaskName] = useState("")
  const [enteredTasks, setEnteredTasks] = useState([])

  const today = new Date(); //Today's date
  const formattedDate = today.toLocaleDateString('cs-CZ');

  const formSubmit = (event) => {
    event.preventDefault(); //Multiple loading prevention

    if (taskName) { //Saving the entered tasks to an object
      const newTaskObject = { task: taskName, completed: false };
      setEnteredTasks(currentTasks => [...currentTasks, newTaskObject]);
    } else {
      console.log("Task field was empty.");
    }
    setTaskName(""); 
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = enteredTasks.map((task, taskIndex) => {
      if (taskIndex === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setEnteredTasks(newTasks);
  };

  const removeCompletedTasks = ()=>{
    const remainingTasks = enteredTasks.filter(task => !task.completed);
    setEnteredTasks(remainingTasks);
  }

  const removeAllTasks = () => setEnteredTasks([])

  return (
    <div>
      <div className="header"></div>
      <div className="app-body">
        <div className="form">
          <div className="formUpperPart">
            <h1>To-Do List</h1>
            <p className="todaysDate">{formattedDate}</p>
          </div>
          <div className="formLine">
            <form onSubmit={formSubmit}>
              <input
                type="text"
                placeholder="Enter the task"
                value={taskName}
                onChange={(event) => setTaskName(event.target.value)}
                className="enterTaskButton"
              />
              <input
                type="Submit"
                value="Add task"
                className="submitButton"
              />
            </form>
          </div>
        </div>
        
        <div className="fullWidthLine"></div>

        <div className="contentBelowLine">
          {enteredTasks.map((oneTask, index) => (
            <div className="task-item" key={index}>
              <input
                type="checkbox"
                checked={oneTask.completed}
                onChange={() => toggleTaskCompletion(index)}
              />
              <h4 style={{ textDecoration: oneTask.completed ? 'line-through' : 'none' }}>
                {oneTask.task}
              </h4>
            </div>
          ))}
          <p className="remaining_tasks">Remaining tasks: {enteredTasks.length}</p>
          <div>
            <input type="button" value="Remove completed tasks" onClick={removeCompletedTasks} className="removeCompletedTasks"/>
          </div>
          <div className="removeAllTasksButton border">
            <input type="button" value="Remove all tasks" onClick={removeAllTasks} className="removeAllTasks border"/>
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
