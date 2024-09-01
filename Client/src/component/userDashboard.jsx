import { useSelector } from "react-redux";

function UserDashboard () {
    const username = useSelector(state => state.authentication.username);
    const role = useSelector(state => state.authentication.role);

    return (
        <div>
            <h1>Username : {username}</h1>
            <h2>Role : {role}</h2>
        </div>
    );
}

export default UserDashboard;