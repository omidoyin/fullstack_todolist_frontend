// import React, { useEffect } from 'react'
import { useEffect } from 'react'
import { axiosPrivate } from '../api/Api'
import useRefresh from './useRefresh'
import useAuth from './useAuth'

const useAxiosPrivate = () => {
    const refresh= useRefresh();
    const {auth}= useAuth();
    // console.log(auth)

  useEffect(()=>{
    // console.log('useeffect useaxiosprivate')
    const requestIntercept   = axiosPrivate.interceptors.request.use((config)=>{
        // console.log(auth?.accesstoken)
        if(!config.headers['Authorization']){
            // console.log('res intercept2')
            config.headers['Authorization'] = `Bearer ${auth?.accesstoken}`
        }return config
        
    }, (error)=>Promise.reject(error));
    
    
    const responseIntercept = axiosPrivate.interceptors.response.use(response=>response, async(error)=>{
        const prevRequest = error?.config;
        if(error?.response?.status === 403 && !prevRequest?.sent){
            prevRequest.sent = true;
            // console.log('request intercept1')
            const newAccessToken = await refresh();
            // console.log('request intercept2')
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return axiosPrivate(prevRequest)
        }

       return Promise.reject(error)
        
    });
    
    
    
    return ()=>{
        axiosPrivate.interceptors.request.eject(requestIntercept)
        axiosPrivate.interceptors.response.eject(responseIntercept)
    }
},[auth, refresh])
// auth, refresh

return axiosPrivate
}

export default useAxiosPrivate