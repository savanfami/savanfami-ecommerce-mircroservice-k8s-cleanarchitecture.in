import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import proxy from 'express-http-proxy';
import morgan from 'morgan'
const app=express()
const port=4000

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(morgan('tiny'))
app.use('/auth',proxy('http://localhost:3001'))

app.listen(port,()=>{
    console.log(`gateway listening to port ${port}`)
})