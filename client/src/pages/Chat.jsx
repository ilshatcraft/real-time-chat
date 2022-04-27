import React, { useEffect, useState } from 'react';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';
import {BrowserRouter as Router, Routes,Route,Link} from "react-router-dom";



const Chat = ({socket, username, room}) => {

 const[currentmessage,setCurrentMessage]=useState("");

    const SendMessage = async()=>{
        if(currentmessage!==''){
                const messageData={
                    room:room,
                    author:username,
                    message:currentmessage,
                    time: new Date(Date.now()).getHours()+":" +new Date(Date.now()).getMinutes(),
                }
                await socket.emit("send_message",messageData)
        }
    }

    useEffect(()=>{
        socket.on("recieve_message",(data)=>{
            console.log(data)
        })
    },[socket])

    return (
        <div>
            <div className='chat_header'> Chat</div>

            <div className='chat_body'></div>

            <div className='chat_footer'>
                <MyInput 
                type="text" 
                placeholder="type here..." 
                onChange={(e)=>{setCurrentMessage(e.target.value); }}
                ></MyInput>
                <MyButton onClick={SendMessage}>&#10148;</MyButton>
            </div>
        </div>
    );
};

export default Chat;