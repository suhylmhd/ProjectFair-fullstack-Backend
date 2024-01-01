//1) import dotenv
//Loads .env file contents into process.env by default
require ('dotenv').config()

// 2) import express - to create server
const  express = require('express') 

// 3) import cors 
const cors = require('cors')

//import router 
const router = require('./Routes/router')

//import connection.js file
require('./DB/connections')

//4) create server  - Creates an Express application. The express() function is a top-level function exported by the express module.
const pfServer = express()

//5) use of cors by server
pfServer.use(cors())

//6) Returns middleware that only parses json and only convert it into javascript object
pfServer.use(express.json())

//server use router
pfServer.use(router)

//pfserver should  use uploads folder
pfServer.use('/uploads',express.static('./uploads')) // argument -1 - how the other application should use this file, argument-2 - to export the upload folder

//7) custome the port why because  by default server runs at -3000
const PORT = 4000 || process.env.PORT

//8) run server
pfServer.listen(PORT,()=>{
    console.log(`server running succesfully at port number ${PORT}`);
})

//9) get http request to baseURL - (here baseURL is http://localhost:4000/)
pfServer.get('/',(req,res)=>{
    res.send(`<h1>project file server runningsuccessfully and waiting for client request</h1>`)
})
/* 
//post request
pfServer.post('/',(req,res)=>{
    res.send('post request')
})


//put request
pfServer.put('/',(req,res)=>{
    res.send('put request')
})
 */


