import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

export const SignUp = ({ setIsAuth }) => {

    const cookies = new Cookies();

    const [user, setUser] = useState(null);

    const signUp = () => {
        Axios.post("http://localhost:5000/signup", user).then(async (res) => {
            const { token, userId, firstName, lastName, username, hashedPassword } = res.data;

            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("username", username);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("hashedPassword", hashedPassword);
            await setIsAuth(true);
        });
    };

    return (
        <div className="signUp">
            <label> Sign Up </label>
            <input placeholder="First Name" onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
            }} />
            <input placeholder="Last Name" onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });
            }} />
            <input placeholder="Username" onChange={(e) => {
                setUser({ ...user, username: e.target.value });
            }} />
            <input placeholder="Password" type="password" onChange={(e) => {
                setUser({ ...user, password: e.target.value });
            }} />
            <button onClick={signUp}>Sign Up</button>
        </div>
    );
}
