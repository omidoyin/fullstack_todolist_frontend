import { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";
import useAuth from "../hooks/useAuth";
// import { axiosPrivate } from './components/api/Api';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Register from "./Register";
import LogIn from "./LogIn";
import PersistLogin from "../PersistLogin";
import Logout from "./Logout";

const NewHomePage = () => {
  const [logIn, setLogIn] = useState(false);
  const [userid, setUserId] = useState("");

  const [task, setTask] = useState("");
  const [newtask, setNewTask] = useState("");
  const [newtaskname, setNewTaskName] = useState("");
  // const[iscompleted, setIscompleted]= useState('')
  const [taskname, setTaskName] = useState("");
  const [todos, setTodos] = useState();
  const [clickedTodoID, setClickedTodoID] = useState({});
  const [status, setStatus] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tests, setTests] = useState(false);
  const [image, setImage] = useState();

  const test = () => {
    setTests((pre) => !pre);
  };

  // .............customs hooks
  const { setAuth, auth, setPersist, persist, isLoggedIn } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  //...........................request................................

  //........................TODOLIST request.............................
  // we use axios private for posting and getting todolist
  const submitTask = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image",image)
    formData.append("taskname",taskname)
    formData.append("task",task)
    formData.append("userid",auth?.userid)
    console.log(...formData)

    try {
      console.log(auth?.userid);
      console.log(todos);
      const { data } = await axiosPrivate.post("/todolist", {
        taskname,
        task,
        userid: auth?.userid,
      });
      setTodos([...todos, data]);
      
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosPrivate.put(
        `/todolist/${clickedTodoID}`,
        { task: newtask, taskname: newtaskname },
        { withCredentials: true }
      );
      console.log(data);

      if (data) {
        setTodos(
          todos.map((todo) =>
            todo._id === clickedTodoID
              ? {
                  _id: todo?._id,
                  task: newtask,
                  taskname: newtaskname,
                  iscompleted: todo.iscompleted,
                }
              : todo
          )
        );
        setEditTask(false);
        setClickedTodoID(clickedTodoID);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // console.log(status)
      // getList()
      setClickedTodoID(clickedTodoID);
    }
  };

  const updateTaskStatus = async (e, todoId, completed) => {
    e.preventDefault();
    // console.log('fe status in fn', status)
    let status = !completed;
    // console.log("be status in fn", completed);
    // console.log("be negate status in fn", negate);
    try {
      const { data } = await axiosPrivate.put(
        `/todolist/${todoId}`,
        { iscompleted: status },
        { withCredentials: true }
      );
      console.log(data);
      // console.log(todoId)

      if (data) {
        setTodos(
          todos.map((todo) =>
            todo._id === todoId ? { ...todo, iscompleted: status } : todo
          )
        );

        setStatus(status);
        //  setTodos(todos.map((todo)=>(todo._id === clickedTodoID ? {iscompleted:status} : todo)))
        //  setEditTask(false)
        //
      }
    } catch (err) {
      console.log(err);
    } finally {
      // console.log(status)
      // getList()
      // setStatus()
    }
  };

  const deleteTask = async (taskId, e) => {
    console.log(taskId);
    try {
      const response = await axiosPrivate.delete(`/todolist/${taskId}`, {
        withCredentials: true,
      });
      if (response) {
        console.log(response);
        console.log(taskId);
        const newtodos = todos.filter((todo) => todo._id !== taskId);
        console.log(newtodos);
        setTodos(todos.filter((todo) => todo._id !== taskId));
        console.log("hey");
        // setTodos(data)
      }
    } catch (err) {
      console.log(err);
    } finally {
      // getList()
    }
  };
  //...........................USEEFFECTS...............................
// to get user todolists
  useEffect(
    (e) => {
      let isMounted = true;
      const controller = new AbortController();
      // console.log('gettodos 0 useffect runs')

      // e.preventDefault();
      const getList = async () => {
        // console.log('gettodos 1 useffect runs')
        try {
          const { data } = await axiosPrivate.get(`/todolist/${auth?.userid}`, {
            withCredentials: true,
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
          });
          // console.log(data)

          isMounted ? setTodos(data) : setTodos();
          // isMounted ? setUsers(response.data):setUsers()
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
          isMounted = false;
        }
      };

      if (isLoggedIn === true) {
        getList();
        // console.log('loged in')
      }

      return () => {
        isMounted = false;
        controller.abort();
      };
    },
    [isLoggedIn]
  );

  // ......to get a todo..........
  useEffect(
    (e) => {
      let isMounted = true;
      const controller = new AbortController();
      // console.log('gettodos 0 useffect runs')

      // e.preventDefault();
      const getATodo = async () => {
        // console.log('gettodos 1 useffect runs')
        try {
          const { data } = await axiosPrivate.get(
            `/todolist/todo/${clickedTodoID}`,
            {
              withCredentials: true,
              signal: controller.signal,
              headers: { "Content-Type": "application/json" },
            }
          );
          //  console.log(data)
          //

          if (isMounted) {
            setNewTask(data[0]?.task);
            setNewTaskName(data[0]?.taskname);

            // data?.map((newData)=>{
            //   console.log(newData.task)
            //   setNewTask(newData?.task); setNewTaskName(newData?.taskname);

            // })
            // console.log(newtask)
          } else {
          }
          // isMounted ? setUsers(response.data):setUsers()
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
          isMounted = false;
        }
      };

      if (editTask === true) {
        getATodo();
      }

      return () => {
        isMounted = false;
        controller.abort();
      };
    },
    [editTask]
  );

  let todoId = [];
  let completed = [];

  return (
    <div className="container">
      <PersistLogin />
      <nav className="nav-bar">
        <Register />
        <LogIn />
        <Logout />
      </nav>
      <section className="todo-form ">
        {/* auth?.accesstoken */}
        {/* isLoggedIn? */}
        {isLoggedIn? (
          <form className="customflex">
            <h2>file upload</h2>
            <input type="file" name="image" onChange={(e) => {
                setImage(e.target.files[0]);
              }} />
            <label htmlFor="task"> Task</label>
            <input
              type="text"
              name="task"
              id="task"
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
            <label htmlFor="todo"> Todo</label>
            <textarea
              name="todo"
              id="todo"
              cols="30"
              rows="5"
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
            ></textarea>
            <button onClick={submitTask}>Submit</button>
          </form>
        ) : (
          <div
            className="customflex"
            
          >
            <div className="color-gradient customflex">
              Welcome to Todo list
            </div>
          </div>
        )}
      </section>
      <section className="todolists">
        <div className="todo-container">
          {
            todos?.map((todo, index) => (
              <div key={index}>
                <div
                  className={
                    todo?.iscompleted
                      ? "completed gridD"
                      : "not-completed gridD"
                  }
                >
                  <div>
                    <h3><span>task: </span>{todo?.taskname}</h3>
                    <h3><span>todo: </span>{todo?.task}</h3>
                    {/* {console.log("todo task", todo?.task)} */}
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setEditTask((prev) => !prev);
                        setClickedTodoID(todo?._id);
                      }}
                    >
                      edit
                    </button>

                    <button
                      onClick={(e) => {
                        updateTaskStatus(
                          e,
                          (todoId = todo._id),
                          (completed = todo?.iscompleted)
                        );
                      }}
                    >
                      completed
                    </button>

                    <button onClick={() => deleteTask(todo?._id)}>
                      delete
                    </button>
                  </div>
                  <div className="modal-view ">
                    {editTask && clickedTodoID === todo?._id ? (
                      <form className="customflex absolute">
                        <p
                          className="exit-button"
                          onClick={() => {
                            setEditTask(false);
                          }}
                        >
                          X
                        </p>
                        <label htmlFor="task"> Task</label>
                        <input
                          type="text"
                          id="task"
                          name="task"
                          value={newtask}
                          onChange={(e) => {
                            setNewTask(e.target.value);
                          }}
                        />
                        <label htmlFor="todo"> Todo</label>
                        <textarea
                          name="todo"
                          id="todo"
                          value={newtaskname}
                          cols="30"
                          rows="5"
                          onChange={(e) => {
                            setNewTaskName(e.target.value);
                          }}
                        ></textarea>
                        {/* <h2>{todo._id}</h2> */}
                        <button onClick={updateTask}>Submit</button>
                      </form>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      <div className="footer"> &copy; Created by AyoDesign 2023</div>
    </div>
  );
};

export default NewHomePage;
