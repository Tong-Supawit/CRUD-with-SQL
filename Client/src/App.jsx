import { useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from "./component/nav";
import Homepage from "./component/homepage";
import Dashboard from "./component/dashboard";
import Login from "./component/login";
import Register from "./component/register";
import axios from "axios";
import {useDispatch} from "react-redux";
import "./App.css"
import { loginSubmit } from "./action/action";

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
      dispatch(loginSubmit(user));
    }catch(err){
      console.log(err);
    }
  }
    checkAuthentication();
  }, []);

  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
