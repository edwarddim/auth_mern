const express = require('express')
const cookieParser = require("cookie-parser")
const cors = require('cors')

const app = express()

require('./server/config/mongoose.config')

app.use(cookieParser())
app.use(cors({credentials:true, origin:"http://localhost:3000"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

require("./server/routes/user.routes")(app)

app.listen(8000 , ()=>{
    console.log("EXPRESS SERVER ON 8000")
})