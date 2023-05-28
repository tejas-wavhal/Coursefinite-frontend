import React from 'react'
import Sidebar from '../Sidebar'
import { MdDeleteForever } from 'react-icons/md'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/adminAction'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

const Users = () => {

  const dispatch = useDispatch()

  const { users, loading, error, message } = useSelector(state => state.admin)

  const updateHandler = userId => {
    dispatch(updateUserRole(userId))
  }

  const deleteHandler = userId => {
    dispatch(deleteUser(userId))
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
    dispatch(getAllUsers())
  }, [dispatch, error, message])


  return (
    <>
      <div className='lg:min-h-[80vh] flex flex-col-reverse lg:flex-row'>
        <div className='lg:mx-auto my-10'>
          <h1 className='text-2xl font-semibold text-center my-10'>Users</h1>
          <p className='text-gray-500 text-center my-5'>All available users in the Database</p>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NAME
                  </th>
                  <th scope="col" className="px-6 py-3">
                    EMAIL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ROLE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {users && users.map((item, index) => (
                  <Row key={index} item={item} updateHandler={updateHandler} deleteHandler={deleteHandler} loading={loading} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  )
}
export default Users

function Row({ item, updateHandler, deleteHandler, loading }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">
        #{item._id}
      </td>
      <td className="px-6 py-4">
        {item.name}
      </td>
      <td className="px-6 py-4">
        {item.email}
      </td>
      <td className="px-6 py-4">
        {item.role}
      </td>
      <td className="px-6 py-4">
        <div className='flex space-x-2'>
          <button onClick={() => updateHandler(item._id)} className="mt-auto text-white bg-yellow-400 border-0 p-1 focus:outline-none hover:bg-yellow-500 rounded text-center text-xs">
            {loading ? (<>
              <svg aria-hidden="true" role="status" className="inline w-3 h-3 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
              Loading...
            </>) : (
              <>
                Change Role
              </>
            )}
          </button>
          <button onClick={() => deleteHandler(item._id)} className="text-red-500 text-2xl hover:text-red-600">
            {
              loading ? (
                <>
                  <div role="status">
                    <svg aria-hidden="true" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
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