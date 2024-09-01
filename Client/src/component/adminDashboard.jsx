import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import "../App.css"

function AdminDashboard () {
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

    //check setDataUser
    useEffect(() => {
        console.log("All data : ", dataUser)
    }, [dataUser])

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
                        <td>username : {user.username}</td>
                        <td>email : {user.email}</td>
                    </tr>
                ))}
                </table>
        </div>
    );
}

export default AdminDashboard;