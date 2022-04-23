const express =require("express");
const app =express();
const http=require('http');
const cors=require('cors');
const {Server}=require("socket.io")


app.use(cors());

const server= http.createServer(app);


const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
})

io.on("connection",(socket)=>{
    console.log(`Connected: ${socket.id}`);

    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`user:${socket.id} Joined to the room: ${data}`)
    })

    socket.on("disconnect",()=>{
        console.log("User disconect",socket.id)
    })

})

server.listen(3001 , ()=>{
    console.log('server ON')
});
