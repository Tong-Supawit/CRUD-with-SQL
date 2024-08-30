import { useState } from 'react';
import axios from 'axios';

function App() {

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
    <div>
      <h1>Tong</h1>
      <form action="" onSubmit={registerSubmit}>
        Username : <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        Email : <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        Password : <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default App
