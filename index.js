import express, { urlencoded, static as static_ } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { __dirname } from './pathHelper.js'
import { corsMiddleware } from './middlewares/cors.js'
import { urlRoutes } from './routes/urlRoutes.js'
import { connectToMongoDB } from './connect.js'
dotenv.config()

const app = express()
const PORT = 5000

app.set('view engine', 'ejs')
app.use(urlencoded({ extended: true }))
app.use(corsMiddleware())
app.use(static_(path.join(__dirname, 'public')));

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log("MongoDB connected!"))

app.use('/', urlRoutes)
app.use('*', urlRoutes)


app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})