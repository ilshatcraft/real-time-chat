import './App.scss';
import {BrowserRouter as Router, Routes,Route,Link} from "react-router-dom";
import Home from './pages/Home';

import {React,useState} from 'react'; 

import io from 'socket.io-client';

const socket= io.connect("http://localhost:3001");

function App() {


  return <Router >
      <Routes>
      <Route path="/" element={<Home/>}/>
     
    </Routes>
  </Router>;
}

export default App;
