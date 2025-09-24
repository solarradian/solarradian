import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserMenu from '../components/userMenu'

const Dashboard = () => {
  const user = useSelector(state => state.user)

  // console.log("user dashboard", user)
  return (
    <section className='bg-white'>
      <div className='container mx-auto p-3 grid lg:grid-cols-[250px_1fr] '>
        {/**left for menu */}
        <div className='max-h-[calc(100vh-96px)] py-4 sticky top-24 border-r overflow-auto hidden lg:block '>
          <UserMenu/>
        </div>


        {/**right for content */}
        <div className='bg-white p-4 min-h-[75vh]'>
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default Dashboard