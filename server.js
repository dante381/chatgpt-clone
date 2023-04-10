const express= require("express");
require('./database/db');
const User = require('./database/user_db');
const { Configuration, OpenAIApi } = require("openai");
const cors=require("cors");
const bodyparser=require("body-parser");


const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const configuration = new Configuration({
    organization: "org-pZxkB1Szkcw2j12vlW6d2sQr",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.get("/login",(req,res)=>{
    res.send("hello");
});


app.post('/', async (req,res)=>{
    const {message, currentModel}=req.body;
    console.log(currentModel);
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });

    // console.log(response.data.choices[0].text);
    res.json({
        message:response.data.choices[0].text
        // data:message
    });
});

app.get('/models', async (req,res)=>{
    const response = await openai.listModels();
    // console.log(response.data);
    res.json({
        models:response.data,
    });
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