import React, { useState, useEffect } from 'react';
import {Route,Routes} from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import Generate from './components/Generate'
import SignUp from './components/SignUp'
import Login from './components/Login'
import NotFound from './components/NotFound'
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader'

function App() {
 const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     setTimeout(() => setLoading(false), 2000);
   }, []);
 
   if (loading) return <Loader />;
 
  return (
    <>
     <Toaster
                position="bottom-right"
                reverseOrder={true}
     />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/generate" element={<Generate/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
