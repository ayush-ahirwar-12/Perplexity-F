import {io} from "socket.io-client";

export const initializeSocketConnection=()=>{
    const socket=io("http://localhost:4000",{
        withCredentials:true
    });

    socket.on("connect",()=>{
        console.log("connected to sockt.io server");
        
    })

}

