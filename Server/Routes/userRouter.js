import express from "express";
const userRouter = express.Router();

import { userLoggedIn } from "../MiddleWare/userAuth.js";
import {
  userRegisterSendOtp,
  userRegisterVerifyOtp,
  userLogin,
} from "../Controller/loginController.js";
import {
  handleSearch,
  userAddNotes,
  userGetNotes,
  userUpdateNotes,
  userDeleteNotes,
  usertagNote,
  userUntagNote,
  userGetEditNotes,
  userTaggedNotesPage,
} from "../Controller/noteMakingController.js";

/**************************** User Register  *************************************/
userRouter.post("/register", userRegisterSendOtp);
userRouter.post("/verifyOtp", userRegisterVerifyOtp);

/**************************** User Login  *************************************/
userRouter.post("/login", userLogin);

/**************************** User Note Management  *************************************/
userRouter.post("/addNotes", userLoggedIn, userAddNotes);
userRouter.get("/getNotes/:id", userLoggedIn, userGetNotes);
userRouter.get("/getEditData/:id", userLoggedIn, userGetEditNotes);
userRouter.put("/editNote/:id", userLoggedIn, userUpdateNotes);
userRouter.delete("/deleteNote/:id", userLoggedIn, userDeleteNotes);

/**************************** User Search   *************************************/
userRouter.post("/search", handleSearch);

/**************************** User Tag note   *************************************/
userRouter.put("/tagNote/:id", userLoggedIn, usertagNote);

/**************************** User UnTag note   *************************************/
userRouter.put("/untagNote/:id", userLoggedIn, userUntagNote);

/**************************** User tagged notes page   *************************************/
userRouter.get("/getTaggedNotes/:id", userLoggedIn, userTaggedNotesPage);

export default userRouter;
