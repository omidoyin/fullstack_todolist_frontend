import React from "react";
import useAuth from "./useAuth";
import axios from "axios";


// const Base_Url = "http://localhost:5500/refresh"
const Base_Url = "https://todolistapi.cyclic.app/refresh"

const useRefresh = () => {
  // console.log('userefresh')
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    const newResponse = await axios.get(Base_Url, {
      withCredentials: true,
      // headers:{"Content-Type":"application/json"}
    });

    // console.log("refreshed reference", newResponse.data);
    setAuth((prev) => ({
      ...prev,
      accesstoken: newResponse.data.accessToken,
      userid: newResponse.data.userid,
    }));

    return newResponse.data;
  };
  // console.log(auth)

  return refresh;
};

export default useRefresh;
