import footer from "../assets/footer.svg"
import logo from "../assets/logo.png"

import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

export default function Footer(){
    return(
    <div className="relative h-[100vh] w-full sm:h-[60vh] sm:w-full  bg-white flex items-center justify-center font-mono">
        <img src={footer} alt="footer" className="object-cover h-full w-full sm:h-[60vh] sm:w-full"/>
        <div className="absolute w-[93%] h-[93.9%] sm:h-[85%] sm:w-[93.9%] bg-black/60 backdrop-blur-lg"></div>
        <div className="absolute flex flex-col sm:flex-row  items-center justify-evenly h-[85%] w-[93.9%] z-10">
            <div className="hidden sm:block sm:h-[100%] sm:w-[25%] sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-y-3">
                <div onClick={()=> window.location.href = "/"} className="h-10 w-30">
                <img className="logo h-10 w-30 object-cover hover:cursor-pointer" src={logo} alt="logo" />
                </div>
                <h3 className="text-center text-white">AI-crafted posts for every platform</h3>
            </div>
        <div className="w-[85%] h-[30%] sm:h-[85%] sm:w-[20%] flex flex-col items-center justify-center gap-y-3 bg-black/50 rounded-3xl">
            <h3 className="font-semibold mb-2 text-white">Pages</h3>
          <ul className="text-sm space-y-1 text-white/50">
            <li className="hover:text-white/80 hover:cursor-pointer"><a href="/">Home</a></li>
            <li className="hover:text-white/80 hover:cursor-pointer"><a>How It Works</a></li>
            <li className="hover:text-white/80 hover:cursor-pointer"><a href="/">Get Started</a></li>
            <li className="hover:text-white/80 hover:cursor-pointer"><a>Reviews</a></li>
          </ul>
        </div>
        <div className="w-[85%] h-[30%] sm:h-[85%] sm:w-[20%] flex flex-col items-center justify-center gap-y-3 bg-black/50 rounded-3xl">
            <h3 className="font-semibold mb-2 text-white">Support</h3>
          <ul className="text-sm space-y-1 text-white/50">
            <li className="hover:text-white/80 hover:cursor-pointer"><a >FAQs</a></li>
            <li className="hover:text-white/80 hover:cursor-pointer"><a >Contact</a></li>
            <li className="hover:text-white/80 hover:cursor-pointer"><a >Privacy Policy</a></li>
            <li className="hover:text-white/80 hover:cursor-pointer"><a >Terms of Service</a></li>
          </ul>
        </div>
        <div className="w-[85%] h-[30%] sm:h-[85%] sm:w-[20%] flex flex-col items-center justify-center gap-y-3 bg-black/50 rounded-3xl">
        <h3 className="font-semibold mb-2 text-white hover:cursor-pointer">Help</h3>
        <ul className="text-sm space-y-1 text-white/50 flex flex-col items-center justify-center">
          <li className="hover:text-white/80 hover:cursor-pointer"><a >Help Center</a></li>
          <li className="hover:text-white/80 hover:cursor-pointer"><a >Privacy Settings</a></li>
        </ul>
        <ul className="text-sm space-x-4 flex items-center justify-center mt-2">
            
            <li><a className="instagram hover:cursor-pointer"><Instagram/></a></li>
            <li><a className="linkedin hover:cursor-pointer"><Linkedin/></a></li>
            <li><a className="twitter hover:cursor-pointer" ><Twitter/></a></li>
            <li><a className="facebook hover:cursor-pointer" ><Facebook/></a></li>
          </ul>
        </div>
        </div>
    </div>
    )
}