const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/userRoute')
require('dotenv').config()
const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to mongodb')
})
.catch((error) => {
    console.log(`Mongodb error ${error}`)
})

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})