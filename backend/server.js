import exp from 'express'
import { userapp } from './APIs/userAPI.js'
import { connect } from 'mongoose'
import {config} from 'dotenv'
import cors from 'cors'

config()

const app= exp()

app.use(cors(
  {
    origin:['http://localhost:5173']
  }
))

app.use(exp.json()) 

async function connectdb() {
    try{
        await connect('mongodb://localhost:27017/usermgmt')
        console.log("connected to db")
        app.listen(3000, ()=>console.log("listening on port 3000......."))
    }
    catch(err){
        console.log("error occured while connecting to database",err)
    }
    
}
connectdb()

//body parsing middleware
app.use('/user-api',userapp)
app.use((err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});