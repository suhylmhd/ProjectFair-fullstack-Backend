//import jwt
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('inside the middleware');

    //logic
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);
    try{
        // first argument shounld be the token and secons argument should be the secrete key
        const jwtResponse = jwt.verify(token,"supersecretkey12345")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
    } 
    catch(err) {
        res.status(401).json("Authorization Failed .... Please Login")
    }
    
}

module.exports = jwtMiddleware