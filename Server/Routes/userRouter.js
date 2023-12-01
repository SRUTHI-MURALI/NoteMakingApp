import express from 'express'
const userRouter= express.Router()

import { userRegisterSendOtp,userRegisterVerifyOtp,userLogin } from '../Controller/loginController.js'
import {handleSearch, userAddNotes,userGetNotes} from '../Controller/noteMakingController.js'


/**************************** User Register  *************************************/
userRouter.post("/register", userRegisterSendOtp);
userRouter.post("/verifyOtp", userRegisterVerifyOtp);

/**************************** User Login  *************************************/
userRouter.post("/login", userLogin);

/**************************** User Note Management  *************************************/
userRouter.post("/addNotes", userAddNotes);
userRouter.get("/getNotes/:id",userGetNotes)

/**************************** User Search   *************************************/
userRouter.post("/search", handleSearch);



export default userRouter