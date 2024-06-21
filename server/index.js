const express = require('express')
require('dotenv').config()
const router = require('./src/router/router');
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}))

app.use(router)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})
