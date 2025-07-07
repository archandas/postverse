 import bg from '../assets/hero.jpeg'
 import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Typewriter } from 'react-simple-typewriter';

export default function HeroSection (){
  const navigate = useNavigate();

  let handleGetStarted = async() =>{
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/authCheck`);
    if(response.data.success){
      navigate("/generate");
    } else{
      localStorage.setItem("redirectAfterAuth", "/generate");
      navigate("/signup");

    }
    
  }
    return (
        
        <div className="relative mt-10 ml-7 mr-10 mb-10 font-mono">
           <img className="object-cover h-screen w-screen drop-shadow-[10px_10px_0px_#2e2e2e]" src={bg} alt="hero" />
           <div className="absolute h-screen inset-0 backdrop-blur-xs bg-black/10">
           </div>

           <div className="absolute inset-0 flex flex-col items-start justify-center  gap-y-10 text-white z-10">
            <div className="ml-5">
              <p className="heading text-5xl sm:text-5xl md:text-6xl font-mono font-bold">Postverse <span className="txt-ai">AI</span></p>
            </div>

            <div className="ml-5 text-xl sm:text-md md:text-lg text-white">
              <p>Turn your thoughts into platform-ready posts — effortlessly.</p>
              <p>Write once, and get tailored versions for Instagram, LinkedIn, X, and more.</p>
              <p>No rewriting. No hassle.</p>
              <p>Just your voice — perfectly tuned for every feed.</p>
            </div>

    <div className="ml-5">
      <h1 className="text-2xl md:text-3xl font-bold font-mono">
            {' '}
            <span className="text-[#c0ff38]">
              <Typewriter
                words={['1. Think It', '2. Write It', 'Let AI Do the Magic']}
                loop={true}
                cursor
                cursorStyle='|'
                typeSpeed={30}
                deleteSpeed={20}
                delaySpeed={1000}
              />
            </span>
          </h1>
    </div>
    <a onClick={() => handleGetStarted()} className="text-center pt-1 ml-5 bg-white/50 hover:bg-white/30 text-black active:border-gray-800 active:border-r-3 active:border-b-4 h-10 w-30 sm:h-10 sm:w-35 md:h-10 md:w-35 text-lg font-semibold hover:cursor-pointer">Get Started</a>
  </div>
           
        </div>
        
    )
}