import { Modal } from 'flowbite-react'
import React, { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'

const CourseModal = (props) => {
  const { show, setShow, id, deleteLectureHandler, courseTitle, addLectureHandler, lectures = [], loading } = props

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [video, setVideo] = useState('')
  const [videoPrev, setVideoPrev] = useState('')

  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const handleOnCloseModal = () => {
    setShow(!show)
    setTitle('')
    setDescription('')
    setVideo('')
    setVideoPrev('')
  }

  return (
    <>
      <Modal
        show={show}
        size="7xl"
        onClose={handleOnCloseModal}
        style={{ overflowY: 'scroll', backgroundBlendMode: 'color-burn' }}
      >
        <Modal.Header>
          {courseTitle}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-1 flex flex-col-reverse justify-between items-center h-[60vh] overflow-y-auto">
            <div>
              <form className="sm:w-full lg:w-96 mx-auto bg-gray-100 rounded-lg p-8 flex flex-col my-20" onSubmit={e => addLectureHandler(e, id, title, description, video)}>
                <h1 className="text-gray-900 text-lg font-medium title-font mb-5">Add Lectures</h1>
                <div className="relative mb-4">
                  <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
                  <input required type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                  <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                  <input required type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                  <label className="leading-7 text-sm text-gray-600" htmlFor="file_input">Upload Video</label>
                  <input required accept='video/mp4' className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={changeVideoHandler} />
                </div>
                {videoPrev && <div className='my-10'>
                  <video controlsList='nodownload' controls src={videoPrev} alt="" >
                  </video>
                </div>}
                <button className="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg" type='submit'>
                  {loading ? (<>
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                    Loading...
                  </>) : (
                    <>
                      Upload
                    </>
                  )}
                </button>
              </form>
            </div>
            <div>
              <div>
                <h1 className='text-3xl font-semibold'>{courseTitle}</h1>
                <h2 className='text-gray-500'>{`#${id}`}</h2>
              </div>
              <div>
                {
                  lectures.length > 0 ? (

                    lectures.map((element, i) => (
                      <VideoCard title={element.title} description={element.description} num={i + 1} lectureId={element._id} courseId={id} deleteLectureHandler={deleteLectureHandler} loading={loading} />
                    ))

                  ) : (
                    <>
                      <h1 className='text-red-500 text-center my-4 text-lg'>No lectures added</h1>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleOnCloseModal} className="mt-auto bg-red-500 text-white bg-red- border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-center ml-2 relative -top-1">Cancel</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CourseModal

function VideoCard({ title, description, num, lectureId, courseId, deleteLectureHandler, loading }) {
  return (
    <div className='bg-slate-100 rounded shadow-md flex justify-between p-5 lg:p-10 md:space-x-10 border-b-2 border-black '>
      <div className=''>
        <h1>{`#${num} ${title}`}</h1>
        <p>{description}</p>
      </div>
      <button onClick={() => deleteLectureHandler(courseId, lectureId)} className="text-red-500 text-2xl hover:text-red-600">
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
  )
}