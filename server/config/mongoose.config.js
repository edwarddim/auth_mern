const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/user_auth",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=> console.log("CONNECTED TO USER AUTH DB"))
.catch(err => console.log("ERROR: ", err))