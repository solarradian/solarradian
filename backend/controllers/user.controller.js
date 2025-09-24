import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import sendEmail from '../utils/sendEmail.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generateRefreshToken from '../utils/generatedRefreshToken.js';
import uploadImageClodinary from '../utils/uploadImageClodinay.js';
import generateOtp from '../utils/generateOtp.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import jwt from 'jsonwebtoken';
import { uidGeneration } from "../middleware/uidGeneration.js";

// user registration 
export const registerUserController = async (req, res) => {

    try {

        const { name, email, password, mobile , role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "provide name email password ",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email })

        if (user) {
            return res.json({
                message: "Already registered email",
                error: true,
                success: false
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt)

 
        // ✅ Default role = Customer
        let finalRole = "Customer";

        // ✅ If logged-in user is Admin, allow creating Employee/Admin
        if (req.user && req.user.role === "Admin") {
            if (role === "Employee" || role === "Admin") {
                finalRole = role;
            }
        }

        const payload = {
            name,
            email,
            password: hashPassword,
            mobile,
            role: finalRole,
        };

        let newUser = new UserModel(payload)

        newUser = await uidGeneration(newUser);
        const save = await newUser.save()

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from Solar Radian",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        })

        return res.json({
            message: "User register succesfully",
            error: false,
            success: true,
            data: save
        });

    } catch (error) {
        console.log("Error in RegisterUser", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });

    }

}

// email verification

export const verifyEmailController = async (req, res) => {

    try {

        const { code } = req.body

        const user = UserModel.findOne({ _id: code })

        if (!user) {
            return res.status(400).json({
                message: "Invalid code",
                error: true,
                success: false
            });
        }

        const UpdateUser = UserModel.updateOne({ _id: code }, { verify_email: true })

        return res.json({
            message: "Email verification Done",
            error: false,
            success: true
        });


    } catch (error) {

        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });

    }
}

// login controller

export const loginController = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {

            return res.status(400).json({
                message: "provide email , password",
                error: true,
                success: false

            });

        }
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not registered",
                error: true,
                success: false

            });
        }

        // if (user.status !== "Active") {
        //     return res.status(400).json({
        //         message: "Contact to the Admin",
        //         error: true,
        //         success: false

        //     });

        // }

        const checkPassword = await bcryptjs.compare(password, user.password)

        if (!checkPassword) {
            return res.status(400).json({
                message: "Check password",
                error: true,
                success: false
            });

        }


        const accessToken = await generatedAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)
        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            last_login_date: new Date()
        })

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.cookie('accessToken', accessToken, cookiesOption)
        res.cookie('refreshToken', refreshToken, cookiesOption)

        return res.json({
            message: "Login Successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })



    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });

    }
}

// logout controller

export const logoutController = async (req, res) => {

    try {

        const userid = req.userId  //middleware

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.clearCookie('accessToken', cookiesOption)
        res.clearCookie('refreshToken', cookiesOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, { refresh_token: " " })

        return res.json({
            message: "Logout successfully",
            error: false,
            success: true

        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });

    }
}

// uplode user avtar

export const uploadProfilepic = async (req, res) => {


    try {

        const userId = req.userId //auth middleware

        const image = req.file // multer middleware

        const upload = await uploadImageClodinary(image)

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })


        return res.json({
            message: "upload profile",
            data: {
                _id: userId,
                avatar: upload.url
            }
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }

}

// update user details
export const updateUserDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, password, mobile } = req.body;

        // Check if user exists first
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        let hashPassword = ""; // Keep existing password by default

        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt);
        }

        const updateUser = await UserModel.updateOne(
            { _id: userId }, 
            {
                ...(name && { name: name }),
                ...(email && { email: email }),
                ...(mobile && { mobile: mobile }),
                ...(password && { password: hashPassword }), // Fixed: use hashPassword instead of password
            }
        );

        // Check if any document was actually modified
        if (updateUser.matchedCount === 0) {
            return res.status(404).json({
                message: "User not found or no changes made",
                error: true,
                success: false
            });
        }

        return res.json({
            message: "User updated successfully",
            error: false,
            success: true,
            data: updateUser
        });

    } catch (error) {
      
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: "Invalid user ID format",
                error: true,
                success: false
            });
        }
        
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// forgot password

export const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            });
        }

        // Generate OTP and Expiry Time
        const otp = generateOtp();
        const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        // Update User with OTP & Expiry Time
        await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: expireTime
        });

        // Send Email
        await sendEmail({
            sendTo: email,
            subject: "Password Reset Request - BuyIt",
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp
            })
        });

        // Respond to user
        return res.json({
            message: "Check your email for the OTP.",
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

// verify forgot password otp

export const verifyForgotPasswordOtp = async (req, res) => {

    try {

        const { email, otp } = req.body
        if (!email || !otp) {
            return res.status(400).json({
                message: "Provide required field: email , otp",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            });
        }

        const currentTime = new Date().toISOString()

        if (user.forgot_password_expiry < currentTime) {
            return res.status(400).json({
                message: "OTP is Exprired",
                error: true,
                success: false
            });

        }

        if (otp !== user.forgot_password_otp) {
            return res.status(400).json({
                message: "invalid OTP",
                error: true,
                success: false
            });

        }

        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            forgot_password_otp: "",
            forgot_password_expiry: ""

        })

        return res.json({
            message: "Verify OTP successfully",
            error: false,
            success: true
        });





    } catch (error) {

        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });
    }


}

// reset password

export const resetPassword = async (req, res) => {

    try {

        const { email, newPassword, confirmNewPassword } = req.body;

        if (!email || !newPassword || !confirmNewPassword) {

            return res.status(400).json({
                message: "required field email , newPassword , confirmNewPassword ",
                error: true,
                success: false
            });

        }

        const user = await UserModel.findOne({ email })

        if (!user) {

            return res.status(400).json({
                message: "email is not available",
                error: true,
                success: false
            });

        }

        if (newPassword !== confirmNewPassword) {

            return res.status(400).json({
                message: "newPassword and confirmNewPasswod must be same",
                error: true,
                success: false
            });

        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt)

        const update = await UserModel.findByIdAndUpdate(user._id, {
            password: hashPassword
        })

        return res.json({
            message: "Password reset sucessfully",
            error: false,
            success: true
        });


    } catch (error) {

        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });

    }

}

// refresh token controller 
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if (!refreshToken) {
            return res.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)

        if (!verifyToken) {
            return res.status(401).json({
                message: "token is expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generatedAccessToken(userId)

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.cookie('accessToken', newAccessToken, cookiesOption)

        return res.json({
            message: "New Access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get user login details
export const userDetails = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select(
      "-password -refresh_token"
    );

    return res.json({
      message: "User details",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: true,
      success: false,
    });
  }
};


// 📌 Fetch all users - (Admin only)
export const usersDetails = async (req, res) => {
  try {
    // 0️⃣ Check if user is admin
    if (!req.user || req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins can fetch all users.",
      });
    }

    // 1️⃣ Fetch all users except sensitive fields
    const users = await UserModel.find()
      .select("-password -refresh_token");

    return res.json({
      message: "All users fetched successfully",
      error: false,
      success: true,
      users,
    });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: true,
      success: false,
    });
  }
};
