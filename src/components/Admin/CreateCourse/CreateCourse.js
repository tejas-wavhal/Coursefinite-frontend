import React, { useState } from 'react'
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/actions/adminAction';
import Sidebar from '../Sidebar'

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setProfileImage(reader.result);
      setImage(file);
    };
  };

  const dispatch = useDispatch()

  const { loading, message, error } = useSelector(state => state.admin)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: "clearError" })  //so that the state will be empty
    }
    if (message) {
      toast.success(message)
      dispatch({ type: "clearMessage" })  //so that the state will be empty
    }
  }, [dispatch, error, message])

  const categories = ['Stock Market', 'Crypto Currency', 'Coding', 'Personality Development', 'Fitness']

  const submitHandler = (e) => {
    e.preventDefault()

    //created formdata
    //title, description, category, createdBy, file
    const myForm = new FormData()
    myForm.append('title', title)
    myForm.append('description', description)
    myForm.append('category', category)
    myForm.append('createdBy', createdBy)
    myForm.append('file', image)  //'file' because in backend we have recieved file with 'file' in multer.js
    dispatch(createCourse(myForm))
  }
  return (
    <>
      <div className='lg:min-h-[80vh] flex flex-col-reverse lg:flex-row'>
        <div className='mx-auto my-10 w-[80%]'>
          <form className="mx-auto lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col my-20" onSubmit={submitHandler}>
            <h1 className="text-gray-900 text-lg font-medium title-font mb-5">Create Course</h1>
            <div className="relative mb-4">
              <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
              <input required type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
              <input required type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="createdBy" className="leading-7 text-sm text-gray-600">Created By</label>
              <input required type="text" id="createdBy" name="createdBy" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="countries" className="leading-7 text-sm text-gray-600">Select Category</label>
              <select required id="category" onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded focus:ring-yellow-400 focus:border-yellow-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-400 dark:focus:border-yellow-400">
                <option value={''}>Choose Category</option>
                {
                  categories.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))
                }
              </select>
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600" htmlFor="file_input">Upload file</label>
              <input required accept='image/*' className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={changeImageHandler} />
            </div>
            {profileImage && <div className='my-10'>
              <img src={profileImage} alt="" />
            </div>}
            <button className="text-white bg-yellow-400 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-500 rounded text-lg" type='submit'>
              {loading ? (<>
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                Loading...
              </>) : (
                <>
                  Create Course
                </>
              )}
            </button>
          </form>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default CreateCourse