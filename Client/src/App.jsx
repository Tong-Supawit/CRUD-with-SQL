import { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";


import Nav from "./component/nav";
import Homepage from "./component/homepage";
import UserDashboard from "./component/UserDashboard";
import AdminDashboard from "./component/adminDashboard";
import Login from "./component/login";
import Register from "./component/register";
import { userLoaded,  } from "./action/action";
import "./App.css"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
      try{
        const response = await axios.get("http://localhost:3000/checkAuthenticated", {
          withCredentials : true
        });
        const user = response.data.user
        console.log(response.data.user);
        dispatch(userLoaded(user));
      }catch(err){
        console.log(err);
        dispatch({type : "AUTHENTICATION_ERROR"});
      }
    }
    
      checkAuthentication();
    }, [dispatch]);

  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/userDashboard" element={<UserDashboard/>}/>
        <Route path="/adminDashboard" element={<AdminDashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
