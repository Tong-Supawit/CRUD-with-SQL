import { useState } from "react";
import axios from "axios";

function Login () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const loginSubmit = async (e) => {
      e.preventDefault();
      try{
        const respone = await axios.post("http://localhost:3000/login", {
          username,
          password
        }, {
            withCredentials : true
        })
        console.log(respone.data);
      }catch(err){
        console.log("Login Failed!!!", err);
      }
    }  

    return (
        <div className="registerLoginForm">
            <form action="" onSubmit={loginSubmit}>
                <div>
                <h1>Username : </h1>
                <br />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br /><br />
                <h1>Password : </h1>
                <br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br /><br /><br />
                <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;