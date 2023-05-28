import { getCourseLectures } from '../../redux/actions/courseAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from "react-router-dom"
import Loader from '../Layouts/Loader'

const CoursePage = ({ user }) => {
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault()
  })
  const [lectureNumber, setLectureNumber] = useState(0)

  const { lectures, loading } = useSelector(state => state.course)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    dispatch(getCourseLectures(params.id))
  }, [dispatch, params.id])

  if (user.subscription?.status !== 'active' && user.role !== 'admin') {
    return <Navigate to={'/subscribe'} />
  }



  return (
    <>
      <div className='min-h-[80vh]'>
        {
          loading ? (<Loader />) : (
            lectures.length > 0 ? (
              <>
                <div>
                  <div className='flex flex-col lg:flex-row'>
                    <div className='container2 container'>
                      <video className='video' src={lectures[lectureNumber].video.url} autoPlay controlsList='nodownload noremoteplayback' disablePictureInPicture disableRemotePlayback controls></video>
                      <div className='container lg:mx-14 my-5'>
                        <h1 className='mx-1 text-2xl font-semibold'>{`# ${lectureNumber + 1} ${lectures[lectureNumber].title}`}</h1>
                        <h2 className='text-gray-600 text mx-1 text-base mt-2 font-semibold'>Description:</h2>
                        <p className='text-gray-500 mx-1'>{lectures[lectureNumber].description}</p>
                      </div>
                    </div>
                    <div className='w-full lg:w-[30%] p-10'>
                      {
                        lectures.map((element, index) => (
                          <button key={element._id} onClick={() => setLectureNumber(index)} className='border-yellow-300 border-solid m-2 w-full border-b-4 bg-slate-100 rounded-xl p-3 shadow-md hover:bg-slate-200'>
                            #{index + 1} {element.title}
                          </button>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='text-2xl text-center mt-[10vh] text-red-500 '><h1>No Lectures</h1></div>
              </>
            )
          )
        }
      </div>
    </>
  )
}


export default CoursePage