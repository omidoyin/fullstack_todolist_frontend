import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const[auth, setAuth]=  useState();
    const[isLoggedIn, setIsLoggedIn]=  useState();
    const[persist, setPersist]=  useState(JSON.parse(localStorage.getItem('persist')) || false);
    
  // console.log("this is auth:", auth);



  return (
    <AuthContext.Provider value={{auth,setAuth,isLoggedIn,setIsLoggedIn, persist, setPersist}}>{children}</AuthContext.Provider>
  )
}

export default AuthContext