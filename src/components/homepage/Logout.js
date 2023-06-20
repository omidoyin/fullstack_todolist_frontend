import React from 'react'
import '../../App.css';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {useNavigate} from 'react-router-dom'

const Logout = () => {

    const {setAuth,auth, setPersist,persist, setIsLoggedIn} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const HandleLogout = async (e)=>{
        e.preventDefault();
        try{
         const {data} =  await axiosPrivate.get("http://localhost:5500/logout")
         console.log(data)
         if(data){
          setAuth(null)
          console.log('hey logged out')
          // console.log(data)
        }
        // navigate('/')
      }catch(err){
        console.error(err)
      }finally{
          setIsLoggedIn(false)
          window.location.reload(false)

        }
      }
    

  return (
    <div>

<section className='navbar customflex' >
        <div className="log-button1">
            <button onClick={HandleLogout}>LogOut</button>
        </div>
        </section>


    </div>
  )
}

export default Logout