import { useState } from "react";
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginSubmit } from "../action/action";

function Login () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    let hasError = false;
    setErrorUsername("");
    setErrorPassword("");
    setErrorResponse("");
    try{
        if (username.trim() === "") {
          setErrorUsername("Username is required.");
          hasError = true;
        }
        if (password.trim() === "") {
          setErrorPassword("Password is required.");
          hasError = true;
        }
        if (hasError) 
          return;
        const response = await axios.post("http://localhost:3000/login", {
          username,
          password
        }, {
            withCredentials : true
        })
        dispatch(loginSubmit(response.data));
        console.log(response.data);
        navigate("/");
      }catch(err){
        setErrorResponse(`${err.response.data.message}`)
        console.log("Error is : " + errorResponse)
      }
    }  
  return (
      <div className="registerLoginForm">
          <form action="" onSubmit={handleLogin}>
              <div>
              <h1>Username : </h1>
              <br />
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              {errorUsername && <p style={{color : "red"}}>{errorUsername}</p>}
              <br />
              {!errorUsername && <br />}
              <h1>Password : </h1>
              <br />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errorPassword && <p style={{color : "red"}}>{errorPassword}</p>}
              <br />
              <br />
              {!errorPassword && <br />}
              <button type='submit'>Login</button>
              <br />
              <br />
              {errorResponse && <p style={{color : "red"}}>{errorResponse}</p>}
              </div>
          </form>
      </div>
  );
}

export default Login;