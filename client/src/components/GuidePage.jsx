import { PenLine, Zap, Send } from 'lucide-react';
import guideVdo from '../assets/guide.mp4';

export default function GuidePage () {

  return (
    
   <div className="guide h-screen w-full flex items-center justify-center bg-black font-mono">

      <div className="h-[90%] w-[93.9%]  flex flex-col sm:flex-row md:flex-row items-center justify-evenly sm:items-center sm:justify-evenly md:items-center md:justify-evenly shadow-lg">
        
        <div className="h-[50%] w-[95%] sm:h-[75%] sm:w-[50%] md:h-[75%] md:w-[50%]  flex flex-col items-center justify-evenly rounded-lg">
          <h3 className="page-txt text-2xl sm:text-4xl md:text-4xl text-white font-bold font-mono text-center text-white/50 mb-5">How it works?</h3>
        <div className="create-steps h-[20%] w-[90%] rounded-xl mr-5 bg-[linear-gradient(60deg,#ddd6fe,#a78bfa,_#ddd6fe)] flex items-center justify-center gap-x-2 sm:gap-x-10">
          <div className="step-icon-i h-10 w-10 sm:h-15 sm:w-15 rounded-full flex items-center justify-center">
            <PenLine className="h-[50%] w-[50%] text-center"/>
          </div>
          <div className="step-info h-[95%] w-[75%] flex flex-col items-start justify-center">
            <div className="step-point h-[45%] w-[90%] text-black flex items-center text-sm sm:text-lg font-bold">
              <h3>Write Your Thought</h3>
            </div>
            <div className="step-txt h-[55%] w-[95%] text-black/60 text-[10px] sm:text-sm mb-1">
              <p>Type your thought for your post or anything on your mind.</p>
            </div>
          </div>
        </div>
        <div className="create-steps h-[20%] w-[90%] rounded-xl ml-5 bg-[linear-gradient(60deg,_#f9a8d4,_#ec4899,_#f9a8d4)] flex items-center justify-center gap-x-2 sm:gap-x-10">
          <div className="step-icon-ii h-10 w-10 sm:h-15 sm:w-15 rounded-full flex items-center justify-center">
            <Zap className="h-[50%] w-[50%] text-center"/>
          </div>
          <div className="step-info h-[95%] w-[75%] flex flex-col items-start justify-center">
            <div className="step-point h-[45%] w-[90%] text-black flex items-center text-sm sm:text-lg font-bold">
              <h3>AI Rewrites for You</h3>
            </div>
            <div className="step-txt h-[55%] w-[95%] text-black/60 text-[10px] sm:text-sm mb-1">
              <p>AI rewrites your thought for each social platform.</p>
            </div>
          </div>
        </div>
        <div className="create-steps h-[20%] w-[90%] rounded-xl mr-5 bg-[linear-gradient(60deg,_#7dd3fc,_#0ea5e9,_#7dd3fc)] flex items-center justify-center gap-x-2 sm:gap-x-10">
          <div className="step-icon-iii h-10 w-10 sm:h-15 sm:w-15 rounded-full flex items-center justify-center">
            <Send className="h-[50%] w-[50%] text-center"/>
          </div>
          <div className="step-info h-[95%] w-[75%] flex flex-col items-start justify-center">
            <div className="step-point h-[45%] w-[90%] text-black flex items-center text-sm sm:text-lg font-bold">
              <h3>Copy & Post Anywhere</h3>
            </div>
            <div className="step-txt h-[55%] w-[95%] text-black/60 text-[10px] sm:text-sm mb-1">
              <p>Pick a version, copy it, and post anywhere.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[40%] w-[75%] sm:h-[75%] sm:w-[45%] md:h-[75%] md:w-[45%] bg-black flex flex-col items-center justify-evenly rounded-lg">
        
        <video
  width="540"
  autoPlay
  muted
  loop
  className="rounded-xl drop-shadow-[9px_9px_0px_#2e2e2e]"
>
  <source src={guideVdo} type="video/mp4" />
</video>


      </div>
      </div>

      
    </div>
    
  )
}