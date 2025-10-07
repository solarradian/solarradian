import React , {useState}from 'react'
import { FaRegEyeSlash } from 'react-icons/fa6'
import { FaRegEye } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import SummaryApi from '../common/SummaryApi.js';
import fetchUserDetails from '../utils/fetchUserDetails.js';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice.js';

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: "", 
    })

  const [showPassword, setShowPassword] = useState(false)
  const navigate =useNavigate()
  const dispatch = useDispatch()

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

const handleSubmit = async(e) =>{
  e.preventDefault()

  
    try {
    const response = await Axios({
      ...SummaryApi.login,
      data: data

    })

    if(response.data.error){
      toast.error(response.data.message)
    }
    if(response.data.success){
      toast.success(response.data.message)
      localStorage.setItem('accessToken', response.data.data.accessToken)
      localStorage.setItem('refreshToken', response.data.data.refreshToken) 

      const userDetails = await fetchUserDetails()


      dispatch(setUserDetails(userDetails.data))

      setData({
        email: "",
        password: "",
      })

      navigate("/")
    }


    
    
  } catch (error) {
    AxiosToastError(error)
    
  }
}

  return (
    <section className=' w-full container mx-auto px-2 '>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded  p-7 '>

        <p className='text-bold font-semibold text-lg text-green-800'>Login</p>

        <form onSubmit={handleSubmit} className='grid gap-4 mt-6'>
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
          <div className='grid gap-1'>
          <label htmlFor='password'>Password :</label>
          <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
            <input
              type={showPassword ? "text" : "password"}
              id='password'
              className='w-full outline-none'
              name='password'
              value={data.password}
              onChange={handleChange }
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
        <Link to={"/forgot-password"} className='block ml-auto hover:text-primary-200'>Forgot password ?</Link>
          <button disabled={!valilateValue} className={`${valilateValue ? "bg-green-800  hover:bg-green-700" :"bg-gray-500"} text-white py-2 my-3 rounded font-semibold  tracking-wide`}> Login</button>

        </form>

        <p>Don't have account <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link></p>


      </div>
    </section>
  )
}

export default Login
