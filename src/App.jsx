// import Signup from "./assets/Pages/Signup"

import { Route, Routes } from "react-router-dom"
import Signup from "./Pages/Signup"
import Dashboard from "./Pages/Dashboard"
import Header from "./Components/Header/Index"
import "./App.css"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <>
      <ToastContainer/>
      <Header/>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
      </>
    </div>
  )
}

export default App