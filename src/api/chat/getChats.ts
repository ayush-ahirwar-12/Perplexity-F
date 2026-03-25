import api from "@/config/axios"

export const getChats = async()=>{
    const response = await api.get("/api/chats/getchats");
    return response.data;
}