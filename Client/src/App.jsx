import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './Pages/Register.jsx';

function App() {
  

  return (
    <>
    <Router>
      <Routes>

      <Route path="/" element={<Register />} />

        
      </Routes>
    </Router>
    </>
  )
}

export default App
