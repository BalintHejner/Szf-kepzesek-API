const path = require('path')
const express = require('express')
require('dotenv').config() // A .env fájlt olvassa
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middlewares/error')

const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log(`Database Connected ${database.host}`)
})

const trainings = require('./routes/trainings')
const courses = require('./routes/courses')

const app = express()

app.use(express.json())

app.use(morgan('dev'))

app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/trainings', trainings)
app.use('/api/courses', courses)

app.use(errorHandler)
app.get('/', (req, res) => {
    res.status(400).json({ success: false })
})

app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}`))
