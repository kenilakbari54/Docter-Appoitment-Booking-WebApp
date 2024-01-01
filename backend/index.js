import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import authRoute from './Routes/authRoutes.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import reviewRoute from './Routes/review.js'
dotenv.config();

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
    origin: true
}

app.get('/', (req, res) => {
    res.send(`API is working${port}`)
})


mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected")
    } catch (err) {
        console.log("not connected")
        console.log(err)
    }
}


//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/doctor', doctorRoute)
app.use('/api/v1/reviews', reviewRoute)



app.listen(port, () => {
    connectDB()
    console.log(`server is running on ${port}`)
})