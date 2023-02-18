import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import OtpVerify from "./otp_verify"
import EmailVerify from "./email_verify"
import Grid from "@material-ui/core/Grid";
import Divider from '@mui/material/Divider';

const Register = () => {

    const navigate = useNavigate();
    const [num, setNum] = useState();
    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        phno: ""
    })

    const [verify, setVerify] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const signup = () => {
        console.log(num);
        setUser({
            ...user,
            phno: num
        })
        if (verify === false) {
            alert("Please Verify Phone Number.")
            return;
        };
        const { name, username, password } = user
        if (name && username && password) {
            console.log("check", user);
            axios.post("http://localhost:3001/signup", user)
                .then(res => {
                    alert(res.data.message)
                    navigate("/login")
                })
                .catch(err => console.log("req error", err));
        } else {
            alert("invlid input")
        }

    }

    return (
        <div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh">
                <div className="signup">
                    {console.log("User", user)}
                    <h1>Sign Up</h1>
                    {/* <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>  */}
                    <TextField
                        variant="outlined"
                        color="primary"
                        type="text"
                        label="Name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    /> <br /><br />
                    {/* <input type="text" name="username" value={user.username} placeholder="Your username" onChange={ handleChange }></input> <br/><br/> */}
                    <TextField
                        variant="outlined"
                        color="primary"
                        type="text"
                        label="Username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                    /> <br /><br />
                    {/* <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input> <br/><br/> */}
                    <TextField
                        variant="outlined"
                        color="primary"
                        type="password"
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    /> <br/><br/>
                    <Button variant="contained" color="primary" onClick={signup} >
                        Sign Up
                    </Button>
                    &ensp;
                    <Button variant="contained" color="primary" onClick={() => navigate("/login")} >
                        Login
                    </Button>
                    <br/><br/>
                </div>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                >
                <div>
                    <Grid container>
                        <Grid item xs>
                            <OtpVerify setVerify={setVerify} setNum={setNum} />
                        </Grid>
                        <Divider orientation="vertical" flexItem>
                            or
                        </Divider>
                        <Grid item xs>
                            <EmailVerify setVerify={setVerify} setNum={setNum} />
                        </Grid>
                    </Grid>

                    <br /><br />
                    

                </div>
            </Box>
        </div>
    )
}

export default Register