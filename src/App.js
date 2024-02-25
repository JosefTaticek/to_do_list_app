import React from 'react'
import {useState} from "react"

const App = () => {
  const [taskName, setTaskName] = useState("") //This will handle the content from form
  const [enteredTasks, setEnteredTasks] = useState([]) //Objects array, handle the form submit

  
  const today = new Date();
  const formattedDate = today.toLocaleDateString('cs-CZ');
  

  const formSubmit = (event) => { 
    event.preventDefault(); // Prevent the constant reloading of the webpage

    if (taskName) { //SAVING VALUES TO OBJECTS + CONTROL MECHANISM
      const newTaskObject = { task: taskName, completed: false }; // Correctly define a new task object
      setEnteredTasks(currentTasks => [...currentTasks, newTaskObject]); // Correctly add the new task to the array
    } else {
      console.log("Task field was empty.");
    }
    setTaskName(""); // Correctly reset the task input field to empty
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
    const removeAllTasks=()=>setEnteredTasks([]) //REMOVE ALL TASKS FUNCTION


  return <div>
    <div className="header">
      <p></p>
    </div>


    <div className="app-body">
      <div>
        <h1>To-Do List app</h1>
        
        <p className="todaysDate">Today's date is: {formattedDate}</p>

        <div className="formLine">
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
      </div>


      <div className="fullWidthLine">
      </div>


      <div> {/*MAPPING OF TASKS*/}
        <p className="remaining_tasks">Remaining tasks: {enteredTasks.length}</p>
        {enteredTasks.map((oneTask, index) => {// Make sure to access the correct property (`task`) from each task object


        return (
          <div className="task-item" key={index}>
              <input 
              type="checkbox"
              checked={oneTask.completed}
              onChange={()=>toggleTaskCompletion(index)}/>
              <h4 style={{ textDecoration: oneTask.completed ? 'line-through' : 'none' }}>
              {oneTask.task}
            </h4>
          </div>
          );
        })}
      </div>


      <div>
        <input type="button" value="Remove all tasks" onClick={removeAllTasks}/>
      </div>
      

      <div className="fullWidthLine">
      </div>
    </div>


    <div className="footer">
      <p></p>
    </div>
  </div>
}

export default App