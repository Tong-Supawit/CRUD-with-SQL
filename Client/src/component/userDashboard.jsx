import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

function UserDashboard () {
    const username = useSelector(state => state.authentication.username);
    const role = useSelector(state => state.authentication.role);

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [successResponse, setSuccessResponse] = useState(null);
    const [errorResponse, setErrorResponse] = useState("");

    const updateUser = async(e) => {
        try{
            e.preventDefault();
            if(password.trim() === "" || newPassword.trim() === ""){
                return setErrorResponse("All data are required");
            }
            const response = await axios.put("http://localhost:3000/updateUser", {
                password,
                newPassword
            }, {
                withCredentials : true
            });
            setSuccessResponse(true);
            setErrorResponse(response.data.message)
        }catch(err){
            setSuccessResponse(false);
            setErrorResponse(err.response.data.message);
            console.log("Update error", err);
        }
    }

    return (
        <div>
            <h1>Username : {username}</h1>
            <h2>Role : {role}</h2>
            <br />
            <br />
            <form action="" onSubmit={updateUser}>
                <h2>Current password</h2>
                <input type="password" name="" id="" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <br />
                <h2>New password</h2>
                <br />
                <input type="password" name="" id="" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                <br /><br />
                {errorResponse && <p style={{color : successResponse === true? "green": "red"}}>{errorResponse}</p>}
                <button type="submit">Change password</button>
            </form>
        </div>
    );
}

export default UserDashboard;