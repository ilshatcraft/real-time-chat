import './App.scss';
import {BrowserRouter as Router, Routes,Route,Link} from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';
import {React,useState} from 'react'; 

import io from 'socket.io-client';

const socket= io.connect("http://localhost:3001");


function App() {
  const [username, setUsername]=useState()
  const [room, setRoom]=useState()
  
  const take_room_and_username=({username,room})=>{
    setUsername(username)
    setRoom(room)
  }



  return <Router >
      <Routes>
      <Route path="/" element={<Home socket={socket} take_room_and_username={take_room_and_username}/>}/>
      <Route path="/chat" element={<Chat socket={socket} username={username} room={room}/>}/>
    </Routes>
  </Router>;
}

export default App;
