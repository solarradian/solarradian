import React, { useState } from 'react'
import { FaRegEyeSlash } from 'react-icons/fa6'
import { FaRegEye } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import SummaryApi from '../common/SummaryApi.js';
import isAdmin from '../utils/isAdmin.js';
import { useSelector } from 'react-redux';

const Register = () => {

  const user = useSelector((state) => state.user)

  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const valilateValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password !== data.confirmPassword) {
      toast.error("password and confirm password must be same")
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data

      })

      if (response.data.error) {
        toast.error(response.data.message)
      }
      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: ""
        })

        navigate("/login")
      }


      console.log("response", response)

    } catch (error) {
      AxiosToastError(error)

    }
  }



  return (
    <section className=' w-full container mx-auto px-2 '>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded  p-7 '>

        <p className='text-bold font-semibold text-lg text-green-800'>Welcome to Solar Radian</p>

        <form onSubmit={handleSubmit} className='grid gap-4 mt-6'>

          <div className='grid gap-1 '>
            <label htmlFor='name'>Name :</label>
            <input
              type="text"
              id='name'
              autoFocus
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
              name='name'
              value={data.name}
              onChange={handleChange}
              placeholder='Enter your name'
            />
          </div>

          <div className='grid gap-1 '>
            <label htmlFor='email'>Email :</label>
            <input
              type="email"
              id='email'
              autoFocus
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
              value={data.email}
              name='email'
              onChange={handleChange}
              placeholder='Enter your email'
            />
          </div>

          {
            isAdmin(user.role) && (
              <div className="grid gap-1">
                <label htmlFor="role">Role :</label>
                <select
                  id="role"
                  name="role"
                  value={data.role}
                  onChange={handleChange}
                  className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
                >
                  <option value="">-- Select Role --</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
            )
          }


          <div className='grid gap-1 '>
            <label htmlFor='mobile'>Mobile No :</label>
            <input
              type="mobile"
              id='mobile'
              autoFocus
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
              value={data.mobile}
              name='mobile'
              onChange={handleChange}
              placeholder='Enter your Mobile Number'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='password'>Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                className='w-full outline-none'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder='Enter your password'
              />
              <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                {
                  showPassword ? (
                    <FaRegEye />
                  ) : (
                    <FaRegEyeSlash />
                  )
                }
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor='confirmPassword'>Confirm Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id='confirmPassword'
                className='w-full outline-none'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder='Enter your password'
              />
              <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
                {
                  showConfirmPassword ? (
                    <FaRegEye />
                  ) : (
                    <FaRegEyeSlash />
                  )
                }
              </div>
            </div>
          </div>


          <button disabled={!valilateValue} className={`${valilateValue ? "bg-green-800  hover:bg-green-700" : "bg-gray-500"} text-white py-2 my-3 rounded font-semibold  tracking-wide`}> Register</button>

        </form>

        <p>Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link></p>


      </div>
    </section>
  )
}

export default Register

// import React, { useState } from "react";
// import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Axios from "../utils/Axios.js";
// import AxiosToastError from "../utils/AxiosToastError.js";
// import SummaryApi from "../common/SummaryApi.js";
// import { useSelector } from "react-redux"; // 👈 to get logged-in user

// const Register = () => {
//   const user = useSelector((state) => state.user); // 👈 get current logged-in user info

//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//     role: user?.role === "Admin" ? "Employee" : "Customer", // default
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((preve) => ({
//       ...preve,
//       [name]: value,
//     }));
//   };

//   const valilateValue = Object.values({
//     name: data.name,
//     email: data.email,
//     mobile: data.mobile,
//     password: data.password,
//     confirmPassword: data.confirmPassword,
//   }).every((el) => el);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (data.password !== data.confirmPassword) {
//       toast.error("Password and confirm password must be same");
//       return;
//     }

//     try {
//       const response = await Axios({
//         ...SummaryApi.register,
//         data: data,
//       });

//       if (response.data.error) {
//         toast.error(response.data.message);
//       }
//       if (response.data.success) {
//         toast.success(response.data.message);
//         setData({
//           name: "",
//           email: "",
//           mobile: "",
//           password: "",
//           confirmPassword: "",
//           role: user?.role === "Admin" ? "Employee" : "Customer",
//         });
//         navigate("/login");
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   return (
//     <section className="w-full container mx-auto px-2">
//       <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
//         <p className="text-bold font-semibold text-lg text-green-800">
//           Welcome to Solar Radian
//         </p>

//         <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
//           {/* Name */}
//           <div className="grid gap-1">
//             <label htmlFor="name">Name :</label>
//             <input
//               type="text"
//               id="name"
//               autoFocus
//               className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
//               name="name"
//               value={data.name}
//               onChange={handleChange}
//               placeholder="Enter your name"
//             />
//           </div>

//           {/* Email */}
//           <div className="grid gap-1">
//             <label htmlFor="email">Email :</label>
//             <input
//               type="email"
//               id="email"
//               className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
//               value={data.email}
//               name="email"
//               onChange={handleChange}
//               placeholder="Enter your email"
//             />
//           </div>

//           {/* Mobile */}
//           <div className="grid gap-1">
//             <label htmlFor="mobile">Mobile No :</label>
//             <input
//               type="text"
//               id="mobile"
//               className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
//               value={data.mobile}
//               name="mobile"
//               onChange={handleChange}
//               placeholder="Enter your Mobile Number"
//             />
//           </div>

//           {/* Role (only visible to Admins) */}
//           {user?.role === "Admin" && (
//             <div className="grid gap-1">
//               <label htmlFor="role">Role :</label>
//               <select
//                 id="role"
//                 name="role"
//                 value={data.role}
//                 onChange={handleChange}
//                 className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
//               >
//                 <option value="Admin">Admin</option>
//                 <option value="Employee">Employee</option>
//               </select>
//             </div>
//           )}

//           {/* Password */}
//           <div className="grid gap-1">
//             <label htmlFor="password">Password :</label>
//             <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 className="w-full outline-none"
//                 name="password"
//                 value={data.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//               />
//               <div
//                 onClick={() => setShowPassword((preve) => !preve)}
//                 className="cursor-pointer"
//               >
//                 {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//               </div>
//             </div>
//           </div>

//           {/* Confirm Password */}
//           <div className="grid gap-1">
//             <label htmlFor="confirmPassword">Confirm Password :</label>
//             <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 id="confirmPassword"
//                 className="w-full outline-none"
//                 name="confirmPassword"
//                 value={data.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//               />
//               <div
//                 onClick={() => setShowConfirmPassword((preve) => !preve)}
//                 className="cursor-pointer"
//               >
//                 {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//               </div>
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             disabled={!valilateValue}
//             className={`${
//               valilateValue
//                 ? "bg-green-800 hover:bg-green-700"
//                 : "bg-gray-500"
//             } text-white py-2 my-3 rounded font-semibold tracking-wide`}
//           >
//             Register
//           </button>
//         </form>

//         <p>
//           Already have account ?{" "}
//           <Link
//             to={"/login"}
//             className="font-semibold text-green-700 hover:text-green-800"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Register;
