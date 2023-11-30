import express from 'express'
const userRouter= express.Router()

import { userRegisterSendOtp,userRegisterVerifyOtp,userLogin } from '../Controller/loginController.js'


/**************************** User Register  *************************************/
userRouter.post("/register", userRegisterSendOtp);
userRouter.post("/verifyOtp", userRegisterVerifyOtp);

/**************************** User Login  *************************************/
userRouter.post("/login", userLogin);



export default userRouter