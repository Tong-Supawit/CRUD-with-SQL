import {BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from "./component/nav";
import Homepage from "./component/homepage";
import Dashboard from "./component/dashboard";
import Login from "./component/login";
import Register from "./component/Register";
import "./App.css"

function App() {
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
