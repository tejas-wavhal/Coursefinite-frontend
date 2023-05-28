import React from "react";
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdSpaceDashboard, MdOutlineAppRegistration } from 'react-icons/md'
import { FiLogOut, FiLogIn } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userAction";

const Navbar = ({ isAuthenticated = false, user, loading }) => {    //isAuthenticated = false means that if we didn't get isAuthenticated then it will be false
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-yellow-400">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-2xl font-semibolds inline-block mr-4 py-2 text-white font-concert"
              to="/"
            >
              COURSEFINITE
            </Link>
            <button
              className="text-white lg:hidden"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <GiHamburgerMenu className="text-xl" />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-col lg:flex-row flex-grow lg:items-center items-start border-t-2 border-yellow-100 border-solid lg:border-none" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <Navlink url={'/'} title='HOME' />
              <Navlink url={'/courses'} title='COURSES' />
              <Navlink url={'/request'} title='REQUEST COURSE' />
              <Navlink url={'/contact'} title='CONTACT' />
              <Navlink url={'/about'} title='ABOUT' />
            </ul>
            <div className='space-x-2 lg:mr-0 mx-auto mt-4 lg:mt-0'>
              {
                isAuthenticated ? (
                  <>
                    <Link to={'/profile'}>
                      <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-base"><CgProfile className="text-lg my-auto mr-1" />Profile</button>
                    </Link>
                    <button onClick={logoutHandler} className="inline-flex text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-base shadow-white"><FiLogOut className="text-lg my-auto mr-1" />Logout</button>
                    {user && user.role === 'admin' && (
                      <>
                        <Link to={'/admin/dashboard'}>
                          <button className="inline-flex text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-base"><MdSpaceDashboard className="text-lg my-auto mr-1" />Dashboard</button>
                        </Link>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Link to={'/login'}>
                      <button className={`${loading ? 'hidden' : null} inline-flex text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-base`}><FiLogIn className="text-lg my-auto mr-1" />Login</button>
                    </Link>
                    <Link to={'/register'}>
                      <button className={`${loading ? 'hidden' : null} inline-flex text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-base`}><MdOutlineAppRegistration className="text-lg my-auto mr-1" />Sign Up</button>
                    </Link>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;

function Navlink({ url, title }) {
  return (
    <li>
      <NavLink
        className="px-3 py-2 flex items-center text-base text-white "
        to={url}
      >
        <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">{title}</span>
      </NavLink>
    </li>
  )
}