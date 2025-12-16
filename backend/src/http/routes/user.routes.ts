
// imports
import { Router } from "express";

// import controllers
import { userController } from "@controllers/User.controller";

// import middlewares
import { validate } from "@middlewares/HandleValidation.middleware";
import { validations } from "@middlewares/ControllerValidations/UserValidations.middleware";

// export router
export const userRouter: Router = Router();


//// user routes - 5115


// user creation - POST
userRouter.post(
   '/user', 
   validations.userRegisterValidation(),
   validate,
   userController.createUser
);

// get user - GET
userRouter.get(
   '/user',
   userController.getUser
);

// update user - PUT
userRouter.put(
   '/user',
   validations.userUpdateValidation(),
   validate,
   userController.updateUser
);

// delete user - DELETE
userRouter.delete(
   '/user',
   userController.deleteUser
);