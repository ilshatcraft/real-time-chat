import React, { useEffect, useState } from 'react';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';
import {BrowserRouter as Router, Routes,Route,Link} from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";


const Chat = ({socket, username, room}) => {

  
 const[currentmessage,setCurrentMessage]=useState("");

 const[messages,setMessages]=useState([
  
    
    ])


    const scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
      

    const SendMessage = async()=>{
        if((currentmessage!==''&& room!='')){
                const messageData={
                    room:room,
                    author:username,
                    message:currentmessage,
                    time: new Date(Date.now()).getHours()+":" +((new Date(Date.now()).getMinutes())>9? new Date(Date.now()).getMinutes(): '0'+new Date(Date.now()).getMinutes()),
                }
                await socket.emit("send_message",messageData)
                setMessages((list)=>[...list,messageData])
                setCurrentMessage('')
                
                
                
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

            <div >
                <ScrollToBottom className='chat_body'>
                 {messages.map((messageContent)=>{
                return <div id={messageContent.author==username?'you':'other'}>
                        <div className='chat_body_message' >{messageContent.message}</div>
                        <div className='chat_body_about'>
                           <div className='chat_body_about_author'>by {messageContent.author}</div> 
                          <div className='chat_body_about_time'>at {messageContent.time}</div>
                        </div>
                    </div>
                 })}
                 </ScrollToBottom>
            </div>

            <div className='chat_footer'>

                <div>

                <MyInput 
               value={currentmessage}
                type="text" 
                placeholder="type here..." 
                onChange={(e)=>{setCurrentMessage(e.target.value);}}
             
                onKeyPress={(event)=>{event.key==="Enter" && SendMessage()}}
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