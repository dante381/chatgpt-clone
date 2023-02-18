import React, { useState } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"

  
const email_verify = (props) =>{

    const [sent , setSent] = useState();
    const [success , setSuccess] = useState();
    const [otp , setOtp] = useState();
    const [email , setEmail] = useState();
    const [x, setX] = useState();

    function generateOTP() {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }
    
    var handleChange = (e) =>{
        const {name, value } = e.target
        if(name==="otp")
            setOtp(value)
        else
            setEmail(value)
    }

    var onSignInSubmit = (e) =>{
        e.preventDefault()
        var tempotp=generateOTP()
        console.log(tempotp)
        setX(tempotp);

        
        const payload={
            otp:tempotp,
            email:email
        }
        axios.post("http://localhost:3001/sentMail", payload)
        .then( res => {
            console.log(res.data)
            if(res.data === "ok"){
                console.log("mail sent......")
                setSent(true);
            }
            else{
                alert("Failed to sent email");
            }
        })
    }

    var onSubmitOTP = (e) =>{
        e.preventDefault()
        if (otp === x){
            console.log("user verified");
            props.setVerify(true);
            setSuccess(true);
            alert("User Verified");
        }
        else{
            alert("wrong OTP");
        }
    }

    return (
        <div>
          <h4>Enter email address :</h4>

          <form onSubmit={onSignInSubmit}>
            <div id="sign-in-button"></div>
            {/* <input type="number" name="mobile" placeholder="Mobile number" required onChange={handleChange}/> */}
            <TextField
                  variant="outlined"
                  color="primary"
                  type="email"
                  label="Email address"
                  name="email"
                  onChange={handleChange}
              /> <br/><br/>
              <Button variant="contained" color="secondary" type="submit" >
                  Send OTP
              </Button>
            {/* <button type="submit">Submit</button> */}
          </form>
  
          {sent && <h5>OTP sent successfully.</h5>}
  
          {sent &&
          <div>
          <h4>Enter OTP :</h4>
          <form onSubmit={onSubmitOTP}>
            {/* <input type="number" name="otp" placeholder="OTP Number" required onChange={handleChange}/> */}
            <TextField
                  variant="outlined"
                  color="primary"
                  type="number"
                  label="OTP number"
                  name="otp"
                  onChange={handleChange}
              /> <br/><br/>
              <Button variant="contained" color="secondary" type="submit" >
                  Verify
              </Button>
            {/* <button type="submit">Submit</button> */}
          </form>
          {success && <h5>User Verified !!!</h5>}
          </div>}
        </div>
      )
}

export default email_verify