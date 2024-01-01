
//import projectSchema
const projects = require('../Models/projectSchema')

//add project

exports.addProject = async(req,res)=>{
    console.log('inside addProject request');
    const userId = req.payload  
    console.log(userId);

    const projectImage = req.file.filename
   
    const {title, language , github , website , overview}= req.body
    console.log(`${title}, ${language} , ${github} , ${website} , ${overview}, ${projectImage}`);

  try{
        const existingproject = await projects.findOne({github})
        if(existingproject){
            res.status(406).json('Project Already Exists .... Add New Project')
        }
        else{
            const newProject = new projects({
                title,language,github,website,overview,projectImage,userId
             })
            await newProject.save()
            res.status(200).json(newProject)
        }

    }
    catch(err){
        res.status(401).json(`request failed due to ${err}`)
    }

    
}



//getHomeProject
exports.getHomeProject = async(req,res)=>{

    try{
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    }
    catch (err){
        res.status(401).json(`Request failed due to $(err)`)
    }

}

//getALlProject

exports.getAllProject = async(req,res)=>{

    const searchKey = req.query.search
    console.log(searchKey);

    const query={
        language:{
            // regular expression, $option - to remove case sensitive  property
            $regex:searchKey, $options:'i' 
        }
    }

    try{
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    }
    catch(err){
        res.status(401).json(`Request failed due to $(err)`)
    }
}


//getUserProject

exports.getUserProject = async(req,res)=>{

    userId = req.payload
    try{
        const allUserProject = await projects.find({userId})
        res.status(200).json(allUserProject)
    }
    catch(err){
        res.status(401).json(`Request failed due to $(err)`)
    }
}

//editProject

exports.editUserProject = async(req,res)=>{
    const {id} = req.params
    const usedId = req.payload
    const {title,language,github,website,overview,projectImage}=req.body
    const uploadProjectImage = req.file?req.file.filename:projectImage

    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectImage:uploadProjectImage,userId},{new:true})

        await updateProject.save()
        res.status(200).json(updateProject)

    } catch (err) {
        res.status(401).json(err)
    }
}

//deleteProject
exports.deleteUserProject =async(req,res)=>{
    const {id} = req.params

    try {
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    } catch (err) {
        res.status(401).json(err)
    }
}