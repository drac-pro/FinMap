import React from 'react';
import logo from '../assets/page-logo.png';
import './App.css';
import SignUp from '../pages/Register/signUp';
// import LogIn from '../pages/Register/logIn';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <div className='image-container'>
        <img src={logo} alt="logo" id='overlay' />
      </div>
      <SignUp />
      {/* <LogIn /> */}
    </div>
  );
}

export default App;
