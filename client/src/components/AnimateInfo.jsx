import rocket from '../assets/rocket.png'
import {motion} from 'motion/react';

export default function AnimateInfo(){
    return(
        <div className="h-9 pl-6 pr-10 w-screen bg-gray-900 text-center text-[10px] sm:text-xs flex items-center justify-evenly sm:justify-center sm:gap-x-10 font-mono">
            <motion.img
            initial={{x:0}} 
            animate={{x:330}}
            transition={{
                duration:3,
                delay:1,
                repeat: Infinity,
                ease: 'anticipate'
            }}
            src={rocket} className="object-fit-cover h-10 w-10"/>
            <motion.p 
            initial={{ color: '#ffff' }}
            animate={{ color: '#12D8FA' }}
            transition={{ duration: 3,
                delay:1,
                          repeat: Infinity,
             }}
             className="text-center mr-10"
            >AI-crafted posts for every platform.</motion.p>
        </div>
    )
}