import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import SummaryApi from '../common/SummaryApi.js';

const OtpVerification = () => {

    const [data, setData] = useState(["", "", "", "", "", ""])
    const navigate = useNavigate()
    const inputRef = useRef([])

    const location = useLocation()

    const valilateValue = data.every(el => el)

    useEffect(() =>{

         if(!location?.state?.email){
            navigate("/forgot-password")
         }

    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()


        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data: {
                    otp: data.join(""),
                    email :location?.state?.email
                }

            })

            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                setData(["", "", "", "", "", ""])

                navigate("/reset-password",{
                    state : {
                        data : response.data,
                        email : location?.state?.email
                    }
                })
            }


            console.log("response", response)

        } catch (error) {
            AxiosToastError(error)

        }
    }

    return (
        <section className=' w-full container mx-auto px-2 '>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded  p-7 '>

                <p className='text-bold font-semibold text-lg text-green-800'>Enter OTP</p>

                <form onSubmit={handleSubmit} className='grid gap-4 mt-6'>
                    <div className='grid gap-1 '>
                        <label htmlFor='otp'>Enter your OTP:</label>

                        <div className='flex items-center gap-2 justify-between mt-3'>
                            {
                                data.map((element, index) => {
                                    return (
                                        <input
                                            key={"otp" + index}
                                            type="text"
                                            id='otp'
                                            ref={(ref) => {
                                                inputRef.current[index] = ref;
                                                return ref
                                            }}
                                            autoFocus
                                            maxLength={1}
                                            value={data[index]}
                                            className='bg-blue-50 p-2 max-w-12 text-center border rounded outline-none focus:border-primary-200'

                                            onChange={(e) => {

                                                const value = e.target.value;

                                                const newData = [...data];

                                                newData[index] = value;

                                                setData(newData)

                                                if (value && index < 5) {
                                                    inputRef.current[index + 1].focus()
                                                }

                                            }}

                                        />
                                    )
                                })

                            }
                        </div>

                    </div>

                    <button disabled={!valilateValue} className={`${valilateValue ? "bg-green-800  hover:bg-green-700" : "bg-gray-500"} text-white py-2 my-3 rounded font-semibold  tracking-wide`}>Verify OTP</button>

                </form>

                <p>Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link></p>



            </div>
        </section>
    )
}

export default OtpVerification














