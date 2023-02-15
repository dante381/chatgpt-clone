import React from "react"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Homepage = (props) => {

    return (
        <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        >
        <div className="homepage">
            <h1>Welcome {props.details.user.name} !!!</h1> 
            <Button variant="contained" color="secondary" onClick={() => props.details.setLoginUser({})} >
                Logout
            </Button><br/><br/>
        </div>
        </Box>
    )
}

export default Homepage