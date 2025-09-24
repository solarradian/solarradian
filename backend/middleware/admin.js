// import UserModel from "../models/user.model.js"

// export const admin = async(req,res,next)=>{
//     try {
//        const  userId = req.userId

//        const user = await UserModel.findById(userId)

//        if(user.role !== 'ADMIN'){
//             return res.status(400).json({
//                 message : "Permission denial",
//                 error : true,
//                 success : false
//             })
//        }

//        next()

//     } catch (error) {
//         return res.status(500).json({
//             message : "Permission denial",
//             error : true,
//             success : false
//         })
//     }
// }


// middleware/admin.js
import UserModel from "../models/user.model.js";

export const admin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized: No user found",
        error: true,
        success: false,
      });
    }

    // ✅ req.user already contains full user object (from auth.js)
    const user = await UserModel.findById(req.user._id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Permission denied: Admins only",
        error: true,
        success: false,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: true,
      success: false,
    });
  }
};
