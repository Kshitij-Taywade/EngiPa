import React from 'react'

import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/footer/Footer.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Register from './pages/Register.jsx'
import FindPaper from './pages/FindPaper.jsx'
import PostPaper from './pages/PostPaper.jsx'
import AdminRegister from './pages/AdminRegister.jsx'

import {BrowserRouter as Router,Routes,Route}  from 'react-router-dom'


const App = () => {
  return (
    <div>
  <Router>
      <Navbar/>
      
    <Routes>
      <Route exact path="/" element={<Login/>}></Route>
      <Route  path="/About-us" element={<About/>}></Route>
      <Route  path="/Contact-us" element={<Contact/>}></Route>
       <Route  path="/Register" element={<Register/>}></Route>
       <Route  path="/FindPaper" element={<FindPaper/>}></Route>
         <Route  path="/PostPaper" element={<PostPaper/>}></Route>
       <Route  path="/AdminRegister" element={<AdminRegister/>}></Route>
      
    </Routes>
       <Footer/>
  </Router>
    </div>
  )
}

export default App
