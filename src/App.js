import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import ToDoList from "./Pages/ToDoList"
import ProtectedRoute from "./Components/ProtectedRoute"


const App = () => {
  return <Router>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/todolist" element={<ToDoList/>}/>
      <Route path="/" element={
        <ProtectedRoute>
          <ToDoList/>
        </ProtectedRoute>
      }/>
    </Routes>
  </Router>
}

export default App