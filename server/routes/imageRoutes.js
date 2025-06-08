import express from 'express'
import { generateImage } from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'

//we create endpoint for image generator
const imageRouter=express.Router()
imageRouter.post('/generate-img',userAuth, generateImage)   //we use userauth middleware since we need id from body 

export default imageRouter