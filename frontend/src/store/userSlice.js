// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  uniqueId: "",
  name: "",
  email: "",
  avatar: "",
  mobile: "",
  role: "Customer",
  projectPreferences: {
    panel: "",
    inverter: "",
    capacityRequired: null,
  },
  salaries: [],
  refresh_token: "",
  verify_email: false,
  last_login_date: "",
  address_details: [],
  forgot_password_otp: "",
  forgot_password_expiry: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state._id = action.payload?._id || action.payload?.id ;
      state.uniqueId = action.payload?.uniqueId ;
      state.name = action.payload?.name ;
      state.email = action.payload?.email;
      state.avatar = action.payload?.avatar;
      state.mobile = action.payload?.mobile;
      state.role = action.payload?.role || "Customer";
      state.projectPreferences = action.payload?.projectPreferences || {
        panel: "",
        inverter: "",
        capacityRequired: null,
      };
      state.salaries = action.payload?.salaries ;
      state.verify_email = action.payload?.verify_email ;
      state.last_login_date = action.payload?.last_login_date;
      state.address_details = action.payload?.address_details ;
      state.forgot_password_otp = action.payload?.forgot_password_otp ;
      state.forgot_password_expiry = action.payload?.forgot_password_expiry;
    },

    updatedAvatar : (state, action) => {
      state.avatar = action.payload;
    },

      logout: () => {
      return initialState; 
    },
  },
});

export const { setUserDetails, updateProfilePic , logout , updatedAvatar} = userSlice.actions;
export default userSlice.reducer;
