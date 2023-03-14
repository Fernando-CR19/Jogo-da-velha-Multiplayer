import { useState } from "react"

export const Login = () => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const login = () => {}

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