import {useState} from 'react';
import authBg from '../assets/auth.svg'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { toast } from "react-hot-toast";

export default function SignUp(){
    const navigate = useNavigate();

    let [username,setUsername] = useState("");
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [userData,setUserData] = useState({});

    let handleSubmit = async (e) => {
      e.preventDefault();
     let newUserData = {
        username: username,
        email: email,
        password: password,
      }
      setUserData(newUserData);
      
      axios.defaults.withCredentials = true;
  try{
      const response = await axios.post("http://localhost:5000/signup",
        newUserData
      );

      if (response.data.success) {
        const redirectTo = localStorage.getItem("redirectAfterAuth") || "/";
        localStorage.removeItem("redirectAfterAuth");

        toast.success(`Welcome ${username}`);
        navigate(redirectTo);
      } else {
        toast.error(response.data.message);
      }
    } catch(err) {
      toast.error("signup failed, please try again");
    }
     
      console.log(newUserData);

      setUsername("");
      setEmail("");
      setPassword("");

      
    }

    return(
        <div className=" font-mono h-[100vh] w-[100vw] flex items-center justify-center bg-black">
            
           <div className="relative h-[90%] w-[90%] flex items-center justify-center">
            <img className="object-cover h-[100%] w-[100%] " src={authBg} />
            <div className="absolute h-[100%] w-[100%] inset-0 backdrop-blur-lg"></div>

            <div className="h-[90%] w-[90%] absolute z-10 flex flex-col items-center justify-center text-center">
              <div onClick={()=> window.location.href = "/"} className="h-10 w-30 mb-10 mr-auto hover:cursor-pointer">
                <img className="logo h-[100%] w-[100%] object-cover" src={logo} alt="logo" />
              </div>
            <p className="text-white text-lg sm:text-2xl font-bold">Let's Get Started</p>
            <p className="text-white/60 text-xs sm:text-sm ">Please sign up or log in to continue</p>
            <div className="w-[90%] h-[70%] sm:w-[50%] flex flex-col items-center justify-center text-sm">
<form onSubmit={(e)=>handleSubmit(e)} className="space-y-4">
  
          <input
            required
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/70"
          />
 
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/70"
          />
  
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/70"
          />
  
        
        
        <button
            type="submit"
            className="w-full py-2 rounded-lg bg-black/70 text-white font-semibold hover:bg-black/30 transition duration-300 cursor-pointer"
          >
           Create Account
          </button>
        </form>

        <p className="text-white/60 text-[10px] sm:text-xs mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="hover:text-sky-300 underline cursor-pointer">Login</a>
        </p>

            </div>
            </div>
           </div>
        </div>
    )
}