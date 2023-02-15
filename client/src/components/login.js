import React, {useState} from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
const Login = ({ setLoginUser}) => {

    const navigate = useNavigate();

    const [ user, setUser] = useState({
        username:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:3001/login", user)
        // axios.post("http://43.206.117.90:5000/login", user)
        .then(res => {
            alert(res.data.message)
            setLoginUser(res.data.user)
            console.log("send");
            navigate("/")
        })
    }
   

    return (
        <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
        <div className="login">
            <h1>Login</h1>
            {/* <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username"></input><br/><br/> */}
            <TextField
                variant="outlined"
                color="primary"
                type="text"
                label="Username"
                name="username"
                value={user.username}
                onChange={handleChange}
            /><br/><br/>
            <TextField
                variant="outlined"
                color="primary"
                type="password"
                label="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
            /> <br/><br/>
            {/* <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Password" ></input> <br/><br/> */}
            <Button className='normal' variant="contained" color="primary" onClick={login}>
                Login
            </Button>
            &ensp;
            <Button variant="contained" color="primary" onClick={() => navigate("/signup")} >
                Sign Up
            </Button>

        </div>
        </Box>
    )
}

export default Login