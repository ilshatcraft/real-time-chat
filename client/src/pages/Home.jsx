import React, { useEffect, useState } from 'react';
import MyButton from '../UI/button/MyButton';
import io from 'socket.io-client';

const Home = ({socket,take_room_and_username}) => {

  const [username, setUsername]=useState("")
  const [room, setRoom]=useState("")


const joinRoom=()=>{
 if(username!=="" && room!=""){
   socket.emit("join_room",room)
   take_room_and_username(username,room)
 }
}
    return (
        <div className='homePage'>
      <h3>Connect to chat</h3>
      <input type="text" placeholder='Nickname' onChange={(e)=>{
       setUsername(e.target.value); 
      }}></input>
      <input type="text" placeholder='Room ID' onChange={(e)=>{
       setRoom(e.target.value); 
      }}></input>
      <MyButton onClick={joinRoom}>Join</MyButton>
        </div>
    );
};

export default Home;