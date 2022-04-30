import React, { useEffect, useState } from 'react';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';
import {BrowserRouter as Router, Routes,Route,Link} from "react-router-dom";



const Chat = ({socket, username, room}) => {

 const[currentmessage,setCurrentMessage]=useState("");

 const[messages,setMessages]=useState([
  
    
    ])



    const SendMessage = async()=>{
        if(currentmessage!==''){
                const messageData={
                    room:room,
                    author:username,
                    message:currentmessage,
                    time: new Date(Date.now()).getHours()+":" +new Date(Date.now()).getMinutes(),
                }
                await socket.emit("send_message",messageData)
                setMessages((list)=>[...list,messageData])
        }
    }

    // useEffect(()=>{
    //     socket.on("recieve_message",(data)=>{
    //         console.log(data)
    //     })
    // },[socket])
    useEffect(()=>{
        socket.on("recieve_message",(data)=>{
            setMessages((list)=>[...list,data])
        })
        
    },[socket])
    return (
        <div className='chat'>
        <div className='chat_window'> 
            <div className='chat_header'> <h1>chat</h1></div>

            <div className='chat_body'> {messages.map((messageContent)=>{
                return <div> 
                    <div>
                        <div><p>{messageContent.message}</p></div>
                        <div>
                            <p>{messageContent.author}</p>
                            <p>{messageContent.time}</p>
                        </div>
                    </div>
                </div>  })}
            </div>

            <div className='chat_footer'>

                <div>

                <MyInput 
                type="text" 
                placeholder="type here..." 
                onChange={(e)=>{setCurrentMessage(e.target.value); }}
                >   
                </MyInput>

                </div>

                <div className='chat_footer_Button'>
                <MyButton  onClick={SendMessage}>&#10148; send  </MyButton>
                </div>

            </div>
        </div>
        </div>
    );
};

export default Chat;