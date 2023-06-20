import React from 'react'
import { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
// import { axiosPrivate } from './components/api/Api';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const LogIn = () => {
    const[logIn, setLogIn]= useState(false)
    const[email, setEmail]= useState('')
    const[password, setPassword]= useState('')
    const[userid, setUserId]= useState('')
    const[loginForm, setLoginForm] = useState(false)


    const {setAuth,auth, setPersist,persist, setIsLoggedIn} = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const handleLoginForm = ()=>{
        // setRegisterForm(false)
        setLoginForm(prev=>!prev)
      }
      const handleEmail = (e)=>{
        setEmail(e.target.value)
      }
      const handlePassword = (e)=>{
        setPassword(e.target.value)
      }



        const handleLogin = async(e)=>{
    e.preventDefault();
    try{
        const {data} =  await axios.post("http://localhost:5500/login",{email,password},{headers:{"Content-Type":"application/json"}, withCredentials:true})
        // console.log(data)
        if(data){
          setAuth(data)
          setUserId(data.userid)
          setIsLoggedIn(true)
          setLogIn(true)
          setLoginForm(false)
          // console.log(userid)
          
          console.log('data from login response',data)
          
        }
    }catch(err){
        console.error(err)
    }
    
    
}

// console.log('auth.',auth)

const togglePersist = ()=>{
    setPersist(prev=>!prev)
}
 useEffect(()=>{
  localStorage.setItem('persist',persist);
 },[persist])



  return (
    <div>
          <section className='navbar customflex' >
        <div className="log-button1">
            {/* <button>LogOut</button>  */}
            <button onClick={handleLoginForm}>LogIN</button> 
        </div>
        
      </section>
           <section className='login-form-container'>
       {loginForm&& <form  className='login-form customflex'>
          <input type="text" name='email' placeholder='email' onChange={handleEmail}  />
          <input type="text" name='password' placeholder='password' onChange={handlePassword} />
          <button onClick={handleLogin}>Login</button>
          
          <div> <input type="checkbox" id='persist' onChange={togglePersist}  checked={persist}/>
           <label htmlFor="persist">Trust this device?</label>
           </div>

        </form>}

      </section>
    </div>
  )
}

export default LogIn