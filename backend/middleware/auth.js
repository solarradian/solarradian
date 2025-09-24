// import jwt from "jsonwebtoken";
// import UserModel from "../models/user.model.js";

// const auth = async (req, res, next) => {
//   try {
//     const token =
//       req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       // ✅ No token = random user → allow public route but no req.user
//       return next();
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
//     const user = await UserModel.findById(decoded.id).select("-password");

//     if (user) {
//       req.user = user; // ✅ Logged-in user available in req.user
//     }

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Unauthorized",
//       error: true,
//       success: false,
//     });
//   }
// };


//  export default auth;



 import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      // ✅ Public route, continue without user
      return next();
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found or unauthorized",
        error: true,
        success: false,
      });
    }

    req.user = user; // ✅ attach logged-in user
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: true,
      success: false,
    });
  }
};

export default auth;
