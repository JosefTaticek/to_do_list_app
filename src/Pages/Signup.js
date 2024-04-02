import React, { useState } from 'react'; // Import useState here directly
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase_config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import logo from "../images/logo.png"

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate(); // Corrected line


    const passwordMeetsCriteria = (password) => {
      // Example criteria: at least 8 characters, includes a number, includes an uppercase letter
      const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      return regex.test(password);
    };



    const register = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
      }
      if (!passwordMeetsCriteria(password)) {
          alert("Use at least 8 characters in your password, including at least 1 uppercase letter and at least 1 number.");
          return;
      }
      try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate("/"); // Redirects user after successful signup without email verification
      } catch (error) {
          console.log(error.message);
          alert(error.message);
      }
  };
  

    return (
      <div className="bg-[#e9fbfe] h-screen flex flex-col items-center md:px-10 px-10">
        <div className="mt-10"><img src={logo} className="h-16" alt="compan_logo"></img></div>
        <div className="mt-8 flex flex-col items-center px-10 py-10 space-y-2 bg-white rounded-lg border shadow-sm">
            <div className="text-center space-y-2">
                <div className="mt-4 text-2xl font-bold">Try Momentum To Do List for free.</div>
                <p className="text-sm">Sign up and access all features.</p>
            </div>
            <form onSubmit={register} className="flex flex-col space-y-2 container pt-6">
                <div className="text-center text-gray-500 text-sm font-semibold">EMAIL</div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 container py-2 px-2 text-sm rounded-md" placeholder="Enter email"/>
                <div className="pt-4 text-center text-gray-500 text-sm font-semibold">PASSWORD</div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 container py-2 px-2 text-sm rounded-md" placeholder="Enter password"/>
                <div className="pt-4 text-center text-gray-500 text-sm font-semibold">CONFIRM PASSWORD</div>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border border-gray-300 container py-2 px-2 text-sm rounded-md" placeholder="Enter password"/>
                <div className="flex justify-center w-auto pt-4">
                    <button type="submit" className="py-2 bg-blue-600 flex items-center justify-center text-white hover:text-black-100 container rounded-md">Sign up</button>
                </div>
            </form>
            <Link to="/signin"><p className="text-sm underline text-blue-600">Already have an account? Sign in</p></Link>
        </div>

        <footer className="">
        <div className="flex flex-row justify-between py-6 px-6 items-center space-x-2">
          <div className="font-normal text-[14px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">© 2024 Momentum LLC.  All rights reserved.</div>
          <div className="space-x-2 flex flex-row">
            <div className="font-normal text-[14px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">Terms of Service</div>
            <div className="font-normal text-[14px] text-gray-500 hover:text-gray-900 transition-color cursor-pointer">Privacy Policy</div>
          </div>
        </div>
      </footer>
        
      </div>

    );
};

export default Signup;
