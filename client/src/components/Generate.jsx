import {useState} from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';
import { FaLinkedin, FaTwitter, FaInstagram, FaThreads, FaCopy, FaWandMagicSparkles } from "react-icons/fa6"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-hot-toast";


export default function Generate(){

    let [content,setContent] = useState("");
    let [isCreating,setIsCreating] = useState(false);
    let [isGenerated,setIsGenerated] = useState(false);
    const [generatedContent, setGeneratedContent] = useState({
    instagram: "",
    twitter: "",
    linkedin: "",
    threads: "",
  })

   const platformConfig = {
            instagram : {
              result : generatedContent.instagram,
              icon : FaInstagram,
              title : "Instagram",
              theme : "text-pink-500",
            },
            twitter : {
              result : generatedContent.twitter,
              icon : FaTwitter,
              title : "Twitter",
              theme : "text-cyan-400",
            },
            linkedin : {
              result : generatedContent.linkedin,
              icon : FaLinkedin,
              title : "LinkedIn",
              theme : "text-blue-500",
            },
            threads : {
              result : generatedContent.threads,
              icon : FaThreads,
              title : "Threads",
              theme : "text-white",
            }
          };

    const handleGenerate = async() =>{
        setIsCreating(true);  
        axios.defaults.withCredentials = true;
        const response = await axios.post("http://localhost:5000/generate",
            {content: content});

        if(response){
          console.log("Generated response:", response.data);

          setIsGenerated(true);
          setGeneratedContent({
            instagram: response.data.instagram,
            twitter: response.data.twitter,
            linkedin: response.data.linkedin,
            threads: response.data.threads,
          });
          
        }
    }

    const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied");
  }
    
    return(
        <div className="min-h-screen bg-gradient-to-br from-black via-violet-400/50 to-black text-white font-mono">
             <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          
          <div onClick={()=> window.location.href = "/"} className="h-15 w-45 mx-auto mb-5 hover:cursor-pointer">
                <img className="logo h-[100%] w-[100%] object-cover" src={logo} alt="logo" />
          </div>
          
          <p className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto">
            Transform your thoughts into platform-perfect posts with AI
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-2xl p-6 shadow-2xl">
            <label className="block text-sm font-medium text-gray-300 mb-3">What's on your mind ?</label>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Share your original thought here... I'll help you adapt it for different social media platforms!"
              className="text-xs sm:text-sm w-full h-32 bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none"
            />

            <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button
              disabled={isCreating}
              onClick={()=>handleGenerate()}
              className="mt-4 w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:cursor-pointer rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
               {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <FaWandMagicSparkles className="text-sm" />
                  Generate Posts
                </>
              )}
            </button>
            
            {isCreating && 
            <button className="w-full h-15 mt-4 md:w-auto px-6 py-3 bg-black/40 hover:bg-black/10 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:bg-white/10 cursor-pointer" onClick={() => window.location.reload()}>
              <FontAwesomeIcon icon={faArrowRotateRight} className="text-sm"/>
              Create New Post
              </button>
            }
            </div>
            
          </div>
        </div>

{isCreating && 
      
        <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-200">Generated Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(platformConfig).map(([platform, config]) => {
                let IconComponent = config.icon;
                return(
                  <div
                  key={platform}
                  className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-2xl p-6 shadow-2xl hover:bg-black/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${config.theme}`}>
                        <IconComponent className="text-xl"/>
                      </div>
                      <h3 className="font-semibold text-lg">{config.title}</h3>
                    </div>

                    <div className="bg-black/20 rounded-xl p-4 min-h-[120px] relative">
                      {isGenerated ? (
                        <>
                          <p className="text-gray-200 leading-relaxed whitespace-pre-line ">
                            {config.result}
                          </p>
                          <button
                            onClick={() => copyToClipboard(config.result)}
                            className="absolute top-2 right-2 hover:bg-black/30 rounded-lg transition-colors hover:cursor-pointer"
                            title="Copy to clipboard"
                          >
                            <FaCopy className="text-sm text-gray-400 hover:text-white" />
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="animate-pulse text-gray-40">Generating {config.title} post...</div>
                        </div>
                      )}
                       
                    </div>
                  </div>
               )
              })}
            </div>
          </div>
                       
}
        </div>        
        </div>
    )
}