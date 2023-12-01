import express from 'express'
const userRouter= express.Router()

import { userRegisterSendOtp,userRegisterVerifyOtp,userLogin } from '../Controller/loginController.js'
import {handleSearch, userAddNotes,userGetNotes,userUpdateNotes,userDeleteNotes,usertagNote,userUntagNote} from '../Controller/noteMakingController.js'


/**************************** User Register  *************************************/
userRouter.post("/register", userRegisterSendOtp);
userRouter.post("/verifyOtp", userRegisterVerifyOtp);

/**************************** User Login  *************************************/
userRouter.post("/login", userLogin);

/**************************** User Note Management  *************************************/
userRouter.post("/addNotes", userAddNotes);
userRouter.get("/getNotes/:id",userGetNotes)
userRouter.put("/editNote/:id",userUpdateNotes)
userRouter.delete("/deleteNote/:id",userDeleteNotes)

/**************************** User Search   *************************************/
userRouter.post("/search", handleSearch);

/**************************** User Tag note   *************************************/
userRouter.put("/tagNote/:id", usertagNote);


/**************************** User UnTag note   *************************************/
userRouter.put("/untagNote/:id", userUntagNote);




export default userRouter