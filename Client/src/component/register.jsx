import { useState } from "react";
import axios from "axios";

function Register () {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const registerSubmit = async (e) => {
      e.preventDefault();
      try{
        const respone = await axios.post("http://localhost:3000/register", {
          username,
          email,
          password
        })
        console.log(respone.data);
      }catch(err){
        console.log("Register Failed!!!", err);
      }
    }  
    return (
        <div className="registerLoginForm">
            <form action="" onSubmit={registerSubmit}>
                <div>
                <h1>Username : </h1>
                <br />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br /><br />
                <h1>Email : </h1>
                <br />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br /><br />
                <h1>Password : </h1>
                <br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br /><br /><br />
                <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;