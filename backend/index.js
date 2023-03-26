// 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

const { Configuration, OpenAIApi } = require("openai");
const express=require("express");
const cors=require("cors");
const bodyparser=require("body-parser");
// const morgan=require('morgan');

const configuration = new Configuration({
    organization: "org-MBPAfz3WqQ0DUYdOMOlwlU46",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app=express();
app.use(cors());
app.use(bodyparser.json());
// app.use(morgan("combined"));

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

app.listen(4000,()=>{
    console.log("Listening port 4000")
})