//import mongoose

const mongoose = require('mongoose')

// connection string of mongoDB
const connectionString = process.env.DATABASE

//connect to mongoDB to mongoose
mongoose.connect(connectionString).then(()=>{
    console.log(`mongoDB connected successfully`);
}).catch((err)=>{
    console.log(`mongoDB connection failed due to :${err}`);
})