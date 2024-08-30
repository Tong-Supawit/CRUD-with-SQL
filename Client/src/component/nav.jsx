import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function Nav () {
    const navigate = useNavigate();

    const logoutSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/logout", {}, {
                withCredentials : true
            });
            console.log(response)
            navigate("/");
        }catch(err){
            console.log("Logout Error!!!", err);
        }
    }

    return(
            <nav className='nav'>
                <ul>
                    <li>
                        <Link to="/">Home page</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <button onClick={logoutSubmit} className="nav-link-button">Logout</button>
                    </li>
                </ul>
            </nav>
    )
}

export default Nav;