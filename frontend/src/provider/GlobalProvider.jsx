// import { createContext, useContext, useEffect, useState } from "react";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import { useDispatch, useSelector } from "react-redux";
// import { handleAddAddress } from "../store/addressSlice";


// export const GlobalContext = createContext(null)

// export const useGlobalContext = () => useContext(GlobalContext)

// const GlobalProvider = ({ children }) => {
//   const dispatch = useDispatch()
//   const user = useSelector(state => state?.user)






//   const handleLogoutOut = () => {
//     localStorage.clear();
//   }

//   const fetchAddress = async()=>{
//       try {
//         const response = await Axios({
//           ...SummaryApi.getAddress
//         })
//         const { data : responseData } = response

//         if(responseData.success){
//           dispatch(handleAddAddress(responseData.data))
//         }
//       } catch (error) {
//           // AxiosToastError(error)
//       }
//     }

    


//   useEffect(() => {
//     handleLogoutOut()
//     fetchAddress()
//   }, [user])

//   return (
//     <GlobalContext.Provider value={{
//       fetchAddress
//     }}>
//       {children}
//     </GlobalContext.Provider>

//   )
// }

// export default GlobalProvider


import { createContext, useContext, useEffect } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddAddress } from "../store/addressSlice";

// Create Context
export const GlobalContext = createContext(null);

// Custom hook for easy access
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);

  // ✅ Logout handler (call manually when needed)
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // clear only relevant items
    localStorage.removeItem("userData");
    // Or if you really want to clear everything on logout:
    // localStorage.clear();
  };

  // ✅ Fetch user address
  const fetchAddress = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getAddress });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
      }
    } catch (error) {
      console.error("Failed to fetch address:", error);
      // Optionally show a toast or dispatch an error action
    }
  };

  // ✅ Fetch address only when user is logged in
  useEffect(() => {
    if (user && user?.token) {
      fetchAddress();
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        fetchAddress,
        handleLogout, // ✅ expose logout globally
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
