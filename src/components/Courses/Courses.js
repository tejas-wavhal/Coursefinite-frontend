import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCourses } from '../../redux/actions/courseAction'
import { addToPlaylist } from '../../redux/actions/profileAction'
import { loadUser } from '../../redux/actions/userAction'
import Loader from '../Layouts/Loader'

const Course = ({ title, image, description, lectureCount, addToPlaylistHandler, views, creator, id, loading }) => {

  const handleOnNoLecture = () => {
    if (lectureCount === 0) {
      toast.error("No lectures for this Course")
    }
  }

  return (
    <div className="container p-4 md:w-1/3 sm:mb-0 mb-6 transition-transform md:hover:-translate-y-2 ease-in">
      <div className="rounded-lg h-max overflow-hidden">
        <img alt="content" className="object-cover object-center h-full w-full" src={image} />
      </div>
      <h1 className="text-xl font-bold title-font text-gray-900 mt-5">{title}</h1>
      <p className="text-base leading-relaxed mt-2">{description}</p>
      <h2><b>Creator - </b>{creator}</h2>
      <h3><b>Lectures</b> - {lectureCount === 0 ? `No Lectures ` : lectureCount}</h3>
      <h3><b>Views</b> - {views}</h3>
      <div className="my-2">
        <Link to={lectureCount === 0 ? null : `/course/${id}`}>
          <button className="inline-flex text-white bg-yellow-400 border-0 py-1 px-2 text-base focus:outline-none hover:bg-yellow-500 rounded" onClick={handleOnNoLecture}>Watch Now</button>
        </Link>
        <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-1 px-2 text-base focus:outline-none hover:bg-gray-200 rounded" onClick={() => addToPlaylistHandler(id)} disabled={loading ? true : false}>
          {loading ? (<>
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-yellow-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            Loading...
          </>) : (
            <>
              Add to Playlist
            </>
          )}
        </button>
      </div>
    </div>
  )
}

const Courses = () => {
  const [category, setCategory] = useState('')
  const [keyword, setKeyword] = useState('')

  const dispatch = useDispatch()

  const { courses, error, message, loading } = useSelector(state => state.course);

  useEffect(() => {
    dispatch(getAllCourses(category, keyword))
    if (error) {
      toast.error(error)
      dispatch({ type: "clearError" })  //so that the state will be empty
    }
    if (message) {
      toast.success(message)
      dispatch({ type: "clearMessage" })  //so that the state will be empty
    }
  }, [dispatch, category, keyword, message, error])


  const addToPlaylistHandler = async (courseId) => {
    await dispatch(addToPlaylist(courseId))
    dispatch(loadUser())
  }

  const allCategory = ['Stock Market', 'Crypto Currency', 'Coding', 'Personality Development', 'Fitness']

  return (
    <div className='space-y-8 min-h-[80vh]'>
      {loading ? (<Loader />) : (
        <>
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full " >
            <input onChange={(e) => { setKeyword(e.target.value) }} type="text" id="simple-search" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90vw] mx-auto pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          </div>

          <div className='mx-4'>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-y-2" >
              <li className="mr-2">
                <button onClick={() => { setCategory('') }} className="inline-block p-4 bg-gray-100 rounded-t-lg hover:bg-gray-200">All</button>
              </li>
              {
                allCategory.map((e) => {
                  return <li className="mr-2" key={e}>
                    <button onClick={() => { setCategory(e) }} className="inline-block p-4 bg-gray-100 rounded-t-lg hover:bg-gray-200">{e}</button>
                  </li>
                })
              }
            </ul>
          </div>

          <section className="text-gray-600 body-font">
            <div className="container px-5 pt-2 pb-20 mx-auto">
              <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                {
                  courses.length > 0 ?
                    courses.map((e) => (
                      <Course
                        key={e._id}
                        id={e._id}
                        title={e.title}
                        description={e.description}
                        image={e.poster.url}
                        views={e.views}
                        creator={e.createdBy}
                        lectureCount={e.numOfVideos}
                        addToPlaylistHandler={() => { addToPlaylistHandler(e._id) }}
                        loading={loading}
                      />
                    )) :
                    (
                      <>
                        {category && <h1 className='text-2xl font-bold mt-24 text-red-500 mx-auto' >No Courses related to {category}</h1>}
                      </>
                    )
                }
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default Courses