import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const CONNECTION_URL = "mongodb+srv://alshafi834:158893SDnm_)@cluster0.asrk4.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority"

import postRoutes from './routes/posts.js'

const app = express()

app.use('/posts', postRoutes)

app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))

app.use(cors())

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)) )
.catch((error) => console.log(error.message)); 