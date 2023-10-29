import React from 'react'
import { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
// import { axiosPrivate } from './components/api/Api';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Register = () => {

    const[email, setEmail]= useState('')
    const[password, setPassword]= useState('')
    const[registerForm, setRegisterForm] = useState(false)

    // .............customs hooks
  const {isLoggedIn} = useAuth();
//   const axiosPrivate = useAxiosPrivate();

  const handleRegisterForm = ()=>{
    if(!isLoggedIn){
      setRegisterForm(prev=>!prev)

    }
    // setLoginForm(false)
  }
  const handleEmail = (e)=>{
    setEmail(e.target.value)
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value)
  }

  //..................................

  const handleRegister = async(e)=>{
    e.preventDefault();
    try{
      const {data} =  await axios.post("http://localhost:5500/users", {email,password})
      if(data){
        setRegisterForm(false) 
      }
     }catch(err){
       console.error(err)
     }
  }



  return (
    <div>
          <section className='navbar customflex' >
          <div className="log-button2">
            {<button onClick={handleRegisterForm}>Register</button> }
        </div>
      </section>
        <section className='register-form-container'>
       {registerForm&& <form  className='register-form customflex'>
            <input type="text" placeholder='email' onChange={handleEmail} />
            <input type="text" placeholder='password' onChange={handlePassword} />
            <button onClick={handleRegister}>Register</button>
          </form>}
      </section>
    </div>
  )
}

export default Register