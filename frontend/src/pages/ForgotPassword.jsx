import React , {useState}from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import SummaryApi from '../common/SummaryApi.js';

const ForgotPassword = () => {

  const [data, setData] = useState({
    email: ""
})

  
  const navigate =useNavigate()

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
      ...SummaryApi.forgot_password,
      data: data

    })

    if(response.data.error){
      toast.error(response.data.message)
    }
    if(response.data.success){
      toast.success(response.data.message)

      navigate("/otp-verification",{state: data})

      
        
      
      setData({
        email: ""
      })

      
    }


    console.log( "response", response )
    
  } catch (error) {
    AxiosToastError(error)
    
  }
}

  return (
    <section className=' w-full container mx-auto px-2 '>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded  p-7 '>

        <p className='text-bold font-semibold text-lg text-green-800'>Forgot password</p>

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
    
         <button disabled={!valilateValue} className={`${valilateValue ? "bg-green-800  hover:bg-green-700" :"bg-gray-500"} text-white py-2 my-3 rounded font-semibold  tracking-wide`}>Send Otp</button>

        </form>

         <p>Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link></p>
       


      </div>
    </section>
  )
}

export default ForgotPassword














