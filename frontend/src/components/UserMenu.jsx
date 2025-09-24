

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin.js';
import isEmployee from '../utils/isEmployee.js';

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout
      })
      console.log("logout", response)
      if (response.data.success) {
        if (close) {
          close()
        }
        dispatch(logout())
        localStorage.clear()
        toast.success(response.data.message)
        navigate("/")
      }
    } catch (error) {
      console.log(error)
      AxiosToastError(error)
    }
  }

  const handleClose = () => {
    if (close) {
      close()
    }
  }
  return (
    <div>
      <div className='font-semibold'>My Account</div>
      <div className='text-sm flex items-center gap-2'>
        <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile}   <span className="text-medium text-red-600">
          {user.role === "Admin" && " (Admin)"}
          {user.role === "Customer" && " (Customer)"}
          {user.role === "Employee" && " (Employee)"}
        </span></span>
        <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-primary-200'>
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>

      <Divider />

      <div className='text-sm grid gap-1'>

        {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to={"/dashboard/register"} className='px-2 hover:bg-orange-200 py-1'>Registration</Link>
          )
        }


        <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 hover:bg-orange-200 py-1'>Save Address</Link>
       

         {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to={"/dashboard/create-project"} className='px-2 hover:bg-orange-200 py-1'>Create Project</Link>
          )
        }

         {
          isEmployee(user.role) && (
           <Link onClick={handleClose} to={"/dashboard/quotationgenerator"} className='px-2 hover:bg-orange-200 py-1'>Quotation Generator</Link>
          )
        }

   
        <Link onClick={handleClose} to={"/dashboard/get-project"} className='px-2 hover:bg-orange-200 py-1'>Show Project</Link>
        
         
        <button onClick={handleLogout} className=' px-2 hover:bg-red-500 py-1 bg-red-400 text-white text-center duration-75'>Log Out</button>

      </div>
    </div>
  )
}

export default UserMenu;