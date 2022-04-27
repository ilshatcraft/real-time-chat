import React, { useEffect, useState } from 'react';
import MyButton from '../UI/button/MyButton';
import io from 'socket.io-client';
import MyInput from '../UI/input/MyInput';
import {BrowserRouter as Router, Routes,Route,Link,useNavigate} from "react-router-dom";


const Home = ({socket}) => {

  const [username, setUsername]=useState("")
  const [room, setRoom]=useState("")
  let navigate = useNavigate();

const joinRoom= async()=>{
 if(username!=="" && room!=""){
   socket.emit("join_room",{room,username})
   navigate('/chat')
 }
 
}
    return (
        <div className='homePage'>
      <h3>Connect to chat</h3>
      <MyInput type="text" placeholder='Nickname' onChange={(e)=>{
       setUsername(e.target.value); 
      }}></MyInput>
      <MyInput type="text" placeholder='Room ID' onChange={(e)=>{
       setRoom(e.target.value); 
      }}></MyInput>
      <MyButton onClick={joinRoom}>Join</MyButton>
        </div>
    );
};

export default Home;