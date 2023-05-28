import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../redux/actions/userAction'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch() 

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(login(email, password))
  }
  return (
    <div className='mx-4'>
      <form className="mx-auto lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full my-20" onSubmit={submitHandler}>
        <h1 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h1>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input required type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Password</label>
          <input required type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          <Link to={'/forgotpassword'}>
            <p className="text-xs text-gray-500 mt-3 cursor-pointer hover:underline">Forgot Password?</p>
          </Link>
        </div>
        <button className="text-white bg-yellow-400 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-500 rounded text-lg">Login</button>
        <p className="text-lg text-gray-500 mt-3">New user? <Link to={'/register'}><b className='text-yellow-400 cursor-pointer'>Sign Up</b></Link> Here</p>
      </form>
    </div>
  )
}

export default Login