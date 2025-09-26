import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Whatsapp from './components/Whatsapp'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';

import GlobalProvider from './provider/GlobalProvider';
import fetchUsersDetails from './utils/fetchUsersDetails'
import { setUsersDetails } from './store/usersSlice'


function App() {
  const dispatch = useDispatch()
 
  

  const fetchUser = async()=>{
      const response = await fetchUserDetails()
      dispatch(setUserDetails(response.data))
  }


  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <GlobalProvider> 
      <Header/>
      <main className='min-h-[78vh]'>
          <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
      <Whatsapp />
    </GlobalProvider>
  )
}

export default App