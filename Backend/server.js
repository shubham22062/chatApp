import express from "express";
import http from "http";
import {Server,Socket} from "socket.io"


const app = express();

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
       origin:"http://localhost:5174" 
    }
})

app.use(express.json());

let messages = [];

app.get("/",(req,res)=>{
    res.send("Chat server is running!");
})


io.on("connection",(socket)=>{
    console.log("User conneted:", socket.id);

    socket.emit("initialMessages", messages);
    

    //listen for new messages..
    socket.on("sendMessage",(data)=>{
        messages.push(data);
        io.emit("receiveMessage", data);
    });


socket.on("disconnect",()=>{
    console.log("User disconnected:",socket.id)
});

});

server.listen(5001,()=>console.log("Server running on Port 5001"));

