import axios from "axios";


export const axiosPrivate = axios.create(
    {
        baseURL:"http://localhost:5500",
        headers:{"Content-Type":"application/json"},
        
        withCredentials:true,
        
    }
)