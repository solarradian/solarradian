


import React, { useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaHome,
  FaUsers,
  FaSolarPanel,
  FaCloudSun,
  FaSun,
  FaNewspaper,
  FaHandshake,
} from 'react-icons/fa';
import { FaUserPlus } from "react-icons/fa6";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import logo from '../assets/logo.jpg';
import useMobile from '../hooks/useMobile';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';

const Header = () => {
  const [isMobile] = useMobile();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState({
    delhiPolicy: false,
    pages: false
  });

  const redirectToLoginPage = () => {
    navigate("/login");
    setMobileOpen(false);
  }

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleMobileSubmenu = (menu) => {
    setMobileSubmenu(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <>
      {/* Topbar Start */}
      <div className="bg-gray-900 text-white text-sm hidden lg:block">
        <div className="container xl:max-w-[1400px] mx-auto flex justify-between items-center py-2 px-4">
          <div className="flex space-x-6">
            <div className="flex items-center space-x-1">
              <FaMapMarkerAlt className="text-yellow-400" />
              <span>S.N 2, 2nd Floor, Ashirwad Complex, Sector 53, Noida</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaClock className="text-yellow-400" />
              <span>Mon - Fri : 09.00 AM - 06.00 PM</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
          <div> <button onClick={ () => navigate('/solar-calculator')} className='bg-imp-text hover:bg-orange-400 duration-300 px-3 py-2 rounded-md'>Saving Calculator</button></div>
            <div className="flex items-center space-x-1">
              <FaPhoneAlt className="text-yellow-400" />
              <span>+91 9220337642</span>
            </div>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-yellow-400"><FaFacebookF /></a>
              <a href="#" className="hover:text-yellow-400"><FaTwitter /></a>
              <a href="#" className="hover:text-yellow-400"><FaLinkedinIn /></a>
              <a href="#" className="hover:text-yellow-400"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Navbar Start */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="container xl:max-w-[1410px] mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-12" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            <NavLink to="/" className="hover:text-yellow-500 flex items-center"><FaHome className="mr-1" /> Home</NavLink>
            <NavLink to="/about" className="hover:text-yellow-500 flex items-center"><FaUsers className="mr-1" /> About</NavLink>
            <NavLink to="/rooftopsolar" className="hover:text-yellow-500 flex items-center"><FaSolarPanel className="mr-1" /> Rooftop Solar</NavLink>
            <NavLink to="/pmsurayghar" className="hover:text-yellow-500 flex items-center"><FaCloudSun className="mr-1" /> PM Surya Ghar</NavLink>

            <div className="relative group">
              <button className="flex items-center hover:text-yellow-500">
                <FaSun className="mr-1" /> Delhi Solar Policy
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow rounded  z-10">
                <Link to="/delhi-solar-energy-policy" className="block px-4 py-2 hover:bg-gray-100">Delhi Solar Energy Policy</Link>
                <Link to="/delhi-solar-guidlines" className="block px-4 py-2 hover:bg-gray-100">Regulation & Guidelines</Link>
              </div>
            </div>

            <NavLink to="/blog" className="hover:text-yellow-500 flex items-center"><FaNewspaper className="mr-1" /> Blog</NavLink>
            <NavLink to="/partner" className="hover:text-yellow-500 flex items-center"><FaHandshake className="mr-1" /> Become a Partner</NavLink>

            <div className="relative group">
              <button className="hover:text-yellow-500">Pages</button>
              <div className="absolute hidden group-hover:block bg-white shadow rounded  z-10">
                <Link to="/faq" className="block px-4 py-2 hover:bg-gray-100">FAQ</Link>
                <Link to="/referandearn" className="block px-4 py-2 hover:bg-gray-100">Refer & Earn</Link>
                <Link to="/solar-calculator" className="block px-4 py-2 hover:bg-gray-100">Solar Calculator</Link>
                <Link to="/freequote" className="block px-4 py-2 hover:bg-gray-100">Free Quote</Link>
              </div>
            </div>

            <NavLink to="/contact" className="hover:text-yellow-500 flex items-center"><FaPhoneAlt className="mr-1" /> Contact</NavLink>

            {/* ✅ User Section */}
            {
              user?._id ? (
                <div className='relative'>
                  <div onClick={() => setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-1 cursor-pointer'>
                    <div className="flex items-center gap-3 font-semibold">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Profile"
                          className="w-10 h-10 rounded-full border object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-600 text-sm">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                          </span>
                        </div>
                      )}

                    </div>
                    {
                      openUserMenu ? (
                        <GoTriangleUp size={25} />
                      ) : (
                        <GoTriangleDown size={25} />
                      )
                    }

                  </div>
                  {
                    openUserMenu && (
                      <div className='absolute right-0 top-12'>
                        <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                          <UserMenu close={handleCloseUserMenu} />
                        </div>
                      </div>
                    )
                  }

                </div>
              ) : (
                <button onClick={redirectToLoginPage} className='text-lg px-2'> <FaUserPlus /> </button>
              )
            }
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button onClick={handleDrawerToggle} className="lg:hidden text-2xl">
              <AiOutlineMenu />
            </button>
          )}
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={handleDrawerToggle}
          ></div>
        )}

        {/* Mobile Sidebar Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-[70%] max-w-xs bg-white shadow-lg transform transition-transform duration-300 z-50 lg:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <Link to="/" onClick={handleDrawerToggle}>
              <img src={logo} alt="Logo" className="h-10" />
            </Link>
            <button onClick={handleDrawerToggle}>
              <IoMdClose className="w-7 h-7 text-gray-800" />
            </button>
          </div>

          <nav className="flex flex-col space-y-2 px-4 py-4 text-gray-700 font-semibold overflow-y-auto h-[calc(100%-64px)]">
            <NavLink to="/" onClick={handleDrawerToggle} className="py-2 flex items-center"><FaHome className="mr-2" /> Home</NavLink>
            <NavLink to="/about" onClick={handleDrawerToggle} className="py-2 flex items-center"><FaUsers className="mr-2" /> About</NavLink>
            <NavLink to="/rooftopsolar" onClick={handleDrawerToggle} className="py-2 flex items-center"><FaSolarPanel className="mr-2" /> Rooftop Solar</NavLink>
            <NavLink to="/pmsurayghar" onClick={handleDrawerToggle} className="py-2 flex items-center"><FaCloudSun className="mr-2" /> PM Surya Ghar</NavLink>
            
            {/* Delhi Solar Policy Submenu */}
            <div>
              <button 
                onClick={() => toggleMobileSubmenu('delhiPolicy')} 
                className="py-2 flex items-center w-full justify-between"
              >
                <span className="flex items-center"><FaSun className="mr-2" /> Delhi Solar Policy</span>
                {mobileSubmenu.delhiPolicy ? <GoTriangleUp /> : <GoTriangleDown />}
              </button>
              {mobileSubmenu.delhiPolicy && (
                <div className="pl-6">
                  <Link to="/delhi-solar-energy-policy" onClick={handleDrawerToggle} className="block py-2">Delhi Solar Energy Policy</Link>
                  <Link to="/delhi-solar-guidlines" onClick={handleDrawerToggle} className="block py-2">Regulation & Guidelines</Link>
                </div>
              )}
            </div>

            <NavLink to="/blog" onClick={handleDrawerToggle} className="py-2 flex items-center"><FaNewspaper className="mr-2" /> Blog</NavLink>
            <NavLink to="/partner" onClick={handleDrawerToggle} className="py-2 flex items-center"><FaHandshake className="mr-2" /> Become a Partner</NavLink>

            {/* Pages Submenu */}
            <div>
              <button 
                onClick={() => toggleMobileSubmenu('pages')} 
                className="py-2 flex items-center w-full justify-between"
              >
                <span>Pages</span>
                {mobileSubmenu.pages ? <GoTriangleUp /> : <GoTriangleDown />}
              </button>
              {mobileSubmenu.pages && (
                <div className="pl-6">
                  <Link to="/faq" onClick={handleDrawerToggle} className="block py-2">FAQ</Link>
                  <Link to="/referandearn" onClick={handleDrawerToggle} className="block py-2">Refer & Earn</Link>
                  <Link to="/solar-calculator" onClick={handleDrawerToggle} className="block py-2">Solar Calculator</Link>
                  <Link to="/freequote" onClick={handleDrawerToggle} className="block py-2">Free Quote</Link>
                </div>
              )}
            </div>

            <NavLink to="/contact" onClick={handleDrawerToggle} className="py-2 flex items-center"><FaPhoneAlt className="mr-2" /> Contact</NavLink>

            {/* ✅ User Section Mobile */}
            {user?._id ? (
              <div className='pt-4 border-t mt-2'>
                <div className='flex items-center gap-3'>
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 text-sm">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </span>
                    </div>
                  )}
                  <span>{user.name}</span>
                </div>
                
                <div className="pl-2 mt-2">
                  <UserMenu close={handleDrawerToggle} mobile={true} />
                </div>
              </div>
            ) : (
              <button onClick={redirectToLoginPage} className='py-2 text-left flex items-center font-semibold'>
                <FaUserPlus size={20} className='mr-2' /> Signup / Login
              </button>
            )}
             <div> <button onClick={ () => navigate('/solar-calculator')} className='text-white bg-imp-text hover:bg-orange-400 duration-300 px-3 py-2 rounded-md'>Saving Calculator</button></div>
          </nav>
        </div>
      </nav>
    </>
  );
};

export default Header;