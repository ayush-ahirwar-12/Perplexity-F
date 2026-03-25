import { useMutation } from "@tanstack/react-query"
import { initializeSocketConnection } from "../service/socket.service"
import * as api from "@/api/index"

export const useChat = ()=>{
    return {
        initializeSocketConnection
    }
}

export const useSendMessage = ()=>{
    return useMutation({
        mutationKey:["sendMessage"],
        mutationFn:(data:FormData)=>api.sendMessage(data)
    })
}