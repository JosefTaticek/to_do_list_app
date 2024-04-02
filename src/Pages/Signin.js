import React, { useState } from 'react'; // Import useState here directly
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase_config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import logo from "../images/logo.png"


const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Corrected line

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            console.error(error.message);
            setError("Failed to sign in. Please check your email and password."); // Update the error message
        }
    };

    return (
        <div className="bg-[#e9fbfe] h-screen flex flex-col items-center">
          <div className="mt-10"><img src={logo} className="h-24" alt="company_logo"></img></div>
          <div className="mt-8 flex flex-col items-center px-10 py-10 space-y-2 bg-white rounded-lg border shadow-sm">
              <div className="text-center space-y-2">
                  <div className="mt-4 text-2xl font-bold">Sign in to your account</div>
              </div>
              <form onSubmit={handleSignIn} className="flex flex-col space-y-2 container pt-6">
                  <div className="text-center text-gray-500 text-sm font-semibold">EMAIL</div>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 container py-2 px-2 text-sm rounded-md"/>
                  <div className="pt-4 text-center text-gray-500 text-sm font-semibold">PASSWORD</div>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 container py-2 px-2 text-sm rounded-md"/>
                  <div className="flex justify-center w-auto pt-4">
                      <button type="submit" className="py-2 bg-blue-600 flex items-center justify-center text-white hover:text-black-100 container rounded-md">Sign in</button>
                  </div>
              </form>
              <Link to="/signup"><p className="text-sm underline text-blue-600">Don't have an account? Sign up</p></Link>
          </div>
      
          <footer className="">
          <div className="flex flex-row justify-between py-6 px-6 items-center space-x-2">
            <div className="font-normal text-[14px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">© 2024 Momentum LLC. All rights reserved.</div>
            <div className="space-x-2 flex flex-row">
              <div className="font-normal text-[14px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">Terms of Service</div>
              <div className="font-normal text-[14px] text-gray-500 hover:text-gray-900 transition-color cursor-pointer">Privacy Policy</div>
            </div>
          </div>
        </footer>
          
        </div>
      );
      
};

export default Signin;
