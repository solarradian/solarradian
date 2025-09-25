// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Provide name"],
    },
    email: {
      type: String,
      required: [true, "Provide email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Provide password"],
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
      type: String,
      required: [true, "Provide Phone Number"],
      unique: true,
    },
     role: {
      type: String,
      enum: ["Admin", "Employee", "Customer"], 
      default: "Customer", 
    },
    // costumer specific
    projectPreferences: {
      panel: { type: mongoose.Schema.Types.ObjectId, ref: "Panel" },
      inverter: { type: mongoose.Schema.Types.ObjectId, ref: "Inverter" },
      capacityRequired: { type: Number }
    },


    // for employees → we can link their salaries
    
   salaries: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: "Salary" 
      }], 

    refresh_token: {
      type: String,
      default: "",
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    last_login_date: {
      type: Date,
      default: null, 
    },
    address_details: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Address"
      }
    ],
    forgot_password_otp: {
      type: String,
      default: null,
    },
    forgot_password_expiry: {
      type: Date,
      default: null, 
    },

  },
  { timestamps: true }
);



const UserModel = mongoose.model("User", userSchema);
export default UserModel;



