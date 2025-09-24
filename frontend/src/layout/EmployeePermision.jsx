import React from 'react'
import { useSelector } from 'react-redux'
import isEmployee from '../utils/isEmployee.js'

const EmployeePermision = ({children}) => {
    const user = useSelector(state => state.user)


  return (
    <>
        {
            isEmployee(user.role) ?  children : <p className='text-red-600 bg-red-100 p-4'>Do not have permission</p>
        }
    </>
  )
}

export default EmployeePermision