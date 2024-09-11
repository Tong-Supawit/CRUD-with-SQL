import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "../App.css"

function AdminDashboard () {
    const dispatch = useDispatch();

    const username = useSelector(state => state.authentication.username);
    const role = useSelector(state => state.authentication.role);
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const respone = await axios.get("http://localhost:3000/getDataUser", {
                    withCredentials : true
                })
                console.log(respone.data.dataUser)
                setDataUser(respone.data.dataUser);
            }catch(err){
                console.log("Data not found!!!", err);
            }
        }
        fetchData();
    },[])

    const handleDelete = async (id, username, role) => {
        if(confirm(`Confirm to delete user : ${username}?`)){
            if(role === "admin"){
                alert("Admin could not be deleted!!!")
                return;
            }
            try{
                const respone = await axios.delete(`http://localhost:3000/deleteUser/${id}`)
                console.log(respone.data);
                const updateDataUser = dataUser.filter(user => user.id !== id);
                setDataUser(updateDataUser);
            }catch(err){
                console.log("Could not delete user!!!!", err);
            }
    }else{
        console.log("Cancle to delete user")
    }
    }

    return (
        <div>
            <h1>Username : {username}</h1>
            <h2>Role : {role}</h2>
            <br />
            <h1>All user data</h1>
                <table>
                {dataUser.map(user => (
                    <tr key={user.id}>
                        <td>id : {user.id}</td>
                        <td>role : {user.role}</td>
                        <td>username : {user.username}</td>
                        <td>email : {user.email}</td>
                        <td><button onClick={() => handleDelete(user.id, user.username, user.role)}>Delete</button></td>
                    </tr>
                ))}
                </table>
        </div>
    );
}

export default AdminDashboard;