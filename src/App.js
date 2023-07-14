
import './App.css';
import Navbar from './components/Navbar';
import React,{useState} from "react";
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  
  
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [alert, setalert] = useState(null)
  const showAlert = (message,type)=>{
      setalert({
        msg:message,
        type:type
      })
      setTimeout(()=>{
        setalert(null);
      },1500);
  }

  return (
    <>
   <NoteState>
   <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <Routes>
      <Route exact path="/home"  element=<Home showAlert={showAlert}/>/>
      <Route exact path="/about"  element=<About showAlert={showAlert}/>/>
      <Route exact path="/login"  element=<Login showAlert={showAlert}/>/>
      <Route exact path="/signup"  element=<SignUp showAlert={showAlert}/>/>

    </Routes>
   
    
    </Router>
   </NoteState>
    
    
   
    </>
   
  );
}

export default App;
