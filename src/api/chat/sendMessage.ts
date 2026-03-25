import api from "@/config/axios"

export const sendMessage = async(data:FormData)=>{
    const response = await api.post("/api/chats/message",data);
    console.log(response);
    return response.data
}