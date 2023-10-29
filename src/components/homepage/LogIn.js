import React from "react";
import { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";
import useAuth from "../hooks/useAuth";
// import { axiosPrivate } from './components/api/Api';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// const Base_Url = "http://localhost:5500/login";
const Base_Url = "https://todolistapi.cyclic.app/login"

const LogIn = () => {
  const [logIn, setLogIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setUserId] = useState("");
  const [loginForm, setLoginForm] = useState(false);

  const { setAuth, auth, setPersist, persist, setIsLoggedIn,isLoggedIn  } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const handleLoginForm = () => {
   if (!isLoggedIn){

     setLoginForm((prev) => !prev);
   }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        Base_Url,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (data) {
        setAuth(data);
        setUserId(data.userid);
        setIsLoggedIn(true);
        setLogIn(true);
        setLoginForm(false);

        console.log("data from login response", data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div>
      <section className="navbar customflex">
        <div className="log-button1">
          <button data-testid="btn-login" onClick={handleLoginForm}>
            LogIN
          </button>
        </div>
      </section>
      <section className="login-form-container">
        {loginForm && (
          <form data-testid="loginform" className="login-form customflex">
            <input
              type="email"
              name="email"
              placeholder="your email"
              onChange={handleEmail}
              data-testid="emailinput"
              value={email}
            />
            <input
              type="password"
              name="password"
              placeholder=" your password"
              data-testid="passinput"
              onChange={handlePassword}
              value={password}
            />
            <button onClick={handleLogin}>Submit</button>

            <div>
              {" "}
              <input
                type="checkbox"
                id="persist"
                onChange={togglePersist}
                checked={persist}
              />
              <label htmlFor="persist">Trust this device?</label>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default LogIn;
