// import Signup from "./assets/Pages/Signup"

import { Route, Routes } from "react-router-dom"
import Signup from "./Pages/Signup"
import Dashboard from "./Pages/Dashboard"
import Header from "./Components/Header/Index"
import "./App.css"

function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
      {/* <Signup/> */}
    </div>
  )
}

export default App