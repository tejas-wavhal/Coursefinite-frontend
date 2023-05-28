import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import { Modal } from 'flowbite-react'
import { RxAvatar } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPlaylist, updateProfilePicture } from '../../redux/actions/profileAction'
import { cancelSubscription, loadUser } from '../../redux/actions/userAction'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Profile = ({ user }) => {
  const [show, setShow] = useState(false)

  const [profileImage, setProfileImage] = useState('')
  const [image, setImage] = useState(null)
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
  const { error, message, loading } = useSelector(state => state.profile)

  const {
    loading: subscriptionLoading,
    message: subscriptionMessage,
    error: subscriptionError,
  } = useSelector(state => state.subscription);

  const removePlaylistHandler = async (courseId) => {
    await dispatch(removeFromPlaylist(courseId))
    dispatch(loadUser())
  }

  //toaster
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: "clearError" })  //so that the state will be empty
    }
    if (message) {
      toast.success(message)
      dispatch({ type: "clearMessage" })  //so that the state will be empty
    }
    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch({ type: 'clearMessage' });
      dispatch(loadUser());
    }

    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, error, message, subscriptionMessage, subscriptionError])

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setShow(!show)
    //created formdata
    const myForm = new FormData()
    myForm.append('file', image)  //'file' because in backend we have recieved file with 'file' in multer.js
    await dispatch(updateProfilePicture(myForm))
    dispatch(loadUser())  //async await and this line because so that we don need to referesh to see latest data after chanfe photo
    navigate('/profile')
  }

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription());
  };
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <h1 className='font-bold text-3xl text-center'>PROFILE</h1>
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8 flex flex-col justify-center items-center">
                <div className='h-40'>
                  <img className="rounded-full w-40 h-40 mx-auto relative bg-slate-200 object-cover" src={user.avatar.url} alt="" />
                  {!user.avatar.url && <RxAvatar className={`relative rounded-full w-44 h-44 mx-auto bottom-[10.7rem] text-slate-300`} />}
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h1 className="font-medium title-font mt-4 text-gray-900 text-lg">{user.name}</h1>
                  <div className="w-12 h-1 bg-yellow-400 rounded mt-2 mb-4" />
                  <button className='text-yellow-400 font-bold hover:underline' onClick={() => setShow(!show)} >
                    {
                      loading ? (<>
                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </>) : (
                        <>
                          Change Photo
                        </>
                      )
                    }
                  </button>
                  <Modal
                    show={show}
                    onClose={() => setShow(!show)}
                  >
                    <Modal.Header>
                      Change Photo
                    </Modal.Header>
                    <Modal.Body>
                      <form className="space-y-6" onSubmit={submitHandler}>
                        <div className='h-40'>
                          <img className="rounded-full w-40 h-40 mx-auto relative bg-slate-200 object-cover" src={profileImage} alt="" />
                          <RxAvatar className={`relative rounded-full w-48 h-48 mx-auto bottom-[10.7rem] text-slate-300 ${image ? '-z-10' : 'z-10'} absolute`} />
                        </div>
                        <div className="relative mb-4">
                          <label className="leading-7 text-sm text-gray-600" htmlFor="file_input">Upload file</label>
                          <input required accept='image/*' className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={changeImageHandler} />
                        </div>
                        <hr />
                        <div className='flex justify-between'>
                          <button type='submit' className="mt-auto text-white bg-yellow-400 border-0 py-1 px-4 focus:outline-none hover:bg-yellow-500 rounded text-center ml-2 relative -top-1">Change Photo</button>
                          <button onClick={() => setShow(!show)} className="mt-auto bg-red-500 text-white bg-red- border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-center ml-2 relative -top-1">Cancel</button>
                        </div>
                      </form>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 sm:text-left flex flex-col justify-center text-start text-lg space-y-2">
                <h1><b>Name-</b> {user.name}</h1>
                <h2><b>Email-</b> {user.email}</h2>
                <h3><b>Created At-</b> {user.createdAt.split('T')[0]}</h3>
                {
                  user.role !== 'admin' && (
                    <div className='flex'>
                      <h4><b>Subscription-</b></h4>
                      {
                        user.subscription && user.subscription.status === 'active' ? (
                          <>
                            <button className='font-bold text-yellow-400 ml-2 hover:underline'
                              onClick={cancelSubscriptionHandler}
                              disabled={subscriptionLoading ? true : false}
                            >
                              {
                                subscriptionLoading ? (<>
                                  <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                  </svg>
                                  <span className="sr-only">Loading...</span>
                                </>) : (
                                  <>
                                    Cancel Subscription
                                  </>
                                )
                              }
                            </button>
                          </>
                        ) : (
                          <Link to='/subscribe'><button className="mt-auto text-white bg-yellow-400 border-0 py-1 px-4  mx-auto focus:outline-none hover:bg-yellow-500 rounded text-center ml-2 relative -top-1">Subscribe</button></Link>
                        )
                      }
                    </div>
                  )}
                <div className=" space-x-6 my-3">
                  <Link to={'/updateprofile'}><button className="mt-auto text-white bg-yellow-400 border-0 py-1 px-4  mx-auto focus:outline-none hover:bg-yellow-500 rounded text-center ">Change Profile</button></Link>
                  <Link to={'/changepassword'}><button className="mt-auto text-white bg-yellow-400 border-0 py-1 px-4  mx-auto focus:outline-none hover:bg-yellow-500 rounded text-center ">Change Password</button></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col">
              <div className="h-1 bg-gray-200 rounded overflow-hidden">
              </div>
              <div className="mx-auto my-8 ">
                <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0 text-center">Playlist</h1>
              </div>
            </div>
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
              {
                user.playlist.length > 0 ? (
                  user.playlist.map((e) => (
                    <div key={e._id} className="p-4 md:w-1/3 sm:mb-0 mb-6 transition-all md:hover:-translate-y-2 ease-in">
                      <div className="rounded-lg h-max overflow-hidden">
                        <img alt="content" className="object-cover object-center h-full w-full" src={e.poster} />
                      </div>
                      <div className='flex justify-between'>
                        <Link to={`/course/${e.course}`} className="text-yellow-400 font-semibold inline-flex items-center mt-3 transition-all hover:translate-x-1 ease-in-out">Watch Now
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <button onClick={() => { removePlaylistHandler(e.course) }} > <MdDeleteForever className='h-6 w-6 mr-10 text-yellow-400 mt-2 hover:text-yellow-500' /></button>
                      </div>
                    </div>
                  ))) : (
                  <>
                    <h1 className='text-red-500 text-lg text-center mx-auto'>No Course added to playlist. <Link to={'/courses'} className="font-bold hover:underline"> Click hear</Link> to add playlist</h1>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile