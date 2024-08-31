import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { logoutSubmit } from "../action/action";
import {useDispatch, useSelector} from "react-redux"

function Nav () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated)

    const handleLogout = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/logout", {}, {
                withCredentials : true
            });
            console.log(response)
            dispatch(logoutSubmit());
            navigate("/");
        }catch(err){
            console.log("Logout Error!!!", err);
            alert("Logout Error!!!. Please try again.");
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
                    {!isAuthenticated && (
                        <li>
                        <Link to="/login">Login</Link>
                        </li>
                )}
                    {!isAuthenticated && (
                        <li>
                        <Link to="/register">Register</Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li>
                        <button onClick={handleLogout} className="nav-link-button">Logout</button>
                        </li>
                )}
                </ul>
            </nav>
    )
}

export default Nav;