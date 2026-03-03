
// imports
import { Router } from "express";

// import controllers
import { userController } from "@controllers/User.controller";

// import middlewares
import { validate } from "@middlewares/HandleValidation.middleware";
import { userValidations } from "@middlewares/ControllerValidations/UserValidations.middleware";

// export router
export const userRoutes: Router = Router();


//// user routes - 5115


// user creation - POST
userRoutes.post(
   '/user', 
   userValidations.userRegisterValidation(),
   validate,
   userController.createUser
);


// get user - GET
userRoutes.get(
   '/user',
   userController.getUser
);


// update user - PUT
userRoutes.put(
   '/user',
   userValidations.userUpdateValidation(),
   validate,
   userController.updateUser
);


// delete user - DELETE
userRoutes.delete(
   '/user',
   userController.deleteUser
);