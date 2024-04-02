import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase_config'; //Firestore + auth
import { collection, query, where, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore"; //Configured instances of Firestore and auth
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import logo from "../images/logo.png"


// ----- HOOKS -----
const ToDoList = () => {
  const [taskName, setTaskName] = useState(""); //Hook - stores input
  const [enteredTasks, setEnteredTasks] = useState([]); //Hook - stores array of tasks fetched from firestore
  const [user, setUser] = useState(null); //Hook - stores auth user data



  // ----- USER AUTHENTICATION -----
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {
        fetchTasks(currentUser);
      } else {
        setEnteredTasks([]); // Clear tasks if user is not logged in
      }
    });

    return () => unsubscribe();
  }, []);



  // ----- DB (COLLECTION) DATA FETCH -----
  const fetchTasks = (currentUser) => {
    const tasksCollectionRef = collection(db, "tasks"); //Request to db (collection)
    const q = query(tasksCollectionRef, where("userId", "==", currentUser.uid)); //Query = filter only user's data (with userId same as user)

    const unsubscribe = onSnapshot(q, (querySnapshot) => { //Realtime change listener 
      const tasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEnteredTasks(tasks); //Updates component with tasks
    });

    return () => unsubscribe(); // Clean up on unmount
  };



  // ----- ADD TASK TO DB (COLLECTION) -----
  const addTaskToFirebase = async (event) => {
    event.preventDefault();
    if (taskName.trim() !== "" && user) { //Check that task is not whitespace + user is logged in
      await addDoc(collection(db, "tasks"), { //If conditions met -> adds a new doc to tasks, await - waits till it's done before next step
        task: taskName,
        completed: false,
        userId: user.uid
      });
      setTaskName(""); //After add of tasks finished, task input is reset
    }
  };



  // ----- COMPLETION STATUS CHANGE -----
  const toggleTaskCompletion = async (taskId, completed) => { //Async - doesnt' block other functions, 2 params - taskId & completed status (boolean)
    await updateDoc(doc(db, "tasks", taskId), { //Specifies doc to update
      completed: !completed //Update to be applied
    });
  };



  // ----- COMPLETED TASKS REMOVAL ----- 
  const removeCompletedTasks = async () => {
    enteredTasks.filter(task => task.completed).forEach(async task => { //Filters tasks that are completed 
      await deleteDoc(doc(db, "tasks", task.id)); //Each completed task deleted
    });
  };


  // ----- ALL TASKS REMOVAL -----
  const removeAllTasks = async () => {
    enteredTasks.forEach(async task => { //Loops throw all tasks in db
      await deleteDoc(doc(db, "tasks", task.id)); //Deletes all tasks
    });
  };



  // ----- SIGN OUT FUNCTION -----
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      // Here you can handle redirection or display a message
    }).catch((error) => {
      // An error happened.
      console.error("Sign out error", error);
    });
  };




  // ----- TODAY DATE FUNCTION -----
  const today = new Date();
  const formattedDate = today.toLocaleDateString('cs-CZ'); //JS function



  // ----- REMAINING TASKS -----
  const remainingTasks = enteredTasks.filter(task => !task.completed).length; //Filter all tasks, length of not



  // -----//----- MAIN RETURN ------//-----
  return <div className="h-screen bg-[#e9fbfe] flex flex-col justify-between">
      <nav className="flex flex-row justify-between px-6 py-6">
        <img src={logo} className="h-10" alt="company_logo"></img>
        <div className="flex justify-center items-center space-x-4">
            <button onClick={handleSignOut} className="text-black py-1 px-3 rounded hover:bg-gray-300">Sign Out</button>
        </div>
      </nav>

      <section className="flex flex-col items-center ">
        <div className="flex flex-col items-center rounded-lg shadow-xl md:w-full max-w-lg h-auto bg-gradient-to-r from-[#4ac7fc] to-[#2df2ff] p-6 min-h-[500px]">
            <div className="text-white text-center mb-4">
            <h1 className="text-5xl">To-Do List</h1>
            <p className="text-2xl mt-2">{formattedDate}</p>
            </div>
            <form onSubmit={addTaskToFirebase} className="w-full mb-4">
            <div className="flex items-center border-b border-white py-2">
                <input 
                type="text"
                placeholder="Enter the task"
                value={taskName}
                onChange={(event) => setTaskName(event.target.value)}
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-gray-500"
                />
                <button
                type="submit"
                className="flex-shrink-0 border-transparent text-black hover:text-teal-800 text-sm px-2 rounded border bg-white"
                >
                Add task
                </button>
            </div>
            </form>
            <div className="w-full mb-4">
            {enteredTasks.map((task) => (
                <div key={task.id} className="flex items-center text-white py-2">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id, task.completed)} //Takes 2 params - checked & key, launch the toggleTaskCompletion function that uploads the data to db
                    className="mr-2"
                />
                <p className={`${task.completed ? "line-through" : ""} flex-grow`}>{task.task}</p>
                </div>
            ))}
            </div>
            <p className="text-white mb-4">Remaining tasks: {remainingTasks}</p>
            <div className="flex space-x-4">
            <button onClick={removeCompletedTasks} className="bg-white text-black py-1 px-3 rounded hover:bg-gray-300">Remove Completed</button>
            <button onClick={removeAllTasks} className="bg-white text-black py-1 px-3 rounded hover:bg-gray-300">Remove All</button>
            </div>
        </div>
      </section>

      <footer className="">
        <div className="flex flex-row justify-between py-6 px-6 items-center">
          <div className="font-normal text-[14px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">© 2024 Momentum LLC. All rights reserved.</div>
          <div className="space-x-4 flex flex-row">
            <div className="font-normal text-[14px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">Terms of Service</div>
            <div className="font-normal text-[14px] text-gray-500 hover:text-gray-900 transition-color cursor-pointer">Privacy Policy</div>
          </div>
        </div>
      </footer>
    </div>
}


export default ToDoList
