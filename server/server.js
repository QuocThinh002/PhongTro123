require('dotenv').config()
import express from 'express'
import cors from 'cors'
import initRoutes from './src/routes'
import connectDatabase from './src/config/connectDatabse'

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

initRoutes(app)
connectDatabase()

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server on running on the port ${port}`)
})