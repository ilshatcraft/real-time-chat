import './App.scss';
import {BrowserRouter as Router, Routes,Route,Link} from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';
import {React,useState,useEffect} from 'react'; 

import io from 'socket.io-client';

const socket= io.connect("http://localhost:3001");


 function App() {
  const [username, setUsername]=useState()
   const [room, setRoom]=useState()
  
//   const take_room_and_username=async({username1,room1})=>{
//     setUsername(username1)
//     setRoom(room1)
//     console.log(username)    element={<Home socket={socket} take_room_and_username={take_room_and_username}/>}/>
//     console.log(room)        element={<Chat socket={socket} username={username} room={room}/>}/>
//   }
 useEffect(()=>{
        socket.on("join_roomed",(data)=>{
            console.log(data)
            setUsername(data.username)
            setRoom(data.room)
        })
    },[socket])

  return <Router >
      <Routes>
      <Route path="/" element={<Home socket={socket} />}/>
      <Route path="/chat" element={<Chat socket={socket} room={room} username={username}/>}/>
    </Routes>
  </Router>;
}

export default App;
