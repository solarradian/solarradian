import { Router } from 'express'
import { registerUserController, loginController , logoutController , verifyEmailController, updateUserDetails,forgotPasswordController,verifyForgotPasswordOtp,uploadProfilepic, resetPassword,refreshToken, userDetails,usersDetails} from '../controllers/user.controller.js'
import auth from '../middleware/auth.js';

import upload from '../middleware/multer.js';



const userRouter = Router()

userRouter.post('/register' , auth, registerUserController);
userRouter.post('/verify-email' , verifyEmailController);
userRouter.post('/login' , loginController);
userRouter.get('/logout' ,auth,  logoutController);
userRouter.put('/update-user' , auth , updateUserDetails);
userRouter.put('/forgot-password' , forgotPasswordController);
userRouter.put('/verify-forgot-password-otp' , verifyForgotPasswordOtp);
userRouter.put('/reset-password' , resetPassword);
userRouter.put('/upload-profilepic' , auth , upload.single('avatar'),uploadProfilepic);
userRouter.post('/refresh-token',refreshToken)
userRouter.get('/user-details', auth, userDetails);
userRouter.get('/users-details', auth, usersDetails);


export default userRouter;