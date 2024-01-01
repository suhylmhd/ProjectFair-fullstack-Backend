//path to resolve the client request.

//1) import express
const express = require('express')

//import controller
const userController = require('../Controllers/userController')

//import projectController
const projectController = require('../Controllers/projectController')

//import jwtMiddleware
const jwtMiddleware = require('../Midlleware/jwtMiddleware')

//import multer
const multerConfig = require('../Midlleware/multerMiddleware')

//2) create an object for  the class Router in express 
const router =  new express.Router()

//3) path for resolving  the request
    // syntax - router.httprequest('path to resolve request',()=>{how to resolve the request->(inside the controller)})
    //a) Register   
    router.post('/user/register',userController.register)

    //b) login
    router.post('/user/login',userController.login)

    //c add project 
    router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

    // get home project
    router.get('/projects/home-project',projectController.getHomeProject)

    // get all project
    router.get('/projects/all-project',jwtMiddleware,projectController.getAllProject)

    // get user project
    router.get('/user/all-project',jwtMiddleware,projectController.getUserProject)

    //edit project
    router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)

    //delete Project
    router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteUserProject)

    //edit profile
    router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.editUser)

//4) export router
module.exports = router
