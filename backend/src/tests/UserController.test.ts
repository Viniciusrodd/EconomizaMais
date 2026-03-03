
// import controller
import { userController } from "@controllers/User.controller";

// import services
import { userService } from "@services/User.service";

// import mocks
import { userMockRequest, userMockResponse } from "@mocks/user.mock";


// utils
const id: string = 'uuid-123';
const name: string = 'teste nome';
const residence_name: string = 'casa teste';
const number_of_residents: number = 3;
const created_at: Date = new Date(Date.now());
const updated_at: Date = new Date(Date.now());
const fakeUser = { id, name, residence_name, number_of_residents, created_at, updated_at };



// mocks
jest.mock('@services/User.service');



describe('UserController', () => {

   // before each tests
   beforeEach(() =>{
      jest.resetAllMocks(); // reset mock's states, like calls, implementations...
   });


   // create user
   describe('createUser', () => {

      // 201
      it('Should return 201 and created user', async () => {
         // request / response
         const req = userMockRequest({ name, residence_name, number_of_residents }) as any;
         const res = userMockResponse();

         // spy functions
         jest.spyOn(userService, 'createUserService').mockResolvedValue(fakeUser);
      
         // controller method
         await userController.createUser(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(201);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ User successfully created',
            data: fakeUser
         });
      });

      // 500
      it('Should return 500 if user create service throws error', async () => {
         // request / response
         const req = userMockRequest({ name, residence_name, number_of_residents }) as any;
         const res = userMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(userService, 'createUserService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await userController.createUser(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });


   // get user
   describe('getUser', () => {

      // 200
      it('Should return 200 and get user', async () => {
         // request / response
         const req = userMockRequest({}) as any;
         const res = userMockResponse();

         // spy functions
         jest.spyOn(userService, 'getUserService').mockResolvedValue(fakeUser);
      
         // controller method
         await userController.getUser(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ User get successfully',
            data: fakeUser
         });
      });

      // 500
      it('Should return 500 if get user service throws error', async () => {
         // request / response
         const req = userMockRequest({ }) as any;
         const res = userMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(userService, 'getUserService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await userController.getUser(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });


   // update user
   describe('updateUser', () => {

      // 200
      it('Should return 200 and update user', async () => {
         // request / response
         const req = userMockRequest({ name }) as any;
         const res = userMockResponse();

         // spy functions
         jest.spyOn(userService, 'updateUserService').mockResolvedValue(fakeUser);
      
         // controller method
         await userController.updateUser(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ Update user successfully',
            data: fakeUser
         });
      });

      // 500
      it('Should return 500 if update user service throws error', async () => {
         // request / response
         const req = userMockRequest({ }) as any;
         const res = userMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(userService, 'updateUserService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await userController.updateUser(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });


   // delete user
   describe('deleteUser', () => {

      // 200
      it('Should return 200 and delete user', async () => {
         // request / response
         const req = userMockRequest({ }) as any;
         const res = userMockResponse();

         // spy functions
         jest.spyOn(userService, 'deleteUserService').mockResolvedValue();
      
         // controller method
         await userController.deleteUser(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ Delete user successfully'
         });
      });

      // 500
      it('Should return 500 if delete user service throws error', async () => {
         // request / response
         const req = userMockRequest({ }) as any;
         const res = userMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(userService, 'deleteUserService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await userController.deleteUser(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });

});