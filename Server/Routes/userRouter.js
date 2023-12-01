import express from 'express'
const userRouter= express.Router()

import { userRegisterSendOtp,userRegisterVerifyOtp,userLogin } from '../Controller/loginController.js'
import {userAddNotes,userGetNotes} from '../Controller/noteMakingController.js'


/**************************** User Register  *************************************/
userRouter.post("/register", userRegisterSendOtp);
userRouter.post("/verifyOtp", userRegisterVerifyOtp);

/**************************** User Login  *************************************/
userRouter.post("/login", userLogin);

/**************************** User Note Management  *************************************/
userRouter.post("/addNotes", userAddNotes);
userRouter.get("/getNotes/:id",userGetNotes)



export default userRouter