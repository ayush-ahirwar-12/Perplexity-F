import api from "@/config/axios"

export const sendMessage = async(data:FormData)=>{
    const response = await api.post("/api/chats/message",data)
    return response.data
}