import axios from "axios";


export const axiosPrivate = axios.create(
    {
        baseURL:"http://localhost:5500",
        // headers:{"Content-Type":"application/json"},
        headers:{"Content-Type":"multipart/form-data"},
        
        withCredentials:true,
        
    }
)