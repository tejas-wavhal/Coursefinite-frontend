import React from 'react'
import introvideo from "../../assets/videos/intro.mp4"
import './Home.css'
import { Link } from 'react-router-dom'
import { FiLogOut, FiLogIn } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/userAction'


const Home = ({ isAuthenticated = false , loading}) => {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Welcome to
              <br className="hidden lg:inline-block" />COURSEFINITE
            </h1>
            <p className="mb-8 leading-relaxed">Coursefinite provides you best Course at Reasonble Price where you can upscale and make you Skills at next level. Explore now to Check the Best Courses.</p>
            <div className="flex justify-center">
              <Link to={'/courses'}>
                <button className="inline-flex text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded text-lg mr-4">Explore Now</button>
              </Link>
              {
                isAuthenticated ? (
                  <>
                    <button onClick={logoutHandler} className="inline-flex text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-base"><FiLogOut className="text-lg my-auto mr-1" />Logout</button>
                  </>
                ) : (
                  <>
                    <Link to={'/login'}>
                      <button className={`${loading ? 'hidden' : null} inline-flex text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-base`}><FiLogIn className="text-lg my-auto mr-1" />Login</button>
                    </Link>
                  </>
                )
              }
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src="https://img.freepik.com/free-vector/female-student-listening-webinar-online_74855-6461.jpg?w=2000" />
          </div>
        </div>

        <div className='text-center h-36 bg-yellow-400 flex flex-col justify-center text-2xl font-bold'>
          <h1>Learn from the Experts</h1>
          <p className='font-medium text-base'>Coursefinite provides best Courses</p>
        </div>

        <div className='container2'>
          <video src={introvideo} controlsList='nodownload nofullscreen noremoteplayback' disablePictureInPicture disableRemotePlayback controls></video>
        </div>
      </section>
    </div>
  )
}

export default Home