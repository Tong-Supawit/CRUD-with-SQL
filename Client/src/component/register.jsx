import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register () {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const registerSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;
        setErrorUsername("");
        setErrorEmail("");
        setErrorPassword("");
        try{
            if (username.trim() === "") {
                setErrorUsername("Username is required.");
                hasError = true;
            }
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
                setErrorEmail("Please valid email.");
                hasError = true;
            }
            if (password.trim() === "") {
                setErrorPassword("Password is required.");
                hasError = true;
            }
            if (hasError) 
                throw new Error("Register validation failed!!!");
            const respone = await axios.post("http://localhost:3000/register", {
              username,
              email, 
              password
        })
        console.log(respone.data);
        navigate("/dashboard")
        alert("Register Success...")
        }catch(err){
            console.log(err);
        }  
    }
    return (
        <div className="registerLoginForm">
            <form action="" onSubmit={registerSubmit}>
                <div>
                <h1>Username : </h1>
                <br />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                {errorUsername && <p style={{color : "red"}}>{errorUsername}</p>}
                <br />
                <h1>Email : </h1>
                <br />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errorEmail && <p style={{color : "red"}}>{errorEmail}</p>}
                <br />
                <h1>Password : </h1>
                <br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errorPassword && <p style={{color : "red"}}>{errorPassword}</p>}
                <br /><br />
                <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;