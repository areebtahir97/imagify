import express from 'express'
import {registerUser,loginUser, userCredits, paymentRazorpay, verifyRazorpay} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

//create route
const userRouter=express.Router()

userRouter.post('/register',registerUser)//it will execute the func for the given end point (here register)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth, userCredits) //here we add the middleware userAuth as well
userRouter.post('/pay-razor',userAuth, paymentRazorpay)
userRouter.post('/verify-razor',userAuth, verifyRazorpay)


export default userRouter

//localhost:4000/api/user/register-->registerUser
//localhost:4000/api/user/login-->loginUser

