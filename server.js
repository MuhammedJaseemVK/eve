const express= require("express");
const dotenv=require("dotenv");
const colors=require("colors");
const morgan=require("morgan");
const app=express();

dotenv.config();

const PORT= process.env.PORT

app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.listen(PORT,()=>{
    console.log(`Sever running on port ${PORT}`.bgCyan.white);
})
