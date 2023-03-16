import { useState } from "react"
import Axios from "axios";
import Cookies from "universal-cookie";

export const Login = (setIsAuth) => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const cookies = new Cookies();

    const login = () => {
        Axios.post("http://localhost:5000/login", { username, password, }).then((res) => {
            const { firstName, lastName, username, token, userId } = res.data;
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("username", username);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            setIsAuth(true);
        });
    };

    return (
        <div>
            <label>Login</label>
            <input placeholder="Username" onChange={(e) => {
                setUsername(e.target.value)
            }} />
            <input placeholder="Password" type="password" onChange={(e) => {
                setPassword(e.target.value)
            }} />
            <button onClick={login}>Login</button>
        </div>
    )
}