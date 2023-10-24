const express = require('express')
const app = express()
const cors = require('cors')
const initRoute = require('./src/routes/routes.js')
const connect = require('./src/config/db/index.js')
require('dotenv').config()



const port = process.env.PORT || 8081


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
connect()
initRoute(app)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
