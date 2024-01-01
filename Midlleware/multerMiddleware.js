
// 1) import multer
const multer = require('multer')

// 4) create storage and fileFilter
// 4.1) storage - diskStorage used to create storage
const storage = multer.diskStorage({
    // it has 2 keys - 1.destination , 2.filename
    // destination -  where the file stored
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    // filename - tghe name in which the file is stored in the destination
    filename:(req,file,callback)=>{
         //Returns the number of milliseconds - now()
        const filename = `image- ${Date.now()}-${file.originalname}` 
        callback(null,filename)
    }
})

// 4.2) fileFilter 
const fileFilter = (req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype==='image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error ("only png , jpeg , jpg files will be allowed ...!"))
    }
}

// 2) create  multerconfiguration

const multerconfig = multer({
    storage,
    fileFilter
})

// 3) export multer
 module.exports = multerconfig