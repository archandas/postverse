import logo from '../assets/logo.png'
import { SparklesIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Menu } from "lucide-react";
import '../Nav.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"

export default function Navbar ({ scrollToGuide, scrollToReview, scrollToHelp }) {

let [isLoggedIn,setIsLoggedIn] = useState(false);
let[username,setUsername] = useState();
const navigate = useNavigate();

useEffect(() => {
    const checkAuth = async () => {
    try {
        axios.defaults.withCredentials = true;
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/authCheck`);
      if (response.data.success) {
        setIsLoggedIn(true);
        setUsername(response.data.user.username);
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUsername("");
      console.error("Auth check failed:", err);
    }
  };

  checkAuth();
},[]);

let handleLogout = async () => {
  axios.defaults.withCredentials = true;
const response = await axios.get(`${import.meta.env.VITE_API_URL}/logout`);
if (response.data.success) {
    setIsLoggedIn(false);
    setUsername("");
    toast.success("Come back again !");
    navigate("/");
}
};

let handleCreatePost = async () => {
  axios.defaults.withCredentials = true;
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/authCheck`);
  if(response.data.success){
    navigate("/generate");
  } else {
    localStorage.setItem("redirectAfterAuth", "/generate");
    navigate("/signup");
  }
};

    return (
        <nav className="sticky top-0 z-50 py-2 backdrop-blur-xl bg-black/50 font-mono">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-center items-center gap-x-5 sm:gap-x-100 lg:gap-x-0">
                    <div className="h-6 w-6 block lg:hidden ">
        <Sheet>
      <SheetTrigger className="focus:outline-none">
        <Menu className="w-6 h-6 text-white hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-black/70 backdrop-blur-lg text-white border-none font-mono w-[250px]"
      >
        <SheetHeader>
          <SheetTitle className="text-white text-xl">Menu</SheetTitle>
          {username &&
         <>
          <span><FontAwesomeIcon icon={faCircleUser} size="2x" className="mt-10 text-cyan-300"/></span>
          <p className="text-sm text-cyan-300 ">
          {` Hello, ${username}`}</p>
         </>
          }
        </SheetHeader>

        <div className="mt-4 space-y-3">
          <button
            onClick={handleCreatePost}
            className="flex items-center w-full text-left ml-3 hover:text-[#12D8FA] active:text-white/30 hover:bg-white/10 px-2 py-1 rounded hover:cursor-pointer"
          >
            Create Post
            <SparklesIcon className="star h-5 w-5 ml-1 text-[#a78bfa]" />
          </button>

          <button onClick={scrollToGuide} className="Guide-page w-full text-left ml-3 hover:text-[#12D8FA] active:text-white/30 hover:bg-white/10 px-2 py-1 rounded hover:cursor-pointer">
            Guide
          </button>

          <button onClick={scrollToReview} className="Review-page w-full text-left ml-3 hover:text-[#12D8FA] active:text-white/30 hover:bg-white/10 px-2 py-1 rounded hover:cursor-pointer">
            Reviews
          </button>

          <button onClick={scrollToHelp} className="Help-page w-full text-left ml-3 hover:text-[#12D8FA] active:text-white/30 hover:bg-white/10 px-2 py-1 rounded hover:cursor-pointer">
            Help & Support
          </button>

          <div className="h-px my-2 bg-white/20" />

          <div className="w-full ml-3 mt-5">
            {isLoggedIn ? (
              <a
                onClick={handleLogout}
                className="signup-mobile bg-transparent  text-[#12D8FA] font-semibold active:text-black py-1 px-2 border border-[#12D8FA] active:border-transparent rounded"
              >
                Log Out
              </a>
            ) : (
              <a
                href="/signup"
                className="signup-mobile bg-transparent  text-[#12D8FA] font-semibold active:text-black py-1 px-2 border border-[#12D8FA] active:border-transparent rounded"
              >
                Log in/Sign up
              </a>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
                       </div>
                    <div className="flex items-center justify-center lg:gap-x-60 flex-shrink-0">
                       
                        <div onClick={()=> window.location.href = "/"} className="h-10 w-30">
                        <img className="logo h-[100%] w-[100%] object-cover hover:cursor-pointer" src={logo} alt="logo" />
                        </div>
                        <ul className="hidden sm:hidden md:hidden lg:flex  space-x-10 text-white hover:cursor-pointer">
                            <li className="flex items-center justify-fill">
                                <a onClick={()=>handleCreatePost()} className="hover:text-[#12D8FA] active:text-white/30">Create Post</a>
                                <SparklesIcon className=" star h-5 w-5 ml-1 text-[#a78bfa]" />
                            </li>
                            <li><a onClick={scrollToGuide} className=" hover:text-[#12D8FA] active:text-white/30">Guide</a></li>
                            <li><a onClick={scrollToReview} className="hover:text-[#12D8FA] active:text-white/30">Reviews</a></li>
                            <li><a onClick={scrollToHelp} className="hover:text-[#12D8FA] active:text-white/30">Help & Support</a></li>
                        </ul>

                        {isLoggedIn ? (
                            <>

                            <a onClick={()=>handleLogout()} className="signup hidden sm:hidden md:hidden lg:flex bg-transparent  text-[#12D8FA] font-semibold hover:text-black py-1 px-2 border border-[#12D8FA] hover:border-transparent rounded hover:cursor-pointer">Log Out</a>
                            </>
                        ):(
                            <a href="/signup" className="signup hidden sm:hidden md:hidden lg:flex bg-transparent text-[#12D8FA] font-semibold hover:text-black py-1 px-2 border border-[#12D8FA] hover:border-transparent rounded hover:cursor-pointer">Log in/Sign up</a>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
