import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import useRefresh from "./hooks/useRefresh";

const PersistLogin = () => {
  const { auth, persist, setPersist, setIsLoggedIn } = useAuth();
  const refresh = useRefresh();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        setIsLoggedIn(true)
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accesstoken && persist ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   console.log(`isloading : ${isLoading}`);
  //   console.log(`auth : ${JSON.stringify(auth?.accesstoken)}`);
  // }, [isLoading]);

  return (
    <>
      {
        // !persist
        //     && setIsLoggedIn(true)
        // !persist
        //    ? ()=>{setIsLoggedIn(false)}
        //    :()=>{setIsLoggedIn(true)}
        // isLoading
        //   ? () => {
        //       setIsLoggedIn(false);
        //     }
        //   : () => {
        //       setIsLoggedIn(true);
        //     }
      }
    </>
  );
};

export default PersistLogin;
