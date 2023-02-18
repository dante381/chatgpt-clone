const express= require("express");
require('./database/db');
const User = require('./database/user_db');
const cors=require("cors");


const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/login",(req,res)=>{
    res.send("hello");
});




app.post("/login", (req,res)=>{
    const { username, password} = req.body
    User.findOne({ username: username}, (err, user) => {
        if(user){
            if(password === user.password )
                res.send({message: "Login Successfull", user: user})
            else 
                res.send({ message: "Wrong password !!!"})
        }
        else{
            res.send({message: "No User found"});
            
        }
    })
});

app.post("/signup", (req,res)=>{
    const { name, username, password, phno} = req.body;
    console.log(req.body);
    
    User.findOne({username: username}, (err, user) => {
        if(user){  
            res.send({message: "Username already exists !!!"});
        }  
        else {
            const user = new User({
                name : name,
                username : username,
                password : password,
                phno : phno
            });
            
            user.save(err => {
                if(err) res.send(err);
                else res.send( { message: "Sign Up Successfull" });
            });
        }
    });
});

app.post("/sentMail", (req,res) =>{
    const {otp , email} =req.body;
    console.log(otp,email);
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'respiratoryanalysis@gmail.com',
        pass: 'xmuaoiqraaillncy'
        }
    });

    const mailOptions = {
        from: 'respiratoryanalysis@gmail.com',
        to: email,
        subject: 'verification mail',
        text: 'Your OTP for Respiratory analysis Website is '+otp
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
          res.send("failed")
        } else {
          console.log("email Sent...");
          res.send("ok");
        }
    });
})


const PORT = 3001;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));