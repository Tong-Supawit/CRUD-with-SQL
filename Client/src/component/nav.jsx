import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { logoutSubmit } from "../action/action";
import {useDispatch, useSelector} from "react-redux"

function Nav () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated)
    const role = useSelector(state => state.authentication.role)

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
                    {(role === "user" || role === "admin")&& (
                        <li>
                            <Link to="/userDashboard">User dashboard</Link>
                        </li>
                    )}
                    {role === "admin" && (
                        <li>
                            <Link to="/adminDashboard">Admin dashboard</Link>
                        </li>
                    )}
                    {!isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>      
                            </li>
                        </>
                    ) : (
                        <li>
                            <button onClick={handleLogout} className="nav-link-button">Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
    )
}

export default Nav;