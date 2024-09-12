import React from 'react';
import logo from '../assets/finmap-logo-bg.jpg';
import './App.css';
import SignUp from '../pages/Register/SignupPage/signUp';
import LogIn from '../pages/Register/LoginPage/logIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='image-container'>
          <img src={logo} alt="logo" id='overlay' />
        </div>
        <div className='Routes'>
          <button className='btn'>Sign Up</button>
          <a href='./logIn' target='_blank' className='btn'>Log In</a>
          <button className='btn btn-3'>Dashboard</button>
          <button className='btn'>About Us</button>
        </div>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
