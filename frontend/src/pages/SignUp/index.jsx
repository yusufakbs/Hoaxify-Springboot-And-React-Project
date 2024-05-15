import {useState} from "react";
import axios from "axios";

export function SignUp() {

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();

    const onSubmit = () => {
        event.preventDefault()
        axios.post('/api/v1/users', {username, email, password})
    }
    return (<form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="username"
                   onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email"
                   onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="password"
                   onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <div>
            <label htmlFor="passwordRepeat">Repeat Password</label>
            <input type="password" name="passwordRepeat" id="passwordRepeat" placeholder="Repeat Password"
                   onChange={(event) => setPasswordRepeat(event.target.value)}/>
        </div>
        <button disabled={!password || password != passwordRepeat}>Sign Up</button>
    </form>)
}