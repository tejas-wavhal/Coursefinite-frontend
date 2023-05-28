import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RxAvatar } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/actions/userAction'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState('')
  // eslint-disable-next-line
  const [image, setImage] = useState(null)

  const dispatch = useDispatch()  //to send form data

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setProfileImage(reader.result);
      setImage(file);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault()

    //created formdata
    const myForm = new FormData()
    myForm.append('name', name)
    myForm.append('email', email)
    myForm.append('password', password)
    myForm.append('file', image)  //'file' because in backend we have recieved file with 'file' in multer.js
    dispatch(register(myForm))
  }

  return (
    <div>
      <div className='mx-4'>
        <form onSubmit={submitHandler} className="mx-auto lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full my-20">
          <h1 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h1>
          <div className='h-40'>
            <img className="rounded-full w-40 h-40 mx-auto relative bg-slate-200 object-cover" src={profileImage} alt="" />
            <RxAvatar className={`relative rounded-full w-48 h-48 mx-auto bottom-[10.7rem] text-slate-300 ${image ? '-z-10' : 'z-10'} absolute`} />
          </div>
          <div className="relative mb-4">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
            <input required type="text" id="full-name" name="full-name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input required type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input required type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label className="leading-7 text-sm text-gray-600" htmlFor="file_input">Upload file</label>
            <input required accept='image/*' className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={changeImageHandler} />
          </div>

          <button className="text-white bg-yellow-400 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-500 rounded text-lg">Sign Up</button>
          <p className="text-lg text-gray-500 mt-3">Already have Account? <Link to={'/login'}><b className='text-yellow-400 cursor-pointer'>Login</b></Link> Here</p>
        </form>
      </div>
    </div>
  )
}

export default Register