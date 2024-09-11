import React from 'react';
import logo from '../assets/page-logo.png';
import './App.css';
import SignUp from '../pages/Register/signUp';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      {/* <h1>Simply Your Finance</h1> */}
      <div className='image-container'>
        <img src={logo} alt="logo" id='overlay' />
      </div>
      <SignUp />
    </div>
  );
}

export default App;
