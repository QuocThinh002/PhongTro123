require('dotenv').config()
import express from 'express'
import cors from 'cors'
import helmet from "helmet";
import initRoutes from './src/routes'
import connectDatabase from './src/config/connectDatabse'
import compression from 'compression';

const app = express()

// init middleware
app.use(cors({
    origin: process.env.CLIENT_URL
}))
app.use(helmet())
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// init router
initRoutes(app)

// init database 
connectDatabase()

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server on running on the port ${port}`)
})