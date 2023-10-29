import axios from "axios";

// const Base_Url = "http://localhost:5500"
const Base_Url = "https://todolistapi.cyclic.app"


export const axiosPrivate = axios.create(
    {
        baseURL:Base_Url,
        // headers:{"Content-Type":"application/json"},
        headers:{"Content-Type":"multipart/form-data"},
        
        withCredentials:true,
        
    }
)