
// imports
import { Router, Request, Response } from "express";

// import controllers
import { userController } from "@controllers/User.controller";

// import middlewares
import { validate } from "@middlewares/HandleValidation.middleware";
import { validations } from "@middlewares/ControllerValidations/UserValidations.middleware";

// export router
export const userRouter: Router = Router();


// user creation - POST
userRouter.post(
   '/user', 
   validations.userRegisterValidation(),
   validate,
   userController.createUser
);