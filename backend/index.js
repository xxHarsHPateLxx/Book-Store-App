import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';


const app = express()

// middleware for parsing request body
app.use(express.json())

// middleware for handling cors policy
app.use(cors())

// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],

//     })
// )

mongoose.connect("mongodb://localhost:27017/").then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
        console.log(`App is listening on port: ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})

app.get('/', (req, res) => {
    console.log(req)
    res.status(200).send('Hello World!')
})

app.use('/books', booksRoute)

