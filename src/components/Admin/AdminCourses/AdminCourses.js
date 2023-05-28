import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { MdDeleteForever } from 'react-icons/md'
import CourseModal from './CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllCourses, getCourseLectures } from '../../../redux/actions/courseAction'
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/adminAction'
import { toast } from 'react-hot-toast'

const AdminCourses = () => {

  const { courses, lectures } = useSelector(state => state.course)

  const { error, message, loading } = useSelector(state => state.admin)

  const [show, setShow] = useState(false)

  const [courseId, setCourseId] = useState('')
  const [courseTitle, setCourseTitle] = useState('')

  const dispatch = useDispatch()

  const courseDetailsHandler = (courseId, title) => {
    setShow(!show)
    dispatch(getCourseLectures(courseId))
    setCourseId(courseId)
    setCourseTitle(title)
  }

  const deleteHandler = courseId => {
    dispatch(deleteCourse(courseId))
  }

  const deleteLectureHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId))
  }

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault()
    //created formdata
    const myForm = new FormData()
    myForm.append('title', title)
    myForm.append('description', description)
    myForm.append('file', video)  //'file' because in backend we have recieved file with 'file' in multer.js
    await dispatch(addLecture(courseId, myForm))
    dispatch(getCourseLectures(courseId))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: "clearError" })  //so that the state will be empty
    }
    if (message) {
      toast.success(message)
      dispatch({ type: "clearMessage" })  //so that the state will be empty
    }
    dispatch(getAllCourses()) //so we get latest data
  }, [dispatch, error, message])


  return (
    <>
      <div className='lg:min-h-[80vh] flex flex-col-reverse lg:flex-row'>
        <div className='lg:mx-auto my-10'>
          <h1 className='text-2xl font-semibold text-center my-10'>All Courses</h1>
          <p className='text-gray-500 text-center my-5'>All available courses in the Database</p>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    POSTER
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TITLE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CATEGORY
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CREATOR
                  </th>
                  <th scope="col" className="px-6 py-3">
                    VIEWS
                  </th>
                  <th scope="col" className="px-6 py-3">
                    LECTURES
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((item) => (
                  <Row key={item._id} item={item} courseDetailsHandler={courseDetailsHandler} deleteHandler={deleteHandler} loading={loading} />
                ))}
              </tbody>
            </table>
            <CourseModal show={show} setShow={setShow} id={courseId} courseTitle={courseTitle} deleteLectureHandler={deleteLectureHandler} addLectureHandler={addLectureHandler} lectures={lectures} loading={loading} />
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  )
}
export default AdminCourses

function Row({ item, courseDetailsHandler, deleteHandler, loading }) {

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">
        #{item._id}
      </td>
      <td className="px-6 py-4">
        <div className='w-20'>
          <img src={item.poster.url} alt="poster" />
        </div>
      </td>
      <td className="px-6 py-4">
        {item.title}
      </td>
      <td className="px-6 py-4">
        {item.category}
      </td>
      <td className="px-6 py-4">
        {item.createdBy}
      </td>
      <td className="px-6 py-4">
        {item.views}
      </td>
      <td className="px-6 py-4">
        {item.numOfVideos}
      </td>
      <td className="px-6 py-4">
        <div className='flex space-x-2'>
          <button onClick={() => courseDetailsHandler(item._id, item.title)} className="mt-auto text-white bg-yellow-400 border-0 p-1 focus:outline-none hover:bg-yellow-500 rounded text-center text-xs">View Lectures</button>
          <button onClick={() => deleteHandler(item._id)} className="text-red-500 text-2xl hover:text-red-600">
            {
              loading ? (
                <>
                  <div role="status">
                    <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                </>
              ) : (
                <MdDeleteForever />
              )
            }
          </button>
        </div>
      </td>
    </tr>
  )
}