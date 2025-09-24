import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddAddress } from "../store/addressSlice";


export const GlobalContext = createContext(null)

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state?.user)






  const handleLogoutOut = () => {
    localStorage.clear()
  }

  const fetchAddress = async()=>{
      try {
        const response = await Axios({
          ...SummaryApi.getAddress
        })
        const { data : responseData } = response

        if(responseData.success){
          dispatch(handleAddAddress(responseData.data))
        }
      } catch (error) {
          // AxiosToastError(error)
      }
    }

    


  useEffect(() => {
    handleLogoutOut()
    fetchAddress()
  }, [user])

  return (
    <GlobalContext.Provider value={{
      fetchAddress
    }}>
      {children}
    </GlobalContext.Provider>

  )
}

export default GlobalProvider
