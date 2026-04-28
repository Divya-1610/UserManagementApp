import exp from 'express'
import { userapp } from './APIs/userAPI.js'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import cors from 'cors'
import path from 'path' // Required
import { fileURLToPath } from 'url' // Required

config()

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = exp()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));



app.use(exp.json()) 
app.use('/user-api', userapp); 



async function connectdb() {
    try {
        await connect(process.env.DB_URL)
        console.log("connected to db")
        
        // Use process.env.PORT for deployment, fallback to 3000 locally
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => console.log(`listening on port ${PORT}.......`))
    }
    catch(err) {
        console.log("error occured while connecting to database", err)
    }
}
connectdb()

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") return res.status(400).json({ message: "Validation failed", errors: err.errors });
  if (err.name === "CastError") return res.status(400).json({ message: "Invalid ID format" });
  if (err.code === 11000) return res.status(409).json({ message: "Duplicate field value" });
  
  res.status(500).json({ message: "Internal Server Error" });
});
