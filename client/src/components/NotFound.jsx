import notFound from '../assets/notFound.gif'
export default function NotFound () {
  return (
    <div className="h-screen w-screen flex items-center justify-center font-mono">
        <div className="bg-violet-200 h-[100%] w-[100%] text-center flex flex-col items-center justify-center gap-y-5">

      <img src={notFound} alt="Page not found" className="h-[400px] w-[400px] drop-shadow-[9px_9px_9px_#2e2e2e]"/>
      <h1 className="text-black text-2xl font-bold ">Page Not Found</h1>
      <a href="/" className="w-30 h-8 text-center pt-1 bg-black/10 hover:bg-black/30 rounded-lg text-sm font-semibold">Back To Home</a>
      
    </div>
    </div>
  );
};
