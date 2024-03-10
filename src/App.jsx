// import Signup from "./assets/Pages/Signup"

import { Route, Routes } from "react-router-dom"
import Signup from "./Pages/Signup"
import Dashboard from "./Pages/Dashboard"
import Header from "./Components/Header/Index"
import "./App.css"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase"

function App() {
  const [user] = useAuthState(auth)

  return (
    <div>
      <>
      <ToastContainer/>
      <Header/>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        {user ? 
        <Route path="/Dashboard" element={<Dashboard/>}/>
        :
        <Route path="/" element={<Signup/>}/>
        }
      </Routes>
      </>
    </div>
  )
}

export default App