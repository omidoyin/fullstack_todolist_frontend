import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import useAuth from './components/hooks/useAuth';
// import { axiosPrivate } from './components/api/Api';
import useAxiosPrivate from './components/hooks/useAxiosPrivate';
import NewHomePage from './components/homepage/NewHomePage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PersistLogin from './components/PersistLogin';


function App() {
  const[logIn, setLogIn]= useState(false)
  const[userid, setUserId]= useState('')
  const[email, setEmail]= useState('')
  const[password, setPassword]= useState('')
  const[loginForm, setLoginForm] = useState(false)
  const[registerForm, setRegisterForm] = useState(false)
  const[task, setTask]= useState('')
  const[newtask, setNewTask]= useState('')
  const[newtaskname, setNewTaskName]= useState('')
  // const[iscompleted, setIscompleted]= useState('')
  const[taskname, setTaskName]= useState('')
  const[todos, setTodos]= useState([])
  const[status, setStatus]= useState(false)
  const[editTask, setEditTask]= useState(false)

  // .............customs hooks
  const {setAuth,auth, setPersist,persist} = useAuth();
  const axiosPrivate = useAxiosPrivate();
  
  const handleLoginForm = ()=>{
    setRegisterForm(false)
    setLoginForm(prev=>!prev)
  }
  const handleRegisterForm = ()=>{
    setRegisterForm(prev=>!prev)
    setLoginForm(false)
  }
  const handleEmail = (e)=>{
    setEmail(e.target.value)
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value)
  }


//...........................request................................

const getList = async ()=>{
  console.log(userid)
  const {data} = await axiosPrivate.get(`/todolist/${userid}`, {
    withCredentials:true,
  })
  setTodos(data)
}



  const handleLogout = async ()=>{
    try{
     const {data} =  await axios.get("http://localhost:5500/logout")
     if(data){
      setAuth(null)
      setUserId(null)
      setLogIn(false)
    }
    }catch(err){
      console.error(err)
    }
  }


  // const handleLogin = async(e)=>{
  //   e.preventDefault();
  //   try{
  //       const {data} =  await axios.post("http://localhost:5500/login",{email,password},{headers:{"Content-Type":"application/json"}, withCredentials:true})
  //       if(data){
  //         setAuth(data)
  //         setUserId(data.userid)
  //         setLogIn(true)
  //         setLoginForm(false)
  //         console.log(userid)
        
  //       }
  //     }catch(err){
  //       console.error(err)
  //     }
      

  //   }
    // console.log(userid)
    // console.log("this is app",logIn)
    

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


  //........................TODOLIST request..............................
  // we use axios private for posting and getting todolist
  const submitTask = async(e)=>{
    e.preventDefault();
    try{
      console.log("auth from submit inside app",auth)
      const {data} =  await axiosPrivate.post("/todolist",{ taskname,task,userid})
      console.log(data)
     }catch(err){
       console.error(err)
     }finally{
      // getList();
     }
  }

  

  const updateTask= async(taskId)=>{
    try{
      const response = await axiosPrivate.put(`/todolist/${taskId}`,{task:newtask, taskname:newtaskname,iscompleted:status}, {withCredentials:true,})
    }catch(err){
      console.log(err)
    }finally{
      console.log(status)
      // getList()
    }

  }
  const deleteTask= async(taskId)=>{
    try{
      const response = await axiosPrivate.delete(`/todolist/${taskId}`, {
        withCredentials:true, })

    }catch(err){
      console.log(err)
    }finally{
      // getList()
    }
  }
//...........................USEEFFECTS................................

  // useEffect(()=>{

  //   console.log("useeffect",logIn)
  //   logIn && getList()
  // },[])

//   const togglePersist = ()=>{
//     setPersist(prev=>!prev)
// }
//  useEffect(()=>{
//   localStorage.setItem('persist',persist);
//  },[persist])


 //...........................RENDER BODY................................

  return (
  
   <div className='app'>
    <Router>
      {/* <PersistLogin/> */}
      <Routes>
        {/* <Route element={<PersistLogin/>}> */}
          <Route path='/'  element ={<NewHomePage/>}/>
        {/* </Route> */}
      </Routes>
    </Router>

     
      
      
    </div>
  );
}

export default App;
