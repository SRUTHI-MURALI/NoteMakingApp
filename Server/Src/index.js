import express from 'express'
import cors from 'cors'
import connectDB from '../Connection/connection.js'
import userRouter from '../Routes/userRouter.js'
const app= express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB()

app.use('/user', userRouter);


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(3001)