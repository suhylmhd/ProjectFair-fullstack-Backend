
//import modal
const { response } = require('express');

//import userSchema
const users = require('../Models/userSchema')

//import JWT
const jwt = require('jsonwebtoken')

//logic for register

exports.register = async(req,res)=>{
    //logic
    console.log('inside userController-register logic');
    //destructuring data from  the client request body (since json format is converted  into javascript object by the .json() method used in index.js file)

    const {username , email , password} = req.body

        try{
            //since email is the unique value we are checking that email is already parent in the data base 
        //for that we are using findOne method which return entire document  when the conditon is true else return null

        const existingUser = await users.findOne({email})
        if(existingUser){
            //if findOne return document is means that the user already exists
            //so we are sending a response in the 400 series(client request error)
            res.status(406).json('Account already Exist....please Login')
        }
        else{
            //if findOne returns null , it means the email or the user does not exist in the database 
            //we register the user
                //1) create object for the modal 
                const newUser = new users({
                    username,
                    email,
                    password,
                    github:"",
                    linkedin:"",
                    profile:""
                })  
                // 2) add the object use save() methode in mongoose
                await newUser.save()

            //response
            res.status(200).json(newUser)
        }

    }
    //javascript resolve runtime error using  try-catch block
    catch(err){
        res.status(401).json('register request failed due to',err)
    }
   
}

//logic for Login
 
exports.login = async(req,res)=>{
    console.log('inside login Function');

    const {email,password}= req.body

   try{
    const existingUser = await users.findOne({email,password})

    if(existingUser){
        
        //sign is the function used to create token
        //here 1st argument is payload - the information that is secretely transmitted
        //2nd argument - secret key - based on which the token is generated 
        const token = jwt.sign({userId:existingUser._id},"supersecretkey12345")
        res.status(200).json({
            existingUser,
            token
        })
    }
    else{
        res.status(404).json('Incorrect Email or Password')
    }
   }
   catch(err){
    res.status(401).json('Login request failed due to :',err)
   }
}

//edit profile 
exports.editUser = async(req,res)=>{
    const userId = req.payload
    const {username,email,password,github,linkedin,profile} = req.body

    const profileImage = req.file?req.file.filename:profile

    try {
        const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    } catch (err) {
        res.status(401).json(err)
    }
}  